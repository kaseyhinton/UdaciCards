import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { WebBrowser } from "expo";
import FAB from 'react-native-fab';
import { MonoText } from "../components/StyledText";
import { getDecks } from "../database/db";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      decks: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => await this.getDecks()),
    ];
  }
  
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  async getDecks() {
    try {
      const decks = await getDecks();
      this.setState({ decks });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require("../assets/images/app-icon.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this.state &&
              this.state.decks &&
              this.state.decks.length > 0 &&
              this.state.decks.map(deck => (
                <MonoText
                  onPress={() =>
                    navigate("Deck", {
                      deck
                    })
                  }
                  key={deck.id}
                  style={styles.deckLink}
                >
                  {deck.title} ({deck.questions.length} cards)
                </MonoText>
              ))}
          </View>
          <FAB
            onClickAction={() =>
              navigate("AddDeck")
            }
            style={styles.fab}
            buttonColor="#841584"
            iconTextColor="#ffffff"
          />
        </ScrollView>
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 32
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  deckLink: {
    fontSize: 18,
    textAlign: "center",
    color: "#616161",
    paddingTop: 8,
    paddingBottom: 8
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16
  }
});
