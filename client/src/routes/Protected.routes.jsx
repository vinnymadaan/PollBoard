import { Navigate } from "react-router-dom";

import { useAuth } from "../context/Auth.context.jsx";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;