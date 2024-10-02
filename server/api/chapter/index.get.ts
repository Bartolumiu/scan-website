// server/api/chapter/index.get.ts
import Chapter from '../../models/Chapter';

export default defineEventHandler(async (event) => {
    try {
        const query = event.node.req.url?.split('?')[1];
        const params = new URLSearchParams(query);

        // Limit must be between 0 and 100, both inclusive
        const limit = parseInt(params.get('limit') ?? '10', 10); // Default limit is 10
        const offset = parseInt(params.get('offset') ?? '0', 10); // Default offset is 0

        if (limit > 100) {
            return { result: 'error', errors: [{ id: 'bad_request', status: 400, title: 'Bad Request', detail: 'Limit must be less than or equal to 100' }] };
        } else if (limit + offset > 1000) {
            return { result: 'error', errors: [{ id: 'bad_request', status: 400, title: 'Bad Request', detail: 'Sum of limit and offset must be less than or equal to 1000' }] };
        }

        // If the limit is 0, return an empty array
        // Or else mongoose will treat limit 0 as no limit and return all chapters (not good for performance)
        if (limit === 0) {
            return { result: 'ok', response: 'collection', data: [], limit, offset, total: 0 };
        }

        const chapters = await Chapter.find().sort({ _id: 1 }).limit(limit).skip(offset);

        return { result: 'ok', response: 'collection', data: chapters, limit, offset, total: chapters.length };
    } catch (e) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (e as Error).message }] };
    }
})