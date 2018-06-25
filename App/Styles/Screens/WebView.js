import { StyleSheet } from 'react-native';

export default function (vars) {
  return StyleSheet.create({
    activityIndicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    error: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    errorText: {
      color: vars.colors.secondary,
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10
    }
  });
}
