/* eslint-disable no-invalid-this */
import React, { Component, Fragment } from 'react';
import { View, StatusBar, ActivityIndicator, TouchableOpacity, ScrollView, Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Icon from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';

import normalize from '../../Lib/normalizeText';
import { styles } from '../../Styles';
import Countries from '../../Data/Countries';
import Messenger from '../../Lib/Messenger';
import Storage from '../../Lib/Storage';
import Util from '../../Lib/Util';
import CountryPickerOption from '../../Shared/CountryPickerOption';
import BaseCurrencySection from './Components/BaseCurrencySection';
import SecondaryCurrencySection from './Components/SecondaryCurrencySection';
import ThemeSection from './Components/ThemeSection';
import RestartSection from './Components/RestartSection';
import AboutSection from './Components/AboutSection';

export default class SettingScreen extends Component {

  static navigationOptions = ({ navigation }) => {

    let headerRight = null;
    let saveIcon = (
      <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 25, right: 25 }} onPress={navigation.state.params ? navigation.state.params.save : null}>
        <Icon name='save' size={normalize(20)} color={styles.vars.colors.white} />
      </TouchableOpacity>
    );

    if (navigation.state.params !== undefined && navigation.state.params.saving === true) {
      saveIcon = <ActivityIndicator color={styles.vars.colors.white} size='small' />;
    }

    headerRight = (
      <View style={styles.setting.headerRight}>{saveIcon}</View>
    );

    return {
      headerStyle: {
        backgroundColor: styles.vars.colors.primary
      },
      headerTintColor: styles.vars.colors.white,
      headerRight
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    let baseCountry = Countries[this.props.screenProps.baseCountryCode],
      secondaryCountry = Countries[this.props.screenProps.secondaryCountryCode];

    this.countryPickerData = Util.getCountryPickerData(Countries);
    this.state = {
      isCountryPickerVisible: false,
      baseCountryCode: baseCountry.id,
      baseCountryName: baseCountry.name,
      baseCurrencySymbol: Util.getCurrencySymbol(baseCountry),
      secondaryCountryCode: secondaryCountry.id,
      secondaryCountryName: secondaryCountry.name,
      secondaryCurrencySymbol: Util.getCurrencySymbol(secondaryCountry),
      theme: this.props.screenProps.theme,
      isCountryPickerForBaseCurrency: false,
      isCountryPickerForSecondaryCurrency: false,
      isRestartRequired: false
    };

    this.props.navigation.setParams({
      saving: false,
      save: this.save,
    });
  }

  componentDidMount() {
    // Keyboard if open on Home screen
    // then it does not close when
    // navigate to this (Setting) screen
    if (Platform.OS === 'android') {
      Keyboard.dismiss();
    }
  }

  onCountryPickerSelect = (picked) => {

    StatusBar.setBarStyle('light-content', true);

    let newState = {
      isCountryPickerVisible: false
    };

    let country = Countries[picked];

    if (this.state.isCountryPickerForBaseCurrency === true) {
      newState.baseCountryCode = country.id;
      newState.baseCountryName = country.name;
      newState.baseCurrencySymbol = Util.getCurrencySymbol(country);
    } else if (this.state.isCountryPickerForSecondaryCurrency === true) {
      newState.secondaryCountryCode = country.id;
      newState.secondaryCountryName = country.name;
      newState.secondaryCurrencySymbol = Util.getCurrencySymbol(country);
    }

    this.setState(newState);
  }

  onCountryPickerCancel = () => {
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

  renderCountryPickerOption = (option, isSelected) => {
    return (
      <CountryPickerOption
        option={option}
        isSelected={isSelected}
        onSelect={this.onCountryPickerSelect}
      />
    );
  }

  chooseTheme = (theme) => {
    this.setState({
      theme: theme
    });
  }

  save = () => {
    this.props.navigation.setParams({ saving: true });
    Storage.save({
      isRestartRequired: true,
      theme: this.state.theme,
      baseCountryCode: this.state.baseCountryCode,
      secondaryCountryCode: this.state.secondaryCountryCode
    }).then(() => {
      this.props.navigation.setParams({ saving: false });
      this.setState({
        isRestartRequired: true
      });
    }).catch((err) => {
      Messenger.error('Unable to save settings');
      this.props.navigation.setParams({ saving: false });
    });
  }

  render() {
    return (
      <Fragment>
        <ScrollView
          style={styles.setting.container}
          contentContainerStyle={styles.setting.contentContainerStyle}
        >
          <RestartSection
            isRestartRequired={this.state.isRestartRequired}
          />
          <BaseCurrencySection
            chooseCountry={this.chooseBaseCountry}
            baseCountryCode={this.state.baseCountryCode}
            baseCountryName={this.state.baseCountryName}
            baseCurrencySymbol={this.state.baseCurrencySymbol}
          />
          <SecondaryCurrencySection
            chooseCountry={this.chooseSecondaryCountry}
            secondaryCountryCode={this.state.secondaryCountryCode}
            secondaryCountryName={this.state.secondaryCountryName}
            secondaryCurrencySymbol={this.state.secondaryCurrencySymbol}
          />
          <ThemeSection
            chooseTheme={this.chooseTheme}
            selectedTheme={this.state.theme}
          />
          <AboutSection
            appVersion={DeviceInfo.getVersion()}
            appName={DeviceInfo.getApplicationName()}
            appBuildNumber={DeviceInfo.getBuildNumber()}
            appBundleId={DeviceInfo.getBundleId()}
          />
        </ScrollView>
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
