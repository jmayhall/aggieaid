import ApiService from "./api.service";
import APIPaths from "../constants/apipath.constants";
import StorageKeys from "../constants/storage.constants";
import Events from "../constants/events.constants";

export default class AuthService {

    static async login(email, password) {
        const reqPromise = ApiService.post(APIPaths.LOGIN, {
            email: email,
            password:  window.btoa(password)
        });

        reqPromise.then(r => {
            r.json().then(u => {
                localStorage.setItem(StorageKeys.USER, JSON.stringify(u));
                localStorage.setItem(StorageKeys.KNOWN_MACHINE, true);
                window.dispatchEvent( new Event(Events.AUTH_CHANGE));
            })
        });

        return reqPromise;
    }

    static logout() {
        localStorage.removeItem(StorageKeys.USER);
        window.dispatchEvent( new Event(Events.AUTH_CHANGE) );
    }

    static async register(name, email, password) {
        const req = ApiService.post(APIPaths.REGISTER, {
            name: name,
            email: email,
            password: window.btoa(password)
        });

        req.then(() => {
            localStorage.setItem(StorageKeys.KNOWN_MACHINE, true);
            window.dispatchEvent(new Event(Events.AUTH_CHANGE));
        });

        return req; 
        
    }

    static isAuthenticated() {
        return !!this.getCurrentUser();
    }

    static isKnownMachine() {
        return  !!localStorage.getItem(StorageKeys.KNOWN_MACHINE);
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem(StorageKeys.USER));
    }

}