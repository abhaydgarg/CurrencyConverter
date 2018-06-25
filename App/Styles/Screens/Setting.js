import { StyleSheet, Platform } from 'react-native';

export default function (vars) {
  return StyleSheet.create({
    headerRight: {
      marginRight: 15
    },
    container: {
      flex: 1,
      backgroundColor: vars.colors.white,
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
      fontSize: 14,
      fontWeight: 'bold',
      color: vars.colors.white,
      marginTop: 3,
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
      fontSize: 11
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
      marginLeft: 10
    },
    currencyNameText: {
      fontSize: 15,
      color: vars.colors.secondary
    },
    currencySymbol: {
      marginRight: 10,
      color: vars.colors.primary,
      fontWeight: 'bold',
      fontSize: 17
    },
    themeBody: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    theme: {
      alignItems: 'center',
      marginBottom: 15,
      paddingRight: 10
    },
    themeImage: {
      width: 80,
      height: 50,
      borderRadius: 10
    },
    themeName: {
      color: vars.colors.secondary,
      fontSize: 10,
      marginTop: 5,
      fontStyle: 'italic'
    },
    aboutSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 30
    },
    aboutSectionImage: {
      width: 25,
      height: 25
    },
    aboutSectionBody: {
      flexDirection: 'row'
    },
    aboutSectionAppName: {
      fontWeight: 'bold',
      fontSize: 12,
      color: vars.colors.black,
      marginRight: 2
    },
    aboutSectionAppVersion: {
      fontSize: 12,
      color: vars.colors.black,
      marginRight: 2
    },
    aboutSectionAppBuildNumber: {
      fontSize: 12,
      color: vars.colors.black
    },
    aboutSectionAppDevMode: {
      fontWeight: 'bold',
      fontSize: 10,
      color: vars.colors.white,
      backgroundColor: vars.colors.warning,
      padding: 5,
      marginTop: 5
    }
  });
}
