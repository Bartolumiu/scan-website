import { promises as fs } from 'fs';
import sharp from 'sharp';
import path from 'path';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { titleId, chapterId, coverId, fileName } = query;

  if (!titleId || (!chapterId && !coverId)) {
    throw createError({ statusCode: 400, message: 'Missing titleId, chapterId, or coverId in the request.' });
  }

  const formData = await readMultipartFormData(event);
  const imageFile = formData?.find((file) => file.type?.startsWith('image/'));

  if (!imageFile) {
    throw createError({ statusCode: 400, message: 'No image file uploaded.' });
  };

  const baseDir = path.resolve('uploads', 'title', String(titleId));
  let savePath;

  if (chapterId) {
    savePath = path.resolve(baseDir, 'chapter', String(chapterId), `${String(fileName)}.jxl`);
  } else {
    savePath = path.resolve(baseDir, 'cover', String(coverId), `${String(fileName)}.jxl`);
  }

  try {
    await fs.mkdir(path.dirname(savePath), { recursive: true });
    const jxlBuffer = await sharp(imageFile.data).jxl().toBuffer();
    await fs.writeFile(savePath, jxlBuffer);

    return {
      result: 'ok',
      response: 'image',
      data: {
        titleId: titleId,
        chapterId: chapterId || null,
        coverId: coverId || null,
        fileName: fileName,
        format: 'jxl',
        path: savePath
      }
    }
  } catch (error) {
    throw createError({ statusCode: 500, message: `Failed to process and save the image. ${(error as Error).message}` });
  }
});