import { get, post } from '../request/service'
import type { API } from 'types/api'

const api: API = {
  login: (params) => post(`/api/user/login`, params),
  register: (params) => post(`/api/user/register`, params),
  // 获取图形验证码
  getCaptcha: (params) => get(`/api/user/captcha`, params),
}
