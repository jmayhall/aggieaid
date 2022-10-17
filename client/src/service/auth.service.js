import ApiService from "./api.service";
import APIPaths from "../constants/apipath.constants";
import StorageKeys from "../constants/storage.constants";

export default class AuthService {

    static async login(email, password) {
        const reqPromise = ApiService.post(APIPaths.LOGIN, {
            email: email,
            password:  window.btoa(password)
        });

        reqPromise.then(r => {
            r.json().then(u => {
                localStorage.setItem(StorageKeys.USER, JSON.stringify(u));
            })
        });

        return reqPromise;
    }

    static logout() {
        localStorage.removeItem(StorageKeys.USER)
    }

    static async register(name, email, password) {
        return ApiService.post(APIPaths.REGISTER, {
            name: name,
            email: email,
            password: window.btoa(password)
        });
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem(StorageKeys.USER));
    }

}