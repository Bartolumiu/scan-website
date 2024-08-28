// server/models/User.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const UserSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, default: 'user' },
    attributes: {
        username: { type: String, required: true },
        roles: { type: [String], default: ['user'] },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    relationships: []
}, {
    versionKey: false
});