import HTTPService from "./HTTPService";

export default class PostService extends HTTPService {
    async postsLoad(userId?: string){
        let url = '/feed'
        if(userId){
            url += `?id=${userId}`
        }
        return this.get(url)
    }
}