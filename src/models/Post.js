

export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl || ""
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.likeIdCount = data.likeIds.length
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
    }
}