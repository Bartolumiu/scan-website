<template>
    <div class="settings">
        <h1>Settings</h1>
        <div class="settings-content">
            <div class="settings-section">
                <h2>Account</h2>
                <div class="settings-item">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div class="settings-item">
                    <label for="email">Email: </label>
                    <input type="text" id="email" name="email" :value="emailValue" disabled>
                    <button @click="toggleEmail">{{ emailVisible ? 'Hide' : 'Show' }} Email</button>
                </div>
                <div class="settings-item">
                    <label for="password">Change Password: </label>
                    <NuxtLink to="/settings/changePassword"><button>Change Password</button></NuxtLink>
                </div>
            </div>
            <div class="settings-section">
                <h2>Preferences</h2>
                <div class="settings-item">
                    <label for="theme">Theme: </label>
                    <select id="theme" name="theme">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div class="settings-item">
                    <label for="language">Language: </label>
                    <select id="language" name="language">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Sample user (for testing)
const user = {
    id: '9aabc46c-df58-48ac-b534-8d429070055d',
    username: 'testuser',
    email: 'test@tr25.es',
    language: 'en'
}
import { ref } from 'vue';

const emailVisible = ref(false);
const emailValue = ref(user.email.split('@').map((part, index) => index === 1 ? part : '*'.repeat(part.length)).join('@'));

const toggleEmail = () => {
    emailVisible.value = !emailVisible.value;
    if (emailVisible.value === false) {
        // Replace everything before the @ symbol with asterisks
        emailVisible.value = false;
        emailValue.value = user.email.split('@').map((part, index) => index === 1 ? part : '*'.repeat(part.length)).join('@');
    } else {
        // Show the full email
        emailVisible.value = true;
        emailValue.value = user.email;
    }
};
</script>

<style scoped>
.settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}
</style>