<template>
    <div class="manga-list">
        <div v-if="error" class="error">{{ error.message }}</div>
        <div v-else-if="isLoading" class="loading">Loading...</div>
        <div v-else class="manga-grid">
            <div v-for="manga in mangaList" :key="manga.id" class="manga-item">
                <NuxtLink :to="`/title/${manga.id}`">
                    <img :src="manga.coverURL" alt="Manga Cover" class="manga-cover" />
                </NuxtLink>
                <h3 class="manga-title">{{ manga.title }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFetch } from '#app';

const { data, error, isLoading } = await useFetch('https://reader-api.tr25.es/manga'); // Fetch manga list from API

const mangaList = data.value || []; // Initialize manga list as empty array if data is not available
</script>

<style scoped>
.manga-list {
    padding: 20px;
}

.manga-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.manga-item {
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
}

.manga-item:hover {
    transform: scale(1.05);
}

.manga-cover {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 10px;
    border-radius: 4px;
}

.manga-title {
    font-size: 16px;
    color: #333;
    text-align: center;
}
</style>