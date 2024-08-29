<template>
    <div>
        <Header />
        <div class="main-content">
            <slot />
        </div>
    </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
</script>

<style>
.main-content {
    padding: 20px;
    background-color: #f9f9f9;
}
</style>