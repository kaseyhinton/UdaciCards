import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, Button } from "react-native";
import { saveDeck } from "../database/db";
import uuidv4 from "uuid/v4";

export default class AddDeckScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  static navigationOptions = {
    title: "Add Deck"
  };

  async onSave() {
    if (!this.state.text) return;

    const DECK = {
      id: uuidv4(),
      title: this.state.text,
      questions: []
    };

    try {
      await saveDeck(DECK);
      this.props.navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Add Deck</Text>
        <TextInput
          style={{ height: 40, marginTop: 24, marginBottom: 24 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button onPress={this.onSave.bind(this)} title="SAVE" color="#841584" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  }
});
