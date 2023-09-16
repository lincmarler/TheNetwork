<template>
    profile page
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { profileService } from '../services/ProfileService';
import { postsService } from '../services/PostsService';

export default {
    setup() {
        onMounted(() => {
            getPostByProfileId();
            getProfileById()
        });
        const route = useRoute();
        async function getPostByProfileId() {
            try {
                await postsService.getPostByProfileId(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getProfileById() {
            try {
                await profileService.getProfileById(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
        };
    },
    components: { PostCard, PostForm }
};
</script>


<style></style>