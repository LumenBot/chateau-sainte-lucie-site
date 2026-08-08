/** Contenu de la page « L'Expérience » — vision d'ouverture avril 2027. */
import { images, type Visual } from "./images";

export const experienceSeo = {
  title: "L'Expérience | Les Nuits au Château",
  description:
    "Deux suites, dîner privatif, piscine naturelle et spa au jardin : une expérience rare dans un château familial de 1876 au cœur des Vosges.",
};

export const phero = {
  place: "L'Expérience",
  title: ["Du perron", "au petit matin."],
  lead: "Une maison de famille qui n'ouvre que deux suites et prend le temps de recevoir : arrivée au perron, espaces historiques, dîner privatif, eaux du jardin et matin dans le parc.",
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
      "L'expérience commence avant la chambre. À la tombée du jour, le perron éclairé ouvre sur le hall, ses boiseries et son sol en mosaïque. Le château se révèle par touches, sans mise en scène tapageuse.",
      "Avec deux suites seulement, l'accueil reste personnel et le rythme volontairement lent.",
    ],
  },
  {
    image: images.hallEntree,
    imagePosition: "center 45%",
    cap: "Les communs",
    title: "Les espaces partagés",
    paragraphs: [
      "Hall au sol en mosaïque, grand salon boisé, salle à manger, bibliothèque monumentale, cuisine d'été, salle de sport et hammam composent les espaces accessibles selon les temps et la formule du séjour.",
      "Les espaces privés des trois foyers de la famille restent distincts : on partage la maison sans jamais la déranger.",
    ],
  },
  {
    image: images.projTableHotes,
    cap: "Le soir",
    title: "La table d'hôtes",
    rev: true,
    paragraphs: [
      "Le soir, la table se dresse pour vous dans les boiseries : linge naturel, bougies, feu dans la cheminée lorsque la saison le permet. Une cuisine de maison, servie dans un lieu spectaculaire sans cérémonial excessif.",
      "Ce dîner privatif se réserve en amont afin d'accorder le menu à vos goûts et à vos contraintes alimentaires.",
    ],
    note: "Dîner privatif à la table d'hôtes : + 50 € par personne, sur réservation.",
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
      "Le parcours bien-être réunira le hammam du château, un bain nordique et un sauna finlandais habillés de bois, dessinés pour se fondre dans la lisière plutôt que pour s'imposer à elle.",
      "Des pas japonais, soulignés par une lumière basse, relieront le château à la piscine naturelle et aux équipements du spa. La nuit, ce chemin deviendra un rituel à part entière.",
    ],
    note: "Accès spa en supplément : + 50 €, sur réservation. Les visuels présentent l'intention d'aménagement après travaux.",
  },
  {
    image: images.projAccueilSpa,
    cap: "Le rituel",
    title: "Un temps réservé",
    rev: true,
    paragraphs: [
      "Lumière douce et créneau choisi en amont : l'espace bien-être est pensé comme une parenthèse, à l'écart du rythme ordinaire.",
      "Les modalités précises d'accès à chaque équipement seront communiquées au moment de la réservation.",
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
  eyebrow: "Pré-ouverture · avril 2027",
  title: ["Vivez le lieu, ", "du soir au matin."],
  text: "Soyez informé de l'ouverture des réservations et venez éprouver le calme de Sainte-Lucie.",
  actions: [
    { label: "Être informé de l'ouverture", href: "/contact", variant: "gold-light" as const },
    { label: "Découvrir les suites", href: "/les-suites", variant: "ghost-light" as const },
  ],
};
