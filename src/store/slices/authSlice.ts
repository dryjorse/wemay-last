import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import {
  IAuthFields,
  ILoginResponse,
  IRegisterResponse,
  MyKnownError,
} from "../../types/types";

export const register = createAsyncThunk<
  IRegisterResponse,
  IAuthFields,
  { rejectValue: MyKnownError }
>("auth/register", async (fields, { rejectWithValue }) => {
  try {
    const { data } = await authService.register(fields);
    console.log(data);
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
    else return rejectWithValue({ errorMessage: "Прозиошла ошибка" });
  }
});

export const login = createAsyncThunk<
  ILoginResponse,
  IAuthFields,
  { rejectValue: MyKnownError }
>("auth/register", async (fields, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(fields);
    console.log(data);
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
    else return rejectWithValue({ errorMessage: "Прозиошла ошибка" });
  }
});

const initialState = {};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(register.p)
  },
});
