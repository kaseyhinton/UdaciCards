import React from "react";
import { ScrollView, StyleSheet, Alert, Button, View } from "react-native";
import { deleteAllDecks } from "../database/db";
import ToggleSwitch from "toggle-switch-react-native";

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      notificationsOn: false
    };
  }

  static navigationOptions = {
    title: "Settings"
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between"
        }}
      >
        <ToggleSwitch
          isOn={this.state.notificationsOn}
          onColor="#841584"
          offColor="#eeeeee"
          label="Daily Notification"
          style={{ flex: 1 }}
          labelStyle={{ color: "#757575", fontWeight: "500", fontSize: 20 }}
          size="large"
          onToggle={isOn => this._handleNotificationOnPress()}
        />
        <View>
          <Button
            onPress={() => this._handleDeleteAllDecksPressed()}
            title="DELETE ALL DECKS"
            color="#f44336"
          />
        </View>
      </ScrollView>
    );
  }

  async _handleNotificationOnPress() {
    this.setState({ notificationsOn: !this.state.notificationsOn });
  }

  async _handleDeleteAllDecksPressed() {
    Alert.alert(
      "Destructive Action",
      "This will delete all decks. Would you like to continue?",
      [
        { text: "NO" },
        {
          text: "YES",
          onPress: async () => {
            try {
              await deleteAllDecks();
              this.props.navigation.navigate("Home");
            } catch (error) {
              alert(error);
            }
          }
        }
      ]
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
