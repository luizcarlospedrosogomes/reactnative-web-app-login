import React, { Component } from 'react';
import { StyleSheet, View , Text} from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import Menu from './components/Menu';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';

import { isWeb, token} from './helpers';

let Router;
if (isWeb) {
 Router = require('react-router-dom').BrowserRouter;
} else {
 Router = require('react-router-native').NativeRouter;
}

if (isWeb) {
  const iconFont = require('react-native-vector-icons/Fonts/MaterialIcons.ttf');
  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: "Material Icons";
  }`;

  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

  document.head.appendChild(style);
}


class App extends Component {
  state = {
    logged: false
  }

  componentWillMount() {
    token()
    .then(res => { this.setState({ logged: res})      
    }).catch(err => alert("Erro"));

  }
  
  render() {
    return (
      <Router>
        <View style={styles.container}>
        {this.state.logged ?
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Home} />
            <Route path="/sair" component={Logout} />
            <Redirect to="/" />
          </Switch>
          :<Login/>
        }
          {this.state.logged ? <Menu /> : <Text></Text>}
          
        </View>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
