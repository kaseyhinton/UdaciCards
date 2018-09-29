import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from "react-native";
import { saveCard } from "../database/db";
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
    title: "Add Card"
  };

  async onSave() {
    if (!this.state.question || !this.state.answer) return;

    const CARD = {
      id: uuidv4(),
      question: this.state.question,
      answer: this.state.answer
    };

    const DECK_ID = this.props.navigation.getParam("deck").id;

    try {
      await saveCard(CARD, DECK_ID);
      this.setState({ question: "", answer: "" });
      this.props.navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>Question</Text>
          <TextInput
            selectionColor="#841584"
            underlineColorAndroid="#841584"
            placeholder="Type the question here"
            style={{ height: 55, marginBottom: 24 }}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
          <Text>Answer</Text>
          <TextInput
            selectionColor="#841584"
            underlineColorAndroid="#841584"
            placeholder="Type the answer here"
            style={{ height: 55, marginBottom: 24 }}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
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
