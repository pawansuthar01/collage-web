import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

// Define storage keys
const storageKeys = [
  "SocialLinkData",
  "bannerData",
  "aboutData",
  "projectData",
  "educationData",
  "skillsData",
  "feedbackData",
] as const;

type StorageKey = (typeof storageKeys)[number];

interface DataState {
  [key: string]: any[]; // Optionally: define exact types for each key
}

// Separate fetched data from thunk payload
interface ThunkSuccessPayload {
  success: true;
  data: Partial<DataState>;
}

// Function to get stored data
const getStoredData = (key: StorageKey): any[] => {
  try {
    const startTime = performance.now();
    const data = localStorage.getItem(key);
    const endTime = performance.now();

    console.log(`${key} loaded in ${(endTime - startTime).toFixed(2)}ms`);
    return data && data !== "undefined" && data !== "null"
      ? JSON.parse(data)
      : [];
  } catch (error) {
    console.error(`❌ localStorage error for ${key}:`, error);
    return [];
  }
};

// Initial State
const initialState: DataState = Object.fromEntries(
  storageKeys.map((key) => [key, getStoredData(key)])
) as DataState;

// ✅ Async thunk with correctly structured return value
export const getAllData = createAsyncThunk<
  ThunkSuccessPayload, // ✅ Return type
  void, // Argument type
  { rejectValue: string } // Config type
>("Get/All/Data", async (_, { rejectWithValue }) => {
  try {
    const startTime = performance.now();

    const responses = await Promise.all(
      storageKeys.map((key) =>
        axiosInstance.get(
          `/app/user/v3/Data/${key.replace("Data", "").toLowerCase()}`
        )
      )
    );

    const fetchedData: Partial<DataState> = {};
    responses.forEach((res, index) => {
      const key = storageKeys[index];
      fetchedData[key] = res.data?.data || [];
    });

    const endTime = performance.now();
    console.log("⏱️ Fetch duration:", (endTime - startTime).toFixed(2), "ms");

    return {
      success: true,
      data: fetchedData,
    };
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong..."
    );
  }
});

// ✅ Slice setup
const DataRedux = createSlice({
  name: "DataStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllData.fulfilled,
      (state, action: PayloadAction<ThunkSuccessPayload>) => {
        if (action.payload.success) {
          const fetched = action.payload.data;

          storageKeys.forEach((key) => {
            if (Array.isArray(fetched[key])) {
              localStorage.setItem(key, JSON.stringify(fetched[key]));
              state[key] = fetched[key]!;
            }
          });
        }
      }
    );
  },
});

export default DataRedux.reducer;
