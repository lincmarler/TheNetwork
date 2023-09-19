import axios from "axios"
import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {

    async getPosts() {
        AppState.posts = []
        const res = await api.get('api/posts')
        logger.log('got posts', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        logger.log(AppState.posts)
        AppState.newerUrl = res.data.newer
        AppState.olderUrl = res.data.older
        logger.log(AppState.newerUrl, AppState.olderUrl)
    }



    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)
        return newPost
    }

    async addLike(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        // logger.log(res.data)

    }

    async changePage(url) {
        const res = await axios.get(url)
        AppState.posts = res.data.posts
        AppState.newerUrl = res.data.newer
        AppState.olderUrl = res.data.older
    }

    async deletePost(postId) {
        await api.delete(`/api/posts/${postId}`)
        let indexToRemove = AppState.posts.findIndex(post => post.id == postId)
        if (indexToRemove >= 0) {
            AppState.posts.splice(indexToRemove, 1)
        }
    }

    async getPostByProfileId(profileId) {
        AppState.posts = []
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        // TODO save some things here for pagination
        AppState.newerUrl = res.data.newer
        AppState.olderUrl = res.data.older
    }
}


export const postsService = new PostsService()