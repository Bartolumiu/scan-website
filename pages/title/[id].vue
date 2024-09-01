<template>
    <div class="manga-page" v-if="title && coverImage">
        <div class="header-section" :style="{ backgroundImage: `url(${coverImage})` }">
            <div class="overlay"></div>
            <div class="header-content">
                <img :src="coverImage" alt="Title Cover" class="cover-image" />
                <div class="details">
                    <h1 class="title">{{ title.title }}</h1>
                    <StatusTag :status="title.status" />
                    <p class="demographic">
                        <strong>Demographic:</strong> {{ title.publicationDemographic }}
                    </p>
                    <p class="rating">
                        <strong>Content Rating:</strong> {{ title.contentRating }}
                    </p>
                </div>
            </div>
        </div>

        <div class="description" v-if="title.description">
            <h2>Description</h2>
            <div v-if="title.description.en">
                <p>{{ title.description.en }}</p>
            </div>
        </div>

        <div class="tags-section" v-if="title.tags && title.tags.length">
            <h2>Tags</h2>
            <div class="tags">
                <span v-for="tag in title.tags" class="tag">
                    {{ tag.attributes.name.en }}
                </span>
            </div>
        </div>

        <div class="chapters-section">
            <h2>Chapters</h2>
            <ul>
                <li v-for="chapter in chapters" :key="chapter.id" class="chapter-item">
                    Ch. {{ chapter.chapter }} <span v-if="chapter.title">- {{ chapter.title }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from '#app';

const title = ref({});
const chapters = ref([]);
const coverImage = ref('');
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();

onMounted(async () => {
    try {
        const titleResponse = await fetch(`/api/manga/${route.params.id}`);
        const titleData = await titleResponse.json();

        if (titleData.data && titleData.data.attributes) {
            title.value = titleData.data.attributes;
            const coverResponse = await fetch(`/api/cover/${title.value.mainCover}`);
            const coverData = await coverResponse.json();
            coverImage.value = coverData.data.attributes.fileData;
        }

        // This part will throw an error because the API endpoint doesn't exist (yet)
        /* const chaptersResponse = await fetch(`/api/manga/${route.params.id}/feed`);
        const chaptersData = await chaptersResponse.json();
        chapters.value = chaptersData.data; */
    } catch (err) {
        error.value = err;
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped>
:root {
    --title-background: 25, 26, 28;
}

.manga-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.header-section {
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    overflow: hidden;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
}

.header-content {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 30px;
    position: relative;
    z-index: 1;
}

.cover-image {
    width: 180px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.details {
    flex: 1;
    color: #fff;
}

.title {
    font-size: 2.2rem;
    margin-bottom: 10px;
}

.status,
.demographic,
.rating {
    margin-bottom: 5px;
}

.description-section,
.tags-section,
.chapters-section {
    margin-top: 30px;
}

.tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tag {
    background-color: #0073e6;
    color: #fff;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 0.875rem;
}

.chapters-section ul {
    list-style: none;
    padding: 0;
}

.chapter-item {
    background-color: #f4f4f4;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 4px;
}
</style>