import { Brain, Zap, CheckCircle, ShieldCheck } from "lucide-react";

function About() {
  const highlights = [
    {
      icon: Brain,
      title: "Developer-aware AI",
      text: "Understands engineering questions, implementation friction, and decision-making tradeoffs.",
    },
    {
      icon: Zap,
      title: "Fast workflow support",
      text: "Helps you move from confusion to action without long context switching loops.",
    },
    {
      icon: CheckCircle,
      title: "Clear practical answers",
      text: "Focuses on steps, logic, and direction you can actually use in your codebase.",
    },
    {
      icon: ShieldCheck,
      title: "Built for reliability",
      text: "Useful for everyday coding tasks where clarity and consistency matter most.",
    },
  ];

  return (
    <section id="about" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-[2rem] border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 p-8 backdrop-blur-2xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-200/80">
            About Bazhil Chat
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
            Your developer companion for real engineering work
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Bazhil Chat is designed for developers who want sharp answers,
            cleaner thinking, and less wasted time during implementation. It
            supports the moments that matter most: bugs, APIs, architecture,
            review feedback, and technical problem-solving.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200/80">
                Built for
              </p>
              <p className="mt-3 text-base leading-7 text-gray-300">
                Frontend, backend, and full-stack teams who need responsive AI support.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200/80">
                Best for
              </p>
              <p className="mt-3 text-base leading-7 text-gray-300">
                Understanding issues quickly and turning ideas into implementation faster.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-purple-400/30 hover:bg-white/[0.08]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                <highlight.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {highlight.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-gray-400">
                {highlight.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
