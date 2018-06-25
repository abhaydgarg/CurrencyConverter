import Config from '../../Config';

export default class HomeServices {

  static getConvertedValue(query) {
    return fetch(`${Config.currencyConverterApiUri}?compact=ultra&q=${query}`);
  }

}
