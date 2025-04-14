import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

// Define all keys

const storageKeys = [
  "SocialLinkData",
  "bannerData",
  "aboutData",
  "courseData",
  "NoticeData",
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
export const getFeedbackData = createFetchThunk("feedbackData");

export const getAllData = createAsyncThunk<
  Partial<DataState>,
  void,
  { rejectValue: string }
>("get/allData", async (_, { rejectWithValue }) => {
  try {
    const requests = storageKeys.map(async (key) => {
      const endpoint = `/collage/v3/user/${key
        .replace("Data", "")
        .toLowerCase()}`;
      const response = await axiosInstance.get(endpoint);
      const data = response?.data?.data || [];
      localStorage.setItem(key, JSON.stringify(data));
      return { key, data };
    });

    const results = await Promise.all(requests);
    const resultObj: Partial<DataState> = {};

    results.forEach(({ key, data }) => {
      resultObj[key] = data;
    });

    return resultObj;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error?.message || "Something went wrong"
    );
  }
});

// ----------------------------
// ✅ Slice
// ----------------------------
const DataRedux = createSlice({
  name: "DataStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllData.fulfilled,
      (state, action: PayloadAction<Partial<DataState>>) => {
        for (const key in action.payload) {
          if (action.payload[key]) {
            state[key] = action.payload[key]!;
          }
        }
      }
    );
  },
});

export default DataRedux.reducer;
