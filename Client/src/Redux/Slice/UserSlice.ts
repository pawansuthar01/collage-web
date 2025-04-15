// src/redux/Slice/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../../../Helper/axiosInstance";
interface UserState {
  message: any[]; // Replace `any[]` with your actual message type if known
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  message: [],
  loading: false,
  error: null,
};

// Subscribe
export const CallReqSubmit = createAsyncThunk(
  "Call/Request",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/collage/v3/user/Call/`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

// course Apply Submit
export const CourseApplySubmit = createAsyncThunk(
  "user/submitMessage",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/collage/v3/user/course_apply",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
// Message Submit
export const submitMessage = createAsyncThunk(
  "user/submitMessage",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/collage/v3/user/message",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const getFeedback = createAsyncThunk(
  "feedback/getFeedback",
  async () => {
    const response = await axiosInstance.get(`/collage/v3/user/feedback`);
    return response.data;
  }
);

// Feedback Submit
export const submitFeedback = createAsyncThunk(
  "user/submitFeedback",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/collage/v3/user/feedback",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

// Slice
const UserRedux = createSlice({
  name: "userRedux",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Subscribe

      // Message Submit
      .addCase(submitMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message.push(action.payload);
      })
      .addCase(submitMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Feedback Submit
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        submitFeedback.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.message.push(action.payload);
        }
      )
      .addCase(submitFeedback.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UserRedux.reducer;
