import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roles }) => {
    const { user, loading } = useSelector((state) => state.user);

    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("refreshJWT");

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    if (loading || !user || !user.department) {
        // Show loading state while user data is being fetched
        return <div>Loading...</div>;
    }

    // Check if the user's role matches one of the allowed roles
    if (
        roles &&
        roles.length &&
        !roles.includes(user.department.toLowerCase())
    ) {
        return <Navigate to="/unauthorized" />;
    }

    // Render the children if authenticated and has the right role
    return children;
};

export default ProtectedRoutes;
