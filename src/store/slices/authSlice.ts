import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  isAuth: boolean;
}

const initialState: State = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setIsAuth } = authSlice.actions;
