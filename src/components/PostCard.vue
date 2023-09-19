<template>
    <div class="card p-3">
        <div class="row">
            <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }" @click.stop>
                <div class="col-12">
                    <p> <img class="profile-pic" :src="post.creator.picture" alt="post.creator.name"> {{ post.creator.name
                    }}
                    </p>
                    <p class="fs-2 text-end text-warning" v-if="post.creator.graduated"><i class="mdi mdi-trophy"></i></p>
                </div>
            </router-link>
            <div class="col-12">
                {{ post.body }}
            </div>
            <div class="col-12 p-2 pt-3">
                <img class="post-pic" :src="post.imgUrl" :alt="post.creator.name">
            </div>
        </div>
        <div class="col-12 fs-2">
            <div class="text-start">
                {{ post.createdAt }}
            </div>
            <div class="text-end">
                <div v-if="account.id == post.creatorId">
                    <button class="btn btn-danger" @click="deletePost">Delete Post</button>
                </div>
                <div v-if="account.id" @click="addLike()" class="btn fs-2">
                    <i class="mdi mdi-heart"></i> {{ post.likeIdCount }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { profileService } from '../services/ProfileService';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            newerUrl: computed(() => AppState.newerUrl),
            olderUrl: computed(() => AppState.olderUrl),

            async changePage(url) {
                try {
                    await postsService.changePage(url)
                } catch (error) {
                    Pop.error(error)
                }
            },


            async deletePost() {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this?')) {
                        const postId = props.post.id
                        await postsService.deletePost(postId)
                        Pop.success('Deleted Post!')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            },
            async addLike() {
                try {
                    const postId = props.post.id
                    await postsService.addLike(postId)
                    await postsService.getPosts()
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style lang="scss" scoped>
.profile-pic {
    height: 70px;
    width: 70px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}

.post-pic {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 1em;
}
</style>
