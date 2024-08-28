// server/middleware/mongo.ts
import mongoose from 'mongoose';

export default defineEventHandler(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI as string);
    }
});