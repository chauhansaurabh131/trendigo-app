import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {decode as atob} from 'base-64';

if (!global.atob) {
  global.atob = atob;
}

let isRefreshing = false;
let refreshPromise = null;

const api = axios.create({
  baseURL: 'https://mntrendigo.mntech.website/api/v1',
});

api.interceptors.request.use(
  async config => {
    try {
      console.log('\n==============================');
      console.log('INTERCEPTOR START');
      console.log('API URL =>', config.url);

      let token = await AsyncStorage.getItem('authToken');
      let refreshToken = await AsyncStorage.getItem('refreshToken');

      console.log('Access Token =>', token);
      console.log('Refresh Token =>', refreshToken);

      if (!token) {
        console.log('No Access Token Found');
        return config;
      }

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      console.log('Token Expiry =>', decoded.exp);
      console.log('Current Time =>', currentTime);

      // ACCESS TOKEN EXPIRED
      if (decoded.exp < currentTime && refreshToken) {
        console.log('ACCESS TOKEN EXPIRED');

        try {
          // Refresh already running
          if (isRefreshing) {
            console.log('Refresh already in progress...');
            console.log('Waiting for existing refresh request');

            const response = await refreshPromise;

            token = response.data?.data?.access?.token;

            console.log('Received Token From Existing Refresh');
            console.log('New Token =>', token);

            config.headers.Authorization = `Bearer ${token}`;

            return config;
          }

          // Start Refresh
          console.log('Starting New Refresh Request');

          isRefreshing = true;

          console.log('isRefreshing =>', isRefreshing);

          refreshPromise = axios.post(
            'https://mntrendigo.mntech.website/api/v1/user/auth/refresh-tokens',
            {
              refreshToken,
            },
          );

          console.log('REFRESH API HIT');

          const response = await refreshPromise;

          console.log(
            'FULL REFRESH RESPONSE =>',
            JSON.stringify(response.data, null, 2),
          );

          const newAccessToken = response.data?.data?.access?.token;

          const newRefreshToken = response.data?.data?.refresh?.token;

          console.log('New Access Token =>', newAccessToken);
          console.log('New Refresh Token =>', newRefreshToken);

          if (newAccessToken) {
            await AsyncStorage.setItem('authToken', newAccessToken);

            token = newAccessToken;

            console.log('Access Token Saved');
          }

          if (newRefreshToken) {
            await AsyncStorage.setItem('refreshToken', newRefreshToken);

            console.log('Refresh Token Saved');
          }

          console.log(
            'Saved Access Token =>',
            await AsyncStorage.getItem('authToken'),
          );

          console.log(
            'Saved Refresh Token =>',
            await AsyncStorage.getItem('refreshToken'),
          );

          config.headers.Authorization = `Bearer ${token}`;

          console.log('Authorization Header =>', config.headers.Authorization);

          return config;
        } catch (refreshError) {
          console.log('REFRESH FAILED');

          console.log(
            'Refresh Error =>',
            refreshError?.response?.data || refreshError,
          );

          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('refreshToken');

          console.log('Tokens Removed From Storage');

          return Promise.reject(refreshError);
        } finally {
          console.log('Refresh Process Finished');

          isRefreshing = false;
          refreshPromise = null;

          console.log('isRefreshing =>', isRefreshing);
        }
      }

      console.log('Access Token Still Valid');

      config.headers.Authorization = `Bearer ${token}`;

      console.log('Authorization Header =>', config.headers.Authorization);

      console.log('INTERCEPTOR END');
      console.log('==============================\n');

      return config;
    } catch (error) {
      console.log('INTERCEPTOR ERROR =>', error);
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

export default api;
