// server/models/MangaStats.ts
import { Schema, model } from 'mongoose';

const MangaStatsSchema = new Schema({
    _id: { type: String, ref: 'Manga', required: true }, // ID of the manga this stats object is for
    comments: {
        total: { type: Number, default: 0 }
    },
    rating: {
        average: { type: Number, default: 0 },
        bayesian: { type: Number, default: 0 },
        distribution: {
            '1': { type: Number, default: 0 },
            '2': { type: Number, default: 0 },
            '3': { type: Number, default: 0 },
            '4': { type: Number, default: 0 },
            '5': { type: Number, default: 0 },
            '6': { type: Number, default: 0 },
            '7': { type: Number, default: 0 },
            '8': { type: Number, default: 0 },
            '9': { type: Number, default: 0 },
            '10': { type: Number, default: 0 }
        }
    },
    views: { type: Number, default: 0 },
    follows: { type: Number, default: 0 }
}, {
    versionKey: false
});

export default model('MangaStats', MangaStatsSchema, 'manga_stats');