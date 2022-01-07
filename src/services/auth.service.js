import axios from 'axios';
import config from '../config'

const API_URL = config.REACT_APP_BASE_URL + 'auth/';

class AuthService {
    
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, fullname, username, password, roles) {
        return axios.post(API_URL + "signup", {
            email,
            fullname,
            username,
            password,
            roles: roles ? 'user' : 'admin'
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();