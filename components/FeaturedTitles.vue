<template>
    <section class="featured">
        <h2>Featured Titles</h2>
        <noscript>Could not load Featured Titles: JavaScript code execution is disabled in your browser.</noscript>
        <UCarousel v-if="titles.length > 0" ref="carouselRef" v-slot="{ item }" :items="titles" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden featured-carousel mb-6" indicators>
            <TitleSlide :item="item" :cover-url="getCoverUrl(item)" />
        </UCarousel>
        <div v-else class="rounded-lg overflow-hidden featured-carousel mb-6">
            <TitleSlide v-if="isLoading" :item="loadingItem" :cover-url="'https://placehold.co/1500x2133?text=Loading...'" />
            <TitleSlide v-else :item="defaultItem" :cover-url="'https://placehold.co/1500x2133?text=No+Titles+Available'" />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const titles = ref([]);
const covers = ref([]);
const carouselRef = ref();
const isLoading = ref(true);
const loadingItem = {
    _id: 'loading',
    attributes: {
        title: 'Loading...',
        description: { en: 'Fetching featured titles...' },
        author: 'Fetching data...',
        tags: [{ attributes: { name: { en: 'No Tags' } } }],
    }
}
const defaultItem = {
    _id: 'no-titles',
    attributes: {
        title: 'No Titles Available',
        description: { en: 'There are no titles in the database' },
        author: 'N/A',
        tags: [{ attributes: { name: { en: 'No Tags' } } }],
    }
};

onMounted(async () => {
    try {
        // Set the titles array with the default value to show while loading
        titles.value = [loadingItem];

        const titlesResponse = await fetch('/api/manga');
        const titlesData = await titlesResponse.json();
        titles.value = titlesData.data;

        for (const title of titlesData.data) {
            const coverResponse = await fetch(`/api/cover/${title.attributes.mainCover}`);
            const coverData = await coverResponse.json();
            covers.value[title._id] = coverData.data;
        }

        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

const getCoverUrl = (item) => {
    if (!item) return 'https://placehold.co/1500x2133?text=Cover+Not+Found';
    return covers.value[item._id]?.attributes.fileData || 'https://placehold.co/1500x2133?text=Cover+Not+Found';
}
</script>

<style scoped>
.featured h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ffffff;
}

.featured-carousel {
    margin-top: 20px;
    background-color: #121212;
    color: #e0e0e0;
}

.featured-slide {
    display: flex;
    align-items: center;
    padding: 40px;
    background-size: cover;
}
</style>