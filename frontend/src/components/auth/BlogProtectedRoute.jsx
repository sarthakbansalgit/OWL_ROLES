import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BlogProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is not authenticated or role is neither recruiter nor superUser
        if (!user) {
            toast("Login first to perform this activity!")
            navigate("/login");
        }
    }, [user, navigate]);

    return <>{children}</>;
};

export default BlogProtectedRoute;