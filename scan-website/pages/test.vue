<template>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>{{ data }}</div>

    <MangaCard />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const data = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
    console.log('Component mounted');
    try {
        const response = await axios.get('http://localhost:5001/api/manga/3ac7947b-1a88-4b3d-ac42-bea34a119ee0');
        data.value = response.data.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        isLoading.value = false;
    }
});
</script>