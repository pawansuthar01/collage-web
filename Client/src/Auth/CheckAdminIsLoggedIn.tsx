import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../Redux/Store";

function CheckAdminIsLoggedIn() {
  const { isLoggedIn, Role } = useSelector(
    (state: RootState) => state.AdminData
  );
  return isLoggedIn && Role != null ? (
    <Navigate to="/Admin/Dashboard" />
  ) : (
    <Outlet />
  );
}
export default CheckAdminIsLoggedIn;
