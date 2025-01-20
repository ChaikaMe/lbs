import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_ADDRESS;

export const fetchItems = createAsyncThunk(
  "diagram/fetchItems",
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get("/api/diagrams/");
      return responce.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "diagram/deleteItem",
  async (itemId, thunkAPI) => {
    try {
      const responce = await axios.delete(`/api/diagrams/${itemId}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchItem = createAsyncThunk(
  "diagram/patchItem",
  async ({ itemId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/diagrams/${itemId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postItem = createAsyncThunk(
  "diagram/postItem",
  async (itemData, thunkAPI) => {
    try {
      const responce = await axios.post("/api/diagrams/", itemData);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
