import { MessageSquare, Brain, Sparkles, Zap } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe the task",
      description:
        "Ask about bugs, APIs, components, logic, or architecture in plain developer language.",
    },
    {
      icon: Brain,
      title: "AI analyzes context",
      description:
        "The system interprets your intent and narrows in on what actually matters to solve it.",
    },
    {
      icon: Sparkles,
      title: "Get useful guidance",
      description:
        "Receive focused implementation ideas, debugging direction, and clearer next steps.",
    },
    {
      icon: Zap,
      title: "Keep shipping",
      description:
        "Turn the response into action quickly and stay in flow while building your product.",
    },
  ];

  return (
    <section id="how-it-works" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-purple-200/80">
            Workflow
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            A clean path from question
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              to implementation
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            The experience is built to feel lightweight and useful, so answers
            help you move forward instead of slowing you down.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-purple-400/30 hover:bg-white/[0.08]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-4xl font-bold leading-none text-white/10">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-gray-400">
                {step.description}
              </p>

              <div className="mt-8 h-px bg-gradient-to-r from-purple-500/20 via-white/10 to-blue-500/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
