// server/models/Group.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const GroupSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['scanlation_group'], default: 'scanlation_group' },
    attributes: {
        name: { type: String, required: true },
        altNames: { type: [String], default: [] },
        description: { type: String, default: null },
        locked: { type: Boolean, default: false },
        website: { type: String, default: null },
        discord: { type: String, default: null },
        ircServer: { type: String, default: null },
        ircChannel: { type: String, default: null },
        email: { type: String, default: null },
        twitter: { type: String, default: null },
        mangaUpdates: { type: String, default: null },
        focusedLanguages: { type: [String], default: [] },
        official: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
        inactive: { type: Boolean, default: false },
        publishDelay: { type: String, default: null },
        exLicensed: { type: Boolean, default: false },
        version: { type: Number, default: 1, required: true  }
    },
    relationships: [{
        id: { type: Schema.Types.String, ref: 'User', required: true },
        type: { type: String, enum: ['leader', 'member'], required: true },
    }]
}, {
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

export default model('Group', GroupSchema, 'scanlation_group');