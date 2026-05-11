import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { signupUser } from "../services/auth.service.js";
import { useAuth } from "../context/Auth.context.jsx";

import AuthLayout from "../layouts/Auth.layout.jsx";

function Signup() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

      const data = await signupUser(formData);

      login(data.user);

      toast.success("Account created successfully");

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
          Create Account
        </h1>

        <p className="text-slate-600 text-center mt-3 leading-relaxed">
          Join PollFlow and start building beautiful polls
          with real-time analytics.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {/* NAME */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
            />
          </div>

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

          {/* PHONE */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-xl shadow-blue-200 transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-white/30 skew-x-12"></span>

            <span className="relative z-10">
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </span>
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-slate-600 mt-8">
          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}  

export default Signup;