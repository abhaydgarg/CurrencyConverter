/* eslint-disable no-invalid-this, react/jsx-no-bind */
import React, { Component } from 'react';
import { Text, Button, Platform } from 'react-native';
import PropTypes from 'prop-types';
import RNRestart from 'react-native-restart';
import * as Animatable from 'react-native-animatable';

import { styles } from '../../../Styles';
import Storage from '../../../Lib/Storage';

export default class RestartSection extends Component {

  static propTypes = {
    isRestartRequired: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isRestartRequired: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isRestartRequired !== prevState.isRestartRequired) {
      return {
        isRestartRequired: true
      };
    }
    return null;
  }

  componentDidMount() {
    Storage.get().then((data) => {
      if (data.isRestartRequired === true) {
        this.setState({
          isRestartRequired: true
        });
      }
    }).catch((err) => {
      this.setState({
        isRestartRequired: false
      });
    });
  }

  restart() {
    RNRestart.Restart();
  }

  render() {
    if (this.state.isRestartRequired === true) {
      return (
        <Animatable.View style={styles.setting.restartContainer} animation='pulse' iterationCount={2}>
          <Button
            onPress={this.restart}
            title='RESTART'
            color={Platform.OS === 'ios' ? styles.vars.colors.white : styles.vars.colors.secondary}
            accessibilityLabel='Restart to apply changes.'
          />
          <Text style={styles.setting.restartText}>TO APPLY CHANGES</Text>
        </Animatable.View >
      );
    }
    return null;
  }

}
