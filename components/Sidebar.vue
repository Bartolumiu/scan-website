<template>
    <div :class="['sidebar', { collapsed: isCollapsed }]">
        <div class="header">
            <img src="/logo.svg" alt="Logo" class="logo" />
        </div>
        <nav class="nav">
            <ul>
                <li>
                    <NuxtLink to="/">
                        <UIcon name="i-heroicons-home-solid" class="icon" />
                        <span v-if="!isCollapsed">Home</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/titles">
                        <UIcon name="i-heroicons-book-open-solid" class="icon" />
                        <span v-if="!isCollapsed">Titles</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/follows">
                        <UIcon name="i-heroicons-star-solid" class="icon" />
                        <span v-if="!isCollapsed">Follows</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/updates">
                        <UIcon name="i-heroicons-bell-solid" class="icon" />
                        <span v-if="!isCollapsed">Updates</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/settings">
                        <UIcon name="i-heroicons-cog-solid" class="icon" />
                        <span v-if="!isCollapsed">Settings</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/help">
                        <UIcon name="i-heroicons-question-mark-circle-solid" class="icon" />
                        <span v-if="!isCollapsed">Help</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
        <div class="footer">
            <!-- Prevent layout break -->
        </div>
        <button @click="$emit('toggle')" class="toggle-button">
            ☰
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    }
});
</script>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #1f1f1f;
    color: #e0e0e0;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    transition: width 0.3s ease;
    overflow: hidden;
}

.sidebar.collapsed {
    width: 60px;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.logo {
    max-width: 100%;
    height: auto;
}

.nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.nav li {
    margin-bottom: 15px;
}

.nav li a {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.nav li a:hover {
    background-color: #333;
}

.nav li .icon {
    margin-right: 10px;
    font-size: 20px;
    min-width: 20px;
    text-align: center;
}

.sidebar.collapsed .nav li .icon {
    margin-right: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}

.sidebar.collapsed .nav li a {
    justify-content: center;
}

.footer {
    margin-top: auto;
}

.toggle-button {
    background: none;
    border: none;
    color: #e0e0e0;
    font-size: 24px;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    left: 20px;
    transition: left 0.3s ease;
}

.sidebar.collapsed .toggle-button {
    left: 0px;
}

@media (max-width: 768px) {
    .sidebar {
        width: 60px;
    }

    .collapsed .nav li a {
        font-size: 0;
        padding: 0;
    }

    .collapsed .logo {
        display: none;
    }
}
</style>