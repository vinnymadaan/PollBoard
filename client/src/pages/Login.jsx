import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service.js";
import { useAuth } from "../context/Auth.context.jsx";

import AuthLayout from "../layouts/Auth.layout.jsx";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

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
    <AuthLayout>
      <div>
        <h1 className="text-4xl font-black text-center text-slate-900">
          Welcome Back
        </h1>

        <p className="text-slate-600 text-center mt-3 leading-relaxed">
          Login to continue building and analyzing your polls.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
            />
          </div>

          <div className="flex justify-end">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>           

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-xl shadow-blue-200 transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-white/30 skew-x-12"></span>

            <span className="relative z-10">
              {loading
                ? "Logging In..."
                : "Login"}
            </span>
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-center text-slate-600 mt-8">
          Don’t have an account?{" "}

          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;