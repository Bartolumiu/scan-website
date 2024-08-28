<template>
    <div v-if="error" class="error">
        <img src="/img/ohno.webp" alt="Oh no!" />
        <h1>{{ error.title }}</h1>
        <p>{{ error.detail }}</p>
    </div>
    <div v-else-if="isLoading" class="loading">Loading...</div>
    <div v-else class="manga-details">
        <p>{{ manga }}</p>
        <h1>{{ manga.attributes.title.en }}</h1>
        <h2>{{ manga.attributes.altTitles[0]['ja'] }}</h2>

        <MangaCard :id="$route.params.id"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const manga = ref(null);

import { useRoute, useFetch } from '#app';
import MangaCard from '~/components/MangaCard.vue';
const route = useRoute(); // Get current route

const { data, error, isLoading } = await useFetch(`/api/manga/${route.params.id}`); // Fetch manga details from API

if (data.value.errors) { // If there are errors, set error message 
    error.value = data.value.errors[0];
} else {
    manga.value = data.value.data;
}
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