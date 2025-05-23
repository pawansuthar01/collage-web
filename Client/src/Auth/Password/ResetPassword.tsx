import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AppDispatch } from "../../Redux/Store";
import { changePassword, checkPasswordReset } from "../../Redux/Slice/Admin";

interface PasswordData {
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string>("");
  const [resetToken, setResetToken] = useState<string>("");
  const [checkLoading, setCheckLoading] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      setResetToken(token);
    }
  }, [token, navigate]);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const input = document.getElementById(name);
    if (input) input.style.borderColor = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { newPassword, confirmPassword } = passwordData;

    if (!newPassword) {
      document.getElementById("newPassword")!.style.borderColor = "red";
      return;
    }

    if (!confirmPassword) {
      document.getElementById("confirmPassword")!.style.borderColor = "red";
      return;
    }

    if (newPassword !== confirmPassword) {
      document.getElementById("newPassword")!.style.borderColor = "red";
      document.getElementById("confirmPassword")!.style.borderColor = "red";
      return;
    }

    setLoading(true);
    const res = await dispatch(changePassword({ resetToken, newPassword }));

    if (res?.payload?.success) {
      setSuccessMessage("Password successfully changed. Redirecting...");
      setPasswordData({ newPassword: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/Admin"); // or another route
      }, 3000);
    } else {
      setError("Token expired or invalid, please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    const passwordTokenCheck = async () => {
      if (!resetToken) return;

      const res = await dispatch(checkPasswordReset(resetToken));
      if (res?.payload?.success) {
        setError("");
      } else {
        setError("Token expired or invalid, please try again.");
      }

      setCheckLoading(false);
    };

    if (checkLoading) {
      passwordTokenCheck();
    }
  }, [resetToken, checkLoading, dispatch]);

  if (checkLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424]">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="text-white mt-2 ">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[Var(--admin-bg-color)]">
      <div className="my-auto m-auto sm:w-[60%] w-[90%] max-w-md p-6 bg-[Var(--admin-card-bg-color)] border-cyan-200 border-1 rounded-md shadow-[0_0_5px_0_cyan]">
        <h2 className="text-xl text-white font-semibold text-center mb-6">
          Reset Your Password
        </h2>

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handleUserInput}
              placeholder="Password"
              className="w-full p-3 border max-w-xs:text-sm outline-none bg-[Var(--input-bg-color)] border-cyan-300 rounded text-white"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-6 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleUserInput}
              placeholder="Confirm Password"
              className="w-full p-3 border max-w-xs:text-sm bg-[Var(--input-bg-color)] pr-10 outline-none border-cyan-300 rounded text-white"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
              disabled={!!error || loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
