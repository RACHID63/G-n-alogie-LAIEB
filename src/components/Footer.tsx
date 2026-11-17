import { SOCIAL_LINKS } from '../data/familyArchive';

interface FooterProps {
  onOpenContactModal: () => void;
  onOpenAuthModal: (tab: 'login' | 'register') => void;
}

export function Footer({ onOpenContactModal, onOpenAuthModal }: FooterProps) {
  return (
    <footer className="border-t border-[#C9AA78]/70 bg-papyrus-band text-[#4A3E31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#C9AA78]/70">
          <div className="md:col-span-5 space-y-3">
            <a href="#accueil" className="font-editorial text-2xl font-semibold text-[#1C1611]">
              Histoire &amp; Généalogie — Famille Laïeb
            </a>
            <p className="text-sm leading-relaxed max-w-md">
              Compilation historique d&apos;Ouled-Ali-Oubraham et de l&apos;Ajankia (El Milia),
              mémoire des trois frères Laïeb, Megriche et Lebsir, et archives ADN iGENEA.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1611]">
              Chapitres
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#histoire" className="hover:text-[#1C1611] transition-colors">
                  Chronique d&apos;El Milia
                </a>
              </li>
              <li>
                <a href="#trois-freres" className="hover:text-[#1C1611] transition-colors">
                  Les Trois Frères
                </a>
              </li>
              <li>
                <a href="#familles" className="hover:text-[#1C1611] transition-colors">
                  Index des familles
                </a>
              </li>
              <li>
                <a href="#genealogie-adn" className="hover:text-[#1C1611] transition-colors">
                  Lignées &amp; ADN
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1611]">
              Correspondance &amp; Réseaux
            </p>
            <p className="text-sm text-[#1C1611]">
              LAÏEB Rachid · 12 rue de la Page, 75000 Paris
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <button
                type="button"
                onClick={onOpenContactModal}
                className="text-sm font-medium text-[#9A3412] hover:underline cursor-pointer"
              >
                Écrire à l&apos;archiviste
              </button>
              <button
                type="button"
                onClick={() => onOpenAuthModal('register')}
                className="text-sm font-medium text-[#1C1611] hover:underline cursor-pointer"
              >
                Inscription membre
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-xs">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1C1611] underline underline-offset-4 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <p>Archives familiales Laïeb &amp; Grid · El Milia – Mulhouse – Paris</p>
          <p className="font-mono tabular-nums">laieb@soldeal.fr</p>
        </div>
      </div>
    </footer>
  );
}
