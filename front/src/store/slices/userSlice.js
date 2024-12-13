import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  interest: [],
  wishlist: [],
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState, // 정의된 initialState를 여기에 전달
  reducers: {
    addUser: (state, action) => {
      const { id, name, email, interest, wishlist, posts } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.interest = interest;
      state.wishlist = wishlist || [];
      state.posts = posts || [];
    },
    updateWishlist: (state, action) => {
      const { wishlistItem } = action.payload;
      state.wishlist.push(wishlistItem);
    },
    addPost: (state, action) => {
      const { post } = action.payload;
      state.posts.push(post);
    },
  },
});

export const { addUser, updateWishlist, addPost, addComment } = userSlice.actions;
export default userSlice.reducer;
