import APIPaths from "../constants/apipath.constants";
import StorageKeys from "../constants/storage.constants";

const makeAPICall = (path, method, body, extraHeaders) => {

    const userRaw = localStorage.getItem(StorageKeys.USER);
    const user = !!userRaw ? JSON.parse(userRaw) : {};
    const reqOptions = {method};
    const deafultHeaders = {};

    if(!!body) {
        reqOptions.body = body
    }

    if(!!user.token) {
        deafultHeaders.Authorization = `Bearer ${user.token}`
    }

    const headers = !!extraHeaders ? Object.assign(deafultHeaders, extraHeaders) : deafultHeaders;
    reqOptions.headers = headers; 

    return fetch(`${APIPaths.API_BASE}/${path}`, reqOptions);
}

export default class ApiService {

    static get(path) {
        return new Promise((resolve, reject) => {
            makeAPICall(path, 'GET')
                .then(r => {
                    resolve(r);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

    static postForm(path, body, headers) {
        return new Promise((resolve, reject) => {
            makeAPICall(path, 'POST', body, headers)
                .then(r => {
                    resolve(r);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

    static post(path, body, headers) {
        return new Promise((resolve, reject) => {
            makeAPICall(path, 'POST', JSON.stringify(body), {...headers, 'Content-Type': 'application/json'})
                .then(r => {
                    resolve(r);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

    static put(path, body) {
        return new Promise((resolve, reject) => {
            makeAPICall(path, 'PUT', JSON.stringify(body))
                .then(r => {
                    resolve(r);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }
    
    static delete(path) {
        return new Promise((resolve, reject) => {
            makeAPICall(path, 'DELETE')
                .then(r => {
                    resolve(r);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

}