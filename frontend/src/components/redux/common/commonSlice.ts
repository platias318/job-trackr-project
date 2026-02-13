import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";

export interface CommonState {
  value: string;
  isActive: boolean;
}

export const initialState: CommonState = {
  value: "",
  isActive: false,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    updateValue(state: CommonState, action: PayloadAction<string>) {
      state.value = action.payload;
    },

    updateIsActive(state: CommonState, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
  },
});

export const { updateValue, updateIsActive } = commonSlice.actions;

export const selectValue = (state: RootState) => state.common.value;
export const selectIsActive = (state: RootState) => state.common.isActive;

export default commonSlice.reducer;
