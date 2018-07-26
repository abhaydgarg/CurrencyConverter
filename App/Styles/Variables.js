import Colors from '../Data/Colors';
import normalize from '../Lib/normalizeText';

export default function (theme) {
  return {
    colors: {
      primary: Colors[theme].primary,
      secondary: Colors[theme].secondary,
      info: '#00529B',
      error: '#D8000C',
      warning: '#ffcc00',
      white: '#ffffff',
      black: '#333333',
    },
    fonts: {
      base: 'Ubuntu-Regular',
      bold: 'Ubuntu-Bold',
      emphasis: 'Ubuntu-Italic',
      numeric: 'Iceberg-Regular'
    },
    fontSize: {
      input: normalize(36),
      xxlarge: normalize(28),
      xlarge: normalize(23),
      large: normalize(17),
      regular: normalize(15),
      medium: normalize(13),
      small: normalize(11),
      tiny: normalize(9)
    }
  };
}
