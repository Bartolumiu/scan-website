// server/api/manga/[id].ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    //const response = await fetch(`https://api.mangadex.org/manga/${id}`);
    const response = await fetch(`http://localhost:5001/api/manga/${id}`);
    const data = await response.json();

    return data;
})