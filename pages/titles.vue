<template>
    <div class="min-h-screen">
        <header class="p-4 shadow-md">
            <div class="container mx-auto justify-between flex items-center">
                <h1 class="text-2xl font-semibold">Titles</h1>
                <input v-model="searchQuery" type="text" placeholder="Search titles..." class="input-field" />
            </div>
        </header>

        <main class="container mx-auto p-4">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols4 lg:grid-cols-5 gap-4">
                <TitleCard v-for="title in filteredTitles" :key="title._id" :title="title" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const titles = ref([]);

const filteredTitles = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return titles.value.filter(title => {
        const mainTitle = title.attributes.title.toLowerCase();
        const altTitles = title.attributes.altTitles || [];
        const altTitleValues = altTitles.map(altTitle => altTitle.value.toLowerCase());
        return mainTitle.includes(query) || altTitleValues.some(altTitle => altTitle.includes(query));
    });
});

onMounted(async () => {
    try {
        const response = await fetch('/api/manga');
        const data = await response.json();
        titles.value = data.data;
    } catch (error) {
        console.error('Error fetching titles:', error);
    }
});
</script>