import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {send, subscribe } from 'react-native-training-chat-server';
import RevesedFlatList from 'react-native-reversed-flat-list';

const CHANNEL = 'Problemi';

export default class Chat extends Component <{}> {
  state= {
    typing: "",
    messages: [],
  };
  static navigationOptions = {
    title: 'Chat',
  };

componentDidMount (){
  subscribe(CHANNEL, messages => {
    this.setState({messages});
  });
}

async sendMessage(){
  await send({
    channel: CHANNEL,
    sender: this.props.navigation.state.params.name,
    message: this.state.typing
  });

  this.setState({
    typing:'',
  });
}

renderItem({item}) {
  return(
    <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
    </View>
  );
}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <RevesedFlatList data={this.state.messages} renderItem= {this.renderItem}/>
      <View style={styles.footer}>
        <TextInput
            value={this.state.typing}
            onChangeText={text => this.setState({typing: text})}
            style={styles.input}
            autoCapitalize = "sentences"
            underlineColorAndroid="transparent"
            placeholder="Type here"
        />
        <TouchableOpacity onPress={this.sendMessage.bind(this)}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  message: {
    fontSize: 18,
  },
  row: {
    padding: 20,
    borderBottomWidth:1 ,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection:'row',
    backgroundColor: '#eee',
  },
  input: {
    flex:1,
    paddingHorizontal: 20,
    paddingVertical:10,
    fontSize:18,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize:16,
    padding:20,
  },
});
