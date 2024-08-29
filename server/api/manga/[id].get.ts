// server/api/manga/[id].get.ts
import Manga from '../../models/Manga';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        const manga = await Manga.findOne({ _id: id }).exec();

        if (!manga) {
            return { result: 'error', errors: [{ id: 'not_found', status: 404, title: 'Not Found', detail: `Manga with ID ${id} not found` }] };
        }

        return { result: 'ok', response: 'object', data: manga };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});