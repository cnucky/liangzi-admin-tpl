import axios from "axios"
import router from "@/router"
import { Message } from 'element-ui'
let api = axios.create({
    baseUrl: '',
    timeout: 5000,
    withCredentials: true
})

export let fetch = (method, url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            ...data
        }).then( response => {
            if(!!response){
                resolve(response.data);
            }
        }).catch( err => {
            reject(err);
        })
    })
}
