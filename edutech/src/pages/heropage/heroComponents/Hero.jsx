import { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Code2, Layers3, Zap, Terminal, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── constants ─────────────────────────────────────────── */
const PILLS = ["API Support", "Debugging Help", "Architecture Guidance"];

const STATS = [
  { value: "24/7", label: "Always available",  bar: "from-purple-500 to-violet-600" },
  { value: "10×",  label: "Faster answers",    bar: "from-blue-500 to-cyan-500"    },
  { value: "100%", label: "Actionable",         bar: "from-pink-500 to-purple-500"  },
];

const ASKS = [
  '"Why is my auth flow failing?"',
  '"Explain this async race condition"',
  '"Best API design pattern here?"',
  '"Debug my TypeScript generics"',
];

/* ─── Typewriter ────────────────────────────────────────── */
function Typewriter() {
  const [text, setText]       = useState("");
  const [li, setLi]           = useState(0);
  const [ci, setCi]           = useState(0);
  const [deleting, setDel]    = useState(false);
  const [paused, setPaused]   = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDel(true); }, 2000);
      return () => clearTimeout(t);
    }
    const cur = ASKS[li];
    if (!deleting) {
      if (ci < cur.length) {
        const t = setTimeout(() => { setText(cur.slice(0, ci + 1)); setCi(c => c + 1); }, 42);
        return () => clearTimeout(t);
      }
      setPaused(true);
    } else {
      if (ci > 0) {
        const t = setTimeout(() => { setText(cur.slice(0, ci - 1)); setCi(c => c - 1); }, 20);
        return () => clearTimeout(t);
      }
      setDel(false);
      setLi(i => (i + 1) % ASKS.length);
    }
  }, [ci, deleting, paused, li]);

  return (
    <span className="text-purple-300 italic text-xs leading-relaxed">
      {text}
      <span className="inline-block w-px h-3.5 bg-purple-400 ml-px align-middle" style={{ animation: "blink .9s step-end infinite" }} />
    </span>
  );
}

/* ─── StatCard ──────────────────────────────────────────── */
function StatCard({ stat, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl border p-4 cursor-default overflow-hidden transition-all duration-300 ${hovered ? "border-purple-500/35 bg-purple-500/8 -translate-y-0.5" : "border-white/[0.07] bg-black/20"}`}
      style={{ opacity: 0, animation: `fadeUp .6s ease ${delay}s forwards` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
      <p className="text-xs text-gray-500 mt-1 mb-3">{stat.label}</p>
      <div className="h-px w-full bg-white/[0.05] rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${stat.bar}`} style={{ width: 0, animation: `barGrow 1.1s ease ${delay + 0.25}s forwards` }} />
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const [activePill, setActivePill] = useState(null);
  const cardRef = useRef(null);

  /* subtle 3-D tilt on right card */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const move  = (e) => { const r = card.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; card.style.transform = `perspective(1000px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`; };
    const leave = ()  => { card.style.transform = "perspective(1000px) rotateY(0) rotateX(0)"; };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes barGrow{ from{width:0} to{width:100%} }
        @keyframes orbMove{ 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,-10px)} }
        .a1{opacity:0;animation:fadeUp .65s ease .1s forwards}
        .a2{opacity:0;animation:fadeUp .65s ease .22s forwards}
        .a3{opacity:0;animation:fadeUp .65s ease .36s forwards}
        .a4{opacity:0;animation:fadeUp .65s ease .5s forwards}
        .a5{opacity:0;animation:fadeUp .65s ease .42s forwards}
      `}</style>

      <section id="home" className="relative overflow-hidden px-6 pb-20 pt-36 sm:pb-24 sm:pt-44">

        {/* background orbs */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-[480px] w-[480px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle,rgba(139,92,246,.15),transparent 70%)", animation: "orbMove 10s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -right-16 top-10 h-[340px] w-[340px] rounded-full blur-[70px]"
          style={{ background: "radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)", animation: "orbMove 13s ease-in-out 2s infinite reverse" }} />

        {/* dot grid */}
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(139,92,246,.09) 1px,transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse 75% 50% at 50% 0%,black,transparent)" }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">

          {/* ── LEFT ── */}
          <div className="text-center lg:text-left">

    

            {/* pills */}
            <div className="a2 mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {PILLS.map((pill, i) => (
                <button
                  key={pill}
                  onMouseEnter={() => setActivePill(i)}
                  onMouseLeave={() => setActivePill(null)}
                  className={`relative overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200
                    ${activePill === i ? "border-purple-500/45 bg-purple-500/12 text-purple-200 -translate-y-px" : "border-white/10 bg-white/[0.04] text-gray-400 hover:text-gray-200"}`}
                >
                  {activePill === i && <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />}
                  <span className="relative">{pill}</span>
                </button>
              ))}
            </div>

            {/* heading */}
            <h1 className="a3 mb-5 text-5xl font-extrabold leading-[0.93] tracking-[-0.03em] text-white sm:text-6xl md:text-[4.5rem]">
              Developer-first AI
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                built to keep you in flow
              </span>
            </h1>

            {/* description */}
            <p className="a3 mx-auto mb-8 max-w-lg text-base leading-[1.8] text-gray-400 lg:mx-0">
              Bazhil Chat helps you debug faster, understand APIs, shape better architecture,
              and move through implementation with{" "}
              <span className="text-gray-200 font-medium">less friction</span> and{" "}
              <span className="text-gray-200 font-medium">more confidence</span>.
            </p>

            {/* CTAs */}
            <div className="a4 mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/chat"
                className="group relative inline-flex min-h-[50px] items-center gap-2.5 overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-px hover:brightness-110 active:translate-y-0"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Start Building with AI</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/25 hover:bg-white/[0.08] hover:text-white hover:-translate-y-px"
              >
                Explore Features
              </a>
            </div>

          </div>

          {/* ── RIGHT CARD ── */}
          <div className="a5 relative">

    
            {/* card */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-6"
              style={{ transition: "transform .18s ease" }}
            >
              {/* inner corner accent */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-2xl" />

              {/* card header */}
              <div className="mb-4 flex items-start justify-between border-b border-white/[0.07] pb-4">
                <div>
                  <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-purple-300/65">
                    Developer Workspace
                  </p>
                  <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
                    Ship features with<br />less back-and-forth
                  </h2>
                </div>
                <div className="ml-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white transition-transform duration-300 hover:rotate-[-5deg] hover:scale-105 cursor-default">
                  <Code2 className="h-5 w-5" />
                </div>
              </div>

              {/* stats */}
              <div className="mb-4 grid grid-cols-3 gap-2.5">
                {STATS.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} delay={0.6 + i * 0.1} />
                ))}
              </div>

              {/* feature row */}
              <div className="group mb-3 rounded-[16px] border border-purple-500/15 bg-gradient-to-r from-purple-500/7 to-blue-500/7 p-4 transition-all duration-300 hover:border-purple-500/30 hover:from-purple-500/12 hover:to-blue-500/12 cursor-default">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
                    <Layers3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm font-semibold text-white">Context-aware developer help</p>
                    <p className="text-xs leading-[1.65] text-gray-400">
                      Ask about frontend bugs, backend flows, or integration details — get focused answers fast.
                    </p>
                  </div>
                </div>
              </div>

              {/* ask / get */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="group relative overflow-hidden rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-purple-400/20 hover:bg-white/[0.05] cursor-default">
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 group-hover:w-full" />
                  <div className="mb-2 flex items-center gap-1.5">
                    <Terminal className="h-3 w-3 text-purple-400" />
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-purple-300/70">Ask</p>
                  </div>
                  <Typewriter />
                </div>

                <div className="group relative overflow-hidden rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.05] cursor-default">
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
                  <div className="mb-2 flex items-center gap-1.5">
                    <GitBranch className="h-3 w-3 text-blue-400" />
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-blue-300/70">Get</p>
                  </div>
                  <p className="text-xs leading-[1.6] text-gray-400">
                    Practical steps, likely causes, and a cleaner direction to implement the fix.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}