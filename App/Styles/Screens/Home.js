import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function (vars) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: vars.colors.white
    },
    topContainer: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : getStatusBarHeight() - 10,
    },
    bottomContainer: {
      flex: 1
    },
    topContainerHeader: {
      height: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    topContainerHeaderDate: {
      fontSize: 12
    },
    topContainerSymbol: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: 10
    },
    topContainerSymbolView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 55,
      height: 40,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: vars.colors.white
    },
    topContainerSymbolText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    topContainerBody: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topContainerBodyInput: {
      width: 180,
      marginLeft: 10,
      color: vars.colors.white,
      fontSize: 30,
      borderColor: vars.colors.white,
      borderBottomWidth: 1,
      padding: 0,
      marginTop: Platform.OS === 'ios' ? 0 : -7
    },
    topContainerSendIcon: {
      marginLeft: 10,
      marginTop: 20
    },
    topContainerActivityIndicator: {
      marginLeft: 10,
      marginTop: 20
    },
    bottomContainerSymbol: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: 10
    },
    bottomContainerSymbolView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 55,
      height: 40,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: vars.colors.primary
    },
    bottomContainerSymbolText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    bottomContainerBody: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomContainerBodyText: {
      width: 220,
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold'
    },
    bottomXeContainer: {
      padding: 10
    },
    bottomXeContainerBody: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomXeContainerBodyImage: {
      width: 42,
      height: 34
    },
    bottomXeContainerBodyText: {
      color: vars.colors.black,
      fontSize: 12
    },
    shakeFeatureInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: vars.colors.black,
      paddingTop: 5,
      paddingBottom: 5
    },
    shakeFeatureInfoText: {
      fontSize: 12,
      color: vars.colors.white,
      marginLeft: 15
    }
  });
}
