import axios from 'axios';
import qs from 'querystring';
import base64 from 'react-native-base64';
import {SERVER_BASE_URL} from "./constants";

const login = (username, password) => {
    console.log('Logging in', username)
    const authHeader = `Basic ${base64.encode('customer:')}`;
    return axios.post(`${SERVER_BASE_URL}/oauth/token`, qs.stringify({
        grant_type: 'password',
        username,
        password
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader
        }
    });
}

const refreshTokens = (refreshToken) => {
    console.log('token refresh');
    const authHeader = `Basic ${base64.encode('customer:')}`;
    return axios.post(`${SERVER_BASE_URL}/oauth/token`, qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader
        }
    });
}

const createAccount = (data) => {
    console.log('create account');
    return axios.post(`${SERVER_BASE_URL}/api/v1/public/customer`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    });
}

export {login, refreshTokens, createAccount};
