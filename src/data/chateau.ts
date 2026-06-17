/**
 * Contenu éditorial de la page « Le Château ».
 */
import { images, type Visual } from "./images";

export const chateauSeo = {
  title: "Le Château — Château de Sainte-Lucie",
  description:
    "Une demeure de caractère de 1876, ≈750 m², au cœur d'un parc boisé aux portes des Vosges. L'histoire, les espaces et la situation du Château de Sainte-Lucie.",
};

export const phero = {
  place: "Le lieu",
  title: "Le Château",
  image: images.piscineChateauJour as Visual,
};

export const intro = {
  eyebrow: "L'âme du lieu",
  quote:
    "« Bâti en 1876 comme cadeau de noces, le château porte en ses murs cent cinquante ans d'amour, de deuils et de transmissions. »",
  paragraphs: [
    "De la Belle Époque à la Grande Guerre — où il servit de lieu de repos aux combattants — jusqu'à ses gardiens d'aujourd'hui, Sainte-Lucie a traversé le temps sans perdre son âme. Son nom est un hommage à la lumière : celui de l'épouse Lucy, de la sainte de Syracuse, et d'une grand-tante de la famille.",
    "C'est cette histoire que l'on accueille, autant que les murs : un lieu habité, vivant, transmis — et désormais ouvert, quelques jours par mois, à ceux qui cherchent un cadre à sa hauteur.",
  ],
  links: [
    { label: "Lire l'histoire complète", href: "/histoire" },
    { label: "Parcourir la galerie", href: "/galerie" },
  ],
};

export interface Feature {
  image: Visual;
  cap: string;
  title: string;
  text: string;
  mini: string[];
  rev?: boolean;
}

export const espaces = {
  eyebrow: "Les espaces",
  title: ["Deux grandes salles, ", "un parc entier."],
  features: [
    {
      image: images.blason,
      cap: "Patrimoine",
      title: "Les salles de réception",
      text: "Boiseries de chêne sculpté, cheminées de marbre, blasons d'époque et parquets en point de Hongrie : deux grandes salles de caractère, baignées de lumière, pour les réunions, les repas et les réceptions.",
      mini: ["Boiseries d'origine", "Cheminées de marbre", "Lumière naturelle"],
    },
    {
      image: images.cheneCentenaire,
      cap: "Le parc",
      title: "Le parc & les chênes centenaires",
      text: "Plusieurs hectares de parc boisé, des chênes et tilleuls plantés à la construction, des perspectives dégagées sur les prairies vosgiennes. Un écrin pour les pauses, les activités de plein air et les prises de vue.",
      mini: ["Plusieurs hectares", "Arbres centenaires", "Sous-bois"],
      rev: true,
    },
    {
      image: images.piscineSalon,
      cap: "Art de vivre",
      title: "La piscine naturelle & le bien-être",
      text: "Un bassin naturel filtré par lagunage, un salon extérieur, un cadre propice à la détente entre deux sessions de travail. L'art de vivre du château, du matin au crépuscule.",
      mini: ["Baignade naturelle", "Salon extérieur", "Espace bien-être"],
    },
  ] satisfies Feature[],
};

export const chiffres = {
  eyebrow: "En quelques chiffres",
  items: [
    { v: "≈750 m²", l: "de demeure" },
    { v: "50–70", l: "personnes max" },
    { v: "≈20", l: "places de parking" },
    { v: "1876", l: "année de naissance" },
  ],
  note: "La capacité, fixée par la jauge ERP, reste indicative et à confirmer par le bureau de contrôle.",
};

export const situation = {
  eyebrow: "La situation",
  title: ["Aux portes de ", "Rambervillers."],
  text: "Le château se trouve à la sortie de Rambervillers, au cœur des Vosges, à moins d'une heure des principales villes de Lorraine. Demeure habitée, sa localisation exacte est communiquée aux clients confirmés.",
  access: [
    { where: "Épinal", dur: "≈ 35 min" },
    { where: "Nancy", dur: "≈ 50 min" },
    { where: "Gare TGV Lorraine", dur: "≈ 1 h" },
    { where: "Aéroport Metz-Nancy", dur: "≈ 1 h 10" },
  ],
  pin: { title: "Aux portes des Vosges", sub: "Rambervillers · 88" },
};

export const chateauCta = {
  eyebrow: "Venez le découvrir",
  title: ["Une visite vaut ", "mille images."],
  text: "Dites-nous votre projet — séminaire, événement de famille ou tournage — et nous organisons une découverte du lieu.",
  actions: [
    { label: "Demander une proposition", href: "/contact", variant: "gold-light" as const },
    { label: "Demander une visite", href: "/contact", variant: "ghost-light" as const },
  ],
};
