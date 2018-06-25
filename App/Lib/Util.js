export default class Util {

  // empty function
  static emptyFunc = () => { }

  /**
   * remove everything from text and keep only number and decimal
   * @param {string} text
   */
  static keepNumberAndDecimal(text) {
    return text.replace(/[^0-9\.]/g, ''); // only keep number and decimal
  }

  /**
   * only one decimal is allowed in text
   * @param {string} text
   */
  static onlyOneDecimal(text) {
    // if has decimal then keep first one and discard rest
    if ((text.match(/\./g) || []).length > 0) {
      let splited = [];
      splited = text.split('.');
      return splited.shift() + '.' + splited.join('');
    }
    return text;
  }

  // get currency symbol if found otherwise currency abbrevation
  static getCurrencySymbol(country) {
    return (country.currencySymbol) ? country.currencySymbol : country.currencyId;
  }

  // Data for Country Picker Modal
  static getCountryPickerData(countries) {
    let data = [];
    Object.entries(countries).forEach(([key, country]) => {
      data.push({
        key: country.id,
        label: country.name,
        currencySymbol: (country.currencySymbol) ? country.currencySymbol : country.currencyId
      });
    });

    return data;
  }

  // format currency
  static currencyFormat(num) {
    let str = '',
      out = '',
      parts = [];

    if (num.toString().indexOf('.') !== -1) {
      str = num.toFixed(3);
    } else {
      str = num.toString();
    }

    parts = str.split('.');
    out = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if (parts.length > 1) {
      out += '.' + parts[1];
    }
    return out;
  }

}
