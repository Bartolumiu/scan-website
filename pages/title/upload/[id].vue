<template>
    <div class="upload-page">
        <h1>Upload Chapter for {{ title.title }}</h1>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="language">Language</label>
                <input type="text" v-model="chapterData.translatedLanguage" id="language" placeholder="Scanlation Language" required />
            </div>
            <div class="form-group">
                <label for="volume">Volume Number</label>
                <input type="number" v-model="chapterData.volume" id="volume" placeholder="Volume Number" />
            </div>

            <div class="form-group">
                <label for="chapter">Chapter</label>
                <input type="number" v-model="chapterData.chapter" id="chapter" placeholder="Chapter number" required />
            </div>

            <div class="form-group">
                <label for="title">Chapter Title</label>
                <input type="text" v-model="chapterData.title" id="title" placeholder="Chapter Title" />
            </div>

            <div class="form-group">
                <label for="group">Scanlation Group</label>
                <input type="text" v-model="chapterData.group" id="group" placeholder="Scanlation Group" />
            </div>

            <div class="form-group">
                <label for="file">Pages</label>
                <input type="file" @change="handleFileChange" id="files" multiple accept="image/*" required />
            </div>

            <div class="form-group">
                <button type="submit" :disabled="isSubmitting">Upload Chapter</button>
            </div>

            <div v-if="error" class="error">
                <p>{{ error }}</p>
            </div>

            <div v-if="isSubmitting" class="loading">
                <p>Uploading...</p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from '#app';

const chapterData = ref({
    translatedLanguage: '',
    volume: null,
    chapter: '',
    title: '',
    group: '',
    files: [],
});

const title = ref({});
const isSubmitting = ref(false);
const error = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    try {
        // Fetch title data
        const titleResponse = await fetch(`/api/manga/${route.params.id}`);
        const titleData = await titleResponse.json();
        
        if (titleData.data && titleData.data.attributes) {
            title.value = titleData.data.attributes;
            const coverResponse = await fetch(`/api/cover/${title.value.mainCover}`);
            const coverData = await coverResponse.json();
            coverImage.value = coverData.data.attributes.fileData;
        }
    } catch (e) {
        error.value = "Failed to load title data";
    } finally {
        isLoading.value = false;
    }
});

const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    chapterData.value.files = selectedFiles;
};

const handleSubmit = async () => {
    if (chapterData.value.files.length === 0) {
        error.value = "Please select files to upload";
        return;
    }

    isSubmitting.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('translatedLanguage', chapterData.value.translatedLanguage);
    formData.append('volume', chapterData.value.volume || '');
    formData.append('chapter', chapterData.value.chapter);
    formData.append('title', chapterData.value.title);
    formData.append('group', chapterData.value.group || '');

    // Append files
    chapterData.value.files.forEach((file, index) => {
        formData.append('files', file);
    });

    try {
        const response = await fetch(`/api/manga/${route.params.id}/chapters/upload`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.result === 'ok') {
            router.push(`/title/${route.params.id}`);
        } else {
            error.value = 'Failed to upload chapter: ' + result.errors[0].detail;
        }
    } catch (err) {
        error.value = 'Error uploading chapter: ' + err.message;
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.upload-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 15px;
    background-color: #0073e6;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:disabled {
    background-color: #ccc;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>