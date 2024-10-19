import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SummaryApi from "../common";

export const fetchCurrentUser = createAsyncThunk(
  "user/currentLoggedIn",
  async function () {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        return dataApi.data;
      } else {
        throw new Error("There is no logged in user");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);


const initialState = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.pending, function (state) {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, function (state, action) {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCurrentUser.rejected, function (state, action) {
      state.isLoading = false;
      console.log(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
