export default function Dashboard() {
  const stats = [
    {
      title: "Total Polls",
      value: "12",
      description: "Polls created so far",
    },
    {
      title: "Responses",
      value: "1.2K",
      description: "Total community votes",
    },
    {
      title: "Active Polls",
      value: "5",
      description: "Currently collecting responses",
    },
    {
      title: "Published Results",
      value: "8",
      description: "Results visible publicly",
    },
  ];

  const polls = [
    {
      title: "Frontend Framework Survey",
      responses: 245,
      status: "Active",
      expires: "2 days left",
    },
    {
      title: "AI Tools For Developers",
      responses: 182,
      status: "Published",
      expires: "Ended",
    },
    {
      title: "Best Remote Work Setup",
      responses: 91,
      status: "Active",
      expires: "5 hours left",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-14">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              PollFlow Dashboard
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Create, manage and analyze your realtime polls.
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-6 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/20 hover:scale-105">
            + Create Poll
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <p className="text-slate-400 text-sm font-medium">
                {stat.title}
              </p>

              <h2 className="text-4xl font-black mt-4">
                {stat.value}
              </h2>

              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* RECENT POLLS */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">
                Recent Polls
              </h2>

              <p className="text-slate-400 mt-2">
                Track engagement and monitor active polls.
              </p>
            </div>

            <button className="text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {polls.map((poll, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-300 transition-all duration-300">
                      {poll.title}
                    </h3>

                    <p className="text-slate-400 mt-3">
                      {poll.responses} responses collected
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      poll.status === "Active"
                        ? "bg-green-500/15 text-green-300 border border-green-500/20"
                        : "bg-blue-500/15 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    {poll.status}
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-500 text-sm">
                      Expiry Status
                    </p>

                    <p className="mt-1 font-medium text-slate-300">
                      {poll.expires}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-sm font-medium">
                      Analytics
                    </button>

                    <button className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-sm font-semibold">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-black leading-tight">
                Ready to launch your next poll?
              </h2>

              <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
                Create beautiful interactive polls with realtime analytics and public sharing.
              </p>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-cyan-500/20 whitespace-nowrap">
              Create Interactive Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
