import {
  Calendar,
  CreditCard,
  UserCheck,
  Award,
  Info,
  MessageSquare,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Calendar,
      title: "Sprint Planning Support",
      description:
        "Break down features, estimate tasks, and stay aligned on delivery timelines.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: CreditCard,
      title: "API Integration Guidance",
      description:
        "Understand endpoints, request flows, auth patterns, and integration steps faster.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: UserCheck,
      title: "Code Review Assistance",
      description:
        "Get help spotting logic issues, cleanup opportunities, and safer implementation choices.",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: Award,
      title: "Debugging Help",
      description:
        "Trace bugs, understand stack traces, and work through broken behavior step by step.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Info,
      title: "System Design Context",
      description:
        "Explore architecture ideas, data flow decisions, and scalable engineering patterns.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: MessageSquare,
      title: "24/7 Developer Support",
      description:
        "Get fast, developer-friendly answers whenever you're coding, testing, or shipping.",
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section id="features" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 text-center lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-purple-200/80">
              Feature Stack
            </p>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Built like a developer workspace,
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                not a generic chatbot
              </span>
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-400 sm:text-lg lg:mx-0">
            Every block is shaped around how developers actually work: planning,
            coding, debugging, reviewing, and shipping without losing context.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-purple-400/30 hover:bg-white/[0.08]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white`}
              >
                <feature.icon className="h-8 w-8" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-4 text-base leading-8 text-gray-400">
                {feature.description}
              </p>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-purple-500/20 via-white/10 to-blue-500/20" />

              <p className="mt-5 text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                Developer-focused assistance that stays concise and practical.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
