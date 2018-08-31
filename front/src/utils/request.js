import axios from 'axios';
import store from '../pages/index/store';
import router from '../pages/index/router';
import utils from './index';

// http request 拦截器
/*axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
);*/

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                case 403:
                    // 401 清除token信息并跳转到登录页面
                    localStorage.removeItem('_user');
                    store.commit("SET_PARAM", {user: ''});
                    // 只有在当前路由不是登录页面才跳转
                    utils.toLogin();
            }
        }
        return Promise.reject(error.response.data)
    }
);

export default (url, options={}) => {

    let commonOptions = {
        baseURL: '',
        timeout: 5000,
        withCredentials: true
    };
    let commonHeaders = {
        'Content-Type': 'application/json'
    };
    options = {...commonOptions, ...options};
    options.headers = {
        ...commonHeaders,
        ...(options.headers || {})
    };

    return axios(url, options)
        .then( response => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            const error = new Error(response.statusText);
            error.msg = {
                data: response.data,
                status: response.status,
                statusText: response.statusText
            };
            throw error;
        })
        .then( response => {
            return response;
        })
        .then( ({data}) => (data) )
        .catch( ({msg}) => (msg) );
}