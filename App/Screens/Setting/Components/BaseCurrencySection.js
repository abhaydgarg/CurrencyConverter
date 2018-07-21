import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Flag from 'react-native-flags';

import normalize from '../../../Lib/normalizeText'
import { styles } from '../../../Styles';

export default class BaseCurrencySection extends Component {

  static propTypes = {
    chooseCountry: PropTypes.func.isRequired,
    baseCountryCode: PropTypes.string.isRequired,
    baseCountryName: PropTypes.string.isRequired,
    baseCurrencySymbol: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  /**
   * [!]Do not render if base country code does not change
  */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.baseCountryCode === nextProps.baseCountryCode) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={styles.setting.section}>
        <View style={styles.setting.sectionHeader}>
          <Text style={styles.setting.sectionHeaderTitle}>
            <Icon name='ios-cash-outline' size={normalize(17)} color={styles.vars.colors.primary} /> Base currency
          </Text>
        </View>
        <TouchableOpacity style={styles.setting.sectionBody} activeOpacity={0.7} onPress={this.props.chooseCountry}>
          <View style={styles.setting.currencyFlagAndName}>
            <Flag
              type='flat'
              code={this.props.baseCountryCode}
              size={64}
            />
            <View style={styles.setting.currencyName}>
              <Text style={styles.setting.currencyNameText}>{this.props.baseCountryName}</Text>
            </View>
          </View>
          <Text style={styles.setting.currencySymbol}>{this.props.baseCurrencySymbol}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
