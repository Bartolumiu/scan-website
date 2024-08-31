<template>
    <div v-if="error" class="error">
        <img src="/assets/ohno.webp" alt="Oh no!" />
        <h1>{{ error.title }}</h1>
        <p>{{ error.detail }}</p>
    </div>
    <div v-else-if="isLoading" class="loading">
        <USkeleton>
            <USkeleton width="100%" height="24px" />
            <USkeleton width="100%" height="16px" />
            <USkeleton width="100%" height="200px" />
        </USkeleton>
    </div>
    <div v-else class="cover-image">
        <img :src="cover.attributes.fileData" alt="Manga Cover" class="manga-cover" />
    </div>
</template>

<script setup>
import { useFetch, useRoute } from '#app';

const route = useRoute();
const cover = ref({});
const error = ref(null);
const isLoading = ref(true);

const { data } = await useFetch(`/api/cover/${route.params.id}`);
if (data.value.errors) {
    error.value = data.value.errors[0];
} else {
    cover.value = data.value.data;
}
</script>

<style scoped>
.cover-image {
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

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

p {
    font-size: 16px;
}
</style>