import { Star, Quote } from "lucide-react";

function Testimonials() {
  const reviews = [
    {
      name: "Sarah Johnson",
      department: "Frontend Developer",
      review:
        "Bazhil Chat helped me move through UI bugs and component logic much faster. It feels like pairing with someone who understands the problem immediately.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      department: "Backend Engineer",
      review:
        "I use it when I need quick clarity on APIs, data handling, and implementation decisions. It saves a surprising amount of context-switching time.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      department: "Full-Stack Developer",
      review:
        "The always-available support is huge. When I get stuck late in the build, I can still work through errors and keep shipping.",
      avatar: "ER",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative px-6 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.14),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-purple-200/80">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Developers use Bazhil Chat
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                to think clearer and build faster
              </span>
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-400 sm:text-lg lg:mx-0">
            Real developer feedback focused on speed, clarity, and reduced
            friction during implementation.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-2xl transition-colors duration-300 hover:border-purple-400/30 hover:bg-white/[0.08]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-purple-200">
                  <Quote className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                "{review.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-lg font-bold text-white">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-400">{review.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
