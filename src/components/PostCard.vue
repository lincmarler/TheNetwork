<template>
    <div class="col-8 card p-3">
        <div class="row">
            <div class="col-12">
                <p> <img class="profile-pic" :src="post.creator.picture" alt="post.creator.name"> {{ post.creator.name }}
                </p>
                <p class="fs-2 text-end text-warning" v-if="post.creator.graduated"><i class="mdi mdi-trophy"></i></p>
            </div>
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
                <i class="mdi mdi-heart"></i> {{ post.likeIdCount }}
            </div>

        </div>
    </div>
</template>

<script>
import { Post } from '../models/Post';

export default {
    props: { post: { type: Post, required: true } },
    setup() {
        return {};
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
