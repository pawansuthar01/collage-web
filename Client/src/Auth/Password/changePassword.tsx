import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";
import { AppDispatch } from "../../Redux/Store";
import { UpdatePassword } from "../../Redux/Slice/Admin";
import LayoutAdmin from "../../layout/AdminLayout";
//
interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [OldShowPassword, setOldShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });

    const inputElement = document.getElementById(name) as HTMLInputElement;
    if (inputElement) inputElement.style.borderColor = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    // Validate
    if (!oldPassword || !newPassword || !confirmPassword) {
      ["oldPassword", "newPassword", "confirmPassword"].forEach((field) => {
        const input = document.getElementById(field) as HTMLInputElement;
        if (passwordData[field as keyof PasswordData] === "" && input) {
          input.style.borderColor = "red";
        }
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      const newInput = document.getElementById(
        "newPassword"
      ) as HTMLInputElement;
      const confirmInput = document.getElementById(
        "confirmPassword"
      ) as HTMLInputElement;
      if (newInput) newInput.style.borderColor = "red";
      if (confirmInput) confirmInput.style.borderColor = "red";
      return;
    }

    setLoading(true);
    setError("");

    const res = await dispatch(
      UpdatePassword({
        oldPassword,
        newPassword,
      })
    );

    setLoading(false);

    if (res?.payload?.success) {
      toast.success(res.payload.message);
      setSuccessMessage("Password successfully changed.");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else if (res?.payload?.message === "Old password does not match.") {
      const oldInput = document.getElementById(
        "oldPassword"
      ) as HTMLInputElement;
      if (oldInput) oldInput.style.borderColor = "red";
      toast.error(res.payload.message);
    }
  };

  return (
    <LayoutAdmin>
      <div className="flex bg-[Var(--admin-bg-color)] mt-20">
        <div className="my-auto bg-[Var(--admin-bg-card-color)] m-auto  sm:w-[60%] w-[90%] max-w-md p-6 border-[Var(--admin-border-color)] border rounded-md ">
          <h2 className="text-xl font-semibold text-center mb-6">
            Reset Your Password
          </h2>

          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form noValidate onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                type={OldShowPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                value={passwordData.oldPassword}
                onChange={handleUserInput}
                placeholder="Old Password"
                className="w-full p-3 border max-w-xs:text-sm outline-none border-[Var(--input-border-color)] bg-[Var(--input-bg-color)]  rounded text-[Var(--input-text-color)]"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setOldShowPassword((prev) => !prev)}
              >
                {OldShowPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handleUserInput}
                placeholder="New Password"
                className="w-full p-3 border max-w-xs:text-sm outline-none border-[Var(--input-border-color)] bg-[Var(--input-bg-color)]  rounded text-[Var(--input-text-color)]"
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
                className="w-full p-3 border max-w-xs:text-sm pr-10 outline-none border-[Var(--input-border-color)] bg-[Var(--input-bg-color)]  rounded text-[Var(--input-text-color)]"
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
                className="w-full  bg-[Var(--dark-btnBg-color)]  text-[Var(--admin-text-Primary-color)] p-2 rounded-md disabled:bg-gray-400 Admin_custom-hover"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default ChangePassword;
