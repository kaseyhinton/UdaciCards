import { AsyncStorage } from "react-native";

export const saveDeck = async deck => {
  try {
    await AsyncStorage.setItem(`@deck:${deck.id}`, JSON.stringify(deck));
  } catch (error) {
    console.log(error);
  }
};

export const saveCard = async (card, deckId) => {
  try {
    const DECK = JSON.parse(await getDeck(deckId));
    DECK.questions.push(card);
    saveDeck(DECK);
  } catch (error) {
    console.log(error);
  }
};

export const getDeck = async id => {
  try {
    const value = await AsyncStorage.getItem(`@deck:${id}`);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async () => {
  try {
    return AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
