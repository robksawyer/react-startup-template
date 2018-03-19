import axios from 'axios';

// @see https://github.com/mzabriskie/axios/issues/876
// axios.defaults.withCredentials = false;

// axios.interceptors.request.use(config => {
//   config;
// }, error => {
//   Promise.reject(error);
// });
//
// axios.interceptors.response.use(response => {
//   response;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

export default axios;
