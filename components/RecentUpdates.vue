<template>
    <section class="recent-updates">
        <h2>Recent Updates</h2>
        <noscript>Could not load Recent Updates: JavaScript code execution is disabled in your browser.</noscript>
        <ul class="updates-list">
            <li v-if="isLoading">
                <div class="update-item">
                    <img src="https://placehold.co/1500x2133?text=Loading..." alt="Title Cover" class="update-cover" />
                    <div class="update-info">
                        <h3 class="update-title">Loading...</h3>
                        <p class="update-chapter">Loading...</p>
                        <p class="update-time">Loading...</p>
                    </div>
                </div>
            </li>
            <li v-if="recentUpdates.length > 0" v-for="update in recentUpdates" :key="update.id">
                <div class="update-item">
                    <img :src="update.coverUrl" alt="Title Cover" class="update-cover" />
                    <div class="update-info">
                        <h3 class="update-title">{{ update.title }}</h3>
                        <p class="update-chapter">Chapter {{ update.chapter }}</p>
                        <p class="update-time">Updated {{ update.time }} ago</p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const recentUpdates = ref([]);
const loadingItem = {
    id: 'loading',
    title: 'Loading...',
    chapter: 'Loading...',
    time: 'Loading...',
    coverUrl: 'https://placehold.co/1500x2133?text=Loading...',
};
const defaultItem = {
    id: 'default',
    title: 'No recent updates found',
    chapter: 'N/A',
    time: 'N/A',
    coverUrl: 'https://placehold.co/1500x2133?text=No+Updates',
};

onMounted(async () => {
    try {
        const updatesResponse = await fetch('/api/chapter');
        const updatesData = await updatesResponse.json();

        // Fetch cover images for each update's title
        if (!updatesData.data || updatesData.data.length === 0) {
            recentUpdates.value = [defaultItem];
            isLoading.value = false;
            return;
        }

        const coverPromises = updatesData.data.map(async update => {
            const titleResponse = await fetch(`/api/manga/${update.relationships.manga}`);
            const titleData = await titleResponse.json();
            const coverResponse = await fetch(`/api/cover/${titleData.data.attributes.mainCover}`);
            const coverData = await coverResponse.json();
            return {
                id: update._id,
                title: titleData.data.attributes.title,
                chapter: update.attributes.chapter,
                time: update.attributes.time,
                coverUrl: coverData.data.attributes.fileData,
            };
        });

        recentUpdates.value = await Promise.all(coverPromises);
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching recent updates:', error);
    }
})
</script>

<style scoped>
.recent-updates h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ffffff;
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