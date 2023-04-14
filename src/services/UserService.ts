import HTTPService from "./HTTPService";

export default class UserService extends HTTPService {
    async login(credentials: {login: string, password: string}) {
        const {data} = await this.post('/login', credentials)

        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('token', data.token)
        if(data.avatar){
            localStorage.setItem('avatar', data.avatar)
        }
    }

    async register(data: FormData) {
        return this.post('/register', data)
    }
}