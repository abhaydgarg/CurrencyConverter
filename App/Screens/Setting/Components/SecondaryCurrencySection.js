import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Flag from 'react-native-flags';

import { styles } from '../../../Styles';

export default class SecondaryCurrencySection extends Component {

  static propTypes = {
    chooseCountry: PropTypes.func.isRequired,
    secondaryCountryCode: PropTypes.string.isRequired,
    secondaryCountryName: PropTypes.string.isRequired,
    secondaryCurrencySymbol: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  /**
   * [!]Do not render if secondary country code does not change
  */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.secondaryCountryCode === nextProps.secondaryCountryCode) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={styles.setting.section}>
        <View style={styles.setting.sectionHeader}>
          <Text style={styles.setting.sectionHeaderTitle}>
            <Icon name='ios-cash-outline' size={11} color={styles.vars.colors.primary} /> Secondary currency
          </Text>
        </View>
        <TouchableOpacity style={styles.setting.sectionBody} activeOpacity={0.7} onPress={this.props.chooseCountry}>
          <View style={styles.setting.currencyFlagAndName}>
            <Flag
              type='flat'
              code={this.props.secondaryCountryCode}
              size={64}
            />
            <View style={styles.setting.currencyName}>
              <Text style={styles.setting.currencyNameText}>{this.props.secondaryCountryName}</Text>
            </View>
          </View>
          <Text style={styles.setting.currencySymbol}>{this.props.secondaryCurrencySymbol}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
