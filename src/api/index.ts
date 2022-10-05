import type { AxiosPromise } from 'axios'
import { myAxios as axios } from './myAxios'

interface ApiBase {
  baseUrl: string,
  login: string
}

const base:ApiBase = {
  baseUrl: '/api',
  login: '/staff/login',
}

interface ApiObject {
  login:(data:Record<string,unknown>)=>AxiosPromise,
}

const api: ApiObject = {
  login (data) {
    return axios.post(base.baseUrl + base.login, data)
  }
}

export default api
