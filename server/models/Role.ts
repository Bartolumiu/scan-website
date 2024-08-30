// server/models/Role.ts
import { Schema, model } from 'mongoose';
import uuid4 from 'uuid4';

const permission_nodes = [
    'CREATE_TITLE', // Can create titles
    'CREATE_CHAPTER', // Can create chapters
    'CREATE_COVER', // Can create cover arts
    'CREATE_AUTHOR', // Can create authors and artists
    'CREATE_GROUP', // Can create groups
    'MANAGE_USERS', // Can manage users
    'MANAGE_ROLES', // Can manage roles
    'MANAGE_GROUPS', // Can manage groups
    'MANAGE_TITLES', // Can manage titles
    'MANAGE_CHAPTERS', // Can manage chapters
    'MANAGE_COVERS', // Can manage cover arts
    'MANAGE_AUTHORS', // Can manage authors and artists
    'POST_COMMENTS', // Can post comments on titles and chapters
    'ADMINISTRATOR' // This is a special permission node that grants all permissions
]

const RoleSchema = new Schema({
    _id: { type: String, default: uuid4 },
    type: { type: String, enum: ['role'], default: 'role' },
    attributes: {
        name: { type: String, required: true, unique: true },
        description: { type: String, default: null },
        permissions: { type: [String], enum: permission_nodes, default: [] },
    }
}, {
    _id: false,
    versionKey: false,
    timestamps: { createdAt: 'attributes.createdAt', updatedAt: 'attributes.updatedAt' }
});

export default model('Role', RoleSchema, 'roles');