<template>
    <div class="sidebar">
        <div class="header">
            <img src="/logo.svg" alt="Logo" class="logo" />
        </div>
        <nav class="nav">
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/titles">Titles</NuxtLink></li>
                <li><NuxtLink to="/follows">Follows</NuxtLink></li>
                <li><NuxtLink to="/updates">Updates</NuxtLink></li>
                <li><NuxtLink to="/community">Community</NuxtLink></li>
                <li><NuxtLink to="/forums">Forums</NuxtLink></li>
                <li><NuxtLink to="/groups">Groups</NuxtLink></li>
            </ul>
        </nav>
        <div class="footer">
            <ul>
                <li><NuxtLink to="/settings">Settings</NuxtLink></li>
                <li><NuxtLink to="/help">Help</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// Nothing to see here (for now)
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
    display: block;
    padding: 10px;
    border-radius: 5px;
}

.nav li a:hover {
    background-color: #333;
}

.footer {
    margin-top: auto;
}

.footer ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer li {
    margin-bottom: 15px;
}

.footer li a {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 16px;
    display: block;
    padding: 10px;
    border-radius: 5px;
}

.footer li a:hover {
    background-color: #333;
}
</style>