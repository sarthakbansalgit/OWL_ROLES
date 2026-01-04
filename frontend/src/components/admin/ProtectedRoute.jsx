import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import LoadingPage from '../shared/LoadingPage';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // If user is not authenticated or role is invalid
        if (!user) {
            toast.error("Please login to continue");
            navigate("/login", { replace: true });
        } else if (user.role !== 'recruiter' && user.role !== 'superUser') {
            toast.error("Unauthorized access");
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

    // Show loading while checking auth
    if (!user) {
        return <LoadingPage />;
    }

    // Check if user has right role
    if (user.role !== 'recruiter' && user.role !== 'superUser') {
        return <LoadingPage />;
    }

    // If authenticated and authorized, render children
    return children;
};

export default ProtectedRoute;