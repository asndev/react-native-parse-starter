'use strict';

import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import Home from '../home';
import Parse from 'parse/react-native';
import Button from '../common/button';

import { Navigator, NavBarButton, NavBarTitle }
  from 'react-native-rj-navigator';

export default class SignUp extends Component {

  _setupNavigation() {
    this.props.navComponent.setNavItems({
      title: {
        component: (<NavBarTitle text={'sign up'}/>)
      },
      leftItem: {
        component: (<NavBarButton text={'back'} />),
        event: function() {
        }.bind(this)
      },
      rightItem: {
        component: (<NavBarButton text={''} />),
        event: function() {}
      }
    });
  }

  constructor(props, context) {
    console.debug('Constructing sign up component');
    super(props, context);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
    this._setupNavigation();
  }

  render() {
    console.debug('rendering signup component');
    return (
      <View style={styles.container}>
        <Text>sign up</Text>

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

        <View style={styles.inputView}>
          <TextInput
            placeholder={'password confirmation'}
            secureTextEntry={true}
            style={styles.input}
            value={this.state.passwordConfirmation}
            onChangeText={(text) => this.setState({passwordConfirmation: text})}
            />
        </View>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <Button
          text={'create'}
          onPress={this.onCreateAccountPress.bind(this)}
          />
      </View>
    );
  }

  onBackPress() {
    console.debug('on back press');
    this.props.navigator.pop();
  }

  onCreateAccountPress() {
    console.debug('on create account press');
    this.setState({errorMessage: ''});

    if (this.state.password != this.state.passwordConfirmation) {
      return this.setState({errorMessage: 'Passwords do not match.'});
    }

    if (this.state.password === '') {
      return this.setState({errorMessage: 'Password can\'t be empty.'});
    }

    if (this.state.username === '') {
      return this.setState({errorMessage: 'Username can\'t be empty.'});
    }

    let user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    user.signUp(null, {
      success: (user) => {
        this.props.navigator.immediatelyResetRouteStack([
          {component: Home}
        ]);
      },
      error: (user, error) => {
        this.setState({errorMessage: error.message});
      }
    });
  }

};

const styles = StyleSheet.create({
  topbar: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    backgroundColor: '#003366',
    left: 0,
    right: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingRight: 25,
    paddingLeft: 25
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    width: 250,
    alignSelf: 'center'
  },
  inputView: {
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    marginBottom: 10,
    marginTop: 10
  },
  buttonsContainer: {
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
});
