// server/models/Manga.ts
import { Schema, model } from 'mongoose';
import TagSchema from './Tag';

const locales = ['en', 'sq', 'ar', 'az', 'bn', 'bg', 'my', 'ca', 'zh', 'zh-hk', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'ka', 'de', 'el', 'he', 'hi', 'hu', 'id', 'it', 'ja', 'kk', 'ko', 'la', 'lt', 'ms', 'mn', 'ne', 'no', 'fa', 'pl', 'pt', 'pt-br', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es-la', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'vi', 'other'];

const MangaSchema = new Schema({
    _id: Schema.Types.ObjectId, // Manga ID
    type: { type: String, default: 'manga' },
    attributes: {
        title: { type: String, required: true },
        altTitles: { type: Map, of: String, default: {} },
        description: { type: Map, of: String, default: {} },
        isLocked: { type: Boolean, default: false },
        links: { type: Map, of: String, default: {} },
        originalLanguage: { type: String, enum: locales, required: true },
        lastVolume: { type: String },
        lastChapter: { type: String },
        publicationDemographic: { type: String, enum: ['shounen', 'shoujo', 'josei', 'seinen', 'kodomo'], default: null },
        status: { type: String, enum: ['ongoing', 'completed', 'hiatus', 'cancelled'], required: true },
        year: { type: Number },
        contentRating: { type: String, enum: ['safe', 'suggestive', 'erotica', 'pornographic'], required: true },
        tags: [TagSchema.schema],
        state: { type: String, enum: ['draft', 'published', 'deleted'], required: true },
        chapterNumberResetOnNewVolume: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        availableTranslatedLanguages: { type: [String], default: [] },
        latestUploadedChapter: { type: String },
        version: { type: Number, default: 1 },
    },
    relationships: [{
        id: { type: Schema.Types.ObjectId, required: true },
        type: { type: String, enum: ['author', 'artist', 'cover_art', 'creator'], required: true },
    }]
}, {
    versionKey: false
});

export default model('Manga', MangaSchema, 'manga');