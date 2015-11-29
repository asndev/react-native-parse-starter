'use strict';

import React, {
  Component,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Parse from 'parse/react-native';
import { Navigator, NavBarButton, NavBarTitle }
  from 'react-native-rj-navigator';

export default class Home extends Component {

  _setupNavigation() {
    this.props.navComponent.setNavItems({
      title: {
        component: (<NavBarTitle text={'Home'}/>)
      },
      leftItem: {
        component: (<NavBarButton text={''} />),
        event: function() {}
      },
      rightItem: {
        component: (<NavBarButton text={'Logout'}/>),
        event: function() {}
      }
    });
  }

  constructor(props, context) {
    super(props, context);
    this.state  = {user: null};
    this._setupNavigation();
  }

  componentWillMount() {
    Parse.User
      .currentAsync()
      .then((user) => {
        this.setState({user: user});
      });
  }

  render() {
    if (!this.state.user) {
      return <Text>Loading ...</Text>;
    }

    const username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <Text>Logged in as: {username}</Text>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
