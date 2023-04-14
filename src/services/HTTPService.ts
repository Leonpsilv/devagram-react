import axios from 'axios';

export default class HTTPService {
    axios: any;
    constructor (){
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        })

        this.axios.interceptors.request.use((config: any) => {
            const token = localStorage.getItem('token')
            if(token) {
                config.headers.Authorization = 'Bearer ' + token
            }

            return config
        })
    }

    post(url: string, data: any){
        return this.axios.post(url, data)
    }

    get(url: string){
        return this.axios.get(url)
    }
}