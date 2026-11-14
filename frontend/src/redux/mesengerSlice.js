import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
console.log("mesger slice is working first time", Date.now().toLocaleString());
import axios from "axios";

const findIndex = (state, action) => {
  const index = current(state.friends).findIndex(
    (fd) =>
      fd._id === action.payload?.reciverId ||
      fd._id === action.payload?.senderId,
  );
  return index;
};

const hanldeError = (error) => {
  const errorMessage = error.response.data.errorMessage || [
    error.response.statusText,
  ];
  return errorMessage;
};

const handlePendding = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

export const getFriends = createAsyncThunk(
  "get/friends",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/get-friends");
      const friends = res.data.data;
      return friends;
    } catch (err) {
      return rejectWithValue(hanldeError(err));
    }
  },
);

export const postChat = createAsyncThunk(
  "post/chat",
  async (chatData, { rejectWithValue }) => {
    if (!chatData) return;
    try {
      const res = await axios.post("api/create-chat", chatData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(hanldeError(err));
    }
  },
);

export const seenMessage = createAsyncThunk(
  "seen/chat",
  async (msg, { rejectWithValue }) => {
    if (!msg) return;
    try {
      const response = await axios.put("/api/seen-message", msg);
      return response.data;
    } catch (err) {
      rejectWithValue(hanldeError(err));
    }
  },
);

export const deleveredMessage = createAsyncThunk(
  "delereved/chat",
  async (msg, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/delevered-message", msg);
      return response.data;
    } catch (err) {
      rejectWithValue(hanldeError(err));
    }
  },
);

export const seenAllMessage = createAsyncThunk(
  "seen/all",
  async (msg, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/seen-all-message", msg);
      return response.data;
    } catch (err) {
      console.log(err.response.statusText);
      rejectWithValue(hanldeError(err));
    }
  },
);

export const postImageChat = createAsyncThunk(
  "post/imgChat",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/send-image", formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(hanldeError(err));
    }
  },
);

export const getChat = createAsyncThunk(
  "chat/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/get-chat/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(hanldeError(err));
    }
  },
);
export const testing = createAsyncThunk("testing", async (data) => {
  console.log("this is the testing message", data);
});

const initialState = {
  friends: [],
  chats: [],
  sendSuccessMessage: false,
  currentFriend: null,
  loading: false,
  error: null,
  newFriend: null,
  responseChatId: null,
};

const mesengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addNewChat(state, action) {
      console.log("add new chat reducer is working", action.payload);
      state.chats = [...state.chats, action.payload];
    },
    updateDeleveredChat(state, action) {
      if (state.chats.length > 0) {
        state.chats[state.chats.length - 1].status = action.payload;
      }
    },

    updateSeenChat(state, action) {
      if (state.chats.length > 0) {
        state.chats = current(state.chats)?.map((chat) => {
          if (chat.status !== "seen") {
            return {
              ...chat,
              status: action.payload,
            };
          } else {
            return chat;
          }
        });
      }
    },

    resetSendSuccess(state) {
      state.sendSuccessMessage = false;
    },
    updatedLastMessage(state, action) {
      const index = findIndex(state, action);
      if (index === -1) return;
      state.friends[index].lastMessage = action.payload;
    },

    updateCurrentFriend(state, action) {
      state.currentFriend = action.payload;
      state.responseChatId = null;
    },
    updateCount(state, action) {
      const index = findIndex(state, action);
      if (index === -1) return;
      state.friends[index].count++;
    },
    resetCount(state, action) {
      const index = findIndex(state, action);
      if (index === -1) return;
      state.friends[index].count = 0;
    },
    updateFriends(state, action) {
      state.friends = action.payload;
    },
    addNewFriends(state, action) {
      state.newFriend = action.payload;
    },
    addFriendToList(state, action) {
      state.friends.push(action.payload);
    },
    clearNewFriend(state) {
      state.newFriend = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, handlePendding)
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.currentFriend = action.payload[0];
        state.loading = false;
      })
      .addCase(getFriends.rejected, handleRejected)

      //  chat
      .addCase(getChat.pending, handlePendding)
      .addCase(getChat.fulfilled, (state, action) => {
        const responseId = action.meta.arg;
        if (responseId === state.currentFriend?._id) {
          state.chats = action.payload;
          state.loading = false;
          state.responseChatId = responseId;
        }
      })
      .addCase(getChat.rejected, handleRejected)

      // post chat
      .addCase(postChat.pending, handlePendding)
      .addCase(postChat.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload];
        state.sendSuccessMessage = true;
        state.loading = false;
      })
      .addCase(postChat.rejected, handleRejected)

      // upload image

      .addCase(postImageChat.pending, handlePendding)
      .addCase(postImageChat.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload];
        state.sendSuccessMessage = true;
        state.loading = false;
      })
      .addCase(postImageChat.rejected, handleRejected);

    // // seenmessage
    // .addCase(seenAllMessage.pending, handlePendding)
    // .addCase(seenAllMessage.rejected, handleRejected)

    // // handleSingleChat
    // .addCase(seenMessage.pending, handlePendding)
    // .addCase(seenMessage.rejected, handleRejected);
  },
});

export const {
  addNewChat,
  resetSendSuccess,
  updatedLastMessage,
  updateCurrentFriend,
  updateCount,
  resetCount,
  updateDeleveredChat,
  updateSeenChat,
  updateFriends,
  addNewFriends,
  addFriendToList,
  clearNewFriend,
} = mesengerSlice.actions;

export default mesengerSlice.reducer;
