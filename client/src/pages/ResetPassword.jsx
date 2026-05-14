import {
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";



function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();



  const [password,
    setPassword] =
    useState("");



  const [confirmPassword,
    setConfirmPassword] =
    useState("");



  const handleReset =
    async () => {

    try {

      if (
        password !==
        confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;

      }



      await axios.post(

        `${import.meta.env.VITE_API_URL}/auth/reset-password`,

        {
          token,
          password,
        }

      );



      toast.success(
        "Password reset successful"
      );



      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (error) {

      toast.error(
        "Failed to reset password"
      );

    }

  };



  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-10">

        <h1 className="text-4xl font-black text-white text-center">

          Reset Password

        </h1>



        <div className="mt-10 space-y-5">

          <input

            type="password"

            placeholder="New Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />



          <input

            type="password"

            placeholder="Confirm Password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

            className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />



          <button

            onClick={handleReset}

            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-semibold"
          >

            Reset Password

          </button>

        </div>

      </div>

    </div>

  );

}



export default ResetPassword;