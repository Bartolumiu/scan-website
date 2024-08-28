// server/api/manga/index.ts
import { defineEventHandler } from 'h3';
import Manga from '../../models/Manga';

export default defineEventHandler(async (event) => {
    try {
        const query = event.node.req.url?.split('?')[1];
        const params = new URLSearchParams(query);
        const limit = parseInt(params.get('limit') ?? '10', 10); // Default limit is 10
        const offset = parseInt(params.get('offset') ?? '0', 10); // Default offset is 0

        if (limit > 100) {
            return { statusCode: 400, body: { message: 'Limit must be less than or equal to 100' } };
        } else if (limit + offset > 1000) {
            return { statusCode: 400, body: { message: 'Sum of limit and offset must be less than or equal to 1000' } };
        }

        const mangas = await Manga.find().sort({ _id: 1 }).limit(limit).skip(offset).exec();

        return { statusCode: 200, body: { result: 'ok', response: 'collection', data: mangas, limit, offset, total: mangas.length } };
    } catch (error) {
        return { statusCode: 500, body: { result: 'error', errors: [{ id: 'internal_server_error', status: 500, title: 'Internal Server Error', detail: error.message }] } };
    }
})