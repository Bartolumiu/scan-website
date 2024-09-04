// server/api/manga/[id]/chapters.get.ts
import Chapter from '../../../models/Chapter';

export default defineEventHandler(async (event) => {
    const titleId = getRouterParam(event, 'id');

    try {
        const chapters = await Chapter.find({ 'relationships.id': titleId});

        if (!chapters) {
            return {
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Not Found',
                    detail: `Chapters with manga ID ${titleId} not found`
                }]
            };
        }

        return {
            result: 'ok',
            response: 'object',
            titleID: titleId,
            data: {
                volumes: [ // Get all volumes from the chapters
                    ...new Set(chapters.map(chapter => chapter?.attributes?.volume)),
                    // Add a 'null' volume if there are chapters without a volume
                    chapters.some(chapter => !chapter?.attributes?.volume) ? null : undefined
                    // Add the chapters to the volumes
                ].map(volume => ({
                    volume,
                    chapters: chapters.filter(chapter => chapter?.attributes?.volume === volume).map(chapter => ({
                        id: chapter._id,
                        type: chapter.type,
                        attributes: chapter.attributes,
                        relationships: chapter.relationships.map(rel => ({
                            id: rel.id,
                            type: rel.type
                        }))
                    }))
                })),
            },
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
})