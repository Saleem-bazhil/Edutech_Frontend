import { MessageSquare, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  const menuLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Chat", href: "#chat" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="relative py-16 px-6 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              EduChat
            </span>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-wrap justify-center gap-8">
            {menuLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Section */}
        <div className="text-center pt-8 border-t border-purple-500/10">
          <p className="text-gray-500">© 2025 EduChat. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
