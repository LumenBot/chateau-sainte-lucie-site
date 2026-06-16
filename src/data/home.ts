/**
 * Contenu éditorial de l'accueil (transposé des maquettes + contenu-redactionnel).
 * Centralisé pour préparer une future traduction (phase 2).
 */
import { images, type Visual } from "./images";

export const homeSeo = {
  title:
    "Château de Sainte-Lucie — Séminaires, événements & tournages aux portes des Vosges",
  description:
    "Un château de caractère, à taille humaine, aux portes des Vosges — pour des séminaires, des moments de famille et des tournages d'exception.",
};

export const hero = {
  place: "Rambervillers · Vosges · Lorraine",
  titleTop: "Château de",
  titleLux: "Sainte-Lucie",
  promise:
    "Un château de caractère, à taille humaine, aux portes des Vosges.",
  scrollcue: "Séminaires · Événements privés · Tournages",
  image: images.facadeNuit as Visual,
};

export interface UsageCard {
  image: Visual;
  tag: string;
  title: string;
  text: string;
  cta: string;
  href: string;
}

export const usages = {
  eyebrow: "Trois manières d'habiter le lieu",
  title: ["Le même château, ", "trois façons", " de le vivre."],
  lede: "Un lieu élégant et discret qui accueille, principalement en semaine, entreprises, familles et équipes de tournage — cinquante à soixante-dix personnes, jamais davantage.",
  cards: [
    {
      image: images.facadeJourPiscine,
      tag: "Entreprises",
      title: "Séminaires",
      text: "Salles de caractère, parc, déjeuner maison et bien-être. Une journée loin des bureaux, à moins d'une heure d'Épinal et de Nancy.",
      cta: "Demander une proposition",
      href: "/seminaires",
    },
    {
      image: images.perronNoel,
      tag: "Familles",
      title: "Événements privés",
      text: "Anniversaires, baptêmes, grands repas de famille. La beauté du lieu pour les vôtres, quelques week-ends choisis dans l'année.",
      cta: "Demander une visite",
      href: "/evenements-prives",
    },
    {
      image: images.blason,
      tag: "Productions",
      title: "Tournages",
      text: "Boiseries, blasons, parc et piscine naturelle : un décor d'époque que peu d'endroits offrent, et une lumière rare.",
      cta: "Étudier un tournage",
      href: "/tournages",
    },
  ] satisfies UsageCard[],
};

export const histoire = {
  eyebrow: "L'âme du lieu",
  title: ["Cent cinquante ans d'amour, de deuils ", "et de transmissions."],
  text: "Bâti en 1876 comme cadeau de noces, le château porte en ses murs un siècle et demi d'histoire familiale — de la Belle Époque à la Grande Guerre, jusqu'à ses gardiens d'aujourd'hui. C'est cette âme que l'on accueille, autant que les murs.",
  stats: [
    { v: "≈750 m²", l: "de demeure" },
    { v: "50–70", l: "personnes max" },
    { v: "1876", l: "année de naissance" },
  ],
  cta: "Découvrir le château",
  href: "/le-chateau",
  image: images.vueAerienne as Visual,
};

export const galerie = {
  eyebrow: "La galerie",
  title: ["Le lieu, ", "en lumière."],
  cta: "Voir la galerie complète",
  href: "/galerie",
  strip: [
    images.perronIllumine,
    images.cheneCentenaire,
    { ...images.piscineNuit, wide: true },
    images.piscineSalon,
    images.daims,
  ] as (Visual & { wide?: boolean })[],
};

export interface Reassurance {
  icon: "shield" | "lock" | "pin";
  title: string;
  text: string;
}

export const reassurance: Reassurance[] = [
  {
    icon: "shield",
    title: "À taille humaine",
    text: "Cinquante à soixante-dix personnes au maximum — le format qui préserve l'âme des lieux.",
  },
  {
    icon: "lock",
    title: "Confidentiel",
    text: "Un lieu privé, sur réservation. Pas de foules, pas de calendrier public — la discrétion d'une maison de famille.",
  },
  {
    icon: "pin",
    title: "Aux portes des Vosges",
    text: "À la sortie de Rambervillers, à moins d'une heure d'Épinal et de Nancy, au cœur d'un parc boisé.",
  },
];

export const ctaFinal = {
  eyebrow: "Parlons de votre projet",
  title: ["Imaginons votre moment ", "au château."],
  text: "Dites-nous qui vous êtes et ce que vous cherchez — nous revenons vers vous avec une proposition à la hauteur du lieu.",
  actions: [
    { label: "Demander une proposition", href: "/contact", variant: "gold-light" as const },
    { label: "Demander une visite", href: "/contact", variant: "ghost-light" as const },
    { label: "Étudier un tournage", href: "/contact", variant: "ghost-light" as const },
  ],
};
