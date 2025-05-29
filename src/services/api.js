import axios from 'axios'
import { BASE_URL } from '../constants'

axios.defaults.baseURL = BASE_URL+'/api'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('access')
    const authorization = token ? `Token ${token}` : ''
    config.headers.Authorization = authorization
    return config
})

export default axios