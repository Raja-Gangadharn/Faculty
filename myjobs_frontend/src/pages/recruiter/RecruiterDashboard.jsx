import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../services/authService";

const RecruiterDashboard = () => {
 const navigate = useNavigate();

  useEffect(() => {
    const { isAuthenticated, isRecruiter } = getUserRole();
    if (!isAuthenticated || !isRecruiter) {
      navigate("/recriter/login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1>Welcome to Recruiter Dashboard</h1>
    </div>
  );
};

export default RecruiterDashboard;
