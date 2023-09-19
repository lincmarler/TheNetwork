<template>
    <div v-if="profile" class="container">
        <section class="row text-align-center">
            <div class="col-6 g-3" v-for="add in adds" :key="add.title">
                <AddCard :add="add" />

            </div>
            <div class="col-12 cover-img">
                <!-- TODO throw in social media links.... make sure these are only displayed if they exist -->

                <img class="profile-pic" :src="profile.picture" alt="">
                {{ profile.name }}
            </div>
            <div class="col-4 text-center fs-1">
                {{ profile.bio }}
            </div>
            <div class="col-4 fs-1 text-center">
                <a :href="profile.github"> <i class="mdi mdi-github"></i></a>
            </div>
            <div class="col-4 text-center">
                <p class="fs-2">{{ profile.class }}</p>
                <p class="fs-2 text-warning" v-if="profile.graduated"><i class="mdi mdi-trophy"></i></p>
            </div>
        </section>
        <h3 class="mt-4">{{ profile.name }}'s Posts</h3>
        <section class="row text-center">
            <div v-if="account.id == profile.id" class="col-12">
                <PostForm />
            </div>
            <div>
                <ButtonSwitch />
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
import { addsService } from '../services/AddsService';

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
                await addsService.getAdds()
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
            adds: computed(() => AppState.adds),
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