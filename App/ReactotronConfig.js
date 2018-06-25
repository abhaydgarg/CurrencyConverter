import Reactotron, {
  trackGlobalErrors,
  asyncStorage,
  networking
} from 'reactotron-react-native';

Reactotron
  .configure({
    name: 'CurrencyConverter App'
  })
  .useReactNative()
  .use(trackGlobalErrors())
  .use(asyncStorage())
  .use(networking())
  .connect();
