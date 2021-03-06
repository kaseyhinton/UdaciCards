import React from "react";
import { View, Stylesheet, AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";
import moment from "moment";

const NOTIFICATION_KEY = "udaciCards:notifications";

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
  return {
    title: "Practice with Udacicards!",
    body: "Keep up on your learning by reviewing your decks.",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export async function setLocalNotification() {
  const result = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const data = JSON.parse(result);
  if (data === null) {
    const status = (await Permissions.askAsync(Permissions.NOTIFICATIONS))
      .status;
    if (status === "granted") {
      Notifications.cancelAllScheduledNotificationsAsync();

      // VanillaJS Date
      // let tomorrow = new Date();
      // tomorrow.setDate(tomorrow.getDate() + 1);
      // tomorrow.setHours(20);
      // tomorrow.setMinutes(0);

      // Test notifications 1 minute
      // let tomorrow = moment().add(1, 'm').toDate();

      let tomorrow = moment()
        .add(1, "days")
        .hours(8)
        .startOf("hour")
        .toDate();

      Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tomorrow,
        repeat: "day"
      });

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
}
