import { useEffect,useState } from "react";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getPollAnalytics } from "../services/poll.service";


import { socket } from "../socket";


export default function Analytics() {

  const { id } = useParams();



  const [analytics,
    setAnalytics] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);



    useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const data =
          await getPollAnalytics(
            id,
            token
          );

        setAnalytics(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchAnalytics();

    socket.on( "pollUpdated", () => {
        fetchAnalytics();
    });

    return () => {

  socket.off(
    "pollUpdated"
  );

};

    }, [id]);



  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-black animate-pulse">
          Loading analytics...
        </h1>

      </div>
    );
  }



  if (!analytics) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Analytics not found
        </h1>

      </div>
    );
  }

  const COLORS = [
  "#3B82F6",
  "#06B6D4",
  "#8B5CF6",
  "#14B8A6",
  "#6366F1",
  "#0EA5E9",
];



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />



      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-14">

          <div>

            <p className="text-blue-400 font-semibold mb-4">
              POLL ANALYTICS
            </p>

            <h1 className="text-5xl font-black leading-tight">
              {analytics.pollTitle}
            </h1>

            <p className="text-slate-400 mt-4 text-lg max-w-2xl leading-relaxed">
              Track realtime engagement, responses and voting insights.
            </p>

          </div>



          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-8 py-6">

            <p className="text-slate-400 text-sm">
              Total Responses
            </p>

            <h2 className="text-5xl font-black mt-3">
              {analytics.totalResponses}
            </h2>

          </div>

        </div>



        {/* QUESTIONS */}
        <div className="space-y-10">

          {analytics.questions.map((question, index) => {

            const chartData =
              question.options.map(
                (option) => ({
                  name: option.text,
                  votes: option.votes,
                })
              );



            return (

              <motion.div

                key={index}

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

                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-8"
              >

                {/* QUESTION HEADER */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-10">

                  <div>

                    <p className="text-blue-400 font-medium mb-3">
                      Question {index + 1}
                    </p>

                    <h2 className="text-3xl font-black leading-tight">
                      {question.questionText}
                    </h2>

                  </div>



                  <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">

                    <p className="text-slate-400 text-sm">
                      Total Votes
                    </p>

                    <h3 className="text-3xl font-black mt-2">
                      {question.options.reduce(
                        (acc, curr) =>
                          acc + curr.votes,
                        0
                      )}
                    </h3>

                  </div>

                </div>



                {/* CHARTS */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">

                  {/* BAR CHART */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px]">

                    <h3 className="text-2xl font-bold mb-6">
                      Vote Distribution
                    </h3>

                    <ResponsiveContainer
                      width="100%"
                      height={350}
                    >

                      <BarChart
                        data={chartData}
                      >

                        <XAxis
                          dataKey="name"
                          stroke="#94a3b8"
                        />

                        <YAxis
                          stroke="#94a3b8"
                        />

                        <Tooltip
  contentStyle={{
    backgroundColor: "#0F172A",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    color: "white",
  }}
/>

                        <Bar
  dataKey="votes"
  radius={[12, 12, 0, 0]}
>

  {
    chartData.map((entry, index) => (

      <Cell
        key={index}
        fill={[
          "#60A5FA",
          "#22D3EE",
          "#818CF8",
          "#38BDF8",
          "#A78BFA",
          "#2DD4BF",
        ][index % 6]}
      />

    ))
  }

</Bar>

                      </BarChart>

                    </ResponsiveContainer>

                  </div>



                  {/* PIE CHART */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px] flex flex-col">

                    <h3 className="text-2xl font-bold mb-6">
                      Response Breakdown
                    </h3>

                    <div className="flex-1">

                      <ResponsiveContainer
                        width="100%"
                        height={350}
                      >

                        <PieChart>

                          <Pie
                            data={chartData}
                            dataKey="votes"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            paddingAngle={5}
                          >

                            {chartData.map((entry, idx) => (

                              <Cell
                                key={idx}
                                fill={
                                COLORS[
                                index % COLORS.length
                                ]
                                }
                              />

                            ))}

                          </Pie>

                          <Tooltip
  contentStyle={{
    backgroundColor: "#0F172A",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    color: "white",
  }}
/>

                        </PieChart>

                      </ResponsiveContainer>

                    </div>

                  </div>

                </div>



                {/* OPTIONS LIST */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">

                  {question.options.map((option, optionIndex) => {

                    const totalVotes =
                      question.options.reduce(
                        (acc, curr) =>
                          acc + curr.votes,
                        0
                      );

                    const percentage =
                      totalVotes === 0
                        ? 0
                        : Math.round(
                            (option.votes /
                              totalVotes) *
                              100
                          );



                    return (

                      <div
                        key={optionIndex}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <p className="text-lg font-semibold">
                              {option.text}
                            </p>

                            <p className="text-slate-400 mt-2 text-sm">
                              {option.votes} votes collected
                            </p>

                          </div>



                          <div className="text-right">

                            <h4 className="text-3xl font-black text-blue-400">
                              {percentage}%
                            </h4>

                          </div>

                        </div>



                        {/* PROGRESS */}
                        <div className="mt-5 w-full h-3 bg-white/5 rounded-full overflow-hidden">

                          <motion.div

                            initial={{
                              width: 0,
                            }}

                            animate={{
                              width: `${percentage}%`,
                            }}

                            transition={{
                              duration: 0.8,
                            }}

                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          />

                        </div>

                      </div>
                    );
                  })}

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
