// server/api/tag/index.ts
import { defineEventHandler } from 'h3';
import Tag from '../../models/Tag';

export default defineEventHandler(async (event) => {
    try {
        const query = event.node.req.url?.split('?')[1];
        const params = new URLSearchParams(query);

        // Limit must be between 0 and 100, both inclusive
        const limit = parseInt(params.get('limit') ?? '10', 10); // Default limit is 10
        const offset = parseInt(params.get('offset') ?? '0', 10); // Default offset is 0

        if (limit > 100 || limit < 0) {
            return { result: 'error', errors: [{ id: 'bad_request', status: 400, title: 'Bad Request', detail: 'Limit must be between 0 and 100' }] };
        } else if (limit + offset > 1000 || limit + offset < 0) {
            return { result: 'error', errors: [{ id: 'bad_request', status: 400, title: 'Bad Request', detail: 'Sum of limit and offset must be between 0 and 1000' }] };
        }

        // If the limit is 0, return an empty array
        // Or else mongoose will treat limit 0 as no limit and return all tags (not good for performance)
        if (limit === 0) {
            return { result: 'ok', response: 'collection', data: [], limit, offset, total: 0 };
        }

        const tags = await Tag.find().sort({ _id: 1 }).limit(limit).skip(offset).exec();

        return { result: 'ok', response: 'collection', data: tags, limit, offset, total: tags.length };
    } catch (error) {
        return { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: (error as Error).message }] };
    }
})