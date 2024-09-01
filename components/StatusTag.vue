<template>
    <div class="flex flex-wrap status mb-auto">
        <span class="tag lift dot">
            <svg data-v-9ba4cb7e="" data-v-6ebb56e1="" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 6.35 6.35" class="icon" :style="{ color: color }">
                <path fill="currentColor" d="M4.233 3.175a1.06 1.06 0 0 1-1.058 1.058 1.06 1.06 0 0 1-1.058-1.058 1.06 1.06 0 0 1 1.058-1.058 1.06 1.06 0 0 1 1.058 1.058" />
            </svg>
            <span>{{ capitalizeFirstLetter(props.status) }}</span>
        </span>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    status: {
        type: String,
        required: true,
    },
});

const color = ref('rgb(255, 255, 255)');
const statusColor = {
    'ongoing': '4, 208, 0',
    'completed': '0, 201, 245',
    'hiatus': '218, 117, 0',
    'cancelled': '255, 64, 64',
    '': '255, 255, 255', // Default to white if no status is provided
};

color.value = `rgb(${statusColor[props.status]})`;

function capitalizeFirstLetter(string) {
    // If the prop still hasn't loaded, return an empty string
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<style scoped>
.tag.dot {
    padding-left: .25rem;
}

.tag.lift {
    background-color: rgb(61, 61, 61);
}

.tag {
    align-items: center;
    border-radius: .25rem;
    display: inline-flex;
    font-size: .75rem;
    min-height: 1.75rem;
    padding: .3125rem .5rem;
    transition: all .1s ease-out;
    user-select: none;
}
</style>