// server/models/Cover.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const CoverSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['cover'], default: 'cover' },
    attributes: {
        fileName: { type: String, default: uuid4, required: true },
        fileMime: { type: String, required: true },
        fileData: { type: String, required: true },
        version: { type: Number, default: 1, required: true }
    }
}, {
    _id: false,
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

export default model('Cover', CoverSchema, 'cover_art');