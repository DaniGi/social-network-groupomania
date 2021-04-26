import * as yup from 'yup';

const SUPPORTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export const fileValidationSchema = yup.object().shape({
  picture: yup
    .mixed()
    .notRequired()
    .test('fileType', 'File format not supported. Try with an image of a GIF.', (value) => {
      if (value && value.length) {
        return SUPPORTED_TYPES.includes(value[0].type);
      }
      return true;
    }),
});
