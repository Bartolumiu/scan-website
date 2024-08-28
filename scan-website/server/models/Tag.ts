// server/models/Tag.ts
import { Schema, model } from 'mongoose';

const TagSchema = new Schema({
    _id: Schema.Types.ObjectId, // Tag ID
    type: { type: String, default: 'tag' },
    attributes: {
        name: { type: Map, of: String, required: true },
        description: { type: Map, of: String, default: {} },
        group: { type: String, enum: ['format', 'genre', 'theme', 'content'] },
        version: { type: Number, default: 1 },
    },
    relationships: []
}, {
    versionKey: false
});

export default model('Tag', TagSchema, 'tag');