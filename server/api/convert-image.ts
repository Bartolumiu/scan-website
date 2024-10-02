import sharp from 'sharp';
import { promises as fs } from 'fs';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const format = query.format as string || 'jpeg'; // Default format is jpeg
  const titleId = query.titleId as string; // Required
  const chapterId = query.chapterId as string; // Required if coverId is missing
  const coverId = query.coverId as string; // Required if chapterId is missing
  const fileName = query.file as string; // Required

  // Validate the format
  if (!['jpeg', 'webp', 'png'].includes(format)) {
    throw createError({ statusCode: 400, message: 'Invalid format. Supported format: jpeg, webp, png'});
  }

  // Get the image path. Path formats:
  // project_root/uploads/title/{titleId}/chapter/{chapterId}/{fileName}.jxl
  // project_root/uploads/title/{titleId}/cover/{coverId}/{fileName}.jxl
  const jxlPath = chapterId ? `uploads/title/${titleId}/chapter/${chapterId}/${fileName}.jxl` : `uploads/title/${titleId}/cover/${coverId}/${fileName}.jxl`;

  // If both chapterId, coverId are missing, throw an error
  if (!chapterId && !coverId) {
    throw createError({ statusCode: 400, message: 'chapterId or coverId is required'});
  }

  // If either titleId or fileName is missing, throw an error
  if (!titleId || !fileName) {
    throw createError({ statusCode: 400, message: 'titleId and fileName are required'});
  }

  try {
    // Read the image
    const jxlImage = await fs.readFile(jxlPath);

    // If the image is either empty, corrupted, or missing, throw an error
    if (!jxlImage) {
      throw createError({ statusCode: 404, message: 'Image not found'});
    }

    // Create a sharp object
    const image = sharp(jxlImage);

    // Convert the image
    let outputBuffer: Buffer;
    switch (format) {
      case 'jpeg':
        outputBuffer = await image.jpeg().toBuffer();
        break;
      case 'webp':
        outputBuffer = await image.webp().toBuffer();
        break;
      case 'png':
        outputBuffer = await image.png().toBuffer();
        break;
      default: // This should never happen because we already validated the format (This is just to satisfy TypeScript, otherwise it will throw an error saying outputBuffer might be undefined)
        throw createError({ statusCode: 500, message: 'Invalid format. Supported format: jpeg, webp, png' });
    }

    // Set response headers
    setHeader(event, 'Content-Type', `image/${format}`);
    setHeader(event, 'Content-Disposition', `inline: filename="converted.${format}"`);

    // Return the converted image
    return outputBuffer;
  } catch (error) {
    throw createError({ statusCode: 500, message: `Image conversion failed: ${(error as Error).message}` });
  }
});
