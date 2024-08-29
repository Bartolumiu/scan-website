<template>
    <div class="homepage">
        <section class="featured">
            <h2>Featured Titles</h2>
            <div class="featured-grid">
                <div class="manga-card" v-for="title in titleList" :key="title._id">
                    <img :src="coverList[title._id].data.attributes.fileData || 'https://placehold.co/1500x2133'" alt="Manga Cover" class="manga-cover">
                    <h3>{{ title.attributes.title }}</h3>
                </div>
            </div>
        </section>

        <section class="recent-updates">
            <h2>Recent Updates</h2>
            <ul class="updates-list">
                <li v-for="i in 10" :key="i">
                    <div class="update-item">
                        <img src="https://placehold.co/1500x2133" alt="Manga Cover" class="update-cover" />
                        <div class="update-info">
                            <h3 class="update-title">Title {{ i }}</h3>
                            <p class="update-chapter">Chapter {{ i }}</p>
                            <p class="update-time">Updated 1 hour ago</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
import { useFetch } from '#app';
const titleList = ref([]);
const coverList = ref([]);

const { data, isLoading } = await useFetch('/api/manga'); // Fetch manga list from API

// errors is an array of error messages
// If there are no errors, it will be an empty array
// If there are errors, it will contain error messages
// Structure: { errors: [ id: 'error_id', status: status_code, title: 'error_title', detail: 'error_detail' ] }
// Simulate an error by setting errors to an array with an error object
data.value.errors = [{ id: 'error_id', status: 500, title: 'Internal Server Error', detail: 'An error occurred while fetching the manga list' }];

if (data.value.errors) { // If there are errors, set error message
    // Send an empty array
    titleList.value = [];
} else {
    titleList.value = data.value.data;
}

for (const manga of titleList.value) { // Fetch cover for each manga
    const { data } = await useFetch(`/api/cover/${manga.attributes.mainCover}`);

    if (data.value.errors) {
        // If there are errors, set the cover to a default image (will create a 404 image later)
        coverList.value[manga._id] = { data: { attributes: { fileData: '/img/ohno.webp' } } };
    } else {
        coverList.value[manga._id] = data;
    }
}
</script>

<style scoped>
.homepage {
    padding: 20px;
    background-color: #121212;
    color: #e0e0e0;
}

.featured,
.recent-updates {
    margin-bottom: 40px;
}

.featured h2,
.recent-updates h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ffffff;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
}

.manga-card {
    background-color: #1f1f1f;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    padding: 10px;
}

.manga-cover {
    width: 100%;
    height: auto;
    border-radius: 4px;
}

.manga-title {
    margin-top: 10px;
    font-size: 18px;
    color: #e0e0e0;
}

.recent-updates .updates-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.update-item {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #1f1f1f;
    border-radius: 8px;
    margin-bottom: 10px;
}

.update-cover {
    width: 50px;
    height: 70px;
    margin-right: 20px;
    border-radius: 4px;
}

.update-info {
    flex-grow: 1;
}

.update-title {
    font-size: 16px;
    color: #ffffff;
}

.update-chapter,
.update-time {
    font-size: 14px;
    color: #b0b0b0;
}
</style>