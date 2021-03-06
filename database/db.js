import { AsyncStorage } from "react-native";

export const saveDeck = async deck => {
  try {
    await AsyncStorage.setItem(`@deck:${deck.id}`, JSON.stringify(deck));
  } catch (error) {
    alert(error);
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (error) {
    alert(error);
  }
};

export const saveCard = async (card, deckId) => {
  try {
    const DECK = JSON.parse(await getDeck(deckId));
    DECK.questions.push(card);
    saveDeck(DECK);
  } catch (error) {
    alert(error);
  }
};

export const getDeck = async id => {
  try {
    const value = await AsyncStorage.getItem(`@deck:${id}`);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    alert(error);
  }
};

export const getDecks = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter(key => key.startsWith("@deck"));
    const stores = await AsyncStorage.multiGet(filteredKeys);
    return stores.map((result, i, store) => JSON.parse(store[i][1]));
  } catch (error) {
    alert(error);
  }
};

export const deleteAllDecks = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter(key => key.startsWith("@deck"));
    filteredKeys.forEach(async key => {
      await removeItem(key);
    });
  } catch (error) {
    alert(error);
  }
};
