<template>
    <div class="layout">
        <Sidebar />
        <div class="content">
            <NuxtPage />
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
}

.content {
    margin-left: 250px; /* This should match the sidebar width (at least in theory) */
    padding: 20px;
    flex-grow: 1;
    background-color: #121212;
    color: #e0e0e0;
}
</style>