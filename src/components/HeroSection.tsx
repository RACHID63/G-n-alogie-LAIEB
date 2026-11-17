import { FormEvent, ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Globe,
  Loader2,
  Search,
  X,
} from 'lucide-react';
import { HERO_IMAGE_PATH } from '../data/familyArchive';
import { ResilientImage } from './ResilientImage';

export interface SearchResultItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  targetId: string;
  action?:
    | { type: 'clan'; clanId: string }
    | { type: 'member'; memberId: 'rachid' | 'mostefa' | 'fatma' }
    | { type: 'brother'; index: number }
    | { type: 'dna'; lineageId: 'maternel' | 'paternel' }
    | { type: 'timeline'; eventId: string }
    | { type: 'gallery' };
}

export interface WebSource {
  title: string;
  uri: string;
  domain: string;
}

export interface WebSearchResult {
  query: string;
  summary: string;
  sources: WebSource[];
  webSearchQueries: string[];
}

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onWebSearch: (query?: string) => void;
  onClearWebSearch: () => void;
  searchResults: SearchResultItem[];
  onSelectSearchResult: (item: SearchResultItem) => void;
  webSearchState: {
    loading: boolean;
    error: string | null;
    result: WebSearchResult | null;
  };
  onOpenContactModal: () => void;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[#1C1611]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function WebSummaryContent({ summary }: { summary: string }) {
  const lines = summary.split(/\r?\n/);

  return (
    <div className="space-y-2 text-sm leading-relaxed text-[#4A3E31]">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return null;

        if (line.startsWith('### ') || line.startsWith('## ') || line.startsWith('# ')) {
          const cleanHeading = line.replace(/^#{1,3}\s+/, '');
          return (
            <h4
              key={index}
              className="pt-2 font-editorial text-base font-semibold text-[#1C1611]"
            >
              {renderInlineMarkdown(cleanHeading)}
            </h4>
          );
        }

        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <p key={index} className="pl-3 relative">
              <span aria-hidden="true" className="absolute left-0 text-[#9A3412]">
                ·
              </span>
              {renderInlineMarkdown(line.slice(2))}
            </p>
          );
        }

        return <p key={index}>{renderInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  onWebSearch,
  onClearWebSearch,
  searchResults,
  onSelectSearchResult,
  webSearchState,
  onOpenContactModal,
}: HeroSectionProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      onWebSearch(searchQuery);
    }
  };

  const hasQuery = searchQuery.trim() !== '';
  const showWebPanel =
    webSearchState.loading || Boolean(webSearchState.error) || Boolean(webSearchState.result);

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

              {/* Workspace archive + Internet family-name search */}
              <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Rechercher un nom de famille sur Internet et dans les archives"
                className="pt-4 border-t border-[#C9AA78]/70"
              >
                <label htmlFor="archive-search" className="block text-xs font-medium text-[#4A3E31] mb-2">
                  Rechercher un nom de famille sur Internet et dans les archives (ex. Laïeb, Boucherit, Krid, Grid)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#4A3E31] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="archive-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Saisissez un nom de famille..."
                      className="w-full min-h-[44px] pl-10 pr-9 py-2.5 text-sm bg-[#FCF6E8]/90 border border-[#C9AA78] rounded-md text-[#1C1611] placeholder:text-[#4A3E31]/65 focus:outline-none focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          onSearchChange('');
                          onClearWebSearch();
                        }}
                        aria-label="Effacer la recherche"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#4A3E31] hover:text-[#1C1611] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={webSearchState.loading || searchQuery.trim().length < 2}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#FAF0D7] bg-[#9A3412] hover:bg-[#7C2D12] disabled:opacity-55 disabled:cursor-not-allowed rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {webSearchState.loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Recherche...
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4" />
                        Rechercher sur Internet
                      </>
                    )}
                  </button>
                </div>

                {/* Live Archive Matches */}
                {hasQuery && (
                  <div
                    aria-live="polite"
                    className="mt-3 bg-papyrus-card border border-[#C9AA78] rounded-md overflow-hidden"
                  >
                    <div className="px-3.5 py-2 border-b border-[#C9AA78]/60 flex items-center justify-between text-xs text-[#4A3E31]">
                      <span className="tabular-nums font-medium">
                        {searchResults.length > 0
                          ? `Archives du site : ${searchResults.length} correspondance${searchResults.length > 1 ? 's' : ''}`
                          : 'Archives du site : aucune correspondance directe'}
                      </span>
                      <div className="flex items-center gap-3">
                        {searchQuery.trim().length >= 2 && (
                          <button
                            type="button"
                            onClick={() => onWebSearch(searchQuery)}
                            className="inline-flex items-center gap-1 font-medium text-[#9A3412] hover:underline cursor-pointer"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            Lancer la recherche Web
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            onSearchChange('');
                            onClearWebSearch();
                          }}
                          className="text-[#4A3E31] hover:text-[#1C1611] hover:underline cursor-pointer"
                        >
                          Réinitialiser
                        </button>
                      </div>
                    </div>

                    {searchResults.length > 0 ? (
                      <ul className="divide-y divide-[#C9AA78]/45 max-h-56 overflow-y-auto">
                        {searchResults.slice(0, 6).map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => onSelectSearchResult(item)}
                              className="w-full text-left px-3.5 py-2.5 hover:bg-[#FCF6E8] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 text-[11px] text-[#9A3412] font-mono">
                                  <span>{item.category}</span>
                                </div>
                                <p className="font-editorial text-lg font-semibold text-[#1C1611] truncate">
                                  {item.title}
                                </p>
                                <p className="text-xs text-[#4A3E31] truncate">{item.subtitle}</p>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-[#4A3E31] shrink-0" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-3.5 py-3 text-xs text-[#4A3E31] space-y-2">
                        <p>
                          Ce nom n&apos;apparaît pas dans les archives locales d&apos;El Milia. Appuyez sur{' '}
                          <strong className="text-[#1C1611]">Entrée</strong> ou cliquez sur{' '}
                          <strong className="text-[#1C1611]">Rechercher sur Internet</strong> pour consulter les sources généalogiques en ligne.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span>Suggestions :</span>
                          {['Laïeb', 'Boucherit', 'Grid', 'Megriche', 'Lebsir'].map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => {
                                onSearchChange(term);
                                onWebSearch(term);
                              }}
                              className="px-2 py-1 text-xs font-medium bg-[#FCF6E8] border border-[#C9AA78] rounded-sm text-[#1C1611] hover:bg-[#EAD09E] cursor-pointer"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Internet Web Search Result Panel */}
                {showWebPanel && (
                  <div
                    aria-live="polite"
                    className="mt-3 bg-[#FCF6E8]/95 border border-[#9A3412]/45 rounded-md overflow-hidden"
                  >
                    <div className="px-3.5 py-2.5 bg-[#EAD09E]/55 border-b border-[#C9AA78]/70 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1611]">
                        <Globe className="w-4 h-4 text-[#9A3412]" />
                        <span>
                          {webSearchState.loading
                            ? `Recherche sur Internet en cours pour « ${searchQuery.trim()} »…`
                            : webSearchState.result
                              ? `Résultats Internet pour le patronyme « ${webSearchState.result.query} »`
                              : 'Recherche Internet'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={onClearWebSearch}
                        aria-label="Fermer les résultats Internet"
                        className="text-xs text-[#4A3E31] hover:text-[#1C1611] cursor-pointer"
                      >
                        Fermer
                      </button>
                    </div>

                    {webSearchState.loading && (
                      <div className="p-4 flex items-center gap-3 text-sm text-[#4A3E31]">
                        <Loader2 className="w-4 h-4 animate-spin text-[#9A3412] shrink-0" />
                        <span>
                          Interrogation des sources généalogiques et historiques sur le Web…
                        </span>
                      </div>
                    )}

                    {!webSearchState.loading && webSearchState.error && (
                      <div className="p-4 space-y-2 text-sm text-[#9A3412]">
                        <p>{webSearchState.error}</p>
                        {searchQuery.trim().length >= 2 && (
                          <button
                            type="button"
                            onClick={() => onWebSearch(searchQuery)}
                            className="text-xs font-semibold underline underline-offset-4 hover:text-[#7C2D12] cursor-pointer"
                          >
                            Réessayer la recherche Internet
                          </button>
                        )}
                      </div>
                    )}

                    {!webSearchState.loading && webSearchState.result && (
                      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                        {webSearchState.result.summary ? (
                          <WebSummaryContent summary={webSearchState.result.summary} />
                        ) : (
                          <p className="text-sm text-[#4A3E31]">
                            Aucune synthèse textuelle disponible pour ce patronyme.
                          </p>
                        )}

                        {webSearchState.result.sources.length > 0 && (
                          <div className="pt-3 border-t border-[#C9AA78]/60">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#4A3E31] mb-2">
                              Sources Web consultées ({webSearchState.result.sources.length})
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {webSearchState.result.sources.map((source) => (
                                <li key={source.uri}>
                                  <a
                                    href={source.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start justify-between gap-2 p-2.5 bg-papyrus-card border border-[#C9AA78]/70 hover:border-[#9A3412] rounded-sm transition-colors"
                                  >
                                    <div className="min-w-0">
                                      <p className="text-xs font-medium text-[#1C1611] group-hover:text-[#9A3412] truncate">
                                        {source.title}
                                      </p>
                                      <p className="text-[11px] font-mono text-[#4A3E31] truncate">
                                        {source.domain}
                                      </p>
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-[#4A3E31] group-hover:text-[#9A3412] shrink-0 mt-0.5" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
