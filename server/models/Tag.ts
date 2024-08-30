// server/models/Tag.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const TagSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum:['tag'], default: 'tag' },
    attributes: {
        name: { type: Map, of: String, required: true },
        description: { type: Map, of: String, default: {} },
        group: { type: String, enum: ['format', 'genre', 'theme', 'content'], default: null },
        version: { type: Number, default: 1, required: true }
    },
    relationships: []
}, {
    _id: false,
    versionKey: false
});

export default model('Tag', TagSchema, 'tag');