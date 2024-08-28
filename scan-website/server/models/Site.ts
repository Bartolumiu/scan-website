// server/models/Site.ts
import { Schema, model } from 'mongoose';

const SiteSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    url: { type: String, required: true },
    user_roles: { type: [String] },
    languages: { type: [String] },
})