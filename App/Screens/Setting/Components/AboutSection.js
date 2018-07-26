/* eslint-disable react/forbid-foreign-prop-types, react/no-typos, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Platform } from 'react-native';

import { styles } from '../../../Styles';

const AboutSection = ({ appVersion, appName, appBuildNumber, appBundleId }) => (
  <View style={styles.setting.aboutSection}>
    <Image
      style={styles.setting.aboutSectionImage}
      source={require('../../../../icon.png')}
    />
    <View style={styles.setting.aboutSectionBody}>
      <Text style={styles.setting.aboutSectionAppName}>{appName}</Text>
      <Text style={styles.setting.aboutSectionAppVersion}>{appVersion}</Text>
      <Text style={styles.setting.aboutSectionAppBuildNumber}>-{appBuildNumber}</Text>
    </View>
    <View>
      {(__DEV__) ? <Text style={styles.setting.aboutSectionAppDevMode}>{appBundleId}</Text> : null}
    </View>
  </View>
);

AboutSection.propTypes = {
  appVersion: PropTypes.string,
  appName: PropTypes.string,
  appBuildNumber: Platform.OS === 'ios' ? PropTypes.string : PropTypes.number,
  appBundleId: PropTypes.string
};

AboutSection.defaultProps = {
  appName: 'Currency Converter',
  appBundleId: null,
  appBuildNumber: null,
  appVersion: null
};

export default AboutSection;
