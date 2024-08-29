// server/api/manga/[id].put.ts
import Manga from '../../models/Manga';

export default defineEventHandler(async (event) => {
    const _id = getRouterParam(event, 'id');
    const body = await readBody(event);

    try {
        const manga = await Manga.findOne({ _id }).exec();

        if (!manga) {
            return { result: 'error', errors: [{ id: 'not_found', status: 404, title: 'Not Found', detail: `Manga with ID ${_id} not found` }] };
        }

        await updateManga(manga, body).save(); // Update the manga and save it to the database (in one step)

        return { result: 'ok', response: 'object', data: manga };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});

function updateManga(manga: any, body: any) {
    // Exclude _id, type, version, createdAt, updatedAt from the body (these fields are not allowed to be manually updated)
    if (body._id) delete body._id;
    if (body.type) delete body.type;
    if (body.attributes.version) delete body.attributes.version;
    if (body.attributes.createdAt) delete body.attributes.createdAt;
    if (body.attributes.updatedAt) delete body.attributes.updatedAt;

    // Overwrite manga attributes and relationships with the new values (don't save the old values)
    Object.assign(manga.attributes, body.attributes);
    manga.relationships = body.relationships;

    // If the manga has a new version, increment it
    if (body.attributes.version) manga.attributes.version++;
    manga.attributes.updatedAt = new Date();

    return manga;
}