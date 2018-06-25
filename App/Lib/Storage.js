import { AsyncStorage } from 'react-native';
import { isEmpty } from '@abhaydgarg/is';

import Config from '../Config';

const STORE_IDENTIFIER = '@CurrencyConverterStore';
const initialValues = {
  theme: Config.theme,
  baseCountryCode: Config.baseCountryCode,
  secondaryCountryCode: Config.secondaryCountryCode
};

export default class Storage {

  static getInitialValues() {
    return initialValues;
  }

  /**
   * get data
   * @returns Promise
  */
  static get() {
    return AsyncStorage.getItem(STORE_IDENTIFIER).then((json) => {
      json = JSON.parse(json);
      if (isEmpty(json)) {
        json = initialValues;
      }
      return json;
    });
  }

  /**
   * save data
   * @param {object} data
   * @returns Promise
  */
  static save(data) {
    return AsyncStorage.getItem(STORE_IDENTIFIER).then((json) => {
      json = JSON.parse(json);
      if (isEmpty(json)) {
        json = initialValues;
      } else {
        Object.assign(json, data);
      }
      return AsyncStorage.setItem(STORE_IDENTIFIER, JSON.stringify(json));
    });
  }

  // Clear AsyncStorage
  static clear() {
    return AsyncStorage.clear();
  }

}
