import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <div
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">
              Built for Developers Who Ship
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight"
        >
          Bazhil Chat
        </h1>

        {/* Description */}
        <p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Your AI coding partner for building faster, debugging smarter, and
          staying in flow. Ask about APIs, architecture, bugs, logic, or
          implementation details and get clear answers when you need them.
        </p>

        {/* CTA Button */}
        <div className="group relative inline-block">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-purple-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-blue-500/10 blur-2xl opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100" />

          <Link
            to="/chat"
            className="group relative z-10 inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70"
          >
            <span className="flex items-center gap-2">
              Start Building with AI
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
