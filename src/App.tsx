import { useMemo, useState } from 'react';
import { ChronicleSection } from './components/ChronicleSection';
import { Footer } from './components/Footer';
import { GenealogySection } from './components/GenealogySection';
import { HeroSection } from './components/HeroSection';
import { AuthModal, ContactModal } from './components/Modals';
import { Navbar } from './components/Navbar';
import { ThreeBrothersSection } from './components/ThreeBrothersSection';
import {
  DNA_LINEAGES,
  FAMILY_CLANS,
  FAMILY_MEMBERS,
  THREE_BROTHERS,
} from './data/familyArchive';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactOpen, setContactOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{
    open: boolean;
    tab: 'login' | 'register';
  }>({ open: false, tab: 'login' });
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const clanMatches = FAMILY_CLANS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.zone.toLowerCase().includes(q) ||
        c.locationDetail.toLowerCase().includes(q) ||
        c.lineageNotes.toLowerCase().includes(q)
    );

    const memberMatches = FAMILY_MEMBERS.filter(
      (m) =>
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        m.birthPlace.toLowerCase().includes(q) ||
        m.haplogroupRef.toLowerCase().includes(q)
    );

    const brotherMatches = THREE_BROTHERS.filter(
      (b) =>
        b.surname.toLowerCase().includes(q) ||
        b.meaning.toLowerCase().includes(q) ||
        b.historicalNote.toLowerCase().includes(q)
    );

    const dnaMatches = Object.values(DNA_LINEAGES).filter(
      (d) =>
        d.haplogroup.toLowerCase().includes(q) ||
        d.ancestralPeoples.toLowerCase().includes(q) ||
        d.originRegion.toLowerCase().includes(q) ||
        d.familyName.toLowerCase().includes(q)
    );

    return {
      total: clanMatches.length + memberMatches.length + brotherMatches.length + dnaMatches.length,
      firstTargetId:
        memberMatches.length > 0 || dnaMatches.length > 0
          ? 'genealogie-adn'
          : brotherMatches.length > 0
            ? 'trois-freres'
            : clanMatches.length > 0
              ? 'familles'
              : null,
    };
  }, [searchQuery]);

  const handleSearchSubmit = (value: string) => {
    if (!value.trim() || !searchMatches?.firstTargetId) return;
    const target = document.getElementById(searchMatches.firstTargetId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          onSearchSubmit={handleSearchSubmit}
          searchResultCount={searchMatches ? searchMatches.total : null}
          onOpenContactModal={() => setContactOpen(true)}
        />

        <ChronicleSection
          searchQuery={searchQuery}
          onJumpToBrothers={handleJumpToBrothers}
        />

        <ThreeBrothersSection />

        <GenealogySection
          searchQuery={searchQuery}
          onOpenAuthModal={(tab) => setAuthModalState({ open: true, tab })}
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
