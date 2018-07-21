import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from '../../../Styles';

const XE = (props) => {
  if (props.showXE === true) {
    return (
      <View style={styles.home.xeContainer}>
        <Animatable.View animation='zoomIn'>
          <TouchableOpacity onPress={props.openWebView} style={styles.home.xeContainerBody}>
            <Image
              style={styles.home.xeContainerBodyImage}
              source={require('../../../Assets/Img/xe.png')}
            />
            <Text style={styles.home.xeContainerBodyText}>Open in XE Currency Converter</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
  return null;
};

XE.propTypes = {
  showXE: PropTypes.bool.isRequired,
  openWebView: PropTypes.func.isRequired
}

export default XE;
