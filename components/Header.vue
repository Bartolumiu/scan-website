<template>
    <header class="header">
        <div class="logo">
            <NuxtLink to="/">o(≧▽≦)o</NuxtLink>
        </div>
        <nav class="nav">
            <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            <NuxtLink to="/latest" class="nav-link">Latest</NuxtLink>
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>
        <div class="right flex">
            <div class="search-bar">
                <input type="text" placeholder="Search..." v-model="searchQuery" @keydown.enter="search" />
            </div>
            <UDropdown :items="dropdownOptions" :ui="{ item: { disabled: 'cursor-text' } }" :popper="{ placement: 'bottom-end'}">
                <UAvatar :src="auth.user.avatar||'/img/ohno.webp'" class="ml-5" />

                <template #dropdown="{ item }">
                    <div class="text-left">
                        <span class="truncate">{{ item.label }}</span>
                        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                    </div>
                </template>
            </UDropdown>
        </div>
    </header>
</template>

<script setup>
const auth = {
    user: {
        name: 'Test User',
        avatar: 'https://avatars.githubusercontent.com/u/1234567'
    }
}

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const search = () => {
    if (searchQuery.value) {
        router.push(`/search?q=${searchQuery.value}`)
    }
}

// User avatar dropdown options
const dropdownOptions = [
    [
        {
            label: `Hello, ${auth.user.name}`,
            disabled: true
        }
    ],
    [
        {
            label: 'Profile',
            icon: 'i-heroicons-user-circle'
        }
    ],
    [
        {
            label: 'Settings',
            icon: 'i-heroicons-cog-8-tooth'
        }
    ],
    [
        {
            label: 'Logout',
            icon: 'i-heroicons-arrow-left-on-rectangle'
        }
    ]
]
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