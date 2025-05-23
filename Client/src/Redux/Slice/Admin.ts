import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../Helper/axiosInstance";

interface AdminState {
  Message: any;
  isLoggedIn: boolean | string;
  Password: string;
  Feedback: any;
  Role: string | null;
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
  Role: localStorage.getItem("Role") || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  Password: localStorage.getItem("Password") as string,
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
/// Notice //
//Notice new  add//
export const newBannerNotice = createAsyncThunk(
  "/new/BannerNotice",
  async (data: any) => {
    try {
      const response = await axiosInstance.post(
        `/collage/v5/Admin/banner-notice`,
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
//Update notice//
export const UpdateBannerNotice = createAsyncThunk(
  "/update/BannerNotice",
  async (data: any) => {
    try {
      const response = await axiosInstance.put(
        `/collage/v5/admin/banner-notice/${data.id}`,
        {
          notice: data.notice,
        }
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
export const DeleteBannerNotice = createAsyncThunk(
  "/delete/BannerNotice",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/collage/v5/admin/banner-notice/${id}`
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
      const response = await axiosInstance.put("/collage/v5/admin/event", data);
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
        `/collage/v5/admin/event/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//new Document//
export const newDocument = createAsyncThunk(
  "/new/Document",
  async (data: any) => {
    try {
      const response = await axiosInstance.post(
        "/collage/v5/admin/document",
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
//Delete Document//
export const DeleteDocument = createAsyncThunk(
  "/delete/education",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/collage/v5/admin/document/${id}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);
//new Facilities//
export const newFacilities = createAsyncThunk(
  "/new/facilities",
  async (data: any) => {
    try {
      const response = await axiosInstance.post(
        "/collage/v5/admin/facilities",
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
//Delete Facilities//
export const DeleteFacilities = createAsyncThunk(
  "/delete/facilities",
  async (id: any) => {
    try {
      const response = await axiosInstance.delete(
        `/collage/v5/admin/facilities/${id}`
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
export const GetAllCallReq = createAsyncThunk("/get/call", async () => {
  try {
    const response = await axiosInstance.get("/collage/v5/admin/Call");
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
      const response = await axiosInstance.put(`/collage/v5/admin/Call/${id}`);
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
  async (data: any) => {
    try {
      const response = await axiosInstance.get(
        `/collage/v5/admin/Login/${data.email}/${data.password}`
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
        `/collage/v5/admin/checkPasswordReset/${resetToken}`
      );
      return response?.data;
    } catch (error: any) {
      return (
        error?.response?.data || error?.message || "Something went wrong..."
      );
    }
  }
);

export const AdminDashboardData = createAsyncThunk("/Admin/Data", async () => {
  const password = localStorage.getItem("Password");

  if (!password || password == undefined) {
    localStorage.clear();

    window.location.href = "/admin";
  }

  try {
    const response = await axiosInstance.post(`/collage/v5/admin/Dashboard`, {
      password: password,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.status == 401) {
      localStorage.clear();

      window.location.href = "/admin";
    }
    return error?.response?.data || error?.message || "Something went wrong...";
  }
});

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
        `/collage/v5/admin/change/Password/${resetToken}`,
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
        `/collage/v5/admin/update/password/`,
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
  reducers: {
    logout: (state) => {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("Role", "");
      state.isLoggedIn = false;
      state.Role = null;
    },
  },
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
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("Role", action?.payload?.data?.Role);
          localStorage.setItem("Password", action?.payload?.data?.password);
          state.Role = action?.payload?.data?.Role;
          localStorage.setItem("isLoggedIn", "true");
          state.isLoggedIn = true;
          state.Password = action?.payload?.data?.password;
        }
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("Password", action?.payload?.data?.password);
          state.Password = action?.payload?.data?.password;
        }
      });
  },
});

export const { logout } = AdminRedux.actions;
export default AdminRedux.reducer;
