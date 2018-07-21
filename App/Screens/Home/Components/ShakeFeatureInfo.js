import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import normalize from '../../../Lib/normalizeText';
import { styles } from '../../../Styles';

const ShakeFeatureInfo = () => (
  <Animatable.View style={styles.home.shakeFeatureInfoContainer} animation='slideInUp'>
    <Animatable.View
      animation='shake'
      easing='ease-out'
      iterationCount='infinite'
      iterationDelay={1500}
    >
      <Icon
        name='ios-phone-portrait-outline'
        size={normalize(20)}
        color={styles.vars.colors.white}
      />
    </Animatable.View>
    <Text style={styles.home.shakeFeatureInfoText}>
      Shake phone to swap countries.
      <Text style={{ fontStyle: 'italic' }}> Give it a try !</Text>
    </Text>
  </Animatable.View>
);

export default ShakeFeatureInfo;
