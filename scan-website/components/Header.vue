<template>
    <header class="header">
        <div class="logo">
            <NuxtLink to="/">Scan Website</NuxtLink>
        </div>
        <nav class="nav">
            <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            <NuxtLink to="/latest" class="nav-link">Latest</NuxtLink>
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>
        <div class="search-bar">
            <input type="text" placeholder="Search..." v-model="searchQuery" @keydown.enter="search" />
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const search = () => {
    if (searchQuery.value) {
        router.push(`/search?q=${searchQuery.value}`)
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
}

.logo a {
    color: white;
    text-decoration: none;
    font-size: 24px;
}

.nav {
    display: flex;
    gap: 20px;
}

.nav-link {
    color: white;
    text-decoration: none;
}

.search-bar input {
    padding: 5px;
    border-radius: 4px;
    border: none;
    outline: none;
}
</style>