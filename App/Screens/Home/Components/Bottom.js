/* eslint-disable no-invalid-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Flag from 'react-native-flags';

import { styles } from '../../../Styles';
import Txt from '../../../Shared/Txt';

export default class Bottom extends Component {

  static propTypes = {
    chooseCountry: PropTypes.func.isRequired,
    secondaryCountryCode: PropTypes.string.isRequired,
    secondaryCurrencySymbol: PropTypes.string.isRequired,
    secondaryValue: PropTypes.string.isRequired,
    runBottomFlagAnimation: PropTypes.bool.isRequired,
    resetFlagAnimationState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      flagAndInputViewOpacity: new Animated.Value(0),
      flagSpringValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.flagAndInputViewOpacityAnimation();
  }

  /**
   * [!]Do not render if secondary country code and secondary value do not change

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.secondaryCountryCode === nextProps.secondaryCountryCode && this.props.secondaryValue === nextProps.secondaryValue) {
      return false;
    }
    return true;
  }
  */

  componentDidUpdate() {
    if (this.props.runBottomFlagAnimation === true) {
      this.flagUpdateAnimation();
      this.props.resetFlagAnimationState('bottom');
    }
  }

  flagAndInputViewOpacityAnimation() {
    Animated.timing(
      this.state.flagAndInputViewOpacity,
      {
        toValue: 1,
        duration: 1000,
        delay: 300
      }
    ).start();
  }

  flagUpdateAnimation() {
    this.state.flagSpringValue.setValue(0.3);
    Animated.spring(this.state.flagSpringValue, {
      toValue: 1,
      duration: 5000,
      friction: 1
    }).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.home.bottomContainer}>
          <View style={styles.home.bottomContainerSymbol}>
            <View style={styles.home.bottomContainerSymbolView}>
              <Txt.White textstyle={styles.home.bottomContainerSymbolText}>{this.props.secondaryCurrencySymbol}</Txt.White>
            </View>
          </View>
          <Animated.View style={[styles.home.bottomContainerBody, { opacity: this.state.flagAndInputViewOpacity }]}>
            <TouchableOpacity onPress={this.props.chooseCountry}>
              <Animated.View style={{ transform: [{ scale: this.state.flagSpringValue }] }}>
                <Flag
                  code={this.props.secondaryCountryCode}
                  size={64}
                />
              </Animated.View>
            </TouchableOpacity>
            <Txt.Primary textstyle={styles.home.bottomContainerBodyText} selectable>
              {this.props.secondaryValue}
            </Txt.Primary>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}
