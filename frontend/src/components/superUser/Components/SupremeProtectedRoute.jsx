import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SupremeProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {

    if (!user || user.role !== "superUser") {
      toast("Logout first to access super user permissions!");

    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default SupremeProtectedRoute;