import { Dna, ExternalLink, Users } from 'lucide-react';
import {
  DNA_ENGRAVING_PATH,
  DNA_LINEAGES,
  FAMILY_MEMBERS,
  FamilyMember,
  normalizeText,
} from '../data/familyArchive';
import { ResilientImage } from './ResilientImage';

interface GenealogySectionProps {
  onOpenAuthModal: (tab: 'login' | 'register') => void;
  searchQuery: string;
  selectedMemberId: 'rachid' | 'mostefa' | 'fatma';
  onSelectMemberId: (id: 'rachid' | 'mostefa' | 'fatma') => void;
  activeLineageTab: 'compare' | 'maternel' | 'paternel';
  onSelectLineageTab: (tab: 'compare' | 'maternel' | 'paternel') => void;
}

export function GenealogySection({
  onOpenAuthModal,
  searchQuery,
  selectedMemberId,
  onSelectMemberId,
  activeLineageTab,
  onSelectLineageTab,
}: GenealogySectionProps) {
  const selectedMember: FamilyMember =
    FAMILY_MEMBERS.find((m) => m.id === selectedMemberId) || FAMILY_MEMBERS[2];

  const normalizedQuery = normalizeText(searchQuery);

  const matchesMember = (member: FamilyMember) => {
    if (!normalizedQuery) return true;
    return (
      normalizeText(member.firstName).includes(normalizedQuery) ||
      normalizeText(member.lastName).includes(normalizedQuery) ||
      normalizeText(member.birthPlace).includes(normalizedQuery) ||
      normalizeText(member.haplogroupRef).includes(normalizedQuery)
    );
  };

  return (
    <section id="genealogie-adn" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Family Tree & Member Identity Records */}
        <div>
          <div className="max-w-3xl pb-8 border-b border-[#C9AA78]/70">
            <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
              03 · Fiches d&apos;Identité &amp; Filiation
            </p>
            <h2
              className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1611]"
              style={{ textWrap: 'balance' }}
            >
              Généalogie directe : lignées Laïeb &amp; Grid
            </h2>
            <p className="mt-3 text-base text-[#4A3E31]">
              Sélectionnez un membre de la famille pour consulter sa fiche d&apos;état civil
              archivée et son rattachement génétique.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Family Lineage Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Parents Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FAMILY_MEMBERS.slice(0, 2).map((member) => {
                  const active = selectedMember.id === member.id;
                  const highlighted = normalizedQuery !== '' && matchesMember(member);
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => onSelectMemberId(member.id)}
                      className={`text-left p-4 rounded-md border transition-colors cursor-pointer flex items-center gap-4 ${
                        active
                          ? 'bg-[#1C1611] text-[#FAF0D7] border-[#1C1611]'
                          : highlighted
                            ? 'bg-papyrus-card text-[#1C1611] border-[#9A3412]'
                            : 'bg-[#FAF0D7]/75 hover:bg-[#FCF6E8] text-[#1C1611] border-[#C9AA78]'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C9AA78] shrink-0 bg-[#DFC38C]">
                        <ResilientImage
                          src={member.image}
                          alt={`Portrait de ${member.firstName} ${member.lastName}`}
                          fallbackTitle={member.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-medium ${
                            active ? 'text-[#E8CFA0]' : 'text-[#4A3E31]'
                          }`}
                        >
                          {member.role}
                        </p>
                        <h3 className="font-editorial text-xl font-semibold truncate">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p
                          className={`mt-0.5 text-xs font-mono tabular-nums ${
                            active ? 'text-[#E8CFA0]' : 'text-[#4A3E31]'
                          }`}
                        >
                          {member.birthDate} · {member.birthPlace}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Lineage Connector Visual */}
              <div className="flex items-center justify-center py-1" aria-hidden="true">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-4 border-x border-b border-[#9A7B4F]/60" />
                  <div className="w-px h-5 bg-[#9A7B4F]/60" />
                </div>
              </div>

              {/* Son Row */}
              {(() => {
                const son = FAMILY_MEMBERS[2];
                const active = selectedMember.id === son.id;
                const highlighted = normalizedQuery !== '' && matchesMember(son);
                return (
                  <div className="max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => onSelectMemberId(son.id)}
                      className={`w-full text-left p-4 rounded-md border transition-colors cursor-pointer flex items-center gap-4 ${
                        active
                          ? 'bg-[#1C1611] text-[#FAF0D7] border-[#1C1611]'
                          : highlighted
                            ? 'bg-papyrus-card text-[#1C1611] border-[#9A3412]'
                            : 'bg-[#FAF0D7]/75 hover:bg-[#FCF6E8] text-[#1C1611] border-[#C9AA78]'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C9AA78] shrink-0 bg-[#DFC38C]">
                        <ResilientImage
                          src={son.image}
                          alt={`Portrait de ${son.firstName} ${son.lastName}`}
                          fallbackTitle={son.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-medium ${
                            active ? 'text-[#E8CFA0]' : 'text-[#4A3E31]'
                          }`}
                        >
                          {son.role}
                        </p>
                        <h3 className="font-editorial text-xl font-semibold truncate">
                          {son.firstName} {son.lastName}
                        </h3>
                        <p
                          className={`mt-0.5 text-xs font-mono tabular-nums ${
                            active ? 'text-[#E8CFA0]' : 'text-[#4A3E31]'
                          }`}
                        >
                          {son.birthDate} · {son.birthPlace}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Active Member Archival Identity Sheet */}
            <div className="lg:col-span-5 bg-papyrus-card border border-[#C9AA78] rounded-md p-6">
              <div className="flex items-start gap-4 pb-5 border-b border-[#C9AA78]/70">
                <div className="w-20 h-20 rounded-md overflow-hidden border border-[#C9AA78] shrink-0 bg-[#FCF6E8]">
                  <ResilientImage
                    src={selectedMember.image}
                    alt={`Portrait d'archive de ${selectedMember.firstName} ${selectedMember.lastName}`}
                    fallbackTitle={selectedMember.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#4A3E31]">{selectedMember.role}</p>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1611]">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-[#9A3412]">
                    {selectedMember.haplogroupRef}
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Date de naissance</dt>
                  <dd className="mt-1 font-mono tabular-nums text-[#1C1611]">
                    {selectedMember.birthDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Lieu de naissance</dt>
                  <dd className="mt-1 text-[#1C1611] font-medium">{selectedMember.birthPlace}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Adresse archivée</dt>
                  <dd className="mt-1 text-[#1C1611]">
                    {selectedMember.address}, {selectedMember.city}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Contact direct</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="text-[#9A3412] hover:underline font-medium"
                    >
                      {selectedMember.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="mt-5 pt-4 border-t border-[#C9AA78]/70 text-sm leading-relaxed text-[#4A3E31]">
                {selectedMember.lineageSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Part 2: DNA Genealogy Results (iGENEA & FamilyTreeDNA) */}
        <div className="pt-14 border-t border-[#C9AA78]/70">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#C9AA78]/70">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
                  04 · Résultats de Généalogie ADN · iGENEA &amp; FamilyTreeDNA
                </span>
              </div>
              <h2
                className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1611]"
                style={{ textWrap: 'balance' }}
              >
                Origines antiques et haplogroupes certifiés
              </h2>
              <p className="mt-3 text-base text-[#4A3E31]">
                Aides à l&apos;interprétation génétique pour la famille Laïeb (92 % des clients
                iGENEA recommandent l&apos;analyse pour situer leurs origines entre 900 av. J.-C. et
                900 ap. J.-C.).
              </p>
            </div>

            {/* Interactive DNA Lineage View Tabs */}
            <div
              role="tablist"
              aria-label="Sélectionner la vue des résultats ADN"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF0D7]/70 border border-[#C9AA78] rounded-md self-start lg:self-auto"
            >
              {(
                [
                  { id: 'compare', label: 'Vue comparée' },
                  { id: 'maternel', label: 'Lignée Maternelle · Grid' },
                  { id: 'paternel', label: 'Lignée Paternelle · Laïeb' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeLineageTab === tab.id}
                  type="button"
                  onClick={() => onSelectLineageTab(tab.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeLineageTab === tab.id
                      ? 'bg-[#1C1611] text-[#FAF0D7]'
                      : 'text-[#4A3E31] hover:text-[#1C1611]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* DNA Content Grid */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Scientific Illustration & Database Access */}
            <aside className="lg:col-span-4 space-y-6">
              <figure className="bg-papyrus-card border border-[#C9AA78] rounded-md p-4">
                <div className="overflow-hidden rounded-sm border border-[#C9AA78] bg-[#FAF0D7]">
                  <ResilientImage
                    src={DNA_ENGRAVING_PATH}
                    alt="Gravure scientifique illustrant l'hélice ADN entrelacée aux racines méditerranéennes"
                    fallbackTitle="Gravure génétique méditerranéenne"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-editorial italic text-sm text-[#4A3E31]">
                  Fig. 3 — Représentation des lignées génétiques entre Europe de l&apos;Ouest
                  (ADNmt H) et Proche-Orient (ADN-Y G-M201).
                </figcaption>
              </figure>

              {/* FamilyTreeDNA / iGENEA Access Box */}
              <div className="bg-papyrus-card border border-[#C9AA78] rounded-md p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm border border-[#C9AA78] bg-[#FCF6E8] p-1.5 flex items-center justify-center shrink-0">
                    <ResilientImage
                      src="/images/logo-igenea.png"
                      alt="Logo iGENEA"
                      fallbackTitle="iGENEA"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-semibold text-[#1C1611]">
                      Base FamilyTreeDNA
                    </h3>
                    <p className="text-xs text-[#4A3E31]">Accès laboratoire &amp; certificats</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[#4A3E31]">
                  Cliquez sur « Accéder à la base » pour ouvrir l&apos;interface de connexion avec
                  votre numéro de laboratoire et consulter les concordances ADN complètes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('login')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FAF0D7] bg-[#1C1611] hover:bg-[#9A3412] rounded-md transition-colors cursor-pointer"
                  >
                    <Dna className="w-3.5 h-3.5" />
                    Accéder à la base
                  </button>
                  <a
                    href="https://www.igenea.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1C1611] bg-[#FCF6E8] hover:bg-[#EAD09E] border border-[#C9AA78] rounded-md transition-colors"
                  >
                    Site iGENEA
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Lineage Cards (Compare or Single Detail) */}
            <div className="lg:col-span-8">
              <div
                className={`grid grid-cols-1 ${
                  activeLineageTab === 'compare' ? 'md:grid-cols-2' : ''
                } gap-6`}
              >
                {(activeLineageTab === 'compare'
                  ? [DNA_LINEAGES.maternel, DNA_LINEAGES.paternel]
                  : [DNA_LINEAGES[activeLineageTab]]
                ).map((lineage) => {
                  const isLapis = lineage.accentTone === 'lapis';
                  return (
                    <article
                      key={lineage.id}
                      className="bg-papyrus-card border border-[#C9AA78] rounded-md p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#C9AA78]/70">
                          <span className="text-xs font-medium text-[#4A3E31]">
                            {lineage.markerType}
                          </span>
                          <span
                            className={`font-mono text-xs font-semibold ${
                              isLapis ? 'text-[#1E3A8A]' : 'text-[#9A3412]'
                            }`}
                          >
                            {lineage.haplogroup}
                          </span>
                        </div>

                        <h3 className="mt-4 font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1611]">
                          {lineage.title}
                        </h3>

                        <dl className="mt-5 space-y-3 border-t border-b border-[#C9AA78]/70 py-4 text-sm">
                          <div className="flex justify-between gap-4">
                            <dt className="text-[#4A3E31]">Peuple d&apos;origine</dt>
                            <dd className="font-semibold text-[#1C1611] text-right">
                              {lineage.ancestralPeoples}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4 pt-2 border-t border-[#C9AA78]/45">
                            <dt className="text-[#4A3E31]">Région d&apos;origine</dt>
                            <dd className="font-semibold text-[#1C1611] text-right">
                              {lineage.originRegion}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4 pt-2 border-t border-[#C9AA78]/45">
                            <dt className="text-[#4A3E31]">Horizon historique</dt>
                            <dd className="font-mono text-xs text-[#1C1611] text-right tabular-nums">
                              {lineage.antiquityPeriod}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4 pt-2 border-t border-[#C9AA78]/45">
                            <dt className="text-[#4A3E31]">Certificat</dt>
                            <dd className="text-[#1C1611] text-right">{lineage.certificateLabel}</dd>
                          </div>
                          <div className="flex justify-between gap-4 pt-2 border-t border-[#C9AA78]/45">
                            <dt className="text-[#4A3E31]">Mise à niveau</dt>
                            <dd
                              className={`font-medium text-right ${
                                isLapis ? 'text-[#1E3A8A]' : 'text-[#9A3412]'
                              }`}
                            >
                              {lineage.recommendedUpgrade}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#4A3E31]">
                          {lineage.interpretation.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#C9AA78]/70 flex items-start gap-2.5 text-xs text-[#1C1611]">
                        <Users
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isLapis ? 'text-[#1E3A8A]' : 'text-[#9A3412]'
                          }`}
                        />
                        <p className="leading-relaxed">{lineage.transmissionNote}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
