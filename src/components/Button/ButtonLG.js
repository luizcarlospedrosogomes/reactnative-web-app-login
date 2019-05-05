import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { shadow } from '../../helpers';

class ButtonLG extends Component {
  render() {
    const { onClick, children } = this.props;

    return (
      <TouchableHighlight
        onPress={onClick}
        style={styles.button}
        underlayColor={'#0A84D0'}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    padding: 20,
    width:'46%',
    marginVertical: 10,
    marginTop: 10,
    
    backgroundColor: '#1B95E0',
    ...shadow,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default ButtonLG;
