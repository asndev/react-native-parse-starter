'use strict';

import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Parse from 'parse/react-native';
import Button from '../common/button';
import SignUp from './signup';
import Home from '../home';

import { Navigator, NavBarButton, NavBarTitle }
  from 'react-native-rj-navigator';

export default class SignIn extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };

    this.props.navComponent.setNavItems({
      title: {
        component: (<NavBarTitle text={'login'}/>)
      },
      leftItem: {
        component: (<NavBarButton text={''} />),
        event: function() {}
      },
      rightItem: {
        component: (<NavBarButton text={'Sign Up'}/>),
        event: function() {
          this.onSignUpPress();
        }.bind(this)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>hello sir</Text>

        <View style={styles.inputView}>
          <TextInput
            placeholder={'username'}
            style={styles.input}
            value={this.state.username}
            onChangeText={(text) => this.setState({username: text})}
            />
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder={'password'}
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            />
        </View>

        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <Button
          text={'login'}
          onPress={this.onSignInPress.bind(this)}
          />
      </View>
    );
  }

  onSignUpPress() {
    console.debug('on sign up press');
    this.props.navigator.push({
      component: SignUp
    });
  }

  onSignInPress() {
    console.debug('on sign in press');
    this.setState({errorMessage: ''});
    Parse.User.logIn(this.state.username, this.state.password, {
      success: (user) => {
        this.props.navigator.immediatelyResetRouteStack([
          {component: Home}
        ]);
      },
      error: (data, error) => {
        this.setState({errorMessage: error.message});
      }
    });
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 4,
    height: 40,
    width: 250,
    alignSelf: 'center'
  },
  inputView: {
    borderBottomWidth: 1.5,
    borderColor: '#363636',
    marginBottom: 10,
    marginTop: 10
  },
  buttons: {
    flexDirection: 'row'
  },
  error: {
    color: 'red'
  }
});
