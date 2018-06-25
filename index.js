import { AppRegistry, YellowBox } from 'react-native';
import App from './App/App';

// Ignore Yellow warnings
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Remote debugger is in a background',
  'Module RNShakeEvent'
]);

AppRegistry.registerComponent('CurrencyConverter', () => App);
