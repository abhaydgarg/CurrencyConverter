/* eslint-disable no-invalid-this, react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Flag from 'react-native-flags';

import { styles } from '../Styles';

export default class CountryPickerOption extends Component {

  static propTypes = {
    option: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  onSelect = () => {
    this.props.onSelect(this.props.option.key);
  }

  render() {

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.onSelect}
      >
        <View style={styles.countryPicker.optionContainer}>
          <View style={styles.countryPicker.flagAndNameContainer}>
            <Flag
              type='flat'
              code={this.props.option.key}
              size={48}
            />
            <View style={styles.countryPicker.nameContainer}>
              <Text style={styles.countryPicker.nameText}>{this.props.option.label}</Text>
            </View>
          </View>
          <Text style={styles.countryPicker.currencySymbol}>{this.props.option.currencySymbol}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}
