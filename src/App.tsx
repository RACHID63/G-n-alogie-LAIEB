import { useMemo, useRef, useState } from 'react';
import { ChronicleSection } from './components/ChronicleSection';
import { Footer } from './components/Footer';
import { GenealogySection } from './components/GenealogySection';
import { HeroSection, SearchResultItem, WebSearchResult } from './components/HeroSection';
import { AuthModal, ContactModal } from './components/Modals';
import { Navbar } from './components/Navbar';
import { ThreeBrothersSection } from './components/ThreeBrothersSection';
import {
  DNA_LINEAGES,
  EL_MILIA_PHOTOS,
  EL_MILIA_TIMELINE,
  FAMILY_CLANS,
  FAMILY_MEMBERS,
  normalizeText,
  THREE_BROTHERS,
} from './data/familyArchive';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClanId, setSelectedClanId] = useState<string>('laib');
  const [selectedTimelineEventId, setSelectedTimelineEventId] = useState<string | null>(null);
  const [selectedBrotherIndex, setSelectedBrotherIndex] = useState<number>(0);
  const [selectedMemberId, setSelectedMemberId] = useState<'rachid' | 'mostefa' | 'fatma'>('rachid');
  const [activeLineageTab, setActiveLineageTab] = useState<'compare' | 'maternel' | 'paternel'>(
    'compare'
  );
  const [contactOpen, setContactOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{
    open: boolean;
    tab: 'login' | 'register';
  }>({ open: false, tab: 'login' });
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const [webSearchState, setWebSearchState] = useState<{
    loading: boolean;
    error: string | null;
    result: WebSearchResult | null;
  }>({
    loading: false,
    error: null,
    result: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchResults: SearchResultItem[] = useMemo(() => {
    const q = normalizeText(searchQuery);
    if (!q) return [];

    const results: SearchResultItem[] = [];

    for (const member of FAMILY_MEMBERS) {
      if (
        normalizeText(member.firstName).includes(q) ||
        normalizeText(member.lastName).includes(q) ||
        normalizeText(member.birthPlace).includes(q) ||
        normalizeText(member.haplogroupRef).includes(q) ||
        normalizeText(member.lineageSummary).includes(q)
      ) {
        results.push({
          id: `member-${member.id}`,
          category: 'Membre de la famille',
          title: `${member.firstName} ${member.lastName}`,
          subtitle: `${member.birthDate} · ${member.birthPlace} · ${member.haplogroupRef}`,
          targetId: 'genealogie-adn',
          action: { type: 'member', memberId: member.id },
        });
      }
    }

    for (const clan of FAMILY_CLANS) {
      if (
        normalizeText(clan.name).includes(q) ||
        normalizeText(clan.zone).includes(q) ||
        normalizeText(clan.locationDetail).includes(q) ||
        normalizeText(clan.lineageNotes).includes(q) ||
        (clan.subBranches?.some((b) => normalizeText(b).includes(q)) ?? false)
      ) {
        results.push({
          id: `clan-${clan.id}`,
          category: 'Famille · El Milia',
          title: `Famille ${clan.name}`,
          subtitle: `${clan.zone} · ${clan.locationDetail}`,
          targetId: 'familles',
          action: { type: 'clan', clanId: clan.id },
        });
      }
    }

    THREE_BROTHERS.forEach((brother, index) => {
      if (
        normalizeText(brother.surname).includes(q) ||
        normalizeText(brother.meaning).includes(q) ||
        normalizeText(brother.historicalNote).includes(q)
      ) {
        results.push({
          id: `brother-${brother.surname}`,
          category: 'Les Trois Frères',
          title: `${brother.surname} — « ${brother.meaning} »`,
          subtitle: brother.nicknameOrigin,
          targetId: 'trois-freres',
          action: { type: 'brother', index },
        });
      }
    });

    for (const lineage of Object.values(DNA_LINEAGES)) {
      if (
        normalizeText(lineage.haplogroup).includes(q) ||
        normalizeText(lineage.ancestralPeoples).includes(q) ||
        normalizeText(lineage.originRegion).includes(q) ||
        normalizeText(lineage.familyName).includes(q) ||
        normalizeText(lineage.markerType).includes(q)
      ) {
        results.push({
          id: `dna-${lineage.id}`,
          category: 'Généalogie ADN',
          title: `${lineage.title} (${lineage.haplogroup})`,
          subtitle: `${lineage.ancestralPeoples} · ${lineage.originRegion}`,
          targetId: 'genealogie-adn',
          action: { type: 'dna', lineageId: lineage.id },
        });
      }
    }

    for (const ev of EL_MILIA_TIMELINE) {
      if (
        normalizeText(ev.title).includes(q) ||
        normalizeText(ev.yearLabel).includes(q) ||
        normalizeText(ev.location).includes(q) ||
        normalizeText(ev.summary).includes(q) ||
        normalizeText(ev.details).includes(q)
      ) {
        results.push({
          id: `timeline-${ev.id}`,
          category: `Chronologie · ${ev.yearLabel}`,
          title: ev.title,
          subtitle: ev.location,
          targetId: 'chronologie-el-milia',
          action: { type: 'timeline', eventId: ev.id },
        });
      }
    }

    for (const photo of EL_MILIA_PHOTOS) {
      if (
        normalizeText(photo.title).includes(q) ||
        normalizeText(photo.caption).includes(q) ||
        normalizeText(photo.photographer).includes(q)
      ) {
        results.push({
          id: `photo-${photo.id}`,
          category: 'Photographie',
          title: photo.title,
          subtitle: `${photo.photographer} · ${photo.license}`,
          targetId: 'galerie-el-milia',
          action: { type: 'gallery' },
        });
      }
    }

    return results;
  }, [searchQuery]);

  const handleSelectSearchResult = (item: SearchResultItem) => {
    if (item.action) {
      switch (item.action.type) {
        case 'clan':
          setSelectedClanId(item.action.clanId);
          break;
        case 'member':
          setSelectedMemberId(item.action.memberId);
          break;
        case 'brother':
          setSelectedBrotherIndex(item.action.index);
          break;
        case 'dna':
          setActiveLineageTab(item.action.lineageId);
          break;
        case 'timeline':
          setSelectedTimelineEventId(item.action.eventId);
          break;
        case 'gallery':
          break;
      }
    }

    requestAnimationFrame(() => {
      document.getElementById(item.targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleWebSearch = async (overrideQuery?: string) => {
    const queryToRun = (overrideQuery ?? searchQuery).trim();
    if (queryToRun.length < 2) {
      setWebSearchState({
        loading: false,
        error: 'Veuillez saisir au moins 2 caractères pour rechercher un nom de famille.',
        result: null,
      });
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setWebSearchState({
      loading: true,
      error: null,
      result: null,
    });

    try {
      const response = await fetch('/api/search-family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToRun }),
        signal: controller.signal,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof payload?.error === 'string'
            ? payload.error
            : 'La recherche Internet a échoué.'
        );
      }

      setWebSearchState({
        loading: false,
        error: null,
        result: payload as WebSearchResult,
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setWebSearchState({
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : 'Impossible de contacter le service de recherche Internet.',
        result: null,
      });
    }
  };

  const handleClearWebSearch = () => {
    abortControllerRef.current?.abort();
    setWebSearchState({
      loading: false,
      error: null,
      result: null,
    });
  };

  const handleJumpToBrothers = () => {
    document.getElementById('trois-freres')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-papyrus text-[#1C1611]">
      <Navbar
        loggedInUser={loggedInUser}
        onOpenAuthModal={(tab) => setAuthModalState({ open: true, tab })}
      />

      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onWebSearch={handleWebSearch}
          onClearWebSearch={handleClearWebSearch}
          searchResults={searchResults}
          onSelectSearchResult={handleSelectSearchResult}
          webSearchState={webSearchState}
          onOpenContactModal={() => setContactOpen(true)}
        />

        <ChronicleSection
          searchQuery={searchQuery}
          onJumpToBrothers={handleJumpToBrothers}
          selectedClanId={selectedClanId}
          onSelectClanId={setSelectedClanId}
          selectedTimelineEventId={selectedTimelineEventId}
          onSelectTimelineEventId={setSelectedTimelineEventId}
        />

        <ThreeBrothersSection
          selectedBrotherIndex={selectedBrotherIndex}
          onSelectBrotherIndex={setSelectedBrotherIndex}
        />

        <GenealogySection
          searchQuery={searchQuery}
          onOpenAuthModal={(tab) => setAuthModalState({ open: true, tab })}
          selectedMemberId={selectedMemberId}
          onSelectMemberId={setSelectedMemberId}
          activeLineageTab={activeLineageTab}
          onSelectLineageTab={setActiveLineageTab}
        />
      </main>

      <Footer
        onOpenContactModal={() => setContactOpen(true)}
        onOpenAuthModal={(tab) => setAuthModalState({ open: true, tab })}
      />

      {contactOpen && (
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      )}

      {authModalState.open && (
        <AuthModal
          isOpen={authModalState.open}
          initialTab={authModalState.tab}
          onClose={() => setAuthModalState((prev) => ({ ...prev, open: false }))}
          loggedInUser={loggedInUser}
          onLoginSuccess={(name) => setLoggedInUser(name)}
          onLogout={() => setLoggedInUser(null)}
        />
      )}
    </div>
  );
}
