import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuthModal: (tab: 'login' | 'register') => void;
  loggedInUser: string | null;
}

const NAV_LINKS = [
  { href: '#histoire', label: 'Histoire' },
  { href: '#trois-freres', label: 'Trois Frères' },
  { href: '#familles', label: 'Familles' },
  { href: '#genealogie-adn', label: 'Généalogie ADN' },
];

export function Navbar({ onOpenAuthModal, loggedInUser }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F4E4C1]/90 backdrop-blur-md border-b border-[#C9AA78]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#accueil"
          className="font-editorial text-2xl font-semibold tracking-tight text-[#1C1611] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A3412]"
        >
          Laïeb · Archives
        </a>

        {/* Zone 2: 4 Concise Single-Line Navigation Links */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4A3E31] hover:text-[#1C1611] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A3412]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenAuthModal('login')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-[#FAF0D7] bg-[#1C1611] hover:bg-[#9A3412] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A3412]"
          >
            {loggedInUser ? `Compte · ${loggedInUser}` : 'Espace Membre'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#C9AA78] text-[#1C1611] hover:bg-[#EAD09E] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#C9AA78]/70 bg-[#F4E4C1]/95 px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 text-base font-medium text-[#1C1611] hover:bg-[#EAD09E] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#C9AA78]/70">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal('login');
              }}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[#FAF0D7] bg-[#1C1611] hover:bg-[#9A3412] rounded-md transition-colors cursor-pointer"
            >
              {loggedInUser ? `Compte · ${loggedInUser}` : 'Espace Membre'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
