import { Brain, Zap, CheckCircle } from "lucide-react";

function About() {
  const highlights = [
    { icon: Brain, text: "Developer-Aware AI" },
    { icon: Zap, text: "Fast Engineering Support" },
    { icon: CheckCircle, text: "Practical Coding Answers" },
  ];

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Outer Card */}
        <div className="relative bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
          
          {/* Glow Background */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-purple-500/5 to-blue-500/5 blur-3xl"></div>

          {/* Content */}
          <div className="relative text-center">
            
            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Bazhil Chat
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Bazhil Chat is an AI-powered developer assistant designed to help
              you solve real engineering problems faster. Whether you are
              debugging an issue, exploring an API, refining logic, or shaping a
              better architecture, it keeps your workflow moving with practical,
              context-aware support.
            </p>

            {/* Highlights */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-2xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <highlight.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">{highlight.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
