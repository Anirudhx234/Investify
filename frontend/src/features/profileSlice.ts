import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData, ProfileState } from "../types/ProfileState";
import { RootState } from "../store/store";

const initialState: ProfileState = { data: null };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (
      state,
      action: PayloadAction<NonNullable<ProfileData>>,
    ) => {
      state.data = action.payload;
    },
    resetProfileData: (state) => {
      state.data = null;
    },
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;

export const selectProfileData = (state: RootState) => state.profile.data;
