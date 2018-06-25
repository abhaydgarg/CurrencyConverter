import './ReactotronConfig';
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import Styles from './Styles';
import Storage from './Lib/Storage';
import Messenger from './Lib/Messenger';
import Nav from './Nav';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fetching: true
    };

    // Storage.clear(); // DEBUG: Clear Async storage
    // set storage to initial values
    this.storageData = Storage.getInitialValues();
  }

  componentDidMount() {
    Storage.save({ isRestartRequired: false }).then(() => {
      return Storage.get();
    }).then((data) => {
      this.storageData = data;
      Styles.set(data.theme);
      this.setState({
        fetching: false
      });
    }).catch((err) => {
      // in error set app style to default theme
      Styles.set(config.theme);
      this.setState({
        fetching: false
      });
      Messenger.warning('Read/Write storage error');
    });
  }

  render() {
    //console.log('%c[RENDER] ', 'color: #ff0000; font-weight: bold', 'APP');
    let comp = (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' color='#000000' />
      </View>
    );

    if (this.state.fetching === false) {
      // render app after fetching data from storage is completed
      // and app style set to the theme choosen
      comp = <Nav screenProps={this.storageData} />;
    }

    return (
      <View style={styles.container}>
        {comp}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
