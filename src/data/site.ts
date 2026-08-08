/**
 * Configuration centrale — « Les Nuits au Château ».
 * Source unique de vérité (marque, navigation, localisation, contact).
 *
 * ⚠️ Vie privée : jamais d'adresse postale précise → « Rambervillers, Vosges ».
 * ⚠️ Aucun numéro de téléphone tant qu'un vrai n'est pas fourni (06).
 * ⚠️ Ouverture annoncée : avril 2027.
 */

export const site = {
  lang: "fr",
  /** Marque principale. */
  name: "Les Nuits au Château",
  /** Signature. */
  signature: "Les Suites de Sainte-Lucie",
  /** Descripteur. */
  descriptor: "Maison d'hôtes & table d'hôtes",
  /** Lieu porteur du patrimoine. */
  house: "Château de Sainte-Lucie",
  baseline: "Château de Sainte-Lucie · Rambervillers · Vosges",
  tagline:
    "Deux suites seulement dans un château familial de 1876 — spa réservé, parc boisé, piscine naturelle et table d'hôtes dans les Vosges.",

  /** Ouverture prévisionnelle. */
  opening: {
    label: "Ouverture avril 2027",
    date: "avril 2027",
  },

  /** Localisation publique (jamais l'adresse exacte, ni le code postal). */
  location: {
    locality: "Rambervillers",
    region: "Vosges",
    area: "Grand Est",
    country: "FR",
    approx: "Rambervillers, au cœur des Vosges.",
  },

  /** Contact — À CONFIRMER avant publication. Aucun téléphone affiché. */
  contact: {
    email: "contact@chateau-saintelucie.fr", // TODO: adresse à confirmer
    // Pas de téléphone tant qu'un numéro réel n'est pas fourni.
    phone: null as string | null,
  },
} as const;

export type CtaKind = "suites" | "informer" | "contact";

/** Libellés de CTA de pré-ouverture. */
export const ctaLabels: Record<CtaKind, string> = {
  suites: "Découvrir les suites",
  informer: "Faire ma réservation",
  contact: "Nous contacter",
};

export interface NavItem {
  label: string;
  href: string;
  idx?: string;
}

/** Navigation principale (le blason/nom renvoie à l'accueil). */
export const mainNav: NavItem[] = [
  { label: "Les Suites", href: "/les-suites", idx: "01" },
  { label: "L'Expérience", href: "/experience", idx: "02" },
  { label: "Le Château", href: "/le-chateau", idx: "03" },
  { label: "Histoire", href: "/histoire", idx: "04" },
  { label: "Galerie", href: "/galerie", idx: "05" },
];

/** Liens secondaires (footer « Découvrir »). */
export const footerDiscover: NavItem[] = [
  { label: "Les Suites", href: "/les-suites" },
  { label: "L'Expérience", href: "/experience" },
  { label: "Le Château", href: "/le-chateau" },
  { label: "Histoire", href: "/histoire" },
  { label: "Galerie", href: "/galerie" },
  { label: "Contact", href: "/contact" },
];

/** Liens « bas de page ». */
export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];
