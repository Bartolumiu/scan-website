<template>
    <div class="featured-slide" :style="{ backgroundImage: `url(${coverUrl})` }">
        <img :src="coverUrl" alt="Title Cover" class="title-cover" />
        <div class="title-details">
            <h3 class="title-title">{{ item.attributes.title }}</h3>
            <p class="title-description">{{ item.attributes.description.en }}</p>
            <p class="title-author">Author: {{ item.attributes.author || 'Unknown' }}</p>
            <div class="title-tags">
                <span v-for="(tag, index) in item.attributes.tags" :key="index" class="tag">{{ tag.attributes.name.en }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: Object,
    coverUrl: String
});
</script>

<style scoped>
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
    width: 100%;
}

.title-cover {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.title-details {
    z-index: 2;
    color: #ffffff;
    max-width: 100%;
    max-height: 200px;
}

.title-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.title-description {
    font-size: 16px;
    color: #b0b0b0;
    margin-bottom: 10px;
}

.title-author {
    font-size: 14px;
    color: #b0b0b0;
    margin-bottom: 10px;
}

.title-tags {
    margin-top: 10px;
}

.tag {
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    margin-right: 5px;
    white-space: nowrap;
}

@media (max-width: 1150px) {
    .title-details {
        max-height: none;
    }

    .title-title {
        font-size: 14px;
    }

    .title-description {
        font-size: 10px;
    }

    .title-author {
        font-size: 8px;
    }

    .title-tags {
        .tag {
            font-size: 8px;
            margin-bottom: 2px;
        }

        display: flex;
        flex-wrap: wrap;
    }
}
</style>