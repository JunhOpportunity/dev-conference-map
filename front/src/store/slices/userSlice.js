import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  id: 1,
  name: "김준호",
  email: "test@google.com",
  interest: "프론트엔드",
  wishlist: [
    {
      conf_name: "FECONF2024",
      date: "2024-12-12",
      conf_id: "fii8qof88n8x8qnax8xuh",
      place: "코엑스",
    },
    {
      conf_name: "TEO CONF",
      date: "2024-12-20",
      conf_id: "pyki8j39ducuxoqjsnx833",
      place: "세종대학교 광개토관",
    },
  ],
  posts: [
    {
      id: 101,
      title: "FECONF2024 티켓 양도합니다",
      created_at: "2024-12-09",
    },
    {
      id: 102,
      title: "TEO CONF 같이 가실 분 구합니다",
      created_at: "2024-12-10",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateWishlist: (state, action) => {
      const { userId, wishlistItem } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.wishlist.push(wishlistItem);
      }
    },
    addPost: (state, action) => {
      const { userId, post } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.posts.push(post);
      }
    },
  },
});

export const { addUser, updateWishlist, addPost } = userSlice.actions;
export default userSlice.reducer;
