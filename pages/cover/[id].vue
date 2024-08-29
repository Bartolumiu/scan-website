<template>
    <div v-if="error" class="error">{{ error.message }}</div>
    <div v-else-if="isLoading" class="loading">Loading...</div>
    <div v-else class="cover-image">
        <img :src="cover.coverURL" alt="Manga Cover" class="manga-cover" />
    </div>
</template>

<script setup>
import { useFetch, useRoute } from '#app';

const route = useRoute();


// Fetch manga details from API
const { data, error, isLoading } = await useFetch(`http://localhost:5001/api/cover/${route.params.id}`);

const cover = data.attributes || {}; // Initialize cover as empty object if data is not available
</script>

<style scoped>
.cover-image {
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