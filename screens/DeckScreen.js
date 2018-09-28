import React from "react";
import { ScrollView, StyleSheet, Text, Button, View } from "react-native";
import FAB from 'react-native-fab';

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
      <ScrollView style={styles.container}
            contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
        <Text style={styles.mainText}>{this.state.deck.title} ({this.state.deck.questions.length} cards)</Text>
          {this.state.deck.questions.length > 0 &&
            <View style={{ flex: 1, marginTop: 16 }}>
              <Button
                onPress={() => navigate("Quiz", { deck: this.state.deck })}
                title="Start Quiz"
                color="#841584"
              />
            </View>
          }
        <FAB
          onClickAction={() =>
            navigate("AddCard", {
              deck: this.state.deck
            })
          }
          style={styles.fab}
          buttonColor="#841584"
          iconTextColor="#ffffff"
        />
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
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16
  }
});
