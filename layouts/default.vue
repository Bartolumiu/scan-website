<template>
    <div :class="['layout', { 'collapsed-sidebar': isSidebarCollapsed }]">
        <Sidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebarState" />
        <div class="content">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarCollapsed = ref(true);
const toggleSidebarState = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
    transition: margin-left 0.3s ease;
}

.content {
    margin-left: 250px;
    padding: 20px;
    flex-grow: 1;
    background-color: #121212;
    color: #e0e0e0;
    transition: margin-left 0.3s ease;
    overflow: auto;
}

.collapsed-sidebar .content {
    margin-left: 60px;
}

@media (max-width: 768px) {
    .content {
        margin-left: 60px;
    }
}
</style>