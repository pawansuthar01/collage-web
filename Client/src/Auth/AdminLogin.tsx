import { useState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { AdminLogin } from "../Redux/Slice/Admin";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (email && password) {
      const AdminData = {
        password,
        email,
      };
      try {
        const response = await dispatch(AdminLogin(AdminData));

        if (response.payload?.success) {
          setMessage("Login successfully!");
          navigate("/Admin/Dashboard");
        } else {
          throw new Error(response.payload?.message || " failed Login");
        }
      } catch (error: any) {
        console.error("Error Login  info:", error);
        setMessage(error?.message || "Failed  Login");
      } finally {
        setLoading(false);
      }
    } else {
      if (!email)
        document
          .getElementById("email")
          ?.style.setProperty("border-color", "red");
      if (!password)
        document
          .getElementById("password")
          ?.style.setProperty("border-color", "red");
    }
    setLoading(false);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessage("");
    if (name == "email") {
      setEmail(value);
      const element = document.getElementById(name);
      if (element) {
        element.style.borderColor = "";
      }
    }
    if (name == "password") {
      setPassword(value);
      const element = document.getElementById(name);
      if (element) {
        element.style.borderColor = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-[Var(--admin-bg-color)] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[Var(--admin-bg-card-color)] border border-[Var(--admin-border-color)] rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
            <LogIn className="h-6 w-6 text-[Var(--dark-icon-color)]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-[Var(--admin-text-Primary-color)]">
            Admin Login
          </h2>
          <p className="mt-2 text-sm  text-[Var(--admin-text-Secondary-color)]">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form noValidate className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 z-20 left-0 pl-3 flex items-center  ">
                  <Mail className="h-5 w-5 text-[Var(--dark-icon-color)]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full outline-none px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-[Var(--input-text-color)] border-[Var(--input-border-color)]  bg-[Var(--input-bg-color)] rounded-lg  sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 z-20 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[Var(--dark-icon-color)]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10  outline-none  border border-gray-300 placeholder-gray-500 text-[Var(--input-text-color)] border-[Var(--input-border-color)]  bg-[Var(--input-bg-color)] sm:text-sm rounded-lg"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          {message && (
            <div
              className={`p-3 rounded ${
                message.includes("success")
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[Var(--admin-text-Primary-color)] bg-[Var(--dark-btnBg-color)] Admin_custom-hover  transition-colors duration-200"
            >
              {loading ? "SignIn..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
