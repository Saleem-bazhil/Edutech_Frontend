import { Star } from "lucide-react";

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
    <section id="testimonials" className="relative py-24 px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto relative">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Developer Success Stories
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how developers use Bazhil Chat to debug faster, think clearer, and build with confidence.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 leading-relaxed mb-8 italic">
                "{review.review}"
              </p>

              {/* Avatar + Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg ring-4 ring-purple-500/20">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{review.name}</h4>
                  <p className="text-gray-400 text-sm">{review.department}</p>
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
