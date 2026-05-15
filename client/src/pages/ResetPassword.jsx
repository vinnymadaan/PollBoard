import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const api_url = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill both password fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${api_url}/auth/reset-password`, {
        token,
        password,
      });

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Enter your new password to update your account.
        </p>

        {!token ? (
          <div className="rounded-2xl bg-red-950/80 border border-red-700 p-6 text-center space-y-4">
            <p className="font-semibold text-red-200">
              No reset token found in the URL.
            </p>
            <p className="text-sm text-slate-400">
              Please use the link from the email or request a new password reset.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-3 w-full rounded-2xl bg-blue-600 px-4 py-3 text-white font-semibold transition hover:bg-blue-500"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-slate-100 outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-slate-100 outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 px-4 py-4 text-white font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;