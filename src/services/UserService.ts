import HTTPService from "./HTTPService";

export default class UserService extends HTTPService {
    async login(credentials: {login: string, password: string}) {
        const {data} = await this.post('/login', credentials)

        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('token', data.token)
        
        const user = await this.get('/user')
        localStorage.setItem('userId', user.data._id)
        
        if(user.data.avatar){
            localStorage.setItem('avatar', user.data.avatar)
        }
    }

    async register(data: FormData) {
        return this.post('/register', data)
    }

    isAuthenticate() {
        return localStorage.getItem('token') !== null
    }

    async search(searchType: string){
        return this.get(`/search?filter=${searchType}`)
    }

    followOrUnfollow(userId: string){
        return this.put(`/follow?id=${userId}`)
    }

    getProfileData(userId: string | string[] | undefined) {
        return this.get(`/search?id=${userId}`)
    }

    getLoggedUserData() {
        return {
            id: localStorage.getItem('userId'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }
}