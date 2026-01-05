// import axios from 'axios';

// const BASE_URL = 'https://trendigo.mntech.website/api/v1/user/auth';

// export const registerApi = async payload => {
//   return await axios.post(`${BASE_URL}/register`, payload);
// };

// export const verifyOtpEmailApi = async payload => {
//   return await axios.post(`${BASE_URL}/verify-otp-email`, payload);
// };
import axios from 'axios';

const BASE_URL = 'https://mntrendigo.mntech.website/api/v1/user/auth';

export const apiResendOtp = email => {
  return axios.post(
    `${BASE_URL}/resend-otp-email`,
    {email}, // body must be JSON
    {headers: {'Content-Type': 'application/json'}},
  );
};
