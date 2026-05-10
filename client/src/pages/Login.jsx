import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service.js";

import { useAuth } from "../context/Auth.context.jsx";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // save user in context
      login(data.user);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7fbff] px-6">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10">
        
        <h1 className="text-4xl font-black text-center">
          Welcome Back
        </h1>

        <p className="text-slate-500 text-center mt-3">
          Login to continue to PollFlow.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-slate-600 mt-6">
            Don’t have an account?{" "}
  
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;