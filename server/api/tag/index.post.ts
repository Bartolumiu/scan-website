// server/api/tag/index.post.ts
import Tag from '../../models/Tag';
import uuid4 from 'uuid4';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const tagExists = await Tag.findOne({ _id: body.id }).exec();

        if (tagExists) {
            return { result: 'error', errors: [{ id: 'already_exists', status: 409, title: 'Conflict', detail: `Tag with ID ${body.id} already exists` }] };
        }

        body._id = uuid4(); // Generate a new UUID for the tag
        body.attributes.version = 1; // Set the version to 1

        const tag = new Tag(body); // Create a new tag object
        await tag.save(); // Save the tag object to the database

        return { result: 'ok', response: 'object', data: tag };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});