<template>
    <div class="manga-card">
        <p>{{ manga }}</p>
        <h1>{{ manga.attributes.title }}</h1>
    </div>
</template>

<script setup>
import { useRoute, useFetch } from '#app';

const route = useRoute();
const manga = ref(null);

const { data, error, isLoading } = await useFetch(`/api/manga/${route.params.id}`);

manga.value = data.value.data || {};
</script>

<style scoped>
.manga-card {
    padding: 20px;
}
</style>