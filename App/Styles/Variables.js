import Colors from '../Data/Colors';

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
    }
  };
}

