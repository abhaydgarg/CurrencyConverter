import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function (vars) {

  return StyleSheet.create({
    overlayStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: vars.colors.white,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cancelButtonStyle: {
      flex: 0,
      backgroundColor: vars.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10
    },
    cancelButtonTextStyle: {
      color: vars.colors.white,
      fontFamily: vars.fonts.numeric,
      fontSize: vars.fontSize.medium
    },
    filterTextInputContainerStyle: {
      borderBottomWidth: .5,
      borderBottomColor: vars.colors.secondary
    },
    listContainerStyle: {
      flex: 1,
      width: width * 0.9,
      maxHeight: height * 0.8,
      backgroundColor: '#fff',
      borderRadius: 0,
      marginBottom: 15
    },
    optionContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    flagAndNameContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    nameContainer: {
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 10
    },
    nameText: {
      fontSize: vars.fontSize.regular,
      color: vars.colors.secondary,
      fontFamily: vars.fonts.base
    },
    currencySymbol: {
      marginRight: 10,
      color: vars.colors.primary,
      fontSize: vars.fontSize.large,
      fontFamily: vars.fonts.bold
    }
  });
}
