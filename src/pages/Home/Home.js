import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import Button from '../../components/Button';
import logo from '../../logo.png';
import { token} from '../../helpers';

class Home extends Component {
  state = {
    spinValue: new Animated.Value(0),
  }
  componentWillMount() {
    token()
    .then(res => { 
      if(!res){
        this.props.history.push('/login');
      }      
    }).catch(err => alert("Erro"));

  }
  onClick = () => {
    const wasRotated = this.state.spinValue._value === 1;
    Animated.timing(
      this.state.spinValue,
      {
        toValue: wasRotated ? 0 : 1,
        duration: 250,
        easing: Easing.linear
      }
    ).start()
  }

  render() {

    return (
      <View style={styles.container}>
        <Animated.Image source={logo} style={[styles.logo]}/>
        <Text>AREA ADMINISTRATIVA</Text>
        {Platform.OS !== 'web' && <Text>Shake your phone to open the developer menu.</Text>}
        <Button onClick={this.onClick}>Rotate Logo</Button>
      </View>
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

export default Home;
