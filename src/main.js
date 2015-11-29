'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Parse from 'parse/react-native';
import SignIn from './components/auth/signin';
import { parseConfig } from '../config.dev.js';
import { Navigator } from 'react-native-rj-navigator';

export default class Main extends Component {

  constructor(props, context) {
    super(props, context);
    Parse.initialize(parseConfig.id, parseConfig.key);
  }

  render() {
    // Set up the navigator with the inital view.
    // TODO: get last login from the localstorage to enable 'keep logged in'
    return (
      <Navigator
        initialRoute={{component: SignIn}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        />
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navbar: {
    backgroundColor: '#003366',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingRight: 15,
    paddingLeft: 15
  }
});
