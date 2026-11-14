import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenDecoder } from "../utils/helper";
import { setLocalStorage } from "../utils/helper";
const hanldeError = (error) => {
  const errorMessage = error.response?.data.errorMessage || [
    error.response?.statusText || ["someting went wrong"],
  ];
  console.log(errorMessage);
  return errorMessage;
};

const pendingState = (state) => {
  state.loading = true;
};

const fulfilledState = (state, action) => {
  const userInfo = tokenDecoder(action.payload?.token);
  state.loading = false;
  state.isAuthenticated = Boolean(userInfo);
  state.isRegistered = Boolean(!userInfo);
  state.successMessage = action.payload.message;
  state.userInfo = userInfo || action.payload.data;
};

const rejectedState = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const postUser = createAsyncThunk(
  "data/post",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/register-user", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(hanldeError(err));
    }
  },
);

export const loginUser = createAsyncThunk(
  "data/login",

  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/login-user", data);
      setLocalStorage("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(hanldeError(err));
    }
  },
);
// export const userLogout = createAsyncThunk(
//   "user/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("user yaha tak work kar raha hain");
//       const res = await axios.delete("/api/logout-user");

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(hanldeError(err));
//     }
//   },
// );

let initialState = {
  loading: false,
  error: null,
  successMessage: "",
  isAuthenticated: false,
  isRegistered: false,
  userInfo: null,
};

const decodeUserInfo = tokenDecoder(localStorage.getItem("token"));
initialState.userInfo = decodeUserInfo;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    successClear(state) {
      state.successMessage = "";
      state.isRegistered = false;
      state.isAuthenticated = false;
    },
    errorClear(state) {
      state.error = null;
    },
    userLogout(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = "";
      state.isAuthenticated = false;
      state.isRegistered = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  register builders
      .addCase(postUser.pending, pendingState)
      .addCase(postUser.fulfilled, fulfilledState)
      .addCase(postUser.rejected, rejectedState)

      // login builder
      .addCase(loginUser.pending, pendingState)
      .addCase(loginUser.fulfilled, fulfilledState)
      .addCase(loginUser.rejected, rejectedState);

    // // userLogout
    // .addCase(userLogout.pending, pendingState)
    // .addCase(userLogout.fulfilled, fulfilledState)
    // .addCase(userLogout.rejected, rejectedState);
  },
});
export const { successClear, errorClear, userLogout } = userSlice.actions;
export default userSlice.reducer;
