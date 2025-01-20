import { createSlice } from "@reduxjs/toolkit";
import { fetchItems, postItem } from "./operations";

const diagramSlice = createSlice({
  name: "diagram",
  initialState: {
    items: [],
    choosedItem: null,
    choosedDiagram: null,
  },
  reducers: {
    setItemsState: (state, action) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.choosedItem = action.payload;
    },
    setSelectedDiagram: (state, action) => {
      state.choosedDiagram = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(postItem.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload.data];
      }),
});

export const { setItemsState, setSelectedItem, setSelectedDiagram } =
  diagramSlice.actions;

const diagramReducer = diagramSlice.reducer;
export default diagramReducer;

export const selectDiagrams = (state) => state.diagram.items;
export const selectChoosedItem = (state) => state.diagram.choosedItem;
