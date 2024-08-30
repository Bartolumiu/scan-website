// server/api/cover/index.post.ts
import Cover from '../../models/Cover';
import uuid4 from 'uuid4';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const coverExists = await Cover.findOne({ _id: body.id }).exec();

        if (coverExists) {
            return { result: 'error', errors: [{ id: 'already_exists', status: 409, title: 'Conflict', detail: `Cover with ID ${body.id} already exists` }] };
        }
        body.version = 1; // Set the version to 1

        const cover = new Cover(body); // Create a new cover object
        await cover.save(); // Save the cover object to the database

        return { result: 'ok', response: 'object', data: cover };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});