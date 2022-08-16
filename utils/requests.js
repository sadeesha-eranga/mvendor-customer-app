import axios from 'axios';
import qs from 'querystring';
import base64 from 'react-native-base64';
import { GOOGLE_MAPS_APIKEY, SERVER_BASE_URL } from "@env";

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

const updateNotificationToken = (data) => {
  console.log('updating notification token');
  return axios.patch(`${SERVER_BASE_URL}/api/v1/public/users/notification`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

const getDuration = (point1, point2) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${point1.latitude},${point1.longitude}&destinations=${point2.latitude},${point2.longitude}&units=metric&key=${GOOGLE_MAPS_APIKEY}`;

  return axios.get(url);
}

export { login, refreshTokens, createAccount, updateNotificationToken, getDuration };
