/**
 * Contenu de l'accueil de pré-ouverture « Les Nuits au Château ».
 * Composition inspirée du flyer de référence validé.
 */
import { images, type Visual } from "./images";

export const homeSeo = {
  title:
    "Les Nuits au Château | Les Suites de Sainte-Lucie dans les Vosges",
  description:
    "Deux suites dans un château familial de 1876 à Rambervillers : parc boisé, piscine naturelle et table d'hôtes. Ouverture prévue en avril 2027.",
};

export const hero = {
  eyebrow: "Château de Sainte-Lucie · Vosges",
  title: "Les Nuits au Château",
  signature: "Les Suites de Sainte-Lucie",
  accroche: "Une nuit dans une maison de famille, entre grès rose et lisière.",
  descriptor: "Maison d'hôtes & table d'hôtes · Domaine de 1876",
  image: images.projFacadeEclairageNuit as Visual,
};

export const maison = {
  eyebrow: "Une maison, pas un décor",
  title: ["Un château habité, ", "pas un hôtel."],
  paragraphs: [
    "Sainte-Lucie n'est pas un hôtel installé dans un château vide. C'est un château habité, partagé par trois foyers d'une même famille, qui ouvre deux suites à quelques hôtes seulement.",
    "On y vient pour ralentir : franchir le perron au soir, dîner dans les boiseries, lire près d'une cheminée, marcher sous les chênes, entrer dans une eau filtrée par les plantes, puis retrouver le silence d'une chambre haute.",
    "Le luxe recherché n'est pas spectaculaire. Il tient dans l'espace, la matière, la lumière chaude et l'attention portée aux détails.",
  ],
  image: images.salleAManger as Visual,
};

export const suitesTeaser = {
  eyebrow: "Deux suites seulement",
  title: ["Deux suites, ", "deux lumières."],
  text: "Chacune composée de deux pièces, d'une salle de bain et d'une terrasse privative. Deux atmosphères différentes, un même rapport à la matière, au calme et à la lumière.",
  cta: "Découvrir les suites",
  href: "/les-suites",
};

export interface SejourStep {
  time: string;
  title: string;
  text: string;
}

export const sejour = {
  eyebrow: "Un séjour, du soir au matin",
  title: ["Le temps ", "ralentit."],
  steps: [
    {
      time: "Le soir",
      title: "Franchir le perron",
      text: "Arriver à la tombée du jour, s'installer dans sa suite, retrouver le calme des boiseries.",
    },
    {
      time: "À table",
      title: "La table d'hôtes",
      text: "Partager, sur réservation, une cuisine de maison servie dans un lieu spectaculaire sans cérémonial.",
    },
    {
      time: "La nuit",
      title: "Le silence d'une chambre haute",
      text: "Lire près d'une cheminée, éteindre, écouter le parc et la nuit vosgienne.",
    },
    {
      time: "Au matin",
      title: "Le parc au réveil",
      text: "Le petit-déjeuner, puis la rosée sous les chênes et, quand les conditions le permettent, la piscine naturelle.",
    },
  ] satisfies SejourStep[],
};

export interface ExpItem {
  icon: "window" | "dish" | "waves" | "tree";
  title: string;
  text: string;
}

export const experienceTeaser = {
  eyebrow: "L'expérience",
  title: ["Du perron ", "au petit matin."],
  items: [
    {
      icon: "window",
      title: "Les espaces partagés",
      text: "Hall au sol en mosaïque, grand salon boisé, salle à manger et bibliothèque monumentale.",
    },
    {
      icon: "dish",
      title: "La table d'hôtes",
      text: "Le soir, une cuisine de maison servie dans les boiseries, sur réservation.",
    },
    {
      icon: "waves",
      title: "La piscine naturelle",
      text: "Un bassin de nage filtré par lagunage planté, accessible selon la saison et les conditions.",
    },
    {
      icon: "tree",
      title: "Le parc vivant",
      text: "Un hectare clos de prairies, de vieux arbres et de lisières.",
    },
  ] satisfies ExpItem[],
  cta: "Découvrir l'expérience",
  href: "/experience",
};

export const galerie = {
  eyebrow: "La galerie",
  title: ["Sainte-Lucie, ", "au fil des lumières."],
  cta: "Voir la galerie",
  href: "/galerie",
  strip: [
    images.projPerronArriveeSoir,
    images.projLumiereBain,
    { ...images.projPiscineHeureBleue, wide: true },
    images.projTableHotes,
    images.projPetitDejeunerTerrasse,
  ] as (Visual & { wide?: boolean })[],
};

export const signatureExperience = {
  eyebrow: "L'expérience signature",
  title: ["Du premier pas ", "au dernier matin."],
  text: "Sainte-Lucie se découvre comme un récit : une arrivée à la lueur des lanternes, une suite préparée pour vous, les eaux au cœur du parc, un dîner dans les boiseries et le petit-déjeuner face aux arbres.",
  items: [
    { image: images.projPerronArriveeSoir, moment: "À la nuit tombée", title: "L'arrivée au perron", text: "La maison éclairée, les clés remises et le temps qui change de rythme.", wide: true },
    { image: images.projTableHotes, moment: "Le soir", title: "Le dîner privatif", text: "Une table dressée pour vous dans les boiseries, sur réservation." },
    { image: images.projPiscineHeureBleue, moment: "Entre chien et loup", title: "La piscine naturelle", text: "Le bassin et son lagunage dans la lumière bleue du jardin." },
    { image: images.projBainNordique, moment: "Sous les arbres", title: "Le spa au jardin", text: "Hammam, bain nordique et futur sauna finlandais dans un écrin de bois." },
    { image: images.projPetitDejeunerTerrasse, moment: "Au réveil", title: "Le petit-déjeuner", text: "Un plateau simple et généreux, servi face au parc lorsque le temps le permet." },
  ],
};

export const histoireTeaser = {
  eyebrow: "Lucy, Lucia, lux",
  title: ["Une maison née ", "d'une histoire d'amour."],
  text: "En 1876, la demeure est offerte à Marie Lucy Velin. Son prénom lui donne son nom et son fil conducteur : la lumière. Un siècle et demi plus tard, la maison s'ouvre à nouveau, habitée et transmise.",
  image: images.histoireSepia as Visual,
  href: "/histoire",
};

export const ctaFinal = {
  eyebrow: "Pré-ouverture · avril 2027",
  title: ["Soyez parmi les premiers ", "à en franchir le seuil."],
  text: "Les Suites de Sainte-Lucie ouvriront en avril 2027. Laissez-nous vos coordonnées pour être informé de l'ouverture des réservations.",
  actions: [
    { label: "Être informé de l'ouverture", href: "/contact", variant: "gold-light" as const },
    { label: "Découvrir les suites", href: "/les-suites", variant: "ghost-light" as const },
  ],
};
