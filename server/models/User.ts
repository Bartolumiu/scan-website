// server/models/User.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['user'], default: 'user' },
    attributes: {
        username: { type: String, required: true, unique: true },
        roles: { type: [String], default: ['user'] },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        version: { type: Number, required: true, default: 1 }
    },
    relationships: []
}, {
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.attributes.password = bcrypt.hash(this.attributes.password, 10);
    }
    next();
});

export default model('User', UserSchema, 'user');