import { LoadingHelper } from '@/helpers/LoadingHelper';
import axios, { Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default class HTTPService {
    axios: Axios;
    constructor (){
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        })

        this.axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
            LoadingHelper.show()
            const token = localStorage.getItem('token')
            if(token) {
                config.headers.Authorization = 'Bearer ' + token
            }
            
            return config
        })

        this.axios.interceptors.response.use((response) => {
            LoadingHelper.hidden()
            return response
        })
    }

    post(url: string, data: any){
        return this.axios.post(url, data)
    }

    put(url: string, data?: any){
        return this.axios.put(url, data)
    }

    get(url: string){
        return this.axios.get(url)
    }
}