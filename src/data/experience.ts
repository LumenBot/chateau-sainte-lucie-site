/** Contenu de la page « L'Expérience » — vision d'ouverture avril 2027. */
import { images, type Visual } from "./images";

export const experienceSeo = {
  title: "L'Expérience | Les Nuits au Château",
  description:
    "Deux suites seulement, dîner privatif et spa aux quatre expériences : un séjour intime et haut de gamme dans un château familial de 1876.",
};

export const phero = {
  place: "L'Expérience",
  title: ["Du perron", "au petit matin."],
  lead: "Deux suites seulement dans 750 m² d'histoire : arrivée au perron, grands salons, dîner dressé pour votre tablée, temps réservé au spa et matin dans un parc d'un hectare.",
  image: images.hallEntree as Visual,
  imagePosition: "center 42%",
};

export interface ExpSection {
  image: Visual;
  imagePosition?: string;
  cap: string;
  title: string;
  paragraphs: string[];
  note?: string;
  rev?: boolean;
  contain?: boolean;
}

export const sections: ExpSection[] = [
  {
    image: images.projPerronArriveeSoir,
    imagePosition: "center 55%",
    cap: "L'arrivée",
    title: "Franchir le seuil",
    paragraphs: [
      "L'expérience commence avant la suite. À la tombée du jour, le perron éclairé ouvre sur le hall, ses boiseries et son sol en mosaïque. Le château se révèle par touches, dans un jeu de lumière pensé comme un premier rituel.",
      "Avec deux suites seulement dans toute la demeure, l'accueil reste personnel, les circulations paisibles et chaque arrivée singulière.",
    ],
  },
  {
    image: images.hallEntree,
    imagePosition: "center 45%",
    cap: "Les communs",
    title: "Les espaces partagés",
    paragraphs: [
      "Hall au sol en mosaïque, grand salon boisé, salle à manger, bibliothèque monumentale, cuisine d'été, salle de sport et hammam composent les espaces accessibles selon les temps du séjour.",
      "La rareté vient des proportions et du faible nombre d'hôtes : on profite des volumes d'un château sans l'agitation d'un hôtel. Les espaces privés des trois foyers restent clairement distincts.",
    ],
  },
  {
    image: images.projTableHotes,
    cap: "Le soir",
    title: "La table d'hôtes",
    rev: true,
    paragraphs: [
      "Le soir, la table se dresse pour votre seule tablée dans les boiseries : linge naturel, bougies, feu dans la cheminée lorsque la saison le permet. Une cuisine du territoire servie avec précision, sans cérémonial figé.",
      "Le menu unique se prépare en amont selon vos goûts et vos contraintes. Un accord mets et vins peut prolonger le dîner, bouteille après bouteille, au rythme du repas.",
    ],
    note: "Dîner privatif : + 50 € par personne. Accord mets & vins : + 30 € par adulte, sous réserve des validations réglementaires prévues avant l'ouverture.",
  },
  {
    image: images.projPetitDejeunerTerrasse,
    cap: "Le matin",
    title: "Le petit-déjeuner au grand air",
    paragraphs: [
      "Le petit-déjeuner est inclus dans la nuit. Lorsque la saison le permet, il se prend face au parc ; puis viennent la rosée, les chênes, la prairie et le silence du premier matin.",
    ],
  },
  {
    image: images.projPiscineHeureBleue,
    cap: "Les eaux & le bien-être",
    title: "La piscine naturelle",
    rev: true,
    paragraphs: [
      "La piscine naturelle existante associe bassin de nage et lagunage planté au cœur du jardin. Sa filtration par les plantes et son eau changeante prolongent le paysage plutôt qu'elles ne l'interrompent.",
    ],
    note: "L'accès à la piscine naturelle dépend de la saison, des conditions et des règles de sécurité.",
  },
  {
    image: images.projBainNordique,
    cap: "Le bien-être",
    title: "Le spa au jardin",
    paragraphs: [
      "Le parcours bien-être réunit quatre expériences complémentaires : la vapeur du hammam, la chaleur sèche du sauna finlandais, l'immersion du bain nordique et l'eau vivante de la piscine naturelle.",
      "Les équipements secs et chauds se réservent par suite. Des pas japonais, soulignés par une lumière basse, relieront le château aux eaux du jardin ; la traversée nocturne deviendra un rituel à part entière.",
    ],
    note: "Accès spa : + 50 € par jour pour deux personnes, puis + 25 € par personne supplémentaire. Sur réservation ; visuels de projection après travaux.",
  },
  {
    image: images.projAccueilSpa,
    cap: "Le rituel",
    title: "Un temps réservé",
    rev: true,
    paragraphs: [
      "Lumière douce et créneau choisi en amont : les équipements sont pensés comme une parenthèse réservée à votre suite, à l'écart du rythme ordinaire.",
      "La piscine naturelle peut être partagée par les deux suites ou privatisée. Hammam, sauna et bain nordique accueillent une seule suite à la fois.",
    ],
  },
  {
    image: images.vueAerienne,
    cap: "Le parc",
    title: "Le parc vivant",
    paragraphs: [
      "Un hectare clos de prairies, de vieux arbres et de lisières : chênes, tilleuls et hêtres, écureuils et oiseaux, libellules et grenouilles autour du lagunage.",
      "Aucune nature fabriquée : le paysage vosgien, ses saisons et sa faune restent le premier décor de Sainte-Lucie.",
    ],
  },
];

export const experienceCta = {
  eyebrow: "Votre expérience · avril 2027",
  title: ["Le château, ", "à votre rythme."],
  text: "Composez un séjour où la suite, le spa et la table s'accordent à vos envies.",
  actions: [
    { label: "Faire ma réservation", href: "/demo/reservation", variant: "gold-light" as const },
    { label: "Découvrir les suites", href: "/les-suites", variant: "ghost-light" as const },
  ],
};
