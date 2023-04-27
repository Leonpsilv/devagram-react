import HTTPService from "./HTTPService";

export default class PostService extends HTTPService {
    async postsLoad(userId?: string){
        let url = '/feed'
        if(userId){
            url += `?id=${userId}`
        }
        return this.get(url)
    }

    async commentPost(comment: {comment: string}, postId: string){
        return this.put(`/comment?id=${postId}`, comment)
    }
    
    async likeOrUnlikePost(postId: string){
        return this.put(`/like?id=${postId}`)
    }
}