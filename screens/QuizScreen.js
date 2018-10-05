import React from "react";
import { ScrollView, StyleSheet, Text, Button, View } from "react-native";

export default class QuizScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: {
        questions: []
      },
      idx: 0,
      correct: 0,
      showAnswer: false,
      finished: false
    };
  }

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

  static navigationOptions = {
    title: "Quiz"
  };

  render() {
    const deck = this.state.deck;
    const idx = this.state.idx;

    if (this.state.finished) {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.mainText}>Quiz Complete</Text>
            <Text style={styles.mainText}>
              You Scored{" "}
              {((this.state.correct / deck.questions.length) * 100).toFixed(1)}{" "}
              %
            </Text>
            <Text style={styles.subText}>
              {this.state.correct} / {deck.questions.length}
            </Text>
          </View>

          <View style={{ marginTop: 16 }}>
            <Button
              onPress={this._handleHomePress.bind(this)}
              title="Home"
              color="#841584"
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Button
              onPress={this._handleTryAgainPress.bind(this)}
              title="Try Again"
              color="#841584"
            />
          </View>
        </ScrollView>
      );
    }

    if (deck && deck.questions && deck.questions.length > 0) {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between"
          }}
        >
          <Text>{deck.title}</Text>
          <Text>
            {idx + 1} / {deck.questions.length}
          </Text>

          {this.state.showAnswer ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.mainText}>{deck.questions[idx].answer}</Text>
              <Text
                style={styles.subText}
                onPress={() => this.setState({ showAnswer: false })}
              >
                Show Question
              </Text>
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.mainText}>
                {deck.questions[idx].question}
              </Text>
              <Text
                style={styles.subText}
                onPress={() => this.setState({ showAnswer: true })}
              >
                Show Answer
              </Text>
            </View>
          )}

          <View style={{ marginTop: 16 }}>
            <Button
              onPress={this._handleCorrectPress.bind(this)}
              title="Correct"
              color="#841584"
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Button
              onPress={this._handleIncorrectPress.bind(this)}
              title="Incorrect"
              color="#841584"
            />
          </View>
        </ScrollView>
      );
    } else {
      return <Text>No Questions For This Quiz</Text>;
    }
  }

  _handleTryAgainPress() {
    this.setState({
      idx: 0,
      correct: 0,
      showAnswer: false,
      finished: false
    });
  }

  _handleHomePress() {
    this.setState({
      idx: 0,
      correct: 0,
      showAnswer: false,
      finished: false
    });
    this.props.navigation.navigate("Home");
  }

  _handleCorrectPress() {
    const update =
      this.state.idx === this.state.deck.questions.length - 1
        ? {
            finished: true,
            correct: this.state.correct + 1,
            showAnswer: false
          }
        : {
            correct: this.state.correct + 1,
            idx: this.state.idx + 1,
            showAnswer: false
          };
    this.setState(update);
  }

  _handleIncorrectPress() {
    const update =
      this.state.idx === this.state.deck.questions.length - 1
        ? { finished: true, showAnswer: false }
        : { idx: this.state.idx + 1, showAnswer: false };
    this.setState(update);
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
    marginBottom: 8
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
    color: "#841584"
  }
});
