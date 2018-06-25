import Toast from 'react-native-root-toast';

import { styles } from '../Styles';

export default class Messenger {

  // error message
  static error(message) {
    return Toast.show(message, {
      duration: Toast.durations.LONG,
      position: 70,
      shadow: false,
      animation: true,
      opacity: 1,
      hideOnPress: true,
      delay: 0,
      backgroundColor: styles.vars.colors.error
    });
  }

  // warning message
  static warning(message) {
    return Toast.show(message, {
      duration: Toast.durations.LONG,
      position: 70,
      shadow: false,
      animation: true,
      opacity: 1,
      hideOnPress: true,
      delay: 0,
      backgroundColor: styles.vars.colors.warning
    });
  }

  // info message
  static info(message) {
    return Toast.show(message, {
      duration: Toast.durations.LONG,
      position: 70,
      shadow: false,
      animation: true,
      opacity: 1,
      hideOnPress: true,
      delay: 0,
      backgroundColor: styles.vars.colors.info
    });
  }

  /**
   * hide the message
   * @param toast instance of Toast.show()
   */
  static hide(toast) {
    Toast.hide(toast);
  }

}
