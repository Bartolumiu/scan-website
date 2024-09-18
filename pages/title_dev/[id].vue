<template>
    <div class="manga-page" v-if="title && coverImage">
        <div class="header-grid">
            <!-- Art Section -->
            <div class="art">
                <img :src="coverImage" alt="Title Cover" class="cover-image" />
            </div>

            <!-- Title Section -->
            <div class="title">
                <h1>{{ title.title || 'Title Unavailable' }}</h1>
            </div>

            <!-- Buttons Section -->
            <div class="buttons">
                <button class="btn">Add to Library</button>
                <button class="btn">Start Reading</button>
                <button class="btn">Report</button>
                <button class="btn">Upload Chapter</button>
                <button class="btn">Edit Title</button>
            </div>

            <!-- Info Section -->
            <div class="info">
                <p><strong>Tags:</strong> {{ title.tags ? title.tags.map(tag => tag.attributes.name.en).join(', ') : 'No tags' }}</p>
                <p><strong>Publishing Status:</strong> {{ title.status || 'Status Unavailable' }}</p>
            </div>

            <!-- Stats Section -->
            <div class="stats">
                <p><strong>Ratings:</strong> {{ title.ratings || 'No ratings' }}</p>
                <p><strong>Follow Count:</strong> {{ title.followCount || 'No follows' }}</p>
                <p><strong>Comments:</strong> {{ title.comments || 'No comments' }}</p>
                <p><strong>Views:</strong> {{ title.views || 'No views' }}</p>
            </div>

            <!-- Padding Section -->
            <div class="padding"></div>

            <!-- Synopsis Section -->
            <div class="synopsis">
                <h2>Description</h2>
                <p>{{ title.description?.en || 'No description available' }}</p>
            </div>

            <!-- Content Section -->
            <div class="content">
                <h2>Details</h2>
                <p><strong>Author:</strong> {{ title.author || 'Unknown' }}</p>
                <p><strong>Artist:</strong> {{ title.artist || 'Unknown' }}</p>
                <p><strong>Genres:</strong> {{ title.genres ? title.genres.join(', ') : 'No genres' }}</p>
                <p><strong>Themes:</strong> {{ title.themes ? title.themes.join(', ') : 'No themes' }}</p>
                <p><strong>Demographics:</strong> {{ title.demographics ? title.demographics.join(', ') : 'No demographics' }}</p>
                <p><strong>Read or Buy:</strong> <a :href="title.readOrBuyLink || '#'">Link</a></p>
                <p><strong>Track:</strong> <a :href="title.trackLink || '#'">Link</a></p>
                <p><strong>Alternative Titles:</strong> {{ title.alternativeTitles ? title.alternativeTitles.join(', ') : 'No alternative titles' }}</p>
            </div>
        </div>

        <!-- Chapters Section -->
        <div class="chapters-section" v-if="Object.keys(volumes).length">
            <h2>Chapters</h2>
            <div v-for="(volume, volumeKey) in volumes" :key="volumeKey" class="volume-group">
                <h3 v-if="volumeKey !== 'none'">Volume {{ volumeKey }}</h3>
                <h3 v-else>No Volume</h3>
                <ul>
                    <li v-for="chapter in volume.chapters" :key="chapter.id" class="chapter-item">
                        Ch. {{ chapter.chapter }} <span v-if="chapter.title">- {{ chapter.title }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from '#app';

const title = ref({
    title: '',
    tags: [],
    status: '',
    ratings: '',
    followCount: '',
    comments: '',
    views: '',
    description: {},
    author: '',
    artist: '',
    genres: [],
    themes: [],
    demographics: [],
    readOrBuyLink: '',
    trackLink: '',
    alternativeTitles: []
});
const volumes = ref({});
const coverImage = ref('');
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();

onMounted(async () => {
    try {
        // Fetch title data
        const titleResponse = await fetch(`/api/manga/${route.params.id}`);
        const titleData = await titleResponse.json();

        if (titleData.data && titleData.data.attributes) {
            title.value = titleData.data.attributes;
            const coverResponse = await fetch(`/api/cover/${title.value.mainCover}`);
            const coverData = await coverResponse.json();
            coverImage.value = coverData.data.attributes.fileData;
        }

        // Fetch chapters data
        const chaptersResponse = await fetch(`/api/manga/${route.params.id}/chapters`);
        const chaptersData = await chaptersResponse.json();

        // Group chapters by volume
        if (chaptersData.data && chaptersData.data.volumes) {
            volumes.value = chaptersData.data.volumes;
        }
    } catch (err) {
        error.value = err;
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped>
:root {
    --background-color: #f8f9fa;
    --text-color: #212529;
    --highlight-color: #007bff;
    --tag-bg-color: #e9ecef;
    --overlay-color: rgba(0, 0, 0, 0.6);
    --button-bg-color: #007bff;
    --button-hover-bg-color: #0056b3;
}

.manga-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.header-grid {
    display: grid;
    grid-template-areas: 
        "art title buttons"
        "art info stats"
        "art padding padding"
        "art synopsis synopsis"
        "art content content";
    grid-template-columns: 250px 1fr 200px;
    gap: 20px;
    margin-bottom: 40px;
}

.art {
    grid-area: art;
}

.cover-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.title {
    grid-area: title;
}

.buttons {
    grid-area: buttons;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn {
    background-color: var(--button-bg-color);
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: var(--button-hover-bg-color);
}

.info, .stats {
    grid-area: info;
}

.padding {
    grid-area: padding;
}

.synopsis {
    grid-area: synopsis;
    background-color: var(--tag-bg-color);
    padding: 15px;
    border-radius: 8px;
}

.content {
    grid-area: content;
}

h1 {
    font-size: 2rem;
    margin-bottom: 15px;
}

.info p, .stats p {
    background-color: var(--tag-bg-color);
    padding: 8px;
    border-radius: 5px;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tag {
    background-color: var(--highlight-color);
    color: #fff;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.875rem;
}

.chapter-item {
    background-color: #e9ecef;
    padding: 8px;
    margin-bottom: 6px;
    border-radius: 4px;
    font-size: 0.875rem;
}

.chapter-item:hover {
    background-color: #dee2e6;
    cursor: pointer;
}

@media (max-width: 40rem) {
    .header-grid {
        grid-template-areas: 
            "art title"
            "art stats"
            "info info"
            "buttons buttons"
            "synopsis synopsis"
            "content content";
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .cover-image {
        width: 100%;
    }

    .title h1 {
        font-size: 1.6rem;
    }

    .btn {
        padding: 8px;
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: 1.4rem;
    }
}
</style>