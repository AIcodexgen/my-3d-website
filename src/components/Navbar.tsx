const navLinks = ["Services", "Work", "Process", "Stack"];

export function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl md:max-w-3xl">
      <nav className="flex items-center justify-between px-6 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-white/15">
        {/* Logo */}
        <a
          href="#"
          className="text-xs md:text-sm font-bold tracking-wider uppercase text-foreground shrink-0 hover:text-primary transition-colors"
        >
          CODE<span className="text-primary">XGEN</span>
        </a>

        {/* Center Nav Links */}
        <div className="flex items-center gap-4 md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[9px] md:text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest font-semibold"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Contact CTA */}
        <a
          href="#contact"
          className="text-[9px] md:text-xs text-foreground hover:text-primary uppercase tracking-widest border border-primary/40 hover:border-primary px-4 py-2 rounded-full transition-all duration-200 shrink-0 font-bold bg-primary/5 hover:bg-primary/10"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
