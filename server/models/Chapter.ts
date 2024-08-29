// server/models/Chapter.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const ChapterSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['chapter'], default: 'chapter' },
    attributes: {
        volume: { type: String, default: null },
        chapter: { type: String, required: true },
        title: { type: String, default: null },
        translatedLanguage: { type: String, required: true },
        externalUrl: { type: String, default: null },
        publishAt: { type: Date, default: Date.now },
        readableAt: { type: Date, default: Date.now },
        pages: { type: Number, default: 0 },
        version: { type: Number, default: 1 },
    },
    relationships: [{
        id: { type: String, required: true },
        type: { type: String, enum: ['scanlation_group', 'manga', 'user'], required: true },
    }]
}, {
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

export default model('chapter', ChapterSchema, 'chapters');