import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { EL_MILIA_TIMELINE, HistoricalEvent, normalizeText } from '../data/familyArchive';

interface ElMiliaTimelineProps {
  searchQuery: string;
  selectedEventId?: string | null;
  onSelectEventId?: (eventId: string) => void;
  onSelectFamilyName?: (familyName: string) => void;
}

type EraFilter = 'all' | 'origines' | 'recensements' | 'xxe';

const ERA_LABELS: { id: EraFilter; label: string }[] = [
  { id: 'all', label: 'Toute la chronologie' },
  { id: 'origines', label: 'Origines & Tribus' },
  { id: 'recensements', label: 'Recensements (1830–1962)' },
  { id: 'xxe', label: 'XXe siècle' },
];

export function ElMiliaTimeline({
  searchQuery,
  selectedEventId,
  onSelectEventId,
  onSelectFamilyName,
}: ElMiliaTimelineProps) {
  const [eraFilter, setEraFilter] = useState<EraFilter>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const normalizedQuery = normalizeText(searchQuery);

  const visibleEvents: HistoricalEvent[] = EL_MILIA_TIMELINE.filter((ev) => {
    const matchesEra = eraFilter === 'all' || ev.era === eraFilter;
    if (!matchesEra) return false;
    if (!normalizedQuery) return true;
    return (
      normalizeText(ev.title).includes(normalizedQuery) ||
      normalizeText(ev.yearLabel).includes(normalizedQuery) ||
      normalizeText(ev.location).includes(normalizedQuery) ||
      normalizeText(ev.summary).includes(normalizedQuery) ||
      normalizeText(ev.details).includes(normalizedQuery) ||
      ev.familiesInvolved.some((f) => normalizeText(f).includes(normalizedQuery))
    );
  });

  const safeIndex =
    visibleEvents.length > 0 ? Math.min(activeIndex, visibleEvents.length - 1) : 0;
  const currentEvent = visibleEvents[safeIndex] ?? null;

  useEffect(() => {
    if (!selectedEventId) return;
    const idx = visibleEvents.findIndex((e) => e.id === selectedEventId);
    if (idx !== -1) {
      setActiveIndex(idx);
      itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedEventId, visibleEvents.length]);

  useEffect(() => {
    setActiveIndex(0);
    if (railRef.current) {
      railRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [eraFilter, normalizedQuery]);

  const handleRailScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    setScrollProgress(Math.round((el.scrollLeft / maxScroll) * 100));
  };

  useEffect(() => {
    handleRailScroll();
  }, [visibleEvents.length]);

  const selectAndCenter = (index: number) => {
    if (index < 0 || index >= visibleEvents.length) return;
    setActiveIndex(index);
    onSelectEventId?.(visibleEvents[index].id);
    const btn = itemRefs.current[index];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const scrollRailBy = (direction: 'prev' | 'next') => {
    const el = railRef.current;
    if (el) {
      const offset = direction === 'next' ? 320 : -320;
      el.scrollBy({ left: offset, behavior: 'smooth' });
    }
    if (direction === 'next' && safeIndex < visibleEvents.length - 1) {
      selectAndCenter(safeIndex + 1);
    } else if (direction === 'prev' && safeIndex > 0) {
      selectAndCenter(safeIndex - 1);
    }
  };

  return (
    <div id="chronologie-el-milia" className="mt-14 pt-12 border-t border-[#C9AA78]/70">
      {/* Timeline Header & Era Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
            Frise chronologique interactive
          </p>
          <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1611]">
            Repères historiques de la région d&apos;El Milia
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Filtrer la frise par période"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF0D7]/70 border border-[#C9AA78] rounded-md"
          >
            {ERA_LABELS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setEraFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  eraFilter === tab.id
                    ? 'bg-[#1C1611] text-[#FAF0D7]'
                    : 'text-[#4A3E31] hover:text-[#1C1611]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollRailBy('prev')}
              disabled={safeIndex === 0 || visibleEvents.length === 0}
              aria-label="Événement précédent"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-[#C9AA78] bg-[#FAF0D7]/80 text-[#1C1611] hover:bg-[#FCF6E8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRailBy('next')}
              disabled={safeIndex >= visibleEvents.length - 1 || visibleEvents.length === 0}
              aria-label="Événement suivant"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-[#C9AA78] bg-[#FAF0D7]/80 text-[#1C1611] hover:bg-[#FCF6E8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Progress Rail */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-[#4A3E31] mb-2">
          <span>Faites défiler horizontalement ou sélectionnez une date</span>
          <span className="font-mono tabular-nums">
            {visibleEvents.length > 0 ? `${safeIndex + 1} / ${visibleEvents.length}` : '0 / 0'}
          </span>
        </div>
        <div className="h-[2px] w-full bg-[#C9AA78]/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#9A3412] transition-transform duration-200 origin-left"
            style={{
              transform: `scaleX(${
                visibleEvents.length > 1
                  ? Math.max(0.14, (safeIndex + 1) / visibleEvents.length)
                  : scrollProgress > 0
                    ? scrollProgress / 100
                    : 1
              })`,
            }}
          />
        </div>
      </div>

      {/* Scrollable Horizontal Milestone Rail */}
      {visibleEvents.length === 0 ? (
        <div className="mt-5 p-6 bg-papyrus-card border border-[#C9AA78] rounded-md text-sm text-[#4A3E31]">
          Aucun jalon historique ne correspond à votre recherche actuelle.
        </div>
      ) : (
        <>
          <div
            ref={railRef}
            onScroll={handleRailScroll}
            role="listbox"
            aria-label="Chronologie interactive d'El Milia"
            className="mt-5 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-4"
          >
            {visibleEvents.map((event, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={event.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectAndCenter(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      selectAndCenter(Math.min(visibleEvents.length - 1, index + 1));
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      selectAndCenter(Math.max(0, index - 1));
                    }
                  }}
                  className={`snap-start shrink-0 w-[260px] sm:w-[290px] text-left p-4 rounded-md border transition-colors cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#1C1611] text-[#FAF0D7] border-[#1C1611]'
                      : 'bg-papyrus-card text-[#1C1611] border-[#C9AA78] hover:bg-[#FCF6E8]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-current/15">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isActive ? 'text-[#E8CFA0]' : 'text-[#9A3412]'
                        }`}
                      >
                        {event.orderLabel} · {event.yearLabel}
                      </span>
                    </div>
                    <h4 className="mt-3 font-editorial text-xl font-semibold leading-snug">
                      {event.title}
                    </h4>
                  </div>

                  <p
                    className={`mt-3 text-xs line-clamp-2 leading-relaxed ${
                      isActive ? 'text-[#EAD09E]' : 'text-[#4A3E31]'
                    }`}
                  >
                    {event.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Historical Event Archival Reader Card */}
          {currentEvent && (
            <div className="mt-3 bg-papyrus-card border border-[#C9AA78] rounded-md p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4A3E31]">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[#9A3412] font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {currentEvent.yearLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
                      {currentEvent.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px]">{currentEvent.archivalRef}</span>
                  </div>

                  <h4 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1611]">
                    {currentEvent.title}
                  </h4>

                  <p className="text-base leading-relaxed text-[#1C1611] max-w-prose">
                    {currentEvent.details}
                  </p>
                </div>

                <div className="lg:col-span-4 lg:border-l lg:border-[#C9AA78]/70 lg:pl-6 space-y-4">
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-medium text-[#4A3E31]">
                        Lignées &amp; tribus mentionnées
                      </dt>
                      <dd className="mt-1.5 text-[#1C1611] font-medium leading-relaxed">
                        {currentEvent.familiesInvolved.map((fam, idx) => (
                          <span key={fam}>
                            {onSelectFamilyName ? (
                              <button
                                type="button"
                                onClick={() => onSelectFamilyName(fam)}
                                className="hover:text-[#9A3412] underline decoration-[#C9AA78] underline-offset-4 cursor-pointer"
                              >
                                {fam}
                              </button>
                            ) : (
                              fam
                            )}
                            {idx < currentEvent.familiesInvolved.length - 1 && (
                              <span aria-hidden="true" className="mx-2 text-[#4A3E31]">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </dd>
                    </div>

                    <div className="pt-3 border-t border-[#C9AA78]/60">
                      <dt className="text-xs font-medium text-[#4A3E31]">Navigation directe</dt>
                      <dd className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => selectAndCenter(safeIndex - 1)}
                          disabled={safeIndex === 0}
                          className="px-3 py-1.5 text-xs font-medium border border-[#C9AA78] bg-[#FCF6E8] text-[#1C1611] hover:bg-[#EAD09E] rounded-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          ← Précédent
                        </button>
                        <button
                          type="button"
                          onClick={() => selectAndCenter(safeIndex + 1)}
                          disabled={safeIndex >= visibleEvents.length - 1}
                          className="px-3 py-1.5 text-xs font-medium border border-[#C9AA78] bg-[#FCF6E8] text-[#1C1611] hover:bg-[#EAD09E] rounded-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Suivant →
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
