import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../Redux/Store";

function RequireAuth(role: any) {
  const { isLoggedIn, Role } = useSelector(
    (state: RootState) => state.AdminData
  );

  return isLoggedIn && role.allowedRole == Role ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/Denied" />
  ) : (
    <Navigate to="/Admin" />
  );
}
export default RequireAuth;
