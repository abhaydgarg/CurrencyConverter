import { StyleSheet, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function (vars) {
  return StyleSheet.create({
    headerRight: {
      marginRight: 15
    },
    container: {
      backgroundColor: vars.colors.white
    },
    contentContainerStyle: {
      flexGrow: 1,
      paddingLeft: 15,
      paddingRight: 15
    },
    restartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: .2,
      padding: Platform.OS === 'ios' ? 0 : 10,
      borderTopColor: vars.colors.secondary,
      backgroundColor: vars.colors.primary,
      marginLeft: -15,
      marginRight: -15
    },
    restartText: {
      fontSize: vars.fontSize.regular,
      fontFamily: vars.fonts.base,
      color: vars.colors.white,
      marginLeft: Platform.OS === 'ios' ? 0 : 10
    },
    section: {
      marginTop: 10
    },
    sectionHeader: {
      paddingBottom: 5
    },
    sectionHeaderTitle: {
      color: vars.colors.primary,
      fontFamily: vars.fonts.bold,
      fontSize: vars.fontSize.large
    },
    sectionBody: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    currencyFlagAndName: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    currencyName: {
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 10,
    },
    currencyNameText: {
      fontSize: vars.fontSize.regular,
      color: vars.colors.secondary,
      fontFamily: vars.fonts.base
    },
    currencySymbol: {
      marginRight: 10,
      color: vars.colors.primary,
      fontWeight: 'bold',
      fontSize: vars.fontSize.large
    },
    themeBody: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10
    },
    theme: {
      marginBottom: 15,
      marginRight: 10,
      alignItems: 'center'
    },
    themeImage: {
      width: 70,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    themeIcon: {
      fontWeight: 'bold'
    },
    aboutSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 20,
      paddingBottom: DeviceInfo.getModel() === 'iPhone X' ? 25 : 10
    },
    aboutSectionImage: {
      width: 40,
      height: 40
    },
    aboutSectionBody: {
      flexDirection: 'row'
    },
    aboutSectionAppName: {
      fontFamily: vars.fonts.numeric,
      fontSize: vars.fontSize.regular,
      color: vars.colors.black,
      marginRight: 2
    },
    aboutSectionAppVersion: {
      fontFamily: vars.fonts.numeric,
      fontSize: vars.fontSize.regular,
      color: vars.colors.black,
      marginRight: 2
    },
    aboutSectionAppBuildNumber: {
      fontFamily: vars.fonts.numeric,
      fontSize: vars.fontSize.regular,
      color: vars.colors.black
    },
    aboutSectionAppDevMode: {
      fontFamily: vars.fonts.bold,
      fontSize: vars.fontSize.small,
      color: vars.colors.info
    }
  });
}
