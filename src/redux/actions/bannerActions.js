export const FETCH_BANNER_REQUEST = 'FETCH_BANNER_REQUEST';
export const FETCH_BANNER_SUCCESS = 'FETCH_BANNER_SUCCESS';
export const FETCH_BANNER_FAILURE = 'FETCH_BANNER_FAILURE';

export const fetchBannerRequest = () => ({
  type: FETCH_BANNER_REQUEST,
});

export const fetchBannerSuccess = data => ({
  type: FETCH_BANNER_SUCCESS,
  payload: data,
});

export const fetchBannerFailure = error => ({
  type: FETCH_BANNER_FAILURE,
  payload: error,
});
