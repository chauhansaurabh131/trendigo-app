// // import axios from 'axios';

// // const BASE_URL = 'https://trendigo.mntech.website/api/v1/user/auth';

// // export const registerApi = async payload => {
// //   return await axios.post(`${BASE_URL}/register`, payload);
// // };

// // export const verifyOtpEmailApi = async payload => {
// //   return await axios.post(`${BASE_URL}/verify-otp-email`, payload);
// // };
// import axios from 'axios';

// const BASE_URL = 'https://mntrendigo.mntech.website/api/v1/user/auth';

// export const apiResendOtp = email => {
//   return axios.post(
//     `${BASE_URL}/resend-otp-email`,
//     {email}, // body must be JSON
//     {headers: {'Content-Type': 'application/json'}},
//   );
// };

// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';
import {refreshTokenRequest} from '../redux/actions/authActions';

const authApi = axios.create({
  baseURL: 'https://mntrendigo.mntech.website/api/v1',
});

/**
 * =============================
 * REQUEST INTERCEPTOR
 * =============================
 */
authApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return authApi(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw error;

        // 🔥 Call refresh API directly (NOT saga)
        const res = await axios.post(
          'https://mntrendigo.mntech.website/api/v1/user/auth/refresh-tokens',
          {refreshToken},
        );

        const newAccessToken = res.data?.data?.access?.token;
        const newRefreshToken = res.data?.data?.refresh?.token;

        await AsyncStorage.multiSet([
          ['accessToken', newAccessToken],
          ['refreshToken', newRefreshToken],
        ]);

        authApi.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return authApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch({type: 'LOGOUT'});
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

/**
 * =============================
 * RESPONSE INTERCEPTOR
 * =============================
 */
authApi.interceptors.response.use(
  response => {
    console.log('✅ API RESPONSE:', response.config.url, response.status);
    return response;
  },
  async error => {
    const originalRequest = error.config;

    console.log('❌ API ERROR:', originalRequest?.url, error.response?.status);

    // Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('🔁 Access token expired (401)');

      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (refreshToken) {
        console.log('♻️ Dispatching REFRESH_TOKEN_REQUEST');
        store.dispatch(refreshTokenRequest(refreshToken));
      } else {
        console.log('🚫 No refresh token found');
      }
    }

    return Promise.reject(error);
  },
);

export default authApi;
