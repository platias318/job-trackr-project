import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/stores/store";
import type { User } from "@/types/user.types";

export interface CommonState {
  user: User | null;
  isUserAuthenticated: boolean;
  isAuthLoading: boolean;
}

export const initialState: CommonState = {
  user: null,
  isUserAuthenticated: false,
  isAuthLoading: true,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    updateUser(state: CommonState, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isUserAuthenticated = true;
      state.isAuthLoading = false;
    },
    updateClearUser(state: CommonState) {
      state.user = null;
      state.isUserAuthenticated = false;
      state.isAuthLoading = false;
    },
    updateIsLoading(state: CommonState, action: PayloadAction<boolean>) {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { updateUser, updateClearUser, updateIsLoading } =
  commonSlice.actions;

export const selectUser = (state: RootState) => state.common.user;
export const selectIsLoading = (state: RootState) => state.common.isAuthLoading;
export const selectIsUserAuthenticated = (state: RootState) =>
  state.common.isUserAuthenticated;
export const selectIsAuthLoading = (state: RootState) =>
  state.common.isAuthLoading;

export default commonSlice.reducer;
