<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="isLoading" class="loading">Loading...</div>
    <div v-else class="manga-details">
        <p>{{ data }}</p>
        <h1>{{ data.attributes.title.en }}</h1>
        <h2>{{ data.attributes.altTitles[0]['ja'] }}</h2>

        <MangaCard />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from '#app';
import axios from 'axios';

const route = useRoute();
const data = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const res = await axios.get(`http://localhost:5001/api/manga/${route.params.id}`); // Fetch manga details from API
        data.value = res.data.data;
    } catch (e) {
        error.value = e.message;
    } finally {
        isLoading.value = false;
        console.log('Component mounted');
    }
}); 
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