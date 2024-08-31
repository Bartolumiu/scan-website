<template>
    <div class="card">
        <a class="font-bold title" style="grid-area: title" :href="'/title/' + title._id">
            <img class="inline-block select-none mr-1" title="Original Language" :src="'/img/flags/'+title.attributes.originalLanguage+'.svg'" :alt="title.attributes.originalLanguage+' flag icon'" height="24" />
            <span>{{ title.attributes.title }}</span>
        </a>
        <div class="manga-card-cover" style="grid-area: cover;">
            <a class="select-none" :href="'/title/' + title._id">
                <img v-if="coverImageUrl" :src="coverImageUrl" :alt="title.attributes.title" class="rounded shadow-md w-full h-auto" />
            </a>
        </div>
        <StatusTag style="grid-area: status" :status="title.attributes.status" />
        <div class="flex flex-wrap gap-1 tags-row overflow-y-hidden tags self-start" style="max-height: calc(1em + 0rem);">
            <Tag v-for="tag in orderedTags" :key="tag" :tag="tag" />
        </div>
        <div class="stats" style="grid-area: stats;">
            <div class="stat">
                <svg data-v-9ba4cb7e="" data-v-898463ba="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-star icon rel" viewBox="0 0 24 24" style="color: currentcolor;"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"></path></svg>
                <span>{{ titleStats.rating.toFixed(2) }}</span>
            </div>
            <div class="stat">
                <svg data-v-9ba4cb7e="" data-v-898463ba="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon small text-icon-contrast text-undefined"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                <span>{{ titleStats.follows }}</span>
            </div>
            <div class="stat">
                <svg data-v-9ba4cb7e="" data-v-898463ba="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-eye icon small text-icon-contrast text-undefined" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span>{{ titleStats.views }}</span>
            </div>
            <a class="text-sm comment-container" :title="`View ${titleStats.comments.total} comments`" :href="'/title/'+title._id+'/comments'">
                <svg data-v-9ba4cb7e="" data-v-89359c03="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon small text-icon-contrast text-undefined"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <span>{{ titleStats.comments.total }}</span>
            </a>
        </div>
        <div class="description !py-0" style="grid-area: description;">
            <div class="md-md-container dense">
                <p v-for="paragraph in descParagraphs">
                    {{ paragraph }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
    title: {
        type: Object,
        required: true,
    },
});

const coverImageUrl = ref(null);
const orderedTags = ref([]);
const titleStats = ref({ rating: 0, follows: 0, views: 0, comments: 0 });
const descParagraphs = ref([]);

onMounted(async () => {
    // Cover Image
    if (props.title.attributes.mainCover) {
        try {
            const response = await fetch(`/api/cover/${props.title.attributes.mainCover}`);
            if (!response.ok) {
                throw new Error('HTTP Error:', response.status);
            }
            const data = await response.json();

            coverImageUrl.value = data.data.attributes.fileData || 'https://placehold.co/1500x2133?text=No+Cover+Found';
        } catch (error) {
            console.error('Error fetching cover image:', error);
            coverImageUrl.value = 'https://placehold.co/1500x2133?text=Error+Fetching+Cover';
        }
    } else {
        coverImageUrl.value = 'https://placehold.co/1500x2133?text=No+Cover+Found';
    }

    // Tags
    switch (props.title.attributes.contentRating) {
        case 'suggestive':
            orderedTags.value.push({ id: 'rating', color: 'rgb(218, 117, 0)', label: props.title.attributes.contentRating });
            break;
        case 'erotica':
            orderedTags.value.push({ id: 'rating', color: 'rgb(255, 64, 64)', label: props.title.attributes.contentRating });
            break
        case 'pornographic':
            orderedTags.value.push({ id: 'rating', color: 'rgb(255, 64, 64)', label: props.title.attributes.contentRating });
            break;
        default:
            break; // Do nothing (no need to add a tag for safe content)
    }

    const tagTypes = {
        content: [],
        genre: [],
        theme: [],
        demographic: [],
    };

    if (props.title.attributes.tags) {
        // Add to the orderedTags array in the following order: Content Warnings, Genre, Themes, Demographic
        // This is to ensure that the tags are displayed in the correct order
        for (const tag of props.title.attributes.tags) {
            switch (tag.attributes.group) {
                case 'content':
                    tagTypes.content.push({ id: tag._id, color: 'rgb(255, 64, 64)', label: tag.attributes.name.en });
                    break;
                case 'genre':
                    tagTypes.genre.push({ id: tag._id, color: 'rgb(44, 44, 44)', label: tag.attributes.name.en });
                    break;
                case 'theme':
                    tagTypes.theme.push({ id: tag._id, color: 'rgb(44, 44, 44)', label: tag.attributes.name.en });
                    break;
                case 'demographic':
                    tagTypes.demographic.push({ id: tag._id, color: 'rgb(44, 44, 44)', label: tag.attributes.name.en });
                    break;
                default:
                    break;
            }
        }
    }

    orderedTags.value.push(...tagTypes.content, ...tagTypes.genre, ...tagTypes.theme, ...tagTypes.demographic); // Add all tags to the orderedTags array

    // Stats
    const stats = await (await fetch(`/api/stats/manga/${props.title._id}`)).json();

    titleStats.value = {
        rating: stats.statistics.rating.bayesian,
        follows: stats.statistics.follows,
        views: stats.statistics.views,
        comments: stats.statistics.comments
    }

    // Description
    const description = props.title.attributes.description.en;
    // Divide the description into paragraphs
    descParagraphs.value = description.split('\n').map((paragraph) => paragraph.trim()).filter((paragraph) => paragraph.length > 0);

    // Add a listener to the "MORE" button in the tags row to toggle the overflow-y style and set the max-height to unset
    const tagsRow = document.querySelector('.tags-row');
    tagsRow.addEventListener('click', () => {
        tagsRow.classList.toggle('overflow-y-hidden');
        tagsRow.style.maxHeight = tagsRow.style.maxHeight === 'calc(1em + 0rem)' ? 'unset' : 'calc(1em + 0rem)';
    });
});
</script>

<style scoped>
.card {
    background-color: #1f1f1f;
    display: grid;
    gap: .25rem .5rem;
    grid-template-areas:
        "cover title title"
        "cover stats status"
        "cover tags tags"
        "cover description description";
    grid-template-columns: min(25%, 150px) 1fr auto;
    grid-template-rows: auto auto auto 1fr;
    padding: .5rem;
    position: relative;
    width: 100%;
    border-radius: .25rem;
    overflow: hidden;
}

a {
    color: inherit;
    text-decoration: inherit;
}

.title > :first-child {
    margin-bottom: -4px;
    margin-top: -4px;
}

/* Tags */
.tags {
    grid-area: tags;
}

.tags-row.overflow-y-hidden {
    cursor: default;
    user-select: none;
    padding-right: 2.5rem;
    position: relative;
}

.tags-row.overflow-y-hidden::after {
    bottom: 0;
    color: rgb(255, 103, 64);
    content: 'MORE';
    display: block;
    font-size: .75rem;
    font-weight: 700;
    line-height: 1rem;
    position: absolute;
    right: .125rem;
    cursor: pointer;
}

/* Statistics */
.stats {
    align-items: center;
    display: grid;
    gap: .25rem;
    grid-auto-flow: row;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.stat {
    align-items: center;
    display: flex;
    font-size: .875rem;
    gap: .25rem;
    line-height: 1.25rem;
}

.icon {
    align-items: center;
    display: inline-flex;
    flex-shrink: 0;
    justify-content: center;
    line-height: 1;
    text-indent: 0;
    transition: color .3s cubic-bezier(.25, .8, .5, .1);
    user-select: none;
}

.comment-container {
    align-items: center;
    border-radius: .25rem;
    cursor: pointer;
    display: flex;
    gap: .25rem;
    white-space: nowrap;
}

/* Description */
.description {
    height: 8.4em;
    overflow: hidden;
    position: relative;
}

.description::after {
    background: linear-gradient(rgb(25, 26, 28)/0, rgb(44, 44, 44));
    bottom: 0;
    content: '';
    display: block;
    height: .9em;
    left: 0;
    position: absolute;
    width: 100%;
}

.md-md-container.dense {
    font-size: .875rem;
    line-height: 1.25rem;
}

.md-md-container {
    all: revert;
}

.md-md-container > :first-child {
    margin-top: 0;
}
</style>