// server/api/cover/[id].get.ts
import Cover from '../../models/Cover';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        const cover = await Cover.findOne({ _id: id });

        if (!cover) {
            return {
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Not Found',
                    detail: `Cover with ID ${id} not found`
                }]
            };
        }

        return {
            result: 'ok',
            response: 'object',
            data: {
                id: cover.id,
                type: cover.type,
                attributes: cover.attributes,
                /* relationships: cover.relationships.map(rel => ({
                    id: rel.id,
                    type: rel.type
                })) */
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