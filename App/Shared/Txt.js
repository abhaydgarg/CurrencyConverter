/* eslint-disable react/forbid-foreign-prop-types, react/no-typos, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import { styles } from '../Styles';

const Txt = {
  White: function White(props) {
    return (
      <Text style={setStyle('white', props.textstyle)} {...props}>
        {props.children}
      </Text>
    );
  },
  Primary: function Primary(props) {
    return (
      <Text style={setStyle('primary', props.textstyle)} {...props}>
        {props.children}
      </Text>
    );
  }
};

function setStyle(color, textstyle) {
  let style = [{ color: styles.vars.colors[color] }];
  if (textstyle) {
    style.unshift(textstyle);
  }
  return style;
}

Txt.White.defaultProps = {
  children: '',
  textstyle: null
};

Txt.White.propTypes = {
  children: PropTypes.node,
  textstyle: Text.propTypes.style
};

Txt.Primary.defaultProps = Txt.White.defaultProps;
Txt.Primary.propTypes = Txt.White.propTypes;

export default Txt;
