<template>
    <section class="row m-3">
        <div class="col-4 text-center">
            <button @click="changePage(newerUrl)" :disabled="!newerUrl" class="btn btn-danger">Newer</button>
        </div>
        <div class="col-4 text-center">
            <button @click="changePage(olderUrl)" :disabled="!olderUrl" class="btn btn-danger">Older</button>
        </div>
        <div class="m-3" v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';

export default {
    setup() {
        return {
            post: computed(() => AppState.posts),
            newerUrl: computed(() => AppState.newerUrl),
            olderUrl: computed(() => AppState.olderUrl),

            async changePage(url) {
                try {
                    await postsService.changePage(url)
                } catch (error) {
                    Pop.error(error)
                }
            }

        };
    },
};
</script>


<style></style>