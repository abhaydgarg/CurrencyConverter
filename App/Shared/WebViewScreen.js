/* eslint-disable no-invalid-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView, ActivityIndicator, Text, View, Button } from 'react-native';

import Config from '../Config';
import { styles } from '../Styles';

export default class WebViewScreen extends Component {

  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: styles.vars.colors.primary
      },
      headerTintColor: styles.vars.colors.white
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  closeWebView = () => this.props.navigation.goBack();

  renderLoading = () => <ActivityIndicator size={'large'} color={styles.vars.colors.primary} style={styles.webView.activityIndicator} />

  renderError = () => {
    return (
      <View style={styles.webView.error}>
        <Text style={styles.webView.errorText}>CANNOT LOAD</Text>
        <Button
          onPress={this.closeWebView}
          title='CLOSE'
          color={styles.vars.colors.primary}
        />
      </View>
    );
  };

  render() {
    return (
      <WebView
        source={{ uri: `${Config.XEUri}?Amount=${this.props.navigation.state.params.baseValue}&From=${this.props.navigation.state.params.baseCurrencyCode}&To=${this.props.navigation.state.params.secondaryCurrencyCode}` }}
        startInLoadingState
        renderLoading={this.renderLoading}
        renderError={this.renderError}
      />
    );
  }
}

