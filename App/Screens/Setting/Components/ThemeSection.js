/* eslint-disable no-invalid-this, react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from '../../../Styles';
import Colors from '../../../Data/Colors';

export default class ThemeSection extends Component {

  static propTypes = {
    chooseTheme: PropTypes.func.isRequired,
    selectedTheme: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  /**
   * [!]Do not render if theme does not change
  */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selectedTheme === nextProps.selectedTheme) {
      return false;
    }
    return true;
  }

  renderThemes = () => {
    let output = [],
      chooseTheme = this.props.chooseTheme,
      selectedTheme = this.props.selectedTheme;

    Object.keys(Colors).forEach(function (key) {
      let isSelected = (key === selectedTheme);
      output.push(
        <TouchableOpacity
          key={key}
          style={styles.setting.theme}
          activeOpacity={0.7}
          onPress={() => chooseTheme(key)}
        >
          <Image
            style={styles.setting.themeImage}
            source={Colors[key].img}
          />
          <Text style={[styles.setting.themeName, { color: (isSelected ? styles.vars.colors.primary : styles.vars.colors.secondary), fontWeight: (isSelected ? 'bold' : 'normal') }]}>
            <Icon
              name={isSelected ? 'md-checkbox-outline' : 'ios-color-fill-outline'}
              size={10}
              color={isSelected ? styles.vars.colors.primary : styles.vars.colors.secondary}
            />
            {' ' + Colors[key].name}
          </Text>
        </TouchableOpacity >
      );
    });

    return output;
  }

  render() {
    return (
      <View style={styles.setting.section}>
        <View style={styles.setting.sectionHeader}>
          <Text style={styles.setting.sectionHeaderTitle}>
            <Icon name='ios-color-wand' size={11} color={styles.vars.colors.primary} /> Theme
          </Text>
        </View>
        <View style={styles.setting.themeBody}>
          {this.renderThemes()}
        </View>
      </View>
    );
  }

}
