import React from "react";

// create a context
const SearchContext = React.createContext({
  location: "Seattle,WA",
  animal: "",
  breed: "",
  breeds: [],
  handleAnimalChange(){},
  handleBreedChange(){},
  handleLocationChnage(){},
  getBreeds(){}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;