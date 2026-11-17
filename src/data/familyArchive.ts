export interface FamilyClan {
  id: string;
  name: string;
  zone: 'Ouled-Ali-Oubraham' | "L'Ajankia";
  locationDetail: string;
  lineageNotes: string;
  subBranches?: string[];
  isHighlighted?: boolean;
}

export interface ThreeBrotherRecord {
  surname: string;
  nicknameOrigin: string;
  meaning: string;
  historicalNote: string;
}

export interface FamilyMember {
  id: 'rachid' | 'mostefa' | 'fatma';
  role: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  email: string;
  image: string;
  lineageSummary: string;
  haplogroupRef: string;
}

export interface DnaLineage {
  id: 'maternel' | 'paternel';
  title: string;
  familyName: string;
  markerType: string;
  haplogroup: string;
  ancestralPeoples: string;
  originRegion: string;
  antiquityPeriod: string;
  geneticValues: string;
  certificateLabel: string;
  recommendedUpgrade: string;
  interpretation: string[];
  transmissionNote: string;
  accentTone: 'lapis' | 'terracotta';
}

export interface HistoricalEvent {
  id: string;
  orderLabel: string;
  yearLabel: string;
  era: 'origines' | 'recensements' | 'xxe';
  title: string;
  location: string;
  summary: string;
  details: string;
  familiesInvolved: string[];
  archivalRef: string;
}

export interface ElMiliaPhoto {
  id: string;
  title: string;
  caption: string;
  src: string;
  photographer: string;
  license: string;
  sourceUrl: string;
  category: 'ville' | 'paysage';
}

export const HERO_IMAGE_PATH = '/src/assets/images/hero_el_milia_archives_1794907604737.jpg';
export const LANDSCAPE_IMAGE_PATH = '/images/el-milia/vue-sur-el-milia.jpg';
export const DNA_ENGRAVING_PATH = '/src/assets/images/dna_lineage_engraving_1794907605714.jpg';

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export const FAMILY_CLANS: FamilyClan[] = [
  {
    id: 'boucherit',
    name: 'Boucherit',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: 'Centre de la dechra, secteur du cimetière et Hajaje',
    lineageNotes:
      'Grande famille établie au cœur de la dechra, alliée par ascendance maternelle aux Allalouche (via Halima Boucherit) et aux Boutellis (via Nouara Boucherit).',
    subBranches: ['Centre de la dechra', 'Secteur du cimetière', 'Ben-Braham (Hajaje)'],
  },
  {
    id: 'allalouche',
    name: 'Allalouche',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: 'En contrebas du centre de la dechra',
    lineageNotes:
      'Divisés en deux branches principales ayant pour grand-mère commune Halima Boucherit.',
    subBranches: ['Ouled-Saad', 'Ben-Yahya'],
  },
  {
    id: 'bakiri',
    name: 'Bakiri (Saadna)',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: 'Voisins directs des Lefouili',
    lineageNotes:
      'Également connus sous le patronyme Saadna, implantés dans le tissu familial d’Ouled-Ali-Oubraham.',
  },
  {
    id: 'lefouili',
    name: 'Lefouili',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: 'Voisinage immédiat des Bakiri / Saadna',
    lineageNotes:
      'Famille voisine historique partageant la vie communautaire d’Ouled-Ali-Oubraham.',
  },
  {
    id: 'boutellis',
    name: 'Boutellis',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: 'Sur les hauteurs de la dechra',
    lineageNotes:
      'Voisins directs sur les hauteurs, descendants par lignée maternelle de Nouara Boucherit.',
  },
  {
    id: 'boukhchem',
    name: 'Boukhchem',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: "Sur l'autre rive de la dechra",
    lineageNotes:
      "Famille implantée sur l'autre versant géographique d'Ouled-Ali-Oubraham.",
  },
  {
    id: 'boufafa',
    name: 'Boufafa',
    zone: 'Ouled-Ali-Oubraham',
    locationDetail: 'À proximité du cimetière',
    lineageNotes:
      'Établis aux abords du cimetière aux côtés d’une branche de la famille Boucherit.',
  },
  {
    id: 'laib',
    name: 'Laïb / Laïeb',
    zone: "L'Ajankia",
    locationDetail: "Quartier de l'Ajankia (Ajnak) · Ouled-Kassem",
    lineageNotes:
      "L'une des plus anciennes familles de l'Ajankia ayant participé à l'installation des premiers commerces du village d'El Milia. Issue de la fratrie originelle Laïeb, Megriche et Lebsir.",
    isHighlighted: true,
  },
  {
    id: 'meghriche',
    name: 'Meghriche',
    zone: "L'Ajankia",
    locationDetail: "Quartier de l'Ajankia (Ajnak) · Ouled-Kassem",
    lineageNotes:
      "Famille fondatrice de l'Ajankia partageant père et mère communs avec les familles Laïeb et Lebsir selon la mémoire des ancêtres.",
    isHighlighted: true,
  },
  {
    id: 'lebsir',
    name: 'Lebsir',
    zone: "L'Ajankia",
    locationDetail: "Quartier de l'Ajankia (Ajnak) · Ouled-Kassem",
    lineageNotes:
      "Famille fondatrice de l'Ajankia, troisième branche de la fratrie originelle avec Laïeb et Meghriche.",
    isHighlighted: true,
  },
  {
    id: 'krid',
    name: 'Krid (Grid)',
    zone: "L'Ajankia",
    locationDetail: "Quartier de l'Ajankia (Ajnak) · Ouled-Kassem",
    lineageNotes:
      "Parmi les familles les plus anciennes et les plus influentes de l'Ajankia, liée par alliance à la famille Laïeb (lignée maternelle de Fatma Grid).",
    isHighlighted: true,
  },
  {
    id: 'kehal',
    name: 'Kehal',
    zone: "L'Ajankia",
    locationDetail: "Quartier de l'Ajankia (Ajnak) · Ouled-Kassem",
    lineageNotes:
      "Ancienne famille de l'Ajankia associée aux premiers commerces établis au village d'El Milia.",
  },
  {
    id: 'mokhbi',
    name: 'Mokhbi',
    zone: "L'Ajankia",
    locationDetail: "Quartier de l'Ajankia (Ajnak) · Ouled-Kassem",
    lineageNotes:
      "Ancienne famille commerçante de l'Ajankia appartenant à la grande tribu des Ouled-Aïdoune.",
  },
];

export const THREE_BROTHERS: ThreeBrotherRecord[] = [
  {
    surname: 'LAÏEB',
    nicknameOrigin: 'Surnom attribué lors des premiers recensements (~1800)',
    meaning: 'Celui qui boitait',
    historicalNote:
      'Conservé comme patronyme officiel lors des relevés de l’état civil colonial, donnant naissance à la lignée Laïeb.',
  },
  {
    surname: 'MEGRICHE',
    nicknameOrigin: 'Surnom attribué lors des premiers recensements (~1800)',
    meaning: 'Celui qui était maigre',
    historicalNote:
      'Enregistré sous cette forme distincte bien qu’issu des mêmes père et mère que les frères Laïeb et Lebsir.',
  },
  {
    surname: 'LEBSIR',
    nicknameOrigin: 'Surnom attribué lors des premiers recensements (~1800)',
    meaning: 'Celui qui était borgne',
    historicalNote:
      'Transcrit tel quel en tant que nom de famille autonome à la suite des erreurs administratives des recensements.',
  },
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'mostefa',
    role: 'Père · Génération II',
    lastName: 'LAÏEB',
    firstName: 'Mostefa (Moustafa)',
    birthDate: '06/02/1921',
    birthPlace: 'El Milia, Algérie',
    address: '12 rue de la Page',
    city: '75000 Paris',
    email: 'soldealcontact@gmail.com',
    image: '/images/mostefa-laieb.jpg',
    lineageSummary:
      "Porteur de la lignée paternelle Laïeb originaire d'El Milia (ex-département de Constantine) et rattachée à l'haplogroupe Y-ADN G-M201.",
    haplogroupRef: 'ADN-Y · Haplogroupe G-M201',
  },
  {
    id: 'fatma',
    role: 'Mère · Génération II',
    lastName: 'LAÏEB (née GRID)',
    firstName: 'Fatma',
    birthDate: '06/02/1931',
    birthPlace: 'El Milia, Algérie',
    address: '12 rue de la Page',
    city: '75000 Paris',
    email: 'soldealcontact@gmail.com',
    image: '/images/fatma-grid.jpg',
    lineageSummary:
      "Issue de l'ancienne famille Grid (Krid) de l'Ajankia à El Milia, transmettant l'ADN mitochondrial de l'haplogroupe H.",
    haplogroupRef: 'ADNmt · Haplogroupe H',
  },
  {
    id: 'rachid',
    role: 'Fils · Génération III & Archiviste',
    lastName: 'LAÏEB',
    firstName: 'Rachid',
    birthDate: '06/02/1963',
    birthPlace: 'Mulhouse, France',
    address: '12 rue de la Page',
    city: '75000 Paris',
    email: 'soldealcontact@gmail.com',
    image: '/images/profil-rachid.png',
    lineageSummary:
      'Auteur de la compilation historique et des analyses génétiques iGENEA réunissant la lignée paternelle Laïeb et la lignée maternelle Grid.',
    haplogroupRef: 'ADNmt H · ADN-Y G-M201',
  },
];

export const DNA_LINEAGES: Record<'maternel' | 'paternel', DnaLineage> = {
  maternel: {
    id: 'maternel',
    title: 'Lignée Maternelle — Famille Grid',
    familyName: 'Famille Grid (Krid)',
    markerType: 'ADN mitochondrial (ADNmt)',
    haplogroup: 'Haplogroupe H',
    ancestralPeoples: 'Celtes ou Germains',
    originRegion: "Europe de l'Ouest",
    antiquityPeriod: '900 av. J.-C. – 900 ap. J.-C.',
    geneticValues: 'Valeurs ADNmt certifiées',
    certificateLabel: 'Certificat mt — iGENEA / FamilyTreeDNA',
    recommendedUpgrade: 'Test ADNmt FGS (Full Genomic Sequence)',
    accentTone: 'lapis',
    interpretation: [
      "Votre profil présente de nombreuses concordances dans la base de données. À ce niveau de résolution, il n'est pas encore possible de distinguer les concordances significatives de celles qui ne le sont pas, ce qui élargit la détermination à plusieurs peuples possibles de l'Antiquité.",
      "Pour affiner cette lecture, la recommandation scientifique consiste à effectuer une mise à niveau vers un test ADNmt FGS afin d'identifier un sous-groupe précis de l'haplogroupe H et de différencier l'origine géographique exacte.",
      "Le peuple d'origine indique la provenance estimée dans l'Antiquité (900 av. J.-C. – 900 ap. J.-C.) et la région d'origine montre la zone où ce profil génétique est le plus caractéristique.",
    ],
    transmissionNote:
      "L'ADN mitochondrial est transmis exclusivement de la mère à l'enfant. Toutes les femmes et tous les hommes issus de la même lignée maternelle partagent exactement le même ADNmt.",
  },
  paternel: {
    id: 'paternel',
    title: 'Lignée Paternelle — Famille Laïeb',
    familyName: 'Famille Laïeb',
    markerType: 'Chromosome Y (ADN-Y)',
    haplogroup: 'Haplogroupe G-M201',
    ancestralPeoples: 'Arabes, Phéniciens',
    originRegion: 'Proche-Orient',
    antiquityPeriod: '900 av. J.-C. – 900 ap. J.-C.',
    geneticValues: "Valeurs de l'ADN-Y certifiées",
    certificateLabel: 'Certificat Y — iGENEA / FamilyTreeDNA',
    recommendedUpgrade: 'Y-ADN upgrade 37/67 marqueurs',
    accentTone: 'terracotta',
    interpretation: [
      "L'analyse de la lignée paternelle attribue le marqueur ancestral G-M201, rattaché dans la base iGENEA aux populations anciennes du Proche-Orient (Arabes, Phéniciens) durant la fenêtre de référence de l'Antiquité (900 av. J.-C. – 900 ap. J.-C.).",
      "En fonction du nombre de marqueurs testés, une catégorisation unique peut rester ouverte entre plusieurs peuples historiques apparentés ; c'est pourquoi tous les peuples possibles compatibles avec le profil sont répertoriés.",
      "Une mise à niveau Y-ADN vers 37 ou 67 marqueurs permet d'affiner les correspondances familiales récentes et de préciser la branche paternelle au sein de la base FamilyTreeDNA.",
    ],
    transmissionNote:
      "Le chromosome Y est transmis de père en fils. Il retrace directement la lignée patronymique masculine de la famille Laïeb.",
  },
};

export const EL_MILIA_TIMELINE: HistoricalEvent[] = [
  {
    id: 'odjak-ajankia',
    orderLabel: '01',
    yearLabel: 'Époque ottomane',
    era: 'origines',
    title: "Garnison de l'Odjak et naissance de l'Ajankia",
    location: "L'Ajankia (Ajnak) · Ouled-Kassem",
    summary:
      "Formation de l'un des plus anciens quartiers arabes d'El Milia autour du terme turc « Odjak ».",
    details:
      "Avant l'appellation du village d'El Milia, les habitants de l'Ajankia appartenaient aux Ouled-Kassem, formant avec les Ouled-Debbeb la grande tribu des Ouled-Aïdoune. La présence d'une garnison d'infanterie ottomane (« Odjak ») donna son nom au lieu : l'Odjak devint l'Ajonkia, puis Ajankia et Ajnak.",
    familiesInvolved: ['Ouled-Kassem', 'Ouled-Debbeb', 'Ouled-Aïdoune'],
    archivalRef: 'TOPONYMIE · ODJAK / AJANKIA',
  },
  {
    id: 'trois-freres-1800',
    orderLabel: '02',
    yearLabel: 'Vers 1800',
    era: 'origines',
    title: 'La fratrie originelle : Laïeb, Megriche et Lebsir',
    location: 'El Milia · Mémoire des ancêtres',
    summary:
      'Trois frères issus du même père et de la même mère identifiés par leurs surnoms physiques.',
    details:
      "Selon les récits transmis par nos grands-pères et arrière-grands-pères, les familles Laïeb, Megriche et Lebsir partagent une ascendance directe commune. Au tournant des années 1800, chacun des trois frères portait un surnom lié à une particularité physique : Laïeb (celui qui boitait), Megriche (celui qui était maigre) et Lebsir (celui qui était borgne).",
    familiesInvolved: ['Laïeb', 'Megriche', 'Lebsir'],
    archivalRef: 'TRADITION ORALE · FRATRIE ~1800',
  },
  {
    id: 'recensements-1830',
    orderLabel: '03',
    yearLabel: '1830 – 1962',
    era: 'recensements',
    title: 'Les 19 recensements et la séparation des patronymes',
    location: 'Ex-département de Constantine',
    summary:
      "Dix-neuf recensements coloniaux figent administrativement les surnoms en trois noms de famille.",
    details:
      "Durant l'occupation française entre 1830 et 1962, l'administration coloniale conduisit dix-neuf recensements de population en Algérie. En raison de nombreuses erreurs administratives — parfois volontaires — les surnoms des trois frères furent enregistrés comme trois patronymes distincts, tout en rebaptisant officiellement le village d'El Milia.",
    familiesInvolved: ['Laïeb', 'Megriche', 'Lebsir'],
    archivalRef: 'ÉTAT CIVIL · 19 RECENSEMENTS',
  },
  {
    id: 'premiers-commerces',
    orderLabel: '04',
    yearLabel: 'XIXe – début XXe s.',
    era: 'recensements',
    title: 'Essor de la dechra et premiers commerces du village',
    location: 'Ouled-Ali-Oubraham & El Milia',
    summary:
      "Les clans d'Ouled-Ali-Oubraham et de l'Ajankia fondent le cœur commerçant d'El Milia.",
    details:
      "Au sein de la dechra d'Ouled-Ali-Oubraham s'organisent les grandes familles (Boucherit au centre, Allalouche, Bakiri/Saadna, Lefouili, Boutellis, Boukhchem, Boufafa). Parallèlement, les plus anciennes familles de l'Ajankia — Krid (Grid), Kehal, Laïb, Lebsir, Meghriche et Mokhbi — établissent les premiers commerces du village d'El Milia.",
    familiesInvolved: ['Boucherit', 'Krid (Grid)', 'Kehal', 'Laïb', 'Mokhbi'],
    archivalRef: 'CHRONIQUE LOCALE · EL MILIA',
  },
  {
    id: 'naissances-parents',
    orderLabel: '05',
    yearLabel: '1921 & 1931',
    era: 'xxe',
    title: 'Naissances de Mostefa Laïeb et Fatma Grid à El Milia',
    location: 'El Milia, Algérie',
    summary:
      'Alliance de la lignée paternelle Laïeb (G-M201) et de la lignée maternelle Grid (H).',
    details:
      "Le 6 février 1921 naît Mostefa (Moustafa) Laïeb à El Milia, suivi le 6 février 1931 par la naissance de Fatma Grid dans la même cité. Leur union relie deux des lignées fondatrices de l'Ajankia et servira plus tard de socle aux analyses ADN familiales iGENEA.",
    familiesInvolved: ['Laïeb', 'Grid (Krid)'],
    archivalRef: 'FILIATION · GÉNÉRATION II',
  },
  {
    id: 'chronique-1961',
    orderLabel: '06',
    yearLabel: '5 janvier 1961',
    era: 'xxe',
    title: "Chronique d'Ouled-Ali-Oubraham en guerre de libération",
    location: 'Ouled-Ali-Oubraham · El Milia',
    summary:
      'Photographie historique des familles de la dechra et de l’Ajankia en pleine guerre d’Algérie.',
    details:
      "Le 5 janvier 1961, pendant la guerre de libération de l'Algérie, Ouled-Ali-Oubraham — juste à côté de l'Ajankia (Ouled-Kacem) dans la commune mixte d'El Milia — demeure structurée autour de ses lignées historiques et de la solidarité entre voisins, des Ben-Braham de Hajaje aux familles de l'autre rive.",
    familiesInvolved: ['Boucherit', 'Allalouche', 'Boutellis', 'Boufafa', 'Laïb'],
    archivalRef: 'ARCHIVE · 5 JANVIER 1961',
  },
  {
    id: 'transmission-1963',
    orderLabel: '07',
    yearLabel: '1963 – Aujourd’hui',
    era: 'xxe',
    title: 'De Mulhouse à Paris : préservation des archives Laïeb',
    location: 'Mulhouse & Paris, France',
    summary:
      "Naissance de Rachid Laïeb en 1963 et numérisation de la mémoire d'El Milia.",
    details:
      "Né le 6 février 1963 à Mulhouse, Rachid Laïeb recueille les témoignages des aînés, les extraits documentaires sur El Milia et les certificats génétiques iGENEA / FamilyTreeDNA (ADNmt H et ADN-Y G-M201) afin de préserver cette histoire familiale pour les générations futures.",
    familiesInvolved: ['Laïeb', 'Grid (Krid)'],
    archivalRef: 'ARCHIVES · MULHOUSE – PARIS',
  },
];

export const EL_MILIA_PHOTOS: ElMiliaPhoto[] = [
  {
    id: 'vue-sur-el-milia',
    title: 'Vue sur la vallée d’El Milia',
    caption: 'Panorama sur la ville d’El Milia et les montagnes environnantes depuis les hauteurs boisées.',
    src: '/images/el-milia/vue-sur-el-milia.jpg',
    photographer: 'Djahid Lebsir',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vue_sur_El_Milia.JPG',
    category: 'paysage',
  },
  {
    id: 'place-des-martyrs',
    title: 'Place des Martyrs — Centre d’El Milia',
    caption: 'Vue sur la Place des Martyrs et l’architecture historique au cœur de la ville d’El Milia.',
    src: '/images/el-milia/place-des-martyrs-el-milia.jpg',
    photographer: 'Djahid Lebsir',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Place_des_Martyrs_%C3%A0_El_Milia_(Algerie).jpg',
    category: 'ville',
  },
  {
    id: 'el-milia-panorama',
    title: 'Quartiers à flanc de colline',
    caption: 'Habitations et oliviers adossés aux reliefs d’El Milia, dans la wilaya de Jijel.',
    src: '/images/el-milia/el-milia-panorama.jpg',
    photographer: 'Taayyebb',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Milia_.jpg',
    category: 'ville',
  },
  {
    id: 'belle-nature-el-milia',
    title: 'Nature et reliefs de Kabylie orientale',
    caption: 'Massifs forestiers et plaine entourant la commune d’El Milia.',
    src: '/images/el-milia/belle-nature-el-milia.jpg',
    photographer: 'Djahid Lebsir',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Belle_nature_%C3%A0_El_Milia.jpg',
    category: 'paysage',
  },
  {
    id: 'el-milia-neige',
    title: 'El Milia sous la neige',
    caption: 'Un hiver rigoureux sur les avenues et bâtisses du centre d’El Milia.',
    src: '/images/el-milia/el-milia-sous-la-neige.jpg',
    photographer: 'Djahid Lebsir',
    license: 'Domaine public',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Milia_sous_la_neige.JPG',
    category: 'ville',
  },
  {
    id: 'sommet-el-milia',
    title: 'Hauts sommets d’El Milia',
    caption: 'Pâturages d’altitude et crêtes rocheuses surplombant le territoire d’El Milia.',
    src: '/images/el-milia/sommet-el-milia.jpg',
    photographer: 'Nadjib mans',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:2020-0611_12.33.41_The_highest_peak_in_elmllia.jpg',
    category: 'paysage',
  },
];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://Facebook.com/?lang=fr' },
  { label: 'Twitter', href: 'https://twitter.com/?lang=fr' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'CodePen', href: 'https://codepen.io/your-work' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCE6Px8oF9-i3-udNVcMV6Ag' },
];
