'use strict';

import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {

  static propTypes: {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    const propsStyle = this.props.style || {};

    return (
      <TouchableOpacity
        style={[styles.button]}
        underlayColor={'#C4C4C4'}
        onPress={this.props.onPress}
        >
        <Text style={[styles.buttonText]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }

};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    flex: 1,
    color: 'black',
    alignSelf: 'center'
  }
});
