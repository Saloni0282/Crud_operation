import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload.map((user) => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        };
      });
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  updateUser: (state, action) => {
           const  index = state.users.findIndex(x => x.id === action.payload.id)
            state.users[index] = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                mobile: action.payload.mobile,
            }
        },
    deleteUser: (state, action) => {
      const id = action.payload.id;
      state.users = state.users.filter((u) => u.id !== id);
    },
    showUserById: (state, action) => {
      const userId = action.payload.id;
      const user = state.users.find((x) => x.id === userId);
      return { ...state, user }; // Update the state with the selected user
    },
  },
});

export const { getUser, addUser, updateUser, deleteUser, showUserById } =
  userSlice.actions;
export default userSlice.reducer;
