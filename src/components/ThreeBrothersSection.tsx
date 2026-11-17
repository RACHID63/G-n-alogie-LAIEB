import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { THREE_BROTHERS } from '../data/familyArchive';

export function ThreeBrothersSection() {
  const [selectedBrotherIndex, setSelectedBrotherIndex] = useState<number>(0);

  return (
    <section id="trois-freres" className="py-14 lg:py-20 border-b border-[#C9AA78]/70 bg-papyrus-band">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-[#C9AA78]/70">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
              02 · Tradition Orale &amp; Recensements · 1800 – 1962
            </p>
            <h2
              className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1611]"
              style={{ textWrap: 'balance' }}
            >
              L&apos;histoire des trois frères : Laïeb, Megriche et Lebsir
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#4A3E31]">
              Selon les dires de nos grands-pères et arrière-grands-pères, les familles{' '}
              <strong className="text-[#1C1611]">Laïeb, Megriche et Lebsir</strong> descendent d&apos;un
              père et d&apos;une mère communs.
            </p>
          </div>
        </div>

        {/* Historical Context Narrative */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-papyrus-card border border-[#C9AA78] rounded-md p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#9A3412]">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                Contexte des 19 recensements
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#1C1611]">
              Durant l&apos;occupation française, l&apos;administration coloniale a réalisé{' '}
              <strong className="tabular-nums">dix-neuf recensements</strong> de population en
              Algérie entre <span className="font-mono text-[#9A3412] tabular-nums">1830 et 1962</span>.
            </p>
            <p className="text-sm leading-relaxed text-[#4A3E31]">
              À cette époque, l&apos;administration commettait énormément d&apos;erreurs — dont
              certaines étaient volontaires — au sein d&apos;une même famille. Vers les années{' '}
              <span className="font-mono text-[#1C1611] tabular-nums">1800</span>, au début des
              recensements, les trois frères portaient chacun un surnom dû à une particularité
              physique.
            </p>
            <p className="text-sm leading-relaxed text-[#1C1611] pt-2 border-t border-[#C9AA78]/70">
              Lors de l&apos;enregistrement officiel, l&apos;administration a inscrit ces surnoms
              comme trois patronymes distincts, séparant administrativement les branches d&apos;une
              même fratrie.
            </p>
          </div>

          {/* Interactive 3-Brother Records */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {THREE_BROTHERS.map((brother, index) => {
                const active = selectedBrotherIndex === index;
                return (
                  <button
                    key={brother.surname}
                    type="button"
                    onClick={() => setSelectedBrotherIndex(index)}
                    className={`text-left p-5 rounded-md border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#1C1611] text-[#FAF0D7] border-[#1C1611]'
                        : 'bg-papyrus-card text-[#1C1611] border-[#C9AA78] hover:bg-[#FCF6E8]'
                    }`}
                  >
                    <p
                      className={`text-xs font-mono tabular-nums ${
                        active ? 'text-[#E8CFA0]' : 'text-[#4A3E31]'
                      }`}
                    >
                      Frère 0{index + 1}
                    </p>
                    <h3 className="mt-2 font-editorial text-2xl font-semibold tracking-tight">
                      {brother.surname}
                    </h3>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        active ? 'text-[#FDE68A]' : 'text-[#9A3412]'
                      }`}
                    >
                      « {brother.meaning} »
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Brother Detail Box */}
            <div className="bg-papyrus-card border border-[#C9AA78] rounded-md p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-[#C9AA78]/70">
                <h4 className="font-editorial text-2xl font-semibold text-[#1C1611]">
                  Branche {THREE_BROTHERS[selectedBrotherIndex].surname}
                </h4>
                <span className="text-xs font-mono text-[#4A3E31]">
                  {THREE_BROTHERS[selectedBrotherIndex].nicknameOrigin}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Signification du surnom</dt>
                  <dd className="mt-1 font-medium text-[#1C1611]">
                    {THREE_BROTHERS[selectedBrotherIndex].meaning}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4A3E31]">Transmission patronymique</dt>
                  <dd className="mt-1 text-[#4A3E31] leading-relaxed">
                    {THREE_BROTHERS[selectedBrotherIndex].historicalNote}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
