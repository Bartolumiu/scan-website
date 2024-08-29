// server/api/manga/index.post.ts
import Manga from '../../models/Manga';
import uuid4 from 'uuid4';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const mangaExists = await Manga.findOne({ _id: body.id }).exec();

        if (mangaExists) {
            return { result: 'error', errors: [{ id: 'already_exists', status: 409, title: 'Conflict', detail: `Manga with ID ${body.id} already exists` }] };
        }

        body._id = uuid4(); // Generate a new UUID for the manga
        body.version = 1; // Set the version to 1
        body.createdAt = new Date(); // Set the creation date
        body.updatedAt = new Date(); // Set the last update date

        const manga = new Manga(body); // Create a new manga object
        await manga.save(); // Save the manga object to the database

        return { result: 'ok', response: 'object', data: manga };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
})