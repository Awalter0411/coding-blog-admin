import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
})
request.interceptors.request.use(
  function (config) {
    // 携带token
    if (localStorage.getItem('token')) {
      config.headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.statusCode !== 200) {
      console.log(response.data)
    }
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    return Promise.reject(error)
  }
)

export default request
