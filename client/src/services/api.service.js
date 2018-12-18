import TokenService from './storage.service'
import axios from 'axios'

const ApiService = {

    init( baseUrl ) {
        axios.defaults.baseURL = baseUrl
    },

    setHeader() {
        axios.defaults.headers.comon.Authorization = `Bearer ${ TokenService.getToken() }`
    },

    removeHeader() {
        axios.defaults.headers.comon = {}
    },

    get( url ) {
        return axios.get( url )
    },

    post( url, data ) {
        return axios.post( url, data )
    },

    put( url, data ) {
        return axios.put( url, data )
    },

    delete( url, data ) {
        return axios.delete( url, data )
    },

    customRequest( data ) {
        return axios( data )
    }

}

export default ApiService
