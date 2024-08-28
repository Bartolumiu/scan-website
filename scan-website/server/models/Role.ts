// server/models/Role.ts
import { Schema, model, version } from 'mongoose';
import uuid4 from 'uuid4';

const RoleSchema = new Schema({
    _id: { type: String, default: uuid4 },
    name: { type: String, required: true },
    permissions: { type: [String], required: true },
    version: { type: Number, default: 1 },
}, {
    versionKey: false
});