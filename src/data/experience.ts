/**
 * Contenu de la page « L'Expérience ».
 * Formulations prudentes : aucune promesse non confirmée (sauna, bain nordique,
 * capacité, menus, horaires). Le hammam est mentionné comme espace existant.
 */
import { images, type Visual } from "./images";

export const experienceSeo = {
  title: "L'Expérience | Les Nuits au Château",
  description:
    "Espaces partagés, table d'hôtes, matin dans le parc, piscine naturelle et hectare boisé : l'expérience d'une maison d'hôtes de caractère aux portes de Rambervillers.",
};

export const phero = {
  place: "L'Expérience",
  title: ["Du perron", "au petit matin."],
  lead: "Une maison de famille qui ouvre peu de portes et les ouvre pleinement : espaces partagés, table d'hôtes, parc et piscine naturelle, selon les temps et la formule du séjour.",
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
    image: images.hallEntree,
    imagePosition: "center 45%",
    cap: "Les communs",
    title: "Les espaces partagés",
    paragraphs: [
      "Hall au sol de terrazzo, grand salon boisé, salle à manger, bibliothèque monumentale, cuisine d'été, salle de sport et hammam composent les espaces accessibles selon les temps et la formule du séjour.",
      "Les espaces privés des trois foyers de la famille restent distincts : on partage la maison sans jamais la déranger.",
    ],
  },
  {
    image: images.salleAManger,
    cap: "Le soir",
    title: "La table d'hôtes",
    rev: true,
    paragraphs: [
      "Le soir, la table se dresse dans les boiseries. Une cuisine de maison, servie dans un lieu spectaculaire sans cérémonial excessif.",
      "Proposition sur réservation.",
    ],
    note: "Menus, régimes pris en charge et tarifs de la table seront précisés avant l'ouverture.",
  },
  {
    image: images.daims,
    cap: "Le matin",
    title: "Le matin dans le parc",
    paragraphs: [
      "Le petit-déjeuner est prévu dans l'expérience du séjour, puis le parc se découvre à la rosée : chênes, prairie, lisières et le silence du premier matin.",
    ],
    note: "La composition précise du petit-déjeuner sera arrêtée avant l'ouverture.",
  },
  {
    image: images.piscineSalon,
    cap: "Les eaux & le bien-être",
    title: "La piscine naturelle",
    rev: true,
    paragraphs: [
      "La piscine naturelle existante associe bassin de nage et lagunage planté, au cœur du jardin. Le hammam s'intègre à l'espace bien-être.",
    ],
    note: "L'accès à la piscine naturelle dépend de la saison, des conditions et des règles de sécurité.",
  },
  {
    image: images.vueAerienne,
    cap: "Le parc",
    title: "Le parc vivant",
    paragraphs: [
      "Un hectare clos de prairies, de vieux arbres et de lisières : chênes, tilleuls et hêtres, écureuils et oiseaux, libellules et grenouilles autour du lagunage.",
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
