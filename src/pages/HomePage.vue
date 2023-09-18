<template>
  <div class="container">
    <div v-if="account.id">
      <PostForm />
    </div>
    <section class="row">
      <Button />
      <div class="m-3" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </section>

    <!-- <section class="row m-3">
      <div class="col-4 text-center">
        <button @click="changePage(newerUrl)" :disabled="!newerUrl" class="btn btn-danger">Newer</button>
      </div>
      <div class="col-4 text-center">
        <button @click="changePage(olderUrl)" :disabled="!olderUrl" class="btn btn-danger">Older</button>
      </div>
      <div class="m-3" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </section> -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js'
import PostForm from '../components/PostForm.vue';
import { logger } from '../utils/Logger';
import { Account } from '../models/Account';


export default {
  setup() {
    onMounted(() => {
      getPosts();
    });
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      //   newerUrl: computed(() => AppState.newerUrl),
      //   olderUrl: computed(() => AppState.olderUrl),

      //   async changePage(url) {
      //     try {
      //       await postsService.changePage(url)
      //     } catch (error) {
      //       Pop.error(error)
      //     }
      //   }
    };


  },
  components: { PostForm }
}
</script>

<style scoped lang="scss"></style>
