/* eslint-disable no-invalid-this */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import RNShakeEvent from 'react-native-shake-event';
import { isNumeric } from '@abhaydgarg/is';
import Reactotron from 'reactotron-react-native';

import { styles } from '../../Styles';
import Countries from '../../Data/Countries';
import Util from '../../Lib/Util';
import Storage from '../../Lib/Storage';
import Messenger from '../../Lib/Messenger';
import HomeServices from './HomeServices';
import CountryPickerOption from '../../Shared/CountryPickerOption';
import Top from './Components/Top';
import Bottom from './Components/Bottom';
import ShakeFeatureInfo from './Components/ShakeFeatureInfo';
import XE from './Components/XE';

export default class HomeScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    StatusBar.setBarStyle('light-content', true);
    this.countryPickerData = Util.getCountryPickerData(Countries);
    // Base value TextInput reference
    // get from Child component
    this.textInputRef = null;
    this.state = {
      linearGradientPrimaryColor: styles.vars.colors.primary,
      linearGradientSecondaryColor: styles.vars.colors.secondary,
      baseValue: '',
      baseCountryCode: this.props.screenProps.baseCountryCode,
      baseCurrencySymbol: Util.getCurrencySymbol(Countries[this.props.screenProps.baseCountryCode]),
      secondaryValue: '0.00',
      secondaryCountryCode: this.props.screenProps.secondaryCountryCode,
      secondaryCurrencySymbol: Util.getCurrencySymbol(Countries[this.props.screenProps.secondaryCountryCode]),
      isCountryPickerVisible: false,
      isCountryPickerForBaseCurrency: false,
      isCountryPickerForSecondaryCurrency: false,
      runTopFlagAnimation: false,
      runBottomFlagAnimation: false,
      showShakeFeatureInfo: false,
      showXE: false,
      fetching: false
    };
  }

  componentDidMount() {
    RNShakeEvent.addEventListener('shake', () => {
      this.swapCountries('shake');
      Storage.save({
        showShakeFeatureInfo: false
      }).then(() => {
        this.setState({
          showShakeFeatureInfo: false
        });
      }).catch((err) => {
        if (__DEV__) {
          Reactotron.error(err);
        }
      });
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  getTextInputRef = (ref) => {
    this.textInputRef = ref;
  }

  textInputFocus = () => {
    // Workaround to close keyboard
    // which stuck (won't close) when choose country
    // from modal or close modal
    if (this.textInputRef) {
      this.textInputRef.current.focus();
    }
  }

  gotoFavScreen = () => {
    this.props.navigation.navigate('SettingScreen');
  }

  getCountryPickerData = () => {
    let data = [];
    Object.entries(Countries).forEach(([key, country]) => {
      data.push({
        key: country.id,
        label: country.name,
        currencySymbol: Util.getCurrencySymbol(country)
      });
    });

    return data;
  }

  swapCountries = (mode) => {

    if (mode === 'tap') {
      Storage.get().then((data) => {
        if (data.showShakeFeatureInfo !== false) {
          this.setState({
            showShakeFeatureInfo: true
          });
          setTimeout(() => {
            this.setState({
              showShakeFeatureInfo: false
            });
          }, 10000);
        }
      }).catch((err) => {
        if (__DEV__) {
          Reactotron.error(err);
        }
      });
    }

    this.setState((prevState) => ({
      baseCountryCode: prevState.secondaryCountryCode,
      secondaryCountryCode: prevState.baseCountryCode,
      baseCurrencySymbol: prevState.secondaryCurrencySymbol,
      secondaryCurrencySymbol: prevState.baseCurrencySymbol,
      runTopFlagAnimation: true,
      runBottomFlagAnimation: true
    }));
  }

  resetFlagAnimationState = (which) => {
    if (which === 'top') {
      this.setState({
        runTopFlagAnimation: false
      });
    } else if (which === 'bottom') {
      this.setState({
        runBottomFlagAnimation: false
      });
    }
  }

  onCountryPickerSelect = (picked) => {

    this.textInputFocus();

    StatusBar.setBarStyle('light-content', true);

    let newState = {
      isCountryPickerVisible: false
    };

    if (this.state.isCountryPickerForBaseCurrency === true) {
      newState.baseCountryCode = picked;
      newState.baseCurrencySymbol = Util.getCurrencySymbol(Countries[picked]);
      newState.runTopFlagAnimation = true;
    } else if (this.state.isCountryPickerForSecondaryCurrency === true) {
      newState.secondaryCountryCode = picked;
      newState.secondaryCurrencySymbol = Util.getCurrencySymbol(Countries[picked]);
      newState.runBottomFlagAnimation = true;
    }

    this.setState(newState);
  }

  onCountryPickerCancel = () => {
    this.textInputFocus();

    StatusBar.setBarStyle('light-content', true);

    this.setState({
      isCountryPickerVisible: false
    });
  }

  chooseBaseCountry = () => {
    StatusBar.setBarStyle('dark-content', true);
    this.setState({
      isCountryPickerVisible: true,
      isCountryPickerForBaseCurrency: true,
      isCountryPickerForSecondaryCurrency: false
    });
  }

  chooseSecondaryCountry = () => {
    StatusBar.setBarStyle('dark-content', true);
    this.setState({
      isCountryPickerVisible: true,
      isCountryPickerForBaseCurrency: false,
      isCountryPickerForSecondaryCurrency: true
    });
  }

  sanitizeBaseValue(text) {
    text = text.trim();
    text = Util.keepNumberAndDecimal(text);
    text = Util.onlyOneDecimal(text);
    return text.toString();
  }

  baseCurrencyChange = (text) => {
    this.setState({
      baseValue: this.sanitizeBaseValue(text)
    });
  }

  openWebView = () => {
    this.props.navigation.navigate('WebViewScreen', {
      baseValue: this.state.baseValue,
      baseCurrencyCode: Countries[this.state.baseCountryCode].currencyId,
      secondaryCurrencyCode: Countries[this.state.secondaryCountryCode].currencyId
    });
  }

  baseCurrencyConvert = (e) => {
    if (isNumeric(this.state.baseValue) === true) {
      let baseValue = this.state.baseValue,
        baseCurrencyCode = Countries[this.state.baseCountryCode].currencyId,
        secondaryCurrencyCode = Countries[this.state.secondaryCountryCode].currencyId,
        query = `${baseCurrencyCode}_${secondaryCurrencyCode}`;
      this.setState({
        fetching: true
      });
      HomeServices.getConvertedValue(
        query
      ).then(response => response.json()).then((json) => {
        let unitValue = json[query];
        if (isNumeric(unitValue)) {
          this.setState({
            secondaryValue: Util.currencyFormat(parseFloat(unitValue) * parseFloat(baseValue)),
            fetching: false,
            showXE: false
          });
        } else {
          throw new Error('Non numeric value');
        }
      }).catch((err) => {
        if (__DEV__) {
          Reactotron.error(err);
        }
        if (err.message === 'Network request failed') {
          this.setState({
            fetching: false
          });
          Messenger.warning('No internet connection');
        } else {
          if (__DEV__) {
            Messenger.error(err.message);
          } else {
            Messenger.error('Something went wrong');
          }
          this.setState({
            secondaryValue: '0.00',
            showXE: true,
            fetching: false
          });
        }
      });
    }
  }

  renderCountryPickerOption = (option, isSelected) => {
    return (
      <CountryPickerOption
        option={option}
        isSelected={isSelected}
        onSelect={this.onCountryPickerSelect}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <KeyboardAvoidingView
          style={styles.common.container}
          behavior='padding'
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <Top
            linearGradientPrimaryColor={this.state.linearGradientPrimaryColor}
            linearGradientSecondaryColor={this.state.linearGradientSecondaryColor}
            gotoFavScreen={this.gotoFavScreen}
            swapCountries={this.swapCountries}
            chooseCountry={this.chooseBaseCountry}
            baseCurrencyChange={this.baseCurrencyChange}
            baseCurrencyConvert={this.baseCurrencyConvert}
            baseCurrencySymbol={this.state.baseCurrencySymbol}
            baseCountryCode={this.state.baseCountryCode}
            baseValue={this.state.baseValue}
            runTopFlagAnimation={this.state.runTopFlagAnimation}
            resetFlagAnimationState={this.resetFlagAnimationState}
            fetching={this.state.fetching}
            getTextInputRef={this.getTextInputRef}
          />
          <Bottom
            chooseCountry={this.chooseSecondaryCountry}
            secondaryCurrencySymbol={this.state.secondaryCurrencySymbol}
            secondaryCountryCode={this.state.secondaryCountryCode}
            secondaryValue={this.state.secondaryValue}
            runBottomFlagAnimation={this.state.runBottomFlagAnimation}
            resetFlagAnimationState={this.resetFlagAnimationState}
          />
        </KeyboardAvoidingView>
        <XE
          showXE={this.state.showXE}
          openWebView={this.openWebView}
        />
        {(this.state.showShakeFeatureInfo) ? <ShakeFeatureInfo /> : null}
        <ModalFilterPicker
          visible={this.state.isCountryPickerVisible}
          modal={{ animationType: 'slide', transparent: true, onRequestClose: Util.emptyFunc }}
          onSelect={Util.emptyFunc}
          onCancel={this.onCountryPickerCancel}
          cancelButtonText='CLOSE'
          options={this.countryPickerData}
          overlayStyle={styles.countryPicker.overlayStyle}
          cancelButtonStyle={styles.countryPicker.cancelButtonStyle}
          cancelButtonTextStyle={styles.countryPicker.cancelButtonTextStyle}
          filterTextInputContainerStyle={styles.countryPicker.filterTextInputContainerStyle}
          listContainerStyle={styles.countryPicker.listContainerStyle}
          renderOption={this.renderCountryPickerOption}
        />
      </Fragment>
    );
  }
}
