// server/models/Site.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const SiteSchema = new Schema({
    _id: { type: String, default: uuid4 }, // Site ID
    title: { type: String, required: true },
    url: { type: String, required: true },
    user_roles: { type: [String] },
    languages: { type: [String] },
});

//export default model('Site', SiteSchema, 'site');
// Unfinished, will export when finished