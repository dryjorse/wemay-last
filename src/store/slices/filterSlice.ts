import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilterSliceState {
  categories: string[];
  promotionTypes: string[];
  discountPercentage: number;
  sortValue: string;
}

const initialState: IFilterSliceState = {
  categories: [],
  promotionTypes: [],
  discountPercentage: 0,
  sortValue: "По умолчанию",
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setPromotionTypes(state, action: PayloadAction<string[]>) {
      state.promotionTypes = action.payload;
    },
    setDiscountPercentage(state, action: PayloadAction<number>) {
      state.discountPercentage = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sortValue = action.payload;
    },
  },
});

export const {
  setCategories,
  setPromotionTypes,
  setDiscountPercentage,
  setSort,
} = filterSlice.actions;
export default filterSlice.reducer;
