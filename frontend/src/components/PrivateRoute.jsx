import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Si pas de token, rediriger vers la page de connexion
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
