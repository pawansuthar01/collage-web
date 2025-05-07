import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

// Define all keys
const storageKeys = [
  "bannerData",

  "courseData",
  "NoticeData",
  "feedbackData",
  "BannerNoticeData",
] as const;

type StorageKey = (typeof storageKeys)[number];

interface DataState {
  [key: string]: any[];
}

// Initial state (no localStorage usage)
const initialState: DataState = Object.fromEntries(
  storageKeys.map((key) => [key, []])
) as DataState;

// 🔁 Utility to create thunk
const createFetchThunk = (key: StorageKey) => {
  return createAsyncThunk<any[], void, { rejectValue: string }>(
    `get/${key}`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `/collage/v3/user/${key.replace("Data", "").toLowerCase()}
        `
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

// Individual thunks

export const getBannerData = createFetchThunk("bannerData");
export const getCourseData = createFetchThunk("courseData");
export const getNoticeData = createFetchThunk("NoticeData");
export const getFeedbackData = createFetchThunk("feedbackData");
export const getBannerNoticeData = createFetchThunk("BannerNoticeData");

export const getDocumentData = createAsyncThunk("get/Document", async () => {
  try {
    const response = await axiosInstance.get(`/collage/v3/user/document`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});

export const getFacilitiesData = createAsyncThunk(
  "get/facilities",
  async () => {
    try {
      const response = await axiosInstance.get(`/collage/v3/user/facilities`);
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
export const getSocialLinkData = createAsyncThunk("get/link", async () => {
  try {
    const response = await axiosInstance.get(`/collage/v3/user/sociallink`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
export const getAboutData = createAsyncThunk("get/about", async () => {
  try {
    const response = await axiosInstance.get(`/collage/v3/user/about`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
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
      return { key, data: response?.data?.data || [] };
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

// Slice
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
