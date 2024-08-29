<template>
    <div class="manga-page">
        <div class="header-section">
            <img :src="coverImage" alt="Manga Cover" class="cover-image" />
            <div class="details">
                <h1>{{ manga.attributes.title }}</h1>
                <p>Status: {{ manga.attributes.status }}</p>
                <p>Demographic: {{ manga.attributes.publicationDemographic }}</p>
                <p>Content Rating: {{ manga.attributes.contentRating }}</p>
            </div>
        </div>

        <div class="description-section">
            <h2>Description</h2>
            <div v-for="(description, lang) in manga.attributes.description" :key="lang">
                <h3>{{ lang.toUpperCase() }}</h3>
                <p>{{ description }}</p>
            </div>
        </div>

        <div class="tags-section">
            <h2>Tags</h2>
            <div class="tags">
                <span v-for="tag in manga.attributes.tags" :key="tag.id" class="tag">
                    {{ tag.attributes.name }}
                </span>
            </div>
        </div>

        <div class="chapters-section">
            <h2>Chapters</h2>
            <ul>
                <li v-for="chapter in chapters" :key="chapter.id">
                    {{ chapter.attributes.title }} - {{ chapter.attributes.chapter }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useFetch } from '#app';

const route = useRoute(); // Get current route
const manga = ref({});

const { data, error, isLoading } = await useFetch(`/api/manga/${route.params.id}`); // Fetch manga details from API

if (data.value.errors) { // If there are errors, set error message 
    error.value = data.value.errors[0];
} else {
    manga.value = data.value.data;
}
</script>

<style scoped>
.manga-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.header-section {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

.cover-image {
    width: 150px;
    height: 225px;
    object-fit: cover;
    border-radius: 8px;
}

.details {
    flex: 1;
}

.description-section,
.tags-section,
.links-section,
.chapters-section {
    margin-top: 30px;
}

.tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tag {
    background-color: #eee;
    padding: 5px 10px;
    border-radius: 4px;
}

.chapters-section ul {
    list-style: none;
    padding: 0;
}

.chapters-section li {
    margin-bottom: 10px;
}
</style>