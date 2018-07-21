import Reactotron, {
  trackGlobalErrors,
  asyncStorage,
  networking
} from 'reactotron-react-native';

Reactotron
  .configure({
    name: 'CurrencyConverter'
  })
  .useReactNative()
  .use(trackGlobalErrors())
  .use(asyncStorage())
  .use(networking())
  .connect();
