<template>
    <div v-if="profile" class="container-fluid">
        <section class="row">
            <div class="col-12 cover-img">
                <img class="profile-pic" :src="profile.picture" alt="">
                {{ profile.name }}
            </div>
            <div class="col-6 text-center">
                {{ profile.bio }}
            </div>
        </section>
        <h3 class="mt-4">{{ profile.name }}'s Posts</h3>
        <section class="row text-center">
            <div v-if="account.id == profile.id" class="col-12">
                <PostForm />
            </div>
            <div>
                <Button />
            </div>
            <div v-for="post in posts" :key="post.id" class="col-12">

                <PostCard :post="post" />
            </div>
        </section>
    </div>
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
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
        };
    },
    components: { PostCard, PostForm }
};
</script>


<style lang="scss" scoped>
.cover-img {
    background-image: v-bind(coverImg);
    min-height: 50vh;
    background-position: center;
    background-size: cover;
}

.profile-pic {
    height: 150px;
    width: 150px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}
</style>