import { useAuth } from "../context/Auth.context.jsx";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>{user?.name}</p>
    </div>
  );
}

export default Dashboard;