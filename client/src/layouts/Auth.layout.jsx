import { BarChart3 } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7fbff] overflow-hidden relative flex items-center justify-center px-6 py-10">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-100 rounded-full blur-3xl opacity-30"></div>

      {/* FLOATING DOODLES */}
      <div className="absolute top-20 left-10 w-5 h-5 bg-blue-500 rounded-full animate-pulse opacity-70"></div>

      <div className="absolute top-52 right-16 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-70"></div>

      <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-70"></div>

      {/* BRAND LOGO */}
      <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-200">
          <BarChart3 className="text-white w-5 h-5" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Poll<span className="text-blue-600">Flow</span>
        </h1>
      </div>

      {/* MAIN AUTH CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[36px] p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;