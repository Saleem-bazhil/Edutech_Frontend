import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">
              AI-Powered University Assistant
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
          EduChat
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Your intelligent companion for university life. Get instant answers
          about exams, fees, admissions, and everything you need to succeed.
        </p>

        {/* CTA Button */}
        <Link
          to="/chat"
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
  rounded-2xl font-semibold text-white shadow-2xl shadow-purple-500/50 
  hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 inline-block"
        >
          <span className="flex items-center gap-2">
            Start Chatting Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>

          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 
  opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
          ></div>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
