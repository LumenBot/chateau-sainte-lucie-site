/**
 * Contenu de la page « Le Château » (v2 — récit patrimonial, maison habitée).
 * Fil conducteur : la lumière (Lucy, Lucia, lux). Aucune capacité ERP.
 */
import { images, type Visual } from "./images";

export const chateauSeo = {
  title: "Le Château | Les Nuits au Château",
  description:
    "Un château de 1876 en grès rose des Vosges, offert à Marie Lucy Velin : boiseries, cheminées, vitraux et mobilier d'origine — un ensemble habité, aux portes de Rambervillers.",
};

export const phero = {
  place: "Le lieu",
  title: "Le Château",
  image: images.piscineChateauJour as Visual,
};

export const intro = {
  eyebrow: "Une maison qui a une âme",
  quote:
    "« Lucy, Lucia, lux » — le prénom de Marie Lucy Velin donne au lieu son nom et son fil conducteur : la lumière.",
  paragraphs: [
    "Construit en 1876 en grès vosgien rose, le château est offert à Marie Lucy Velin, dont le prénom donne au lieu son nom et son fil conducteur : Lucy, Lucia, lux — la lumière.",
    "Boiseries, cheminées, parquets, plafonds à caissons, vitraux et mobilier monumental composent encore aujourd'hui un ensemble habité plutôt qu'un décor reconstitué. En 1914, le château sert de lieu de repos à des soldats engagés dans la bataille de Lorraine. Depuis 2022, les propriétaires actuels poursuivent les recherches historiques et remettent progressivement la maison en état.",
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
  contain?: boolean;
}

export const espaces = {
  eyebrow: "Les espaces",
  title: ["Des pièces de caractère, ", "un parc entier."],
  features: [
    {
      image: images.salleAManger,
      cap: "Patrimoine",
      title: "Les pièces de réception",
      text: "Boiseries de chêne sculpté, cheminées de marbre, parquets et plafonds à caissons : des pièces de caractère, baignées de lumière, où se dresse le soir la table d'hôtes.",
      mini: ["Boiseries d'origine", "Cheminées de marbre", "Lumière naturelle"],
    },
    {
      image: images.cheneCentenaire,
      cap: "Le parc",
      title: "Le parc & les chênes centenaires",
      text: "Un hectare de parc clos, des chênes, tilleuls et hêtres plantés il y a plus d'un siècle, des lisières et une prairie vosgienne. Un écrin pour la marche, la lecture et le silence.",
      mini: ["Un hectare clos", "Arbres centenaires", "Lisières & prairie"],
      rev: true,
      contain: true,
    },
    {
      image: images.projPiscineHeureBleue,
      cap: "Art de vivre",
      title: "La piscine naturelle & le spa au jardin",
      text: "Un bassin filtré par lagunage planté, un hammam, puis un bain nordique et un sauna finlandais habillés de bois. Des pas japonais éclairés composeront un parcours discret entre la maison, l'eau et la lisière.",
      mini: ["Baignade naturelle", "Hammam", "Bain nordique & sauna"],
    },
  ] satisfies Feature[],
};

export const chiffres = {
  eyebrow: "En quelques repères",
  items: [
    { v: "1876", l: "année de naissance" },
    { v: "≈750 m²", l: "de demeure" },
    { v: "1 ha", l: "de parc clos" },
    { v: "2", l: "suites à venir" },
  ],
  note: "Repères indicatifs, susceptibles d'être précisés avant l'ouverture.",
};

export const situation = {
  eyebrow: "La situation",
  title: ["Aux portes de ", "Rambervillers."],
  text: "Le château se trouve aux portes de Rambervillers, au cœur des Vosges. Demeure habitée, sa localisation exacte est communiquée aux clients confirmés lors de la réservation.",
  pin: { title: "Rambervillers", sub: "Vosges · 88" },
};

export const chateauCta = {
  eyebrow: "Votre séjour · avril 2027",
  title: ["Bientôt, ", "les portes s'ouvrent."],
  text: "Deux suites seulement ouvriront dans la maison. Découvrez comment votre séjour pourra se composer, du perron jusqu'au dernier matin.",
  actions: [
    { label: "Faire ma réservation", href: "/demo/reservation", variant: "gold-light" as const },
    { label: "Découvrir les suites", href: "/les-suites", variant: "ghost-light" as const },
  ],
};
