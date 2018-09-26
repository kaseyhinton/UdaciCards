import React from "react";
import { ScrollView, StyleSheet, Text, Button } from "react-native";

export default class QuizScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    title: "Quiz"
  };

  render() {
    const { navigation } = this.props;
    const DECK = navigation.getParam("deck");

    return (
      <ScrollView style={styles.container}>
        <Text>{DECK.title}</Text>
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
