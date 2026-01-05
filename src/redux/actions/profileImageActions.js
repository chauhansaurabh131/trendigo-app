// profileImageActions.js
export const UPLOAD_PROFILE_PIC_REQUEST = 'UPLOAD_PROFILE_PIC_REQUEST';
export const UPLOAD_PROFILE_PIC_SUCCESS = 'UPLOAD_PROFILE_PIC_SUCCESS';
export const UPLOAD_PROFILE_PIC_FAILURE = 'UPLOAD_PROFILE_PIC_FAILURE';

export const uploadProfilePicRequest = image => ({
  type: UPLOAD_PROFILE_PIC_REQUEST,
  payload: image, // image from gallery
});

export const uploadProfilePicSuccess = imageUrl => ({
  type: UPLOAD_PROFILE_PIC_SUCCESS,
  payload: imageUrl,
});

export const uploadProfilePicFailure = error => ({
  type: UPLOAD_PROFILE_PIC_FAILURE,
  payload: error,
});
