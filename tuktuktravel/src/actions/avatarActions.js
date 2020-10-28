export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const DELETE_AVATAR = 'DELETE_AVATAR';

export const uploadAvatar = (avatar) => ({
  type: UPLOAD_AVATAR,
  payload: {
    avatar: avatar,
  },
});

export const deleteAvatar = () => ({
  type: DELETE_AVATAR,
  payload: {
    avatar: null,
  },
});




