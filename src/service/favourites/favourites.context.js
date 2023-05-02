import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const FavouritesContext = createContext();
export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const add = (pet) => {
    setFavourites([...favourites, pet]);
  };

  const remove = (pet) => {
    const newFavourites = favourites.filter((x) => x.name !== pet.name);
    setFavourites(newFavourites);
  };
  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

const styles = StyleSheet.create({});
