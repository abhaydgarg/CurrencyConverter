import { createStackNavigator } from 'react-navigation';

import WebViewScreen from './Shared/WebViewScreen';
import HomeScreen from './Screens/Home';
import SettingScreen from './Screens/Setting';

export default createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    SettingScreen: {
      screen: SettingScreen,
      navigationOptions: {
        title: 'Settings'
      }
    },
    WebViewScreen: {
      screen: WebViewScreen,
      navigationOptions: {
        title: 'XE Currency Converter'
      }
    }
  },
  {
    initialRouteName: 'HomeScreen'
  }
);
