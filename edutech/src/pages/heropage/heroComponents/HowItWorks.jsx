import { MessageSquare, Brain, Sparkles, Zap } from "lucide-react";

function HowItWorks() {
  const steps = [
    { icon: MessageSquare, title: "Ask a Question", description: "Type your query naturally" },
    { icon: Brain, title: "AI Understands", description: "Advanced processing analyzes intent" },
    { icon: Sparkles, title: "Gets University Information", description: "Retrieves accurate data instantly" },
    { icon: Zap, title: "Instant Answer Delivered", description: "Receive clear, helpful response" },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to get the answers you need, powered by intelligent AI.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">

              {/* Step Card */}
              <div className="relative h-full flex flex-col items-center text-center bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">

                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow */}
             

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
