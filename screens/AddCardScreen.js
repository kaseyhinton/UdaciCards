import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, Button } from "react-native";
import { saveCard, getDeck } from "../database/db";
import uuidv4 from "uuid/v4";

export default class AddCardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      answer: ""
    };
  }

  static navigationOptions = {
    title: "Add CARD"
  };

  async onSave() {
    if (!this.state.question || !this.state.answer) return;

    const CARD = {
      id: uuidv4(),
      question: this.state.question,
      answer: this.state.answer
    };

    try {
      await saveCard(CARD, "f75f27bd-ee0f-41fe-a661-d9acb470eaaa");
      const updatedDeck = await getDeck("f75f27bd-ee0f-41fe-a661-d9acb470eaaa");
      console.log(updatedDeck);
      //TODO: add redirect on success
    } catch (error) {
      console.log(error);
      //TODO: throw error
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Add Deck</Text>
        <TextInput
          style={{ height: 40, marginTop: 24, marginBottom: 24 }}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          style={{ height: 40, marginTop: 24, marginBottom: 24 }}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
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
