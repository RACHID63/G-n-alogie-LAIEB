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

export const HERO_IMAGE_PATH = '/src/assets/images/hero_el_milia_archives_1794907604737.jpg';
export const LANDSCAPE_IMAGE_PATH = '/src/assets/images/ouled_ali_landscape_1794907605231.jpg';
export const DNA_ENGRAVING_PATH = '/src/assets/images/dna_lineage_engraving_1794907605714.jpg';

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
    email: 'laieb@soldeal.fr',
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
    email: 'laieb@soldeal.fr',
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
    email: 'laieb@soldeal.fr',
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

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://Facebook.com/?lang=fr' },
  { label: 'Twitter', href: 'https://twitter.com/?lang=fr' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'CodePen', href: 'https://codepen.io/your-work' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCE6Px8oF9-i3-udNVcMV6Ag' },
];
