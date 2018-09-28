import React from "react";
import { ScrollView, StyleSheet, Text, Button, View } from "react-native";

export default class DeckScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: {
        questions: [

        ]
      }
    };
  }

  static navigationOptions = {
    title: "Deck"
  };

  componentDidMount() {
    this.setState({ deck: this.props.navigation.getParam("deck") });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.state.deck) !==
      JSON.stringify(this.props.navigation.getParam("deck"))
    ) {
      this.setState({ deck: this.props.navigation.getParam("deck") });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.mainText}>{this.state.deck.title} ({this.state.deck.questions.length} cards)</Text>
        <View style={{ marginTop: 16 }}>
          <Button
            onPress={() =>
              navigate("AddCard", {
                deck: this.state.deck
              })
            }
            title="Add Card"
            color="#841584"
          />
        </View>
        {this.state.deck.questions.length > 0 &&
          <View style={{ marginTop: 16 }}>
            <Button
              onPress={() => navigate("Quiz", { deck: this.state.deck })}
              title="Start Quiz"
              color="#841584"
            />
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  mainText: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16
  }
});
