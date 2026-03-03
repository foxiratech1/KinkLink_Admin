// import { Navigate, Outlet } from "react-router";
// import { useAppSelector } from "../store/hooks";

// const ProtectedRoute = () => {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  if (!isAuthenticated || !token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;