<template>
    <div class="card">
        <img v-if="coverImageUrl" :src="coverImageUrl" :alt="title.attributes.title" class="w-full h-48 object-cover rounded-t-md" />
        <div class="p-4">
            <h3 class="text-lg font-bold mb-1">{{ title.attributes.title }}</h3>
            <p class="text-gray-400">{{ title.attributes.status }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
    title: {
        type: Object,
        required: true,
    },
});

console.log('Props:', props);

const coverImageUrl = ref(null);

onMounted(async () => {
    console.log('Title:', props.title);
    console.log('Attributes:', props.title.attributes);
    console.log('Main Cover:', props.title.attributes.mainCover);

    if (props.title.attributes.mainCover) {
        try {
            const response = await fetch(`/api/cover/${props.title.attributes.mainCover}`);
            if (!response.ok) {
                throw new Error('HTTP Error:', response.status);
            }
            const data = await response.json();

            console.log('Cover Data:', data);
            coverImageUrl.value = data.data.attributes.fileData || 'https://placehold.co/1500x2133?text=No+Cover+Found';
        } catch (error) {
            console.error('Error fetching cover image:', error);
            coverImageUrl.value = 'https://placehold.co/1500x2133?text=Error+Fetching+Cover';
        }
    } else {
        coverImageUrl.value = 'https://placehold.co/1500x2133?text=No+Cover+Found';
    }
});
</script>

<style scoped>
.card {
    background-color: #1f1f1f;
    border: 1px solid #333;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}
</style>