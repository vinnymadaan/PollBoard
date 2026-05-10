import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth.context.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // handle logout
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] p-10">
      
      <div className="flex items-center justify-between">
        
        <div>
          <h1 className="text-4xl font-black">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back, {user?.name}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;