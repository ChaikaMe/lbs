import { configureStore } from "@reduxjs/toolkit";
import diagramReducer from "./diagram/slice";

const store = configureStore({
  reducer: {
    diagram: diagramReducer,
  },
});

export default store;
