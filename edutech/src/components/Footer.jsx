import {
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const menuLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Workflow", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="relative px-6 pb-12 pt-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                  Bazhil Chat
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  AI support designed for focused developer workflows.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300">
              From debugging sessions to implementation decisions, Bazhil Chat
              helps teams stay clear, productive, and connected to the work that
              matters most.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {menuLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/30 hover:bg-white/[0.08] hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/chat"
                className="rounded-full border border-purple-400/20 bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:brightness-110"
              >
                Open Chat
              </Link>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-200/80">
              Connect
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-300 transition-colors duration-300 hover:border-purple-400/30 hover:bg-white/[0.08] hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-400">
          <p>&copy; 2026 Bazhil Chat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
