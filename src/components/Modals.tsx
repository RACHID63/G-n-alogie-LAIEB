import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MapPin, User, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setSenderName('');
    setSenderEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="w-full max-w-lg bg-papyrus border border-[#C9AA78] rounded-md shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9AA78]/70 bg-[#EAD09E]/75">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#4A3E31]">
              Archives familiales
            </p>
            <h2 id="contact-modal-title" className="font-editorial text-2xl font-semibold text-[#1C1611]">
              Contacter Rachid Laïeb
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Fermer la fenêtre de contact"
            className="w-10 h-10 flex items-center justify-center rounded-md text-[#4A3E31] hover:text-[#1C1611] hover:bg-[#DFC38C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-papyrus-card border border-[#C9AA78] rounded-md text-sm">
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
              <div>
                <dt className="text-xs text-[#4A3E31]">Responsable</dt>
                <dd className="font-semibold text-[#1C1611]">LAÏEB Rachid</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
              <div>
                <dt className="text-xs text-[#4A3E31]">Courriel</dt>
                <dd className="font-medium text-[#1C1611]">
                  <a href="mailto:laieb@soldeal.fr" className="hover:underline">
                    laieb@soldeal.fr
                  </a>
                </dd>
              </div>
            </div>
            <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-[#C9AA78]/70">
              <MapPin className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
              <div>
                <dt className="text-xs text-[#4A3E31]">Adresse postale</dt>
                <dd className="text-[#1C1611]">12 rue de la Page, 75000 Paris</dd>
              </div>
            </div>
          </dl>

          {submitted ? (
            <div className="p-5 bg-papyrus-card border border-[#C9AA78] rounded-md text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#14532D] mx-auto" />
              <h3 className="font-editorial text-2xl font-semibold text-[#1C1611]">
                Message enregistré
              </h3>
              <p className="text-sm text-[#4A3E31]">
                Merci {senderName}. Votre demande relative aux archives familiales a bien été
                préparée pour {senderEmail}.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2.5 text-sm font-semibold text-[#FAF0D7] bg-[#1C1611] hover:bg-[#9A3412] rounded-md transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#4A3E31] mb-1">
                    Votre nom
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Prénom et nom"
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#4A3E31] mb-1">
                    Votre e-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="nom@exemple.fr"
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#4A3E31] mb-1">
                  Votre message ou précision généalogique
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Partagez un souvenir d'Ouled-Ali-Oubraham, une question ADN ou une rectification..."
                  className="w-full px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-sm font-medium text-[#4A3E31] hover:text-[#1C1611] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-[#FAF0D7] bg-[#9A3412] hover:bg-[#7C2D12] rounded-md transition-colors cursor-pointer"
                >
                  Envoyer le message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface AuthModalProps {
  isOpen: boolean;
  initialTab: 'login' | 'register';
  onClose: () => void;
  loggedInUser: string | null;
  onLoginSuccess: (displayName: string) => void;
  onLogout: () => void;
}

export function AuthModal({
  isOpen,
  initialTab,
  onClose,
  loggedInUser,
  onLoginSuccess,
  onLogout,
}: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Veuillez renseigner votre adresse e-mail ou numéro de laboratoire et votre mot de passe.');
      return;
    }

    if (tab === 'register') {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMsg('Veuillez indiquer votre prénom et votre nom.');
        return;
      }
      if (password !== passwordConfirm) {
        setErrorMsg('Les deux mots de passe ne correspondent pas.');
        return;
      }
      onLoginSuccess(`${firstName.trim()} ${lastName.trim()}`);
    } else {
      const label = email.includes('@') ? email.split('@')[0] : email;
      onLoginSuccess(label);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1611]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-md bg-papyrus border border-[#C9AA78] rounded-md shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9AA78]/70 bg-[#EAD09E]/75">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#4A3E31]">
              Espace Membre &amp; FamilyTreeDNA
            </p>
            <h2 id="auth-modal-title" className="font-editorial text-2xl font-semibold text-[#1C1611]">
              {loggedInUser ? 'Session familiale active' : tab === 'login' ? 'Connexion aux archives' : 'Créer un compte'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre de connexion"
            className="w-10 h-10 flex items-center justify-center rounded-md text-[#4A3E31] hover:text-[#1C1611] hover:bg-[#DFC38C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loggedInUser ? (
            <div className="space-y-4">
              <div className="p-4 bg-papyrus-card border border-[#C9AA78] rounded-md">
                <p className="text-xs text-[#4A3E31]">Connecté en tant que</p>
                <p className="mt-1 font-editorial text-2xl font-semibold text-[#1C1611]">
                  {loggedInUser}
                </p>
                <p className="mt-2 text-xs text-[#4A3E31]">
                  Accès activé aux certificats ADNmt (Haplogroupe H) et ADN-Y (Haplogroupe G-M201).
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2 text-sm font-medium text-[#9A3412] border border-[#C9AA78] hover:bg-[#EAD09E] rounded-md cursor-pointer"
                >
                  Se déconnecter
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-sm font-semibold text-[#FAF0D7] bg-[#1C1611] rounded-md cursor-pointer"
                >
                  Continuer
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#FAF0D7]/70 border border-[#C9AA78] rounded-md mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMsg('');
                  }}
                  className={`py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                    tab === 'login' ? 'bg-[#1C1611] text-[#FAF0D7]' : 'text-[#4A3E31] hover:text-[#1C1611]'
                  }`}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setErrorMsg('');
                  }}
                  className={`py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                    tab === 'register' ? 'bg-[#1C1611] text-[#FAF0D7]' : 'text-[#4A3E31] hover:text-[#1C1611]'
                  }`}
                >
                  Inscription (Sign up)
                </button>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="mb-4 p-3 text-xs text-[#9A3412] bg-[#9A3412]/10 border border-[#9A3412]/30 rounded-md"
                >
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'register' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="auth-firstname" className="block text-xs font-medium text-[#4A3E31] mb-1">
                        Prénom
                      </label>
                      <input
                        id="auth-firstname"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Prénom"
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                      />
                    </div>
                    <div>
                      <label htmlFor="auth-lastname" className="block text-xs font-medium text-[#4A3E31] mb-1">
                        Nom
                      </label>
                      <input
                        id="auth-lastname"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Nom"
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email" className="block text-xs font-medium text-[#4A3E31] mb-1">
                    Adresse e-mail ou numéro de laboratoire
                  </label>
                  <input
                    id="auth-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="laieb@soldeal.fr"
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                  />
                </div>

                <div className={tab === 'register' ? 'grid grid-cols-2 gap-3' : ''}>
                  <div>
                    <label htmlFor="auth-password" className="block text-xs font-medium text-[#4A3E31] mb-1">
                      Mot de passe
                    </label>
                    <input
                      id="auth-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                    />
                  </div>
                  {tab === 'register' && (
                    <div>
                      <label htmlFor="auth-password-confirm" className="block text-xs font-medium text-[#4A3E31] mb-1">
                        Confirmation
                      </label>
                      <input
                        id="auth-password-confirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FCF6E8] border border-[#C9AA78] rounded-md text-[#1C1611] focus:outline-none focus:border-[#9A3412]"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] py-2.5 text-sm font-semibold text-[#FAF0D7] bg-[#1C1611] hover:bg-[#9A3412] rounded-md transition-colors cursor-pointer"
                >
                  {tab === 'login' ? 'Se connecter' : 'Créer mon accès'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
