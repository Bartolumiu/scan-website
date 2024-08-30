// server/models/User.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['user'], default: 'user' },
    attributes: {
        username: { type: String, required: true, unique: true },
        roles: [{ type: String, ref: 'Role' }],
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        version: { type: Number, required: true, default: 1 }
    },
    relationships: []
}, {
    _id: false,
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password') && this.attributes) { // The attributes field won't be null, but this way VSCode won't complain ヽ(｀Д´)ﾉ
        this.attributes.password = await bcrypt.hash(this.attributes.password, 10);
    }
    next();
});

export default model('User', UserSchema, 'user');