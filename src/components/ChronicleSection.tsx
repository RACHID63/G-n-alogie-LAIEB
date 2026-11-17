import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import {
  FAMILY_CLANS,
  FamilyClan,
  LANDSCAPE_IMAGE_PATH,
  normalizeText,
} from '../data/familyArchive';
import { ElMiliaGallery } from './ElMiliaGallery';
import { ElMiliaTimeline } from './ElMiliaTimeline';
import { ResilientImage } from './ResilientImage';

interface ChronicleSectionProps {
  searchQuery: string;
  onJumpToBrothers: () => void;
  selectedClanId: string;
  onSelectClanId: (clanId: string) => void;
  selectedTimelineEventId: string | null;
  onSelectTimelineEventId: (eventId: string) => void;
}

export function ChronicleSection({
  searchQuery,
  onJumpToBrothers,
  selectedClanId,
  onSelectClanId,
  selectedTimelineEventId,
  onSelectTimelineEventId,
}: ChronicleSectionProps) {
  const [zoneFilter, setZoneFilter] = useState<'all' | 'Ouled-Ali-Oubraham' | "L'Ajankia">('all');

  const selectedClan: FamilyClan =
    FAMILY_CLANS.find((c) => c.id === selectedClanId) || FAMILY_CLANS[0];

  const normalizedQuery = normalizeText(searchQuery);

  const filteredClans = FAMILY_CLANS.filter((clan) => {
    const matchesZone = zoneFilter === 'all' || clan.zone === zoneFilter;
    if (!matchesZone) return false;
    if (!normalizedQuery) return true;
    return (
      normalizeText(clan.name).includes(normalizedQuery) ||
      normalizeText(clan.zone).includes(normalizedQuery) ||
      normalizeText(clan.locationDetail).includes(normalizedQuery) ||
      normalizeText(clan.lineageNotes).includes(normalizedQuery) ||
      (clan.subBranches?.some((b) => normalizeText(b).includes(normalizedQuery)) ?? false)
    );
  });

  return (
    <section id="histoire" className="py-14 lg:py-20 border-b border-[#C9AA78]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl pb-8 border-b border-[#C9AA78]/70">
          <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
            01 · Chronique d&apos;El Milia · Ex-département de Constantine
          </p>
          <h2
            className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1611]"
            style={{ textWrap: 'balance' }}
          >
            Histoire de la Famille Laïeb à Ouled-Ali-Oubraham et l&apos;Ajankia
          </h2>
        </div>

        {/* Asymmetric 70/30 Reading Canvas */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main editorial reading column */}
          <article className="lg:col-span-7 space-y-6 text-[#1C1611] leading-[1.75] text-base sm:text-[17px]">
            <p className="editorial-dropcap max-w-prose">
              C&apos;était le <strong className="font-semibold">5 janvier 1961</strong> à{' '}
              <strong className="font-semibold">Ouled-Ali-Oubraham</strong>, juste à côté de{' '}
              <strong className="font-semibold">l&apos;Ajankia (Ouled-Kacem)</strong>, dans la
              commune mixte d&apos;El Milia (ex-département de Constantine), pendant la guerre de
              libération de l&apos;Algérie.
            </p>

            <div className="max-w-prose space-y-3 pt-2">
              <h3 className="font-editorial text-2xl font-semibold text-[#1C1611]">
                Organisation de la dechra d&apos;Ouled-Ali-Oubraham
              </h3>
              <p className="text-[#4A3E31]">
                Le hameau d&apos;Ouled-Ali-Oubraham est historiquement partagé entre plusieurs
                grandes familles unies par le voisinage et les alliances maternelles :
              </p>
              <ul className="space-y-2.5 pt-1 border-t border-[#C9AA78]/70 text-[15px] text-[#1C1611]">
                <li className="pt-2.5 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9A3412] shrink-0">01</span>
                  <span>
                    <strong>Les Boucherit</strong>, établis au centre de la « dechra », ainsi
                    qu&apos;un groupe à côté du cimetière et une dernière branche à Hajaje (les{' '}
                    <em>Ben-Braham</em>).
                  </span>
                </li>
                <li className="pt-2.5 border-t border-[#C9AA78]/45 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9A3412] shrink-0">02</span>
                  <span>
                    <strong>Les Allalouche</strong>, un peu plus bas, divisés en deux branches — les{' '}
                    <em>Ouled-Saad</em> et les <em>Ben-Yahya</em> — qui ont pour grand-mère{' '}
                    <strong>Halima Boucherit</strong>.
                  </span>
                </li>
                <li className="pt-2.5 border-t border-[#C9AA78]/45 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9A3412] shrink-0">03</span>
                  <span>
                    <strong>Les Bakiri</strong>, connus aussi sous le nom de <em>Saadna</em>, avec
                    comme voisins directs <strong>les Lefouili</strong>.
                  </span>
                </li>
                <li className="pt-2.5 border-t border-[#C9AA78]/45 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9A3412] shrink-0">04</span>
                  <span>
                    <strong>Les Boutellis</strong>, plus haut, voisins directs ayant pour grand-mère{' '}
                    <strong>Nouara Boucherit</strong>.
                  </span>
                </li>
                <li className="pt-2.5 border-t border-[#C9AA78]/45 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#9A3412] shrink-0">05</span>
                  <span>
                    <strong>Les Boukhchem</strong> sur l&apos;autre rive de la dechra, et{' '}
                    <strong>les Boufafa</strong> près du cimetière.
                  </span>
                </li>
              </ul>
            </div>

            <div className="max-w-prose space-y-4 pt-4 border-t border-[#C9AA78]/70">
              <h3 className="font-editorial text-2xl font-semibold text-[#1C1611]">
                L&apos;Ajankia (Ajnak) et les premiers commerces d&apos;El Milia
              </h3>
              <p>
                L&apos;Ajankia ou Ajnak est l&apos;un des plus anciens quartiers arabes d&apos;El
                Milia. Ses habitants font partie des <strong>Ouled-Kassem</strong>, qui forment avec
                les <strong>Ouled-Debbeb</strong> la grande tribu des{' '}
                <strong>Ouled-Aïdoune</strong>, bien avant l&apos;appellation du village d&apos;El
                Milia par l&apos;administration coloniale française.
              </p>
              <p>
                Les noms <em>Ajankia</em> et <em>Ajnak</em> désignent à la fois les habitants et le
                quartier. Ce nom a pour origine le mot turc <strong>Odjak</strong> (soldats
                d&apos;infanterie ottomane), en souvenir d&apos;une ancienne garnison ottomane : le
                terme <em>l&apos;Odjak</em> est devenu <em>l&apos;Ajonkia</em>, qui a donné à son
                tour <em>Ajankia</em> et <em>Ajnak</em>.
              </p>
              <p>
                Parmi les familles les plus anciennes et les plus importantes qui forment
                l&apos;Ajankia figurent{' '}
                <strong className="text-[#1E3A8A]">les Krid (Grid)</strong>,{' '}
                <strong>les Kehal</strong>,{' '}
                <button
                  type="button"
                  onClick={onJumpToBrothers}
                  className="font-semibold text-[#9A3412] underline decoration-[#9A3412]/50 underline-offset-4 hover:text-[#7C2D12] cursor-pointer"
                >
                  Laïb, Lebsir, Meghriche
                </button>{' '}
                et <strong>Mokhbi</strong>. Ce sont toutes ces familles d&apos;Ouled-Ali-Oubraham
                et de l&apos;Ajankia qui ont installé les premiers commerces du village d&apos;El
                Milia.
              </p>

              {/* Editorial Pull Quote */}
              <blockquote className="my-6 py-5 border-y border-[#C9AA78]/70 font-editorial italic text-xl sm:text-2xl text-[#1C1611] leading-snug">
                « Les familles Laïb, Lebsir et Meghriche partagent une origine fraternelle commune,
                transmise par la mémoire orale des anciens face aux erreurs des recensements. »
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#4A3E31]">
                <a
                  href="http://elmiliastory.centerblog.net/1217-la-cinquantaine-deja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#9A3412] hover:underline font-medium"
                >
                  Source historique : elmiliastory.centerblog.net
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onJumpToBrothers}
                  className="text-[#1C1611] font-semibold hover:text-[#9A3412] underline underline-offset-4 cursor-pointer"
                >
                  Lire le dossier des Trois Frères →
                </button>
              </div>
            </div>
          </article>

          {/* Margin Sidebar: Landscape plate & Certified Archive Stamp */}
          <aside className="lg:col-span-5 space-y-6">
            <figure className="bg-papyrus-card border border-[#C9AA78] rounded-md p-4">
              <div className="overflow-hidden rounded-sm border border-[#C9AA78]">
                <ResilientImage
                  src={LANDSCAPE_IMAGE_PATH}
                  alt="Vue panoramique réelle sur El Milia et les montagnes de la wilaya de Jijel"
                  fallbackTitle="Vue sur El Milia"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-[#4A3E31] font-editorial italic text-sm">
                Fig. 2 — Vue réelle sur El Milia (wilaya de Jijel) — Photographie de Djahid Lebsir
                (Wikimedia Commons, CC BY-SA 3.0).
              </figcaption>
            </figure>

            {/* Archival Seal Card */}
            <div className="bg-papyrus-card border border-[#C9AA78] rounded-md p-5 flex items-center gap-5">
              <div className="w-20 h-20 shrink-0 rounded-sm overflow-hidden border border-[#C9AA78] bg-[#FCF6E8]">
                <ResilientImage
                  src="/images/certified-stamp.jpg"
                  alt="Tampon d'archive certifié de la famille Laïeb"
                  fallbackTitle="Archive certifiée"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider uppercase text-[#4A3E31]">
                  Authentification
                </p>
                <h3 className="mt-1 font-editorial text-xl font-semibold text-[#1C1611]">
                  Mémoire transmise &amp; certifiée
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#4A3E31]">
                  Récits recueillis auprès des aînés et croisés avec les archives familiales de
                  constatation historique.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Interactive Historical Timeline of El Milia */}
        <ElMiliaTimeline
          searchQuery={searchQuery}
          selectedEventId={selectedTimelineEventId}
          onSelectEventId={onSelectTimelineEventId}
          onSelectFamilyName={(familyName) => {
            const clean = normalizeText(familyName);
            const matched = FAMILY_CLANS.find(
              (c) =>
                normalizeText(c.name).includes(clean) ||
                clean.includes(c.id) ||
                (clean.includes('lai') && c.id === 'laib') ||
                (clean.includes('grid') && c.id === 'krid')
            );
            if (matched) {
              setZoneFilter('all');
              onSelectClanId(matched.id);
            }
            document.getElementById('familles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        {/* Real Photographs Gallery of El Milia */}
        <ElMiliaGallery />

        {/* Interactive Family Directory of Ouled-Ali-Oubraham & L'Ajankia */}
        <div id="familles" className="mt-14 pt-12 border-t border-[#C9AA78]/70">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
                Répertoire territorial
              </p>
              <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1611]">
                Index des familles d&apos;Ouled-Ali-Oubraham et de l&apos;Ajankia
              </h3>
            </div>

            {/* Interactive Zone Filter */}
            <div
              role="group"
              aria-label="Filtrer les familles par secteur"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF0D7]/70 border border-[#C9AA78] rounded-md self-start md:self-auto"
            >
              {(
                [
                  { id: 'all', label: 'Toutes (13)' },
                  { id: 'Ouled-Ali-Oubraham', label: 'Ouled-Ali-Oubraham' },
                  { id: "L'Ajankia", label: "L'Ajankia" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setZoneFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    zoneFilter === tab.id
                      ? 'bg-[#1C1611] text-[#FAF0D7]'
                      : 'text-[#4A3E31] hover:text-[#1C1611]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Family List */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredClans.length === 0 ? (
                <div className="sm:col-span-2 p-6 bg-papyrus-card border border-[#C9AA78] rounded-md text-sm text-[#4A3E31]">
                  Aucune famille ne correspond à votre filtre actuel.
                </div>
              ) : (
                filteredClans.map((clan) => {
                  const isSelected = selectedClan.id === clan.id;
                  return (
                    <button
                      key={clan.id}
                      type="button"
                      onClick={() => onSelectClanId(clan.id)}
                      className={`text-left p-4 rounded-md border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C1611] text-[#FAF0D7] border-[#1C1611]'
                          : 'bg-[#FAF0D7]/75 hover:bg-[#FCF6E8] text-[#1C1611] border-[#C9AA78]'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-editorial text-xl font-semibold">{clan.name}</span>
                        <span
                          className={`text-[11px] font-mono ${
                            isSelected ? 'text-[#E8CFA0]' : 'text-[#4A3E31]'
                          }`}
                        >
                          {clan.zone}
                        </span>
                      </div>
                      <p
                        className={`mt-1.5 text-xs line-clamp-2 ${
                          isSelected ? 'text-[#EAD09E]' : 'text-[#4A3E31]'
                        }`}
                      >
                        {clan.locationDetail}
                      </p>
                    </button>
                  );
                })
              )}
            </div>

            {/* Selected Family Detail Sheet */}
            <div className="lg:col-span-5 bg-papyrus-card border border-[#C9AA78] rounded-md p-6">
              <div className="flex items-center gap-2 text-xs text-[#4A3E31]">
                <MapPin className="w-3.5 h-3.5 text-[#9A3412] shrink-0" />
                <span>{selectedClan.zone}</span>
                <span aria-hidden="true">·</span>
                <span>Commune mixte d&apos;El Milia</span>
              </div>

              <h4 className="mt-2 font-editorial text-3xl font-semibold text-[#1C1611]">
                Famille {selectedClan.name}
              </h4>

              <dl className="mt-5 space-y-4 border-t border-[#C9AA78]/70 pt-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Localisation dans le tissu local</dt>
                  <dd className="mt-1 text-[#1C1611] font-medium">{selectedClan.locationDetail}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Notes historiques &amp; alliances</dt>
                  <dd className="mt-1 text-[#4A3E31] leading-relaxed">{selectedClan.lineageNotes}</dd>
                </div>
                {selectedClan.subBranches && selectedClan.subBranches.length > 0 && (
                  <div>
                    <dt className="text-xs font-medium text-[#4A3E31]">Branches mentionnées</dt>
                    <dd className="mt-1 text-[#1C1611]">
                      {selectedClan.subBranches.join(' · ')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
