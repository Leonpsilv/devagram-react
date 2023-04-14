import axios from 'axios';

export default class HTTPService {
    axios: any;
    constructor (){
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        })
    }

    post(url: string, data: any){
        return this.axios.post(url, data)
    }
}