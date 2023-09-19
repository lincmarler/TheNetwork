<template>
    <form @submit.prevent="createPost">
        <section class="row">
            <div class="col-12 mb-2">
                <label for="post-body">Post Description</label>
                <textarea v-model="postData.body" id="post-body" class="form-control" placeholder="Post Body" cols="20"
                    rows="10" required maxlength="500"></textarea>
            </div>
            <div class="col-12">
                <label for="post-imgUrl">Img Url</label>
                <input v-model="postData.imgUrl" type="url" id="post-imgUrl" class="form-control" placeholder="must be Url"
                    min="1" max="500">
                <img class="img-fluid mt-1 h-50" :src="postData.imgUrl" alt="">
                <div class="text-end">
                    <button class="btn btn-success" title="submit post data to databse">
                        Create Post
                    </button>
                </div>
            </div>
        </section>
    </form>
</template>

<script>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { AppState } from '../AppState';
export default {
    setup() {
        const postData = ref({})
        return {
            postData,
            account: computed(() => AppState.account),
            async createPost() {
                try {
                    await postsService.createPost(postData.value)
                    postData.value = {}
                    Pop.success('Posted Up')
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style></style>