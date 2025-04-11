import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

// Define all keys
const storageKeys = [
  "SocialLinkData",
  "bannerData",
  "aboutData",
  "courseData",
  "NoticeData",
  "skillsData",
  "feedbackData",
] as const;

type StorageKey = (typeof storageKeys)[number];

interface DataState {
  [key: string]: any[];
}

// Function to get stored data
const getStoredData = (key: StorageKey): any[] => {
  try {
    const data = localStorage.getItem(key);
    return data && data !== "undefined" && data !== "null"
      ? JSON.parse(data)
      : [];
  } catch (error) {
    console.error(`❌ localStorage error for ${key}:`, error);
    return [];
  }
};

// Initial state
const initialState: DataState = Object.fromEntries(
  storageKeys.map((key) => [key, getStoredData(key)])
) as DataState;

// ----------------------------
// 🔁 Utility to create thunk
// ----------------------------
const createFetchThunk = (key: StorageKey) => {
  return createAsyncThunk<any[], void, { rejectValue: string }>(
    `get/${key}`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `/collage/v3/user/${key.replace("Data", "").toLowerCase()}`
        );
        const data = response?.data?.data || [];
        localStorage.setItem(key, JSON.stringify(data));
        return data;
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      }
    }
  );
};

// 🔁 Create individual thunks
export const getSocialLinkData = createFetchThunk("SocialLinkData");
export const getBannerData = createFetchThunk("bannerData");
export const getAboutData = createFetchThunk("aboutData");
export const getCourseData = createFetchThunk("courseData");
export const getNoticeData = createFetchThunk("NoticeData");
export const getSkillsData = createFetchThunk("skillsData");
export const getFeedbackData = createFetchThunk("feedbackData");

// ----------------------------
// ✅ Slice
// ----------------------------
const DataRedux = createSlice({
  name: "DataStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleData = (key: StorageKey, thunk: any) => {
      builder.addCase(
        thunk.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state[key] = action.payload;
        }
      );
    };

    handleData("SocialLinkData", getSocialLinkData);
    handleData("bannerData", getBannerData);
    handleData("aboutData", getAboutData);
    handleData("courseData", getCourseData);
    handleData("NoticeData", getNoticeData);
    handleData("skillsData", getSkillsData);
    handleData("feedbackData", getFeedbackData);
  },
});

export default DataRedux.reducer;
