/* eslint-disable no-invalid-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, TextInput, Animated, ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dateformat from 'dateformat';
import Icon from 'react-native-vector-icons/Ionicons';
import Flag from 'react-native-flags';

import normalize from '../../../Lib/normalizeText';
import { styles } from '../../../Styles';
import Txt from '../../../Shared/Txt';

export default class Top extends Component {

  static propTypes = {
    linearGradientPrimaryColor: PropTypes.string.isRequired,
    linearGradientSecondaryColor: PropTypes.string.isRequired,
    gotoFavScreen: PropTypes.func.isRequired,
    swapCountries: PropTypes.func.isRequired,
    chooseCountry: PropTypes.func.isRequired,
    baseCurrencyChange: PropTypes.func.isRequired,
    baseCurrencyConvert: PropTypes.func.isRequired,
    baseCountryCode: PropTypes.string.isRequired,
    baseValue: PropTypes.string.isRequired,
    baseCurrencySymbol: PropTypes.string.isRequired,
    runTopFlagAnimation: PropTypes.bool.isRequired,
    resetFlagAnimationState: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      flagAndInputViewOpacity: new Animated.Value(0),
      flagSpringValue: new Animated.Value(1),
    };
    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    this.flagAndInputViewOpacityAnimation();
  }

  componentDidUpdate() {
    if (this.props.runTopFlagAnimation === true) {
      this.flagUpdateAnimation();
      this.props.resetFlagAnimationState('top');
    }
  }

  flagAndInputViewOpacityAnimation() {
    Animated.timing(
      this.state.flagAndInputViewOpacity,
      {
        toValue: 1,
        duration: 1000
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

  onSend = () => {
    // Workaround to close keyboard
    // which stuck when choose country
    // from model
    this.textInputRef.current.focus();
    Keyboard.dismiss();
    this.props.baseCurrencyConvert();
  }

  dismissKeyboard = () => {
    this.textInputRef.current.focus();
    Keyboard.dismiss();
  }

  sendButton = () => {
    if (this.props.fetching) {
      return (
        <ActivityIndicator
          style={styles.home.topContainerActivityIndicator}
          size={Platform.OS === 'ios' ? 'large' : 30}
          color={styles.vars.colors.white}
          animating
        />
      );
    }
    return (
      <TouchableOpacity
        style={styles.home.topContainerSendIcon}
        hitSlop={{ top: 10, bottom: 10, left: 0, right: 10 }}
        onPress={this.onSend}
      >
        <Icon
          name='md-send'
          size={normalize(30)}
          color={styles.vars.colors.white}
        />
      </TouchableOpacity>
    );
  }

  swapCountries = () => this.props.swapCountries('tap');

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard} accessible={false}>
        <LinearGradient
          colors={[this.props.linearGradientPrimaryColor, this.props.linearGradientSecondaryColor]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.home.topContainer}
        >
          <View style={styles.home.topContainerHeader}>
            <TouchableOpacity onPress={this.swapCountries} hitSlop={{ top: 10, bottom: 10, left: 25, right: 25 }}>
              <Icon
                name='md-swap'
                size={normalize(25)}
                color={styles.vars.colors.white}
              />
            </TouchableOpacity>
            <Txt.White textstyle={styles.home.topContainerHeaderDate}>
              {dateformat(new Date(), 'mmm d, yyyy')}
            </Txt.White>
            <TouchableOpacity onPress={this.props.gotoFavScreen} hitSlop={{ top: 10, bottom: 10, left: 25, right: 25 }}>
              <Icon
                name='ios-construct'
                size={normalize(25)}
                color={styles.vars.colors.white}
              />
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.home.topContainerBody, { opacity: this.state.flagAndInputViewOpacity }]}>
            <View style={styles.home.topContinerBodyContent}>
              <TouchableOpacity onPress={this.props.chooseCountry}>
              <Animated.View style={[{backgroundColor: 'transparent'}, { transform: [{ scale: this.state.flagSpringValue }] }]}>
                <Flag
                  code={this.props.baseCountryCode}
                  size={64}
                />
              </Animated.View>
            </TouchableOpacity>
            <TextInput
              ref={this.textInputRef}
              underlineColorAndroid='transparent'
              placeholder='0'
              placeholderTextColor={styles.vars.colors.white}
              value={this.props.baseValue}
              keyboardType='decimal-pad'
              returnKeyType='done'
              onChangeText={this.props.baseCurrencyChange}
              onSubmitEditing={this.props.baseCurrencyConvert}
              style={styles.home.topContainerBodyInput}
            />
            {this.sendButton()}
            </View>
          </Animated.View>
          <View style={styles.home.topContainerSymbol}>
            <View style={styles.home.topContainerSymbolView}>
              <Txt.Primary textstyle={styles.home.topContainerSymbolText}>{this.props.baseCurrencySymbol}</Txt.Primary>
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }

}
