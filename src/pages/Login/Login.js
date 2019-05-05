import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  AsyncStorage,
} from 'react-native';
import Button from '../../components/Button';
import { isWeb, isDesktop } from '../../helpers';

const extractValueFromEvent = (event) => event.target ? event.target.value : event;
const extractKeyFromEvent = (event) => event.nativeEvent ? event.nativeEvent.key : event.key;

class Login extends Component {
  state = {
    username: '',
    passwd: '',
  }

  onUsernameChange = (event) => {
    this.setState({ username: extractValueFromEvent(event) });
  }
  onPasswdChange = (event) => {
    this.setState({ passwd: extractValueFromEvent(event) });
  }

  submit = () => {
    const { username, passwd } = this.state;
    const requestInfo = {
      method:'POST',
      body:JSON.stringify({email: username, senha: passwd}),
      headers:new Headers({'content-type' : 'application/json'})
  };
  
  fetch('http://192.168.0.141/api/login/parks',requestInfo)            
      .then(response =>{
      
      if(response.status === 200 ||  response.status === 201){
         // this.setState({cod:response.status, status:"enviado"});
          return response.json();
      }else{
        alert('Ocorreu um erro durante a autencação. Verifique seus dados');
      }
  }).then(dados =>{
      if(dados){
          if(isWeb){
            localStorage.setItem('token',dados.token);
          }else{
           AsyncStorage.setItem('token', dados.token)
          }
            this.props.history.push('/admin');
      }
  })

  }

  handleKeyDown = (event) => {
    if (extractKeyFromEvent(event) === 'Enter') {
        this.submit();
    }
  }

  focusOnMessage = () => this.messageInput && this.messageInput.focus();

  render() {
    return (
      <ScrollView  style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Entrar</Text>
          
            <TextInput
              returnKeyType="go"
              onChangeText={this.onUsernameChange}
              placeholder="Email"
              style={styles.textinput}
              onKeyPress={this.handleKeyDown}
              onSubmitEditing={this.focusOnMessage}
            />
          
          
          <TextInput
            ref={ref => this.messageInput = ref}
            onChangeText={this.onPasswdChange}
            placeholder="Senha"
            style={styles.textinput}
            onKeyPress={this.handleKeyDown}
            returnKeyType="go"
            onSubmitEditing={this.submit}
          />
          <Button onClick={this.submit} style={styles.button}>Entrar</Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  content: {
    position: 'relative',
    flex: 1,
    marginTop: '20%',
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  label: {
    color: '#000',
    margin: 10,
    alignSelf: 'flex-start',
  },
  textinput: {
    borderRadius: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    color: '#000',
    padding: 5,
    margin: 10,
    width: isDesktop ? 350 : '80%',
  },
  button:{
    width: '100%', 
    fontSize: 32,
  }
});

export default Login;
