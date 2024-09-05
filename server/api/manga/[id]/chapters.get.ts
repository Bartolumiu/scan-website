// server/api/manga/[id]/chapters.get.ts
import Chapter from '../../../models/Chapter';

export default defineEventHandler(async (event) => {
    const titleId = getRouterParam(event, 'id');

    try {
        const chapters = await Chapter.find({ 'relationships.id': titleId, 'relationships.type': 'manga' });

        if (!chapters || chapters.length === 0) {
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

        // Group chapters by volume, default to 'none' for chapters without volume
        const groupedChapters: Record<string, any> = {};

        chapters.forEach((chapter: any) => {
            const volumeKey = chapter.attributes.volume || 'none';

            // Initialize volume key if it doesn't exist
            if (!groupedChapters[volumeKey]) {
                groupedChapters[volumeKey] = {
                    volume: chapter.attributes.volume || null,
                    chapters: {}
                };
            }

            // Get group and user from relationships
            const groupRel = chapter.relationships.find((rel: any) => rel.type === 'scanlation_group');
            const userRel = chapter.relationships.find((rel: any) => rel.type === 'user');

            groupedChapters[volumeKey].chapters[chapter.attributes.chapter] = {
                chapter: chapter.attributes.chapter.toString(),
                id: chapter._id,
                title: chapter.attributes.title || null,
                group: groupRel ? groupRel.id : null,
                user: userRel ? userRel.id : null,
            };
        });

        return {
            result: 'ok',
            response: 'collection',
            data: {
                id: titleId,
                volumes: groupedChapters
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