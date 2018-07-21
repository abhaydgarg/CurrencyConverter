/* eslint-disable no-invalid-this, react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import normalize from '../../../Lib/normalizeText'
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
          <ImageBackground
            style={styles.setting.themeImage}
            source={Colors[key].img}
          >
          {( isSelected ? <Icon name='md-checkbox-outline' size={normalize(17)} color={styles.vars.colors.white} style={styles.setting.themeIcon} /> : null)}
          </ImageBackground>
        </TouchableOpacity>
      );
    });

    return output;
  }

  render() {
    return (
      <View style={styles.setting.section}>
        <View style={styles.setting.sectionHeader}>
          <Text style={styles.setting.sectionHeaderTitle}>
            <Icon name='ios-color-wand' size={normalize(17)} color={styles.vars.colors.primary} /> Theme
          </Text>
        </View>
        <View style={styles.setting.themeBody}>
          {this.renderThemes()}
        </View>
      </View>
    );
  }

}
