import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, ExternalLink, X } from 'lucide-react';
import { EL_MILIA_PHOTOS, ElMiliaPhoto } from '../data/familyArchive';
import { ResilientImage } from './ResilientImage';

export function ElMiliaGallery() {
  const [filter, setFilter] = useState<'all' | 'ville' | 'paysage'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = EL_MILIA_PHOTOS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const activePhoto: ElMiliaPhoto | null =
    lightboxIndex !== null && visiblePhotos[lightboxIndex]
      ? visiblePhotos[lightboxIndex]
      : null;

  return (
    <div id="galerie-el-milia" className="mt-14 pt-12 border-t border-[#C9AA78]/70">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#4A3E31]">
            Photographies réelles · Wikimedia Commons
          </p>
          <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1611]">
            Vues authentiques d&apos;El Milia (wilaya de Jijel)
          </h3>
        </div>

        <div
          role="group"
          aria-label="Filtrer les photographies d'El Milia"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FAF0D7]/70 border border-[#C9AA78] rounded-md self-start md:self-auto"
        >
          {(
            [
              { id: 'all', label: `Toutes (${EL_MILIA_PHOTOS.length})` },
              { id: 'ville', label: 'Ville & Quartiers' },
              { id: 'paysage', label: 'Reliefs & Nature' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setFilter(tab.id);
                setLightboxIndex(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#1C1611] text-[#FAF0D7]'
                  : 'text-[#4A3E31] hover:text-[#1C1611]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className="bg-papyrus-card border border-[#C9AA78] rounded-md p-3 flex flex-col justify-between"
          >
            <div>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Agrandir la photographie : ${photo.title}`}
                className="group relative w-full overflow-hidden rounded-sm border border-[#C9AA78] bg-[#DFC38C] block cursor-pointer"
              >
                <ResilientImage
                  src={photo.src}
                  alt={photo.caption}
                  fallbackTitle={photo.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-[#1C1611]/80 text-[#FAF0D7] text-[11px] font-medium">
                  <Expand className="w-3 h-3" />
                  Agrandir
                </span>
              </button>

              <h4 className="mt-3 font-editorial text-xl font-semibold text-[#1C1611]">
                {photo.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-[#4A3E31]">{photo.caption}</p>
            </div>

            <figcaption className="mt-3 pt-2.5 border-t border-[#C9AA78]/50 flex items-center justify-between gap-2 text-[11px] text-[#4A3E31]">
              <span>
                © {photo.photographer} · {photo.license}
              </span>
              <a
                href={photo.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9A3412] hover:underline font-medium shrink-0"
              >
                Source
                <ExternalLink className="w-3 h-3" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1611]/85 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="w-full max-w-4xl bg-papyrus border border-[#C9AA78] rounded-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9AA78]/70 bg-[#EAD09E]/80">
              <div>
                <h4 id="lightbox-title" className="font-editorial text-2xl font-semibold text-[#1C1611]">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-[#4A3E31]">
                  Photographe : {activePhoto.photographer} · Licence : {activePhoto.license}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fermer l'aperçu photo"
                className="w-10 h-10 flex items-center justify-center rounded-md text-[#1C1611] hover:bg-[#DFC38C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#1C1611] flex items-center justify-center max-h-[68vh] overflow-hidden">
              <ResilientImage
                src={activePhoto.src}
                alt={activePhoto.caption}
                fallbackTitle={activePhoto.title}
                className="max-h-[68vh] w-auto object-contain"
              />
            </div>

            <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-[#F4E4C1] border-t border-[#C9AA78]/70">
              <p className="text-sm text-[#1C1611]">{activePhoto.caption}</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#4A3E31] tabular-nums mr-2">
                  {lightboxIndex + 1} / {visiblePhotos.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length)
                  }
                  aria-label="Photo précédente"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#C9AA78] bg-[#FCF6E8] text-[#1C1611] hover:bg-[#EAD09E] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)}
                  aria-label="Photo suivante"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#C9AA78] bg-[#FCF6E8] text-[#1C1611] hover:bg-[#EAD09E] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
