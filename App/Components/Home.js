import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

export default class Home extends Component <{}> {

  constructor (props) {
    super(props);
    this.state = {
      name:''
    }
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Enter your name
        </Text>
        <View style={styles.TextInputContainer}>
        <TextInput style={styles.TextInput}
        underlineColorAndroid='transparent'
        placeholder="John Carpenter"
        autoCapitalize = "sentences"
        onChangeText={(text) => this.setState({name: text,})}
        value={this.state.name}
      />
      </View>
      <View style={styles.Button}>
        <Button
          onPress={
            ()=> navigate("Second", {name: this.state.name})
          }
          title = 'Go to Chat'
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  TextInputContainer: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 40,
  },
  TextInput: {
    flex:1,
    height: 40,
    borderRadius:5,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },
  Button: {
    margin:10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
