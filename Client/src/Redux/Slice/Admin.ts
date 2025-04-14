import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

interface AdminState {
  Message: any;
  Feedback: any;
  password: string | null;
}
const initialState: AdminState = {
  Message:
    localStorage.getItem("Message") == undefined
      ? JSON.parse(localStorage.getItem("Message") as string)
      : {},
  Feedback:
    localStorage.getItem("Feedback") !== null
      ? JSON.parse(localStorage.getItem("Feedback") as string)
      : {},
  password: localStorage.getItem("password") || null,
};
// update banner data //
export const updateBanner = createAsyncThunk(
  "/update/banner",
  async (data: any) => {
    try {
      const response = await axiosInstance.put(
        "/collage/v5/admin/Banner",
        data
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
// get social link data //
export const updateSocialLink = createAsyncThunk("/update/banner", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
// update about data //
export const AboutUpdate = createAsyncThunk(
  "/update/About",
  async (data: any) => {
    try {
      const response = await axiosInstance.put("/collage/v5/admin/About", data);
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

// new course add  //
export const newCourse = createAsyncThunk("/new/course", async (data: any) => {
  try {
    const response = await axiosInstance.post(`/collage/v5/Admin/course`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
// update Course data //
export const UpdateCourse = createAsyncThunk(
  "/update/About",
  async (data: any) => {
    if (!data) return;
    try {
      const response = await axiosInstance.put(
        `/collage/v5/admin/course/${data.id}`,
        data.data
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
// Delete Course data //
export const DeleteCourse = createAsyncThunk(
  "/delete/project",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/collage/v5/admin/course/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//get All courseApply req//
export const GetAllCourseApply = createAsyncThunk(
  "/get/course_apply",
  async () => {
    try {
      const response = await axiosInstance.get("/collage/v5/admin/courseApply");
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//course Apply message read mark//
export const CourseApplyMarkAsRead = createAsyncThunk(
  "/put/message",
  async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `/collage/v5/admin/courseApply/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
/// Notice //
//Notice new  add//
export const newNotice = createAsyncThunk("/new/Notice", async (data: any) => {
  try {
    const response = await axiosInstance.post(`/collage/v5/Admin/notice`, data);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
//Update notice//
export const UpdateNotice = createAsyncThunk(
  "/update/About",
  async (data: any) => {
    try {
      const response = await axiosInstance.put(
        `/collage/v5/admin/notice/${data.id}`,
        data.data
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//Delete notice//
export const DeleteNotice = createAsyncThunk(
  "/delete/education",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/collage/v5/admin/notice/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
// Event//

//  new Event add//

export const NewEvent = createAsyncThunk("/new/project", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
//Update Event//
export const UpdateEvent = createAsyncThunk(
  "/update/About",
  async (data: any) => {
    try {
      const response = await axiosInstance.put("/app/admin/v3/About", data);
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//Delete Event//
export const DeleteEvent = createAsyncThunk(
  "/delete/education",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/app/admin/v3/education/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

//call req//
//get All call req//
export const GetAllCallReq = createAsyncThunk("/get/feedback", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
//mark as read call//
export const CallMarkAsRead = createAsyncThunk(
  "/put/message",
  async (id: string) => {
    try {
      const response = await axiosInstance.put(`/app/user/v3/Message/${id}`);
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

//feedback//

export const GetAllFeedback = createAsyncThunk("/get/feedback", async () => {
  try {
    const response = await axiosInstance.get("/collage/v5/admin/feedback");
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
//feedback delete//
export const DeleteFeedback = createAsyncThunk(
  "/delete/SkillInEducationCart",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/collage/v5/admin/feedback/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//contact//
//get All//
export const GetAllMessage = createAsyncThunk("/get/message", async () => {
  try {
    const response = await axiosInstance.get("/collage/v5/admin/message");
    return response?.data;
  } catch (error: any) {
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});
//mark as read message//
export const messageMarkAsRead = createAsyncThunk(
  "/put/message",
  async (id: string) => {
    try {
      const response = await axiosInstance.put(
        `/collage/v5/admin/message/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const updateSocialData = createAsyncThunk(
  "/put/SocialData",
  async (data: any) => {
    try {
      const response = await axiosInstance.put(
        "/collage/v5/admin/Sociol",

        data
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const AdminLogin = createAsyncThunk(
  "/LoginAs/admin",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.get(
        `/app/admin/v3/Login/${email}/${password}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const checkPasswordReset = createAsyncThunk(
  "/check/Token",
  async (resetToken: string) => {
    try {
      const response = await axiosInstance.get(
        `/app/admin/v3/checkPasswordReset/${resetToken}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "/put/admin/password",
  async ({
    resetToken,
    newPassword,
  }: {
    resetToken: string;
    newPassword: string;
  }) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/change/Password/${resetToken}`,
        { newPassword }
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const UpdatePassword = createAsyncThunk(
  "/put/admin/password",
  async (data: any) => {
    try {
      const response = await axiosInstance.put(
        `/app/admin/v3/update/password/`,
        data
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

const AdminRedux = createSlice({
  name: "AdminStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllMessage.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("Message", action?.payload?.data?.message);
          state.Message = action?.payload?.data?.message;
        }
      })
      .addCase(GetAllFeedback.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("feedback", action?.payload?.data?.feedback);
          state.Feedback = action?.payload?.data?.Feedback;
        }
      });
  },
});

export const {} = AdminRedux.actions;
export default AdminRedux.reducer;
