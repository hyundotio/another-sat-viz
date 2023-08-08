import { createSlice } from "@reduxjs/toolkit";

export const satellitesSlice = createSlice({
  name: "satellites",
  initialState: {
    searchFilterValue: "",
    searchFilterValue2: "",
    showingSearchItemsCount: 100,
  },
  reducers: {
    setSearchFilterValue: (state, { payload }) => {
      return {
        ...state,
        searchFilterValue: payload,
      };
    },
    setSearchFilterValue2: (state, { payload }) => {
      return {
        ...state,
        searchFilterValue2: payload,
      };
    },
    setShowingSearchItemsCount: (state, { payload }) => {
      return {
        ...state,
        showingSearchItemsCount: payload,
      };
    },
  },
});

export const { setSearchFilterValue, setSearchFilterValue2, setShowingSearchItemsCount } = satellitesSlice.actions;
export default satellitesSlice.reducer;
