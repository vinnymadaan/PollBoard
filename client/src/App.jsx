import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePoll from "./pages/CreatePoll";
import ProtectedRoute from "./routes/Protected.routes.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyPolls from "./pages/MyPolls";
import PublicPoll from "./pages/PublicPoll";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />      

      <Route
        path="/dashboard"
        element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        }
      />

      <Route
        path="/create-poll"
        element={<CreatePoll />}
      />

      <Route
        path="/my-polls"
        element={<MyPolls />}
      />

      <Route
        path="/poll/:id"
        element={<PublicPoll />}
      />  

      <Route
        path="/analytics/:id"
        element={<Analytics />}
      />
      
    </Routes>

    
  );
}

export default App;