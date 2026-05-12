import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  getMyPolls,
} from "../services/poll.service";



export default function MyPolls() {

  const [polls, setPolls] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    const fetchPolls =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const data =
          await getMyPolls(
            token
          );

        setPolls(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchPolls();

  }, []);




  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-2xl font-bold animate-pulse">
          Loading polls...
        </h1>

      </div>

    );
  }




  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* BLUR BACKGROUNDS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />



      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-14">

          <div>

            <h1 className="text-5xl font-black tracking-tight">
              My Polls
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Manage, monitor and analyze all your polls.
            </p>

          </div>



          <button
            className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-7 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/20 hover:scale-105"
          >
            + Create New Poll
          </button>

        </div>



        {/* EMPTY STATE */}
        {polls.length === 0 && (

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-16 text-center">

            <h2 className="text-3xl font-black">
              No Polls Yet
            </h2>

            <p className="text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
              Start creating interactive realtime polls and collect responses from your audience.
            </p>

          </div>

        )}



        {/* POLLS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

          {polls.map((poll, index) => (

            <motion.div

              key={poll._id}

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: index * 0.1,
              }}

              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-7 hover:bg-white/10 transition-all duration-300"
            >

              {/* HEADER */}
              <div className="flex items-start justify-between gap-5">

                <div>

                  <h2 className="text-3xl font-black leading-tight group-hover:text-blue-300 transition-all duration-300">
                    {poll.title}
                  </h2>

                  <p className="text-slate-400 mt-3 leading-relaxed">
                    {poll.description}
                  </p>

                </div>



                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    poll.isPublished
                      ? "bg-blue-500/15 text-blue-300 border border-blue-500/20"
                      : "bg-green-500/15 text-green-300 border border-green-500/20"
                  }`}
                >
                  {poll.isPublished
                    ? "Published"
                    : "Active"}
                </span>

              </div>



              {/* QUESTIONS */}
              <div className="mt-8">

                <p className="text-slate-500 text-sm">
                  Questions
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {poll.questions.length}
                </h3>

              </div>



              {/* FOOTER */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">

                <div>

                  <p className="text-slate-500 text-sm">
                    Created At
                  </p>

                  <p className="text-slate-300 mt-1">
                    {new Date(
                      poll.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>



                <div className="flex items-center gap-3">

                  <button
                    className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-sm font-medium"
                  >
                    Analytics
                  </button>



                  <button
                    className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-sm font-semibold"
                  >
                    Share
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );
}