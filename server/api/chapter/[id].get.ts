// server/api/chapter/[id].get.ts
import Chapter from '../../models/Chapter';

export default defineEventHandler(async (event) => {
    const chapterId = getRouterParam(event, 'id');

    try {
        const chapter = await Chapter.findOne( _id: chapterId);

        if (!chapter) {
            return {
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Not Found',
                    detail: `Chapter with ID ${chapterId} not found`
                }]
            };
        }

        return {
            result: 'ok',
            response: 'entity',
            data: {
                id: chapter.id,
                type: chapter.type,
                attributes: chapter.attributes,
                relationships: chapter.relationships.map(rel => ({
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