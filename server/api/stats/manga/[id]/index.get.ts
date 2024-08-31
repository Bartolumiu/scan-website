// server/api/stats/manga/[id].get.ts
import { defineEventHandler } from 'h3';
import MangaStats from '../../../../models/MangaStats';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        const stats = await MangaStats.findOne({ _id: id }).exec();

        if (!stats) {
            return { result: 'error', errors: [{ id: 'not_found', status: 404, title: 'Not Found', detail: `Stats with ID ${id} not found` }] };
        }

        return { result: 'ok', statistics: {
            id: stats._id,
            views: stats.views,
            follows: stats.follows,
            comments: stats.comments,
            rating: stats.rating,
        } };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});