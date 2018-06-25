/* eslint-disable no-invalid-this, react/jsx-no-bind */
import React, { Component } from 'react';
import { Text, Animated, Button } from 'react-native';
import PropTypes from 'prop-types';
import RNRestart from 'react-native-restart';

import { styles } from '../../../Styles';
import Storage from '../../../Lib/Storage';

export default class RestartSection extends Component {

  static propTypes = {
    isRestartRequired: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isRestartRequired: false,
      restartViewOpacity: new Animated.Value(1)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isRestartRequired !== prevState.isRestartRequired) {
      return {
        isRestartRequired: nextProps.isRestartRequired
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

  restartViewOpacityAnimation() {
    this.state.restartViewOpacity.setValue(0);
    Animated.timing(
      this.state.restartViewOpacity,
      {
        toValue: 1,
        duration: 1500
      }
    ).start();
  }

  restart() {
    RNRestart.Restart();
  }



  render() {
    if (this.state.isRestartRequired === true) {
      this.restartViewOpacityAnimation();
      return (
        <Animated.View style={[styles.setting.restartContainer, { opacity: this.state.restartViewOpacity }]}>
          <Button
            onPress={this.restart}
            title='Restart'
            color={styles.vars.colors.secondary}
            accessibilityLabel='Restart to apply changes.'
          />
          <Text style={styles.setting.restartText}>TO APPLY CHANGES.</Text>
        </Animated.View>
      );
    }
    return null;
  }

}
