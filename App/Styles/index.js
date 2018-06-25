import getVariables from './Variables';
import getCommonStyles from './Common';
import getCountryPickerStyles from './CountryPicker';

import getWebViewScreenStyles from './Screens/WebView';
import getHomeScreenStyles from './Screens/Home';
import getSettingScreenStyles from './Screens/Setting';

const styleRegistry = {};

export default class Styles {

  /**
   * set app style based on theme choosen
   * @param {string} theme
   */
  static set(theme) {
    let vars = getVariables(theme);
    styleRegistry.vars = vars;
    styleRegistry.common = getCommonStyles(vars);
    styleRegistry.countryPicker = getCountryPickerStyles(vars);
    styleRegistry.webView = getWebViewScreenStyles(vars);
    styleRegistry.home = getHomeScreenStyles(vars);
    styleRegistry.setting = getSettingScreenStyles(vars);
  }

  /**
   * get app style
  */
  static get() {
    return styleRegistry;
  }

}

// export style registry
export const styles = styleRegistry;
