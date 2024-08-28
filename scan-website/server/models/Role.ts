// server/models/Role.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const RoleSchema = new Schema({
    _id: { type: String, default: uuid4 },
    name: { type: String, required: true },
    permissions: { type: [String], required: true },
    version: { type: Number, required: true, default: 1 },
}, {
    versionKey: false
});

//export default model('Role', RoleSchema, 'role');
// Unfinished, will export when finished