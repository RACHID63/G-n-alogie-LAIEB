import { FormEvent } from 'react';
import { ArrowDownRight, Search, X } from 'lucide-react';
import { HERO_IMAGE_PATH } from '../data/familyArchive';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  searchResultCount: number | null;
  onOpenContactModal: () => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  searchResultCount,
  onOpenContactModal,
}: HeroSectionProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <section id="accueil" className="border-b border-[#C9AA78]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Two-column editorial hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
                Monographie Familiale · El Milia &amp; Mulhouse · 1800 – 1963
              </p>

              <h1
                className="mt-4 font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#1C1611]"
                style={{ textWrap: 'balance' }}
              >
                Histoire &amp; Généalogie de la Famille Laïeb
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#4A3E31] max-w-xl">
                De la <span className="text-[#1C1611] font-medium">dechra d&apos;Ouled-Ali-Oubraham</span> et du quartier historique de <span className="text-[#1C1611] font-medium">l&apos;Ajankia à El Milia</span> jusqu&apos;aux analyses génétiques iGENEA réunissant les lignées paternelle Laïeb et maternelle Grid.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {/* Primary and secondary actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#histoire"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAF0D7] bg-[#9A3412] hover:bg-[#7C2D12] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A3412]"
                >
                  Lire la chronique d&apos;El Milia
                  <ArrowDownRight className="w-4 h-4" />
                </a>
                <a
                  href="#genealogie-adn"
                  className="inline-flex items-center px-5 py-3 text-sm font-semibold text-[#1C1611] bg-[#FAF0D7]/80 hover:bg-[#FAF0D7] border border-[#C9AA78] rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  Consulter les résultats ADN
                </a>
                <button
                  type="button"
                  onClick={onOpenContactModal}
                  className="inline-flex items-center px-4 py-3 text-sm font-medium text-[#4A3E31] hover:text-[#1C1611] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Contacter l&apos;archiviste
                </button>
              </div>

              {/* Workspace live archive search */}
              <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Rechercher dans les archives familiales"
                className="pt-4 border-t border-[#C9AA78]/70"
              >
                <label htmlFor="archive-search" className="block text-xs font-medium text-[#4A3E31] mb-2">
                  Rechercher un patronyme, un lieu ou un haplogroupe (ex. Boucherit, Ajankia, G-M201)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#4A3E31] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="archive-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Nom de famille, membre ou lignée..."
                      className="w-full min-h-[44px] pl-10 pr-9 py-2.5 text-sm bg-[#FCF6E8]/90 border border-[#C9AA78] rounded-md text-[#1C1611] placeholder:text-[#4A3E31]/65 focus:outline-none focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => onSearchChange('')}
                        aria-label="Effacer la recherche"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#4A3E31] hover:text-[#1C1611] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2.5 text-sm font-medium text-[#1C1611] bg-[#FAF0D7]/90 hover:bg-[#FCF6E8] border border-[#C9AA78] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Rechercher
                  </button>
                </div>
                {searchQuery.trim() !== '' && searchResultCount !== null && (
                  <p className="mt-2 text-xs text-[#4A3E31] tabular-nums">
                    {searchResultCount > 0
                      ? `${searchResultCount} correspondance${searchResultCount > 1 ? 's' : ''} trouvée${searchResultCount > 1 ? 's' : ''} dans le répertoire familial.`
                      : 'Aucune correspondance directe. Essayez « Laïeb », « Grid », « Boucherit » ou « H ».'}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Editorial archival plate */}
          <figure className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] lg:min-h-0 overflow-hidden rounded-md border border-[#C9AA78] bg-[#DFC38C]">
              <ResilientImage
                src={HERO_IMAGE_PATH}
                alt="Archives familiales de la famille Laïeb : carte topographique de Constantine et El Milia, manuscrits et boussole ancienne"
                fallbackTitle="Archives de Constantine et El Milia"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
            <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A3E31]">
              <span className="font-editorial italic text-sm">
                Fig. 1 — Carte historique de Constantine &amp; El Milia, carnets familiaux et boussole de repérage
              </span>
              <span className="font-mono tabular-nums text-[11px]">ARCH. EL-MILIA · 1961</span>
            </figcaption>
          </figure>
        </div>

        {/* Full-width archival operational / index strip below the split */}
        <dl className="mt-10 pt-8 border-t border-[#C9AA78]/70 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <dt className="text-xs font-medium text-[#4A3E31]">Date de référence</dt>
            <dd className="mt-1 font-editorial text-xl sm:text-2xl font-semibold text-[#1C1611] tabular-nums">
              5 janvier 1961
            </dd>
            <dd className="text-xs text-[#4A3E31]">Ouled-Ali-Oubraham, El Milia</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#4A3E31]">Recensements documentés</dt>
            <dd className="mt-1 font-editorial text-xl sm:text-2xl font-semibold text-[#1C1611] tabular-nums">
              19 relevés (1830–1962)
            </dd>
            <dd className="text-xs text-[#4A3E31]">Fratrie Laïeb · Megriche · Lebsir</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#4A3E31]">Lignée paternelle (ADN-Y)</dt>
            <dd className="mt-1 font-editorial text-xl sm:text-2xl font-semibold text-[#9A3412] tabular-nums">
              Haplogroupe G-M201
            </dd>
            <dd className="text-xs text-[#4A3E31]">Proche-Orient · Famille Laïeb</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#4A3E31]">Lignée maternelle (ADNmt)</dt>
            <dd className="mt-1 font-editorial text-xl sm:text-2xl font-semibold text-[#1E3A8A] tabular-nums">
              Haplogroupe H
            </dd>
            <dd className="text-xs text-[#4A3E31]">Europe de l&apos;Ouest · Famille Grid</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
