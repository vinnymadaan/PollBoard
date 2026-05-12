import { useState } from "react";
import {
  Menu,
  X,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7fbff] overflow-hidden relative">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-100 rounded-full blur-3xl opacity-30"></div>

      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-50 border-b border-white/20 backdrop-blur-xl bg-white/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-200">
              <BarChart3 className="text-white w-5 h-5" />
            </div>

            <h1 className="text-3xl font-black tracking-tight">
              Poll<span className="text-blue-600">Flow</span>
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#features"
              
              className="text-slate-700 font-medium hover:text-blue-600 transition-all duration-300"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-slate-700 font-medium hover:text-blue-600 transition-all duration-300"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-slate-700 font-medium hover:text-blue-600 transition-all duration-300"
            >
              Contact
            </a>

            <button
              onClick={() => navigate("/signup")}
              className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl            font-semibold shadow-xl shadow-blue-200 transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-white/30 skew-x-12"></span>

              <span className="relative z-10">
                Get Started
              </span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 bg-white/90 backdrop-blur-xl border-t border-slate-100">
            <div className="flex flex-col gap-5">
              <a href="#features" className="text-slate-700 font-medium">
                Features
              </a>

              <a href="#about" className="text-slate-700 font-medium">
                About
              </a>

              <a href="#contact" className="text-slate-700 font-medium">
                Contact
              </a>

              <button className="bg-blue-600 text-white py-3 rounded-xl font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-16 relative z-10">
        {/* FLOATING DOODLES */}
        <div className="absolute top-20 left-10 w-5 h-5 bg-blue-500 rounded-full animate-pulse opacity-70"></div>

        <div className="absolute top-52 right-16 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-70"></div>

        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-70"></div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT SIDE */}
          <div>
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-8 shadow-sm">
              Real-Time Poll Analytics Platform
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900">
              Create Polls.
              <br />
              Collect Feedback.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Analyze Instantly.
              </span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-slate-600 max-w-2xl">
              Build beautiful polls, gather responses and unlock
              real-time analytics with a modern platform designed
              for creators, communities and teams.
            </p>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <button onClick={() => navigate("/signup")} className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-blue-200 transition-all duration-300 hover:scale-105">
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-white/30 skew-x-12"></span>

                <span className="relative z-10 flex items-center gap-2">
                  Create Poll
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>

              <button

  onClick={() =>
    navigate("/signup")
  }

  className="px-8 py-4 rounded-2xl border border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 font-semibold bg-white hover:shadow-lg"
>
  View Demo
</button>
            </div>

            {/* STATS */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h2 className="text-4xl font-black text-blue-600">
                  10K+
                </h2>

                <p className="text-slate-600 mt-1">
                  Polls Created
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-blue-600">
                  50K+
                </h2>

                <p className="text-slate-600 mt-1">
                  Responses Collected
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-blue-600">
                  99%
                </h2>

                <p className="text-slate-600 mt-1">
                  User Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

            <div className="relative bg-white/90 backdrop-blur-xl border border-white rounded-[36px] shadow-2xl p-8 hover:-translate-y-2 transition-all duration-500">
              {/* TOP */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-black">
                    Live Analytics
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Real-time response tracking
                  </p>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="text-blue-600 w-8 h-8" />
                </div>
              </div>

              {/* ANALYTICS CARDS */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300">
                  <p className="text-slate-500 text-sm">
                    Responses
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    12,540
                  </h2>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300">
                  <p className="text-slate-500 text-sm">
                    Active Polls
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    128
                  </h2>
                </div>
              </div>

              {/* CHART */}
              <div className="mt-10">
                <div className="flex items-end gap-3 h-52">
                  <div className="bg-blue-300 w-full rounded-t-2xl h-[45%]"></div>

                  <div className="bg-blue-400 w-full rounded-t-2xl h-[60%]"></div>

                  <div className="bg-blue-500 w-full rounded-t-2xl h-[80%]"></div>

                  <div className="bg-cyan-400 w-full rounded-t-2xl h-[55%]"></div>

                  <div className="bg-blue-600 w-full rounded-t-2xl h-[95%]"></div>
                </div>

                <div className="flex justify-between mt-4 text-sm text-slate-400">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
<section 
id="features"
className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative z-10">
  <div className="text-center">
    <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
      Everything You Need
    </h2>

    <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
      A modern polling platform designed to create engaging
      surveys, collect meaningful feedback and analyze
      responses in real-time.
    </p>
  </div>

  {/* Feature Cards */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
    {[
      {
        title: "Real-Time Analytics",
        desc: "Track live responses instantly with dynamic charts and visual summaries.",
      },
      {
        title: "Anonymous Responses",
        desc: "Allow users to respond anonymously or require authentication securely.",
      },
      {
        title: "Poll Expiry",
        desc: "Set custom expiry dates and automatically close inactive polls.",
      },
      {
        title: "Public Poll Sharing",
        desc: "Share poll links publicly and collect responses from anyone.",
      },
      {
        title: "Publish Results",
        desc: "Publish final results publicly after poll completion.",
      },
      {
        title: "Modern Dashboard",
        desc: "Manage polls, responses and participation insights beautifully.",
      },
    ].map((feature, index) => (
      <div
        key={index}
        className="group bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
      >
        <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300">
          <BarChart3 className="text-blue-600 w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-slate-900">
          {feature.title}
        </h3>

        <p className="mt-4 text-slate-600 leading-relaxed text-lg">
          {feature.desc}
        </p>
      </div>
    ))}
  </div>
</section>

{/* HOW IT WORKS */}
<section 
 id="about"
className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative z-10">
  <div className="text-center">
    <h2 className="text-5xl md:text-6xl font-black tracking-tight">
      How It Works
    </h2>

    <p className="mt-6 text-xl text-slate-600">
      Create, share and analyze polls in just a few simple steps.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-10 mt-20">
    {[
      {
        number: "01",
        title: "Create Poll",
        desc: "Build polls with custom questions, options and response settings.",
      },
      {
        number: "02",
        title: "Share Public Link",
        desc: "Share your poll instantly with a public link and collect responses.",
      },
      {
        number: "03",
        title: "Analyze Results",
        desc: "Monitor live analytics and publish final results beautifully.",
      },
    ].map((step, index) => (
      <div
        key={index}
        className="relative bg-white border border-slate-200 rounded-[32px] p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <div className="text-7xl font-black text-blue-100 absolute top-6 right-6">
          {step.number}
        </div>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-200">
            {index + 1}
          </div>

          <h3 className="mt-8 text-3xl font-black text-slate-900">
            {step.title}
          </h3>

          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* CTA SECTION */}
<section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative z-10">
  <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-12 lg:p-20 text-center shadow-2xl">
    
    <div className="absolute top-0 left-0 w-full h-full opacity-10">
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-white"></div>

      <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full border border-white"></div>
    </div>

    <div className="relative z-10">
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
        Start Building Powerful Polls Today
      </h2>

      <p className="mt-8 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
        Create interactive polls, gather meaningful insights and
        analyze responses with a modern real-time analytics platform.
      </p>

      <button

  onClick={() =>
    navigate("/signup")
  }

  className="mt-10 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300"
>
  Get Started Now
</button>
    </div>
  </div>
</section>

{/* FOOTER */}
<footer 
id="contact"
className="border-t border-slate-200 bg-white/50 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
    <div className="grid md:grid-cols-4 gap-12">
      
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            Poll<span className="text-blue-600">Flow</span>
          </h1>
        </div>

        <p className="mt-6 text-slate-600 leading-relaxed">
          Modern polling and analytics platform built for creators,
          communities and teams.
        </p>
      </div>

      {/* Links */}
      <div>
        <h3 className="text-xl font-black text-slate-900">
          Product
        </h3>

        <div className="mt-6 flex flex-col gap-4 text-slate-600">
          <p className="hover:text-blue-600 transition-all cursor-default">
            Features
          </p>

          <p className="hover:text-blue-600 transition-all cursor-default">
            Analytics
          </p>

          <p className="hover:text-blue-600 transition-all cursor-default">
            Dashboard
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-900">
          Company
        </h3>

        <div className="mt-6 flex flex-col gap-4 text-slate-600">
          <p className="hover:text-blue-600 transition-all cursor-default">
            About
          </p>

          <p className="hover:text-blue-600 transition-all cursor-default">
            Contact
          </p>

          <p className="hover:text-blue-600 transition-all cursor-default">
            Careers
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-900">
          Legal
        </h3>

        <div className="mt-6 flex flex-col gap-4 text-slate-600">
          <p className="hover:text-blue-600 transition-all cursor-default">
            Privacy Policy
          </p>

          <p className="hover:text-blue-600 transition-all cursor-default">
            Terms of Service
          </p>

          <p className="hover:text-blue-600 transition-all cursor-default">
            Security
          </p>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-slate-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
      <p className="text-slate-500">
        © 2026 PollFlow. All rights reserved.
      </p>

      <div className="flex items-center gap-6 text-slate-500">
        <p className="hover:text-blue-600 transition-all cursor-default">
          Twitter
        </p>

       <p className="hover:text-blue-600 transition-all cursor-default">
          GitHub
        </p>

        <p className="hover:text-blue-600 transition-all cursor-default">
          LinkedIn
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

export default Home;