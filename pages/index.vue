<template>
    <div class="homepage">
        <FeaturedTitles />
        <RecentUpdates />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const titles = ref([ // Default value to show while loading
    {
        id: 'loading',
        type: 'manga',
        attributes: {
            title: 'Loading...',
            description: { en: 'Loading...' },
            author: 'Loading...',
            tags: [{ attributes: { name: { en: 'Loading...' } } }],
        },
        relationships: [
            {
                id: 'loading',
                type: 'author',
            }
        ]
    }
]);
const covers = ref([
    // Default value to show while loading
    {
        id: 'loading',
        type: 'cover',
        attributes: {
            fileData: 'https://placehold.co/1500x2133?text=Loading...',
        },
    },
]);

const carouselRef = ref();

onMounted(async () => {
    try {
        const titlesResponse = await fetch('/api/manga');
        const titlesData = await titlesResponse.json();
        titles.value = titlesData.data;

        for (const title of titlesData.data) {
            const coverResponse = await fetch(`/api/cover/${title.attributes.mainCover}`);
            const coverData = await coverResponse.json();
            covers.value[title._id] = coverData.data;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    setInterval(() => {
        if (!carouselRef.value) return;

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0);
        }

        carouselRef.value.next();
    }, 3000);
});
</script>

<style scoped>
/* Homepage */
.homepage {
    padding: 20px;
    background-color: #121212;
    color: #e0e0e0;
}
</style>