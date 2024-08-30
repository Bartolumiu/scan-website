// server/models/Manga.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';
import TagSchema from './Tag';

const locales = ['en', 'sq', 'ar', 'az', 'bn', 'bg', 'my', 'ca', 'zh', 'zh-hk', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'ka', 'de', 'el', 'he', 'hi', 'hu', 'id', 'it', 'ja', 'kk', 'ko', 'la', 'lt', 'ms', 'mn', 'ne', 'no', 'fa', 'pl', 'pt', 'pt-br', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es-la', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'vi', 'other'];

const MangaSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['manga'], default: 'manga' },
    attributes: {
        title: { type: String, required: true },
        altTitles: [{
            locale: { type: String, required: true },
            value: { type: String, required: true }
        }],
        description: { type: Map, of: String, default: {} },
        isLocked: { type: Boolean, default: false },
        links: { type: Map, of: String, default: {} },
        originalLanguage: { type: String, enum: locales, required: true },
        lastVolume: { type: String, default: null },
        lastChapter: { type: String, default: null },
        publicationDemographic: { type: String, enum: ['shounen', 'shoujo', 'josei', 'seinen', 'kodomo'], default: null },
        status: { type: String, enum: ['ongoing', 'completed', 'hiatus', 'cancelled'], required: true },
        year: { type: Number, default: null },
        contentRating: { type: String, enum: ['safe', 'suggestive', 'erotica', 'pornographic'], required: true },
        tags: [TagSchema.schema],
        state: { type: String, enum: ['draft', 'published', 'deleted'], required: true },
        chapterNumberResetOnNewVolume: { type: Boolean, default: false },
        availableTranslatedLanguages: { type: [String], default: [] },
        latestUploadedChapter: { type: String, ref: 'Chapter', default: null },
        mainCover: { type: String, default: null },
        version: { type: Number, required: true, default: 1 }
    },
    relationships: [{
        id: { type: Schema.Types.String, required: true },
        type: { type: String, enum: ['author', 'artist', 'cover_art', 'creator'], required: true },
    }]
}, {
    _id: false,
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

export default model('Manga', MangaSchema, 'manga');