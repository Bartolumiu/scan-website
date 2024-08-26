<template>
    <div v-if="error" class="error">{{ error.message }}</div>
    <div v-else-if="isLoading" class="loading">Loading...</div>
    <div v-else class="manga-details">
        <h1>{{ manga.title }}</h1>
        <img :src="manga.coverURL" alt="Manga Cover" class="manga-cover" />
        <p>{{ manga.description }}</p>
    </div>
</template>

<script setup>
import { useFetch, useRoute } from '#app';

const route = useRoute();
const { data, error, isLoading } = await useFetch(`https://reader-api.tr25.es/manga/${route.params.id}`); // Fetch manga details from API

const manga = data.value || {}; // Initialize manga as empty object if data is not available
</script>

<style scoped>
.manga-details {
    padding: 20px;
}

.manga-cover {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
}

.error {
    color: red;
}

.loading {
    font-size: 18px;
}
</style>