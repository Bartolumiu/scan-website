// server/api/stats/manga/[id]/view/index.post.ts
import { defineEventHandler } from 'h3';
import MangaStats from '../../../../../models/MangaStats';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        const stats = await MangaStats.findOne({ _id: id });

        if (!stats) {
            return { result: 'error', errors: [{ id: 'not_found', status: 404, title: 'Not Found', detail: `Stats with ID ${id} not found` }] };
        }

        // Update the view count
        stats.views++;

        // Save the updated stats object
        await stats.save();

        return { result: 'ok', statistics: stats };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
});