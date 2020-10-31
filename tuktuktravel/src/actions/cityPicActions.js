export const UPLOAD_CITY_PIC = 'UPLOAD_CITY_PIC';
export const DELETE_CITY_PIC = 'DELETE_CITY_PIC';

export const uploadCityPic = (cityPic) => ({
  type: UPLOAD_CITY_PIC,
  payload: {
    cityPic: cityPic,
  },
});

export const deleteCityPic = () => ({
  type: DELETE_CITY_PIC,
  payload: {
    cityPic: null,
  },
});




