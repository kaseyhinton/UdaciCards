import React from "react";
import { ScrollView, StyleSheet, Text, Button, View } from "react-native";

export default class DeckScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      answer: ""
    };
  }

  static navigationOptions = {
    title: "Deck"
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const DECK = navigation.getParam("deck");

    return (
      <ScrollView style={styles.container}>
        <Text>{DECK.title}</Text>
        <View style={{ marginTop: 16 }}>
          <Button
            onPress={() =>
              navigate("AddCard", {
                deck: DECK,
                getDecks: this.props.navigation.state.params.getDecks
              })
            }
            title="Add Card"
            color="#841584"
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            onPress={() => navigate("Quiz", { deck: DECK })}
            title="Start Quiz"
            color="#841584"
          />
        </View>
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
