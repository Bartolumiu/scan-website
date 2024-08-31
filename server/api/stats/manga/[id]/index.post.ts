// server/api/stats/manga/[id].post.ts
import { defineEventHandler } from 'h3';
import MangaStats from '../../../../models/MangaStats';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        const statsExist = await MangaStats.findOne({ _id: id });

        if (statsExist) {
            return { result: 'error', errors: [{ id: 'already_exists', status: 409, title: 'Conflict', detail: `Stats with ID ${id} already exists` }] };
        }

        const stats = new MangaStats({ _id: id });
        await stats.save();

        return { result: 'ok', response: 'object', data: stats };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});