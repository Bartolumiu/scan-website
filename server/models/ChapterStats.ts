// server/models/ChapterStats.ts
import { Schema, model } from 'mongoose';

const ChapterStatsSchema = new Schema({
    _id: { type: String, ref: 'Chapter', required: true }, // ID of the chapter this stats object is for
    comments: {
        total: { type: Number, default: 0 }
    },
    views: { type: Number, default: 0 }
}, {
    versionKey: false
});

export default model('ChapterStats', ChapterStatsSchema, 'chapter_stats');