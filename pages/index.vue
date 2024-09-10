<template>
    <div class="homepage">
        <section class="featured">
            <h2>Featured Titles</h2>
            <noscript>Could not load Featured Titles: JavaScript code execution is disabled in your browser.</noscript>
            <UCarousel v-if="titles" ref="carouselRef" v-slot="{ item }" :items="titles" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden featured-carousel" indicators>
                <!-- Featured Titles Slide -->
                <div class="featured-slide" :style="{ backgroundImage: `url(${getCoverUrl(item)})` }">
                    <img :src="getCoverUrl(item)" alt="Manga Cover" class="manga-cover" />
                    <div class="manga-details">
                        <h3 class="manga-title">{{ item.attributes.title }}</h3>
                        <p class="manga-description">{{ item.attributes.description.en }}</p>
                        <p class="manga-author">
                            Author: {{ item.attributes.author || 'Unknown' }}
                        </p>
                        <div class="manga-tags">
                            <span v-for="(tag, index) in item.attributes.tags" :key="index" class="tag">
                                {{ tag.attributes.name.en }}
                            </span>
                        </div>
                    </div>
                </div>
            </UCarousel>
            <div v-else>
                <div class="featured-slide" style="background-image: url('https://placehold.co/1500x2133?text=No+Titles\nAvailable')">
                    <img src="https://placehold.co/1500x2133?text=No+Titles\nAvailable" alt="Manga Cover" class="manga-cover" />
                    <div class="manga-details">
                        <h3 class="manga-title">No Titles Available</h3>
                        <p class="manga-description">There are no titles available at the moment.</p>
                        <p class="manga-author">
                            Author: Unknown
                        </p>
                        <div class="manga-tags">
                            <span class="tag">No Tags</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="recent-updates">
            <h2>Recent Updates</h2>
            <noscript>Could not load Recent Updates: JavaScript code execution is disabled in your browser.</noscript>
            <ul class="updates-list">
                <li v-for="i in 10" :key="i">
                    <div class="update-item">
                        <img src="https://placehold.co/1500x2133?text=Example\nCover" alt="Title Cover" class="update-cover" />
                        <div class="update-info">
                            <h3 class="update-title">Example Title {{ i }}</h3>
                            <p class="update-chapter">Example Chapter {{ i }}</p>
                            <p class="update-time">Updated 1 hour ago</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const titles = ref([]);
const covers = ref([]);

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

const getCoverUrl = (item) => {
    if (!covers.value[item._id]) return 'https://placehold.co/1500x2133?text=Cover-Not-Available'; // Fallback image if cover is not loaded yet
    return covers.value[item._id].attributes.fileData || 'https://placehold.co/1500x2133?text=Cover-Not-Found'; // Fallback image if cover is not found
};
</script>

<style scoped>
/* Homepage */
.homepage {
    padding: 20px;
    background-color: #121212;
    color: #e0e0e0;
}

/* Featured Titles */
.featured h2,
.recent-updates h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ffffff;
}

.featured-carousel {
    margin-top: 20px;
}

.featured-slide {
    display: flex;
    align-items: center;
    padding: 40px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: overlay;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.manga-cover {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 8px;
    object-fit: cover;
    z-index: 1;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.manga-details {
    z-index: 2;
    color: #ffffff;
    max-width: 100%;
    max-height: 200px;
}

.manga-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.manga-description {
    font-size: 16px;
    color: #b0b0b0;
    margin-bottom: 10px;
}

.manga-author {
    font-size: 14px;
    color: #b0b0b0;
    margin-bottom: 10px;
}

.manga-tags {
    margin-top: 10px;
}

.tag {
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    margin-right: 5px;
}

/* Recent Updates */
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