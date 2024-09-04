// server/api/manga/[id]/index.get.ts
import Manga from '../../../models/Manga';

export default defineEventHandler(async (event) => {
    const titleId = getRouterParam(event, 'id');

    try {
        const manga = await Manga.findOne({ _id: titleId });

        if (!manga) {
            return {
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Not Found',
                    detail: `Manga with ID ${titleId} not found`
                }]
            };
        }

        return {
            result: 'ok',
            response: 'object',
            data: {
                id: manga._id,
                type: manga.type,
                attributes: manga.attributes,
                relationships: manga.relationships.map(rel => ({
                    id: rel.id,
                    type: rel.type
                }))
            }
        };
    } catch (e) {
        return {
            result: 'error',
            errors: [{
                id: 'internal_server_error',
                status: 500,
                title: 'Internal Server Error',
                detail: (e as Error).message
            }]
        };
    }
});