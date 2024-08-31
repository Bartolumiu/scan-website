<template>
    <span class="tag" :style="{ backgroundColor: props.tag.color }">{{ tag.label }}</span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    tag: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.tag {
    border-radius: .25rem;
    display: inline-block;
    font-size: .625rem;
    font-weight: 700;
    line-height: 1.5em;
    margin-bottom: auto;
    margin-top: auto;
    padding: 0 .375rem;
    text-transform: uppercase;
}
</style>