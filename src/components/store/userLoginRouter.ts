import { createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
  dietGoal?: string;
  activityAmount?: string;
  height?: number;
  weight?: number;
  gender?: string;
  profileImage?: string;
  targetCalories?: number;
  age?: number;
  birthday?: string;
  username: string;
}

export const initialState: { userInfo: UserInfo } = {
  userInfo: {
    username: '',
    profileImage: '',
    dietGoal: '',
    activityAmount: '',
    height: 0,
    weight: 0,
    gender: '',
    targetCalories: 0,
    age: 0,
    birthday: '',
  },
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload;
    },
    logoutUser(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { loginUser, logoutUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;
