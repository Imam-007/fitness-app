import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'auth',
  initialState : {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null
  },
  reducers: {
    setCredential: (state, action) => {
    },
    logout: (state) => {
    },
  },
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;