import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';
import {decode as atob} from 'base-64';
// import store from '../redux/store';

// IMPORTANT
if (!global.atob) {
  global.atob = atob;
}
const api = axios.create({
  baseURL: 'https://mntrendigo.mntech.website/api/v1',
});

// REQUEST INTERCEPTOR

// api.interceptors.request.use(async config => {
//   console.log('Checking token via interceptor...');

//   let token = await AsyncStorage.getItem('authToken');
//   let refreshToken = await AsyncStorage.getItem('refreshToken');

//   if (!token) {
//     return config; // no token → skip
//   }

//   const decoded = jwtDecode(token);
//   const currentTime = Date.now() / 1000;

//   if (decoded.exp < currentTime && refreshToken) {
//     console.log('⚠️ Access token expired');

//     try {
//       const response = await axios.post(
//         'https://mntrendigo.mntech.website/api/v1/user/auth/refresh-tokens',
//         {refreshToken},
//       );

//       const newAccessToken = response.data?.data?.access?.token;
//       const newRefreshToken = response.data?.data?.refresh?.token;

//       await AsyncStorage.setItem('authToken', newAccessToken);
//       await AsyncStorage.setItem('refreshToken', newRefreshToken);

//       token = newAccessToken;

//       console.log('✅ Token refreshed automatically');
//     } catch (err) {
//       console.log('❌ Refresh failed → Logout');

//       await AsyncStorage.clear();
//     }
//   }

//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

api.interceptors.request.use(
  async config => {
    try {
      console.log('Checking token via interceptor...');

      let token = await AsyncStorage.getItem('authToken');
      let refreshToken = await AsyncStorage.getItem('refreshToken');

      // if token not found
      if (!token) {
        return config;
      }

      // decode token
      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;

      console.log('TOKEN EXP =>', decodedToken?.exp);
      console.log('CURRENT TIME =>', currentTime);

      // token expired
      if (decodedToken?.exp < currentTime) {
        console.log('⚠️ Access token expired');

        // refresh token not available
        if (!refreshToken) {
          console.log('❌ No refresh token found');
          await AsyncStorage.clear();
          return config;
        }

        try {
          const response = await axios.post(
            'https://mntrendigo.mntech.website/api/v1/user/auth/refresh-tokens',
            {
              refreshToken: refreshToken,
            },
          );

          console.log('REFRESH RESPONSE =>', response?.data);

          const newAccessToken = response?.data?.data?.access?.token;

          const newRefreshToken = response?.data?.data?.refresh?.token;

          if (newAccessToken) {
            await AsyncStorage.setItem('authToken', newAccessToken);

            token = newAccessToken;
          }

          if (newRefreshToken) {
            await AsyncStorage.setItem('refreshToken', newRefreshToken);
          }

          console.log('✅ Token refreshed successfully');
        } catch (refreshError) {
          console.log(
            '❌ Refresh token API failed',
            refreshError?.response?.data || refreshError,
          );

          await AsyncStorage.clear();
        }
      }

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    } catch (error) {
      console.log('INTERCEPTOR ERROR =>', error);

      return config;
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
