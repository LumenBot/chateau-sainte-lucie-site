/**
 * Configuration centrale du site — source unique de vérité.
 * Aucune chaîne en dur dans les composants : tout passe par ici ou par les
 * modules de contenu (`src/data/*`, content collections). Structuré pour
 * préparer une future version anglaise (phase 2).
 *
 * ⚠️ Vie privée : aucune adresse postale précise. Localisation approximative
 * uniquement (« aux portes de Rambervillers »).
 * ⚠️ Les coordonnées marquées TODO sont à compléter avant mise en ligne.
 */

export const site = {
  lang: "fr",
  name: "Château de Sainte-Lucie",
  shortName: "Sainte-Lucie",
  brandLine: "Château · Vosges",
  baseline: "Rambervillers · Vosges · Lorraine",
  tagline:
    "Un lieu de réception à taille humaine, aux portes des Vosges — pour des séminaires, des moments de famille et des tournages d'exception.",

  /** Localisation publique (jamais l'adresse exacte). */
  location: {
    locality: "Rambervillers",
    region: "Vosges",
    area: "Grand Est",
    postalCode: "88700",
    country: "FR",
    approx: "Aux portes de Rambervillers, au cœur des Vosges.",
  },

  /** Coordonnées de contact — À COMPLÉTER (placeholders, voir contenu-redactionnel.md). */
  contact: {
    email: "contact@chateau-saintelucie.fr", // TODO: adresse e-mail définitive
    // Numéro fictif tant que le vrai n'est pas fourni (TODO).
    phoneDisplay: "+33 (0)X XX XX XX XX",
    phoneHref: "tel:+33000000000",
    hours: "Du lundi au vendredi, 9 h – 18 h.",
  },

  /** Capacité (jauge ERP indicative, à confirmer par le bureau de contrôle). */
  capacityMax: 70,
  capacityMin: 50,
} as const;

export type CtaKind = "proposition" | "visite" | "tournage" | "contact";

/** Libellés de CTA différenciés par cible (cahier §9). */
export const ctaLabels: Record<CtaKind, string> = {
  proposition: "Demander une proposition",
  visite: "Demander une visite",
  tournage: "Étudier un tournage",
  contact: "Nous contacter",
};

export interface NavItem {
  label: string;
  href: string;
  /** Index affiché dans le menu mobile. */
  idx?: string;
}

/** Navigation principale (header + footer « Le lieu »). */
export const mainNav: NavItem[] = [
  { label: "Le Château", href: "/le-chateau", idx: "01" },
  { label: "Histoire", href: "/histoire", idx: "02" },
  { label: "Séminaires", href: "/seminaires", idx: "03" },
  { label: "Événements privés", href: "/evenements-prives", idx: "04" },
  { label: "Tournages", href: "/tournages", idx: "05" },
  { label: "Galerie", href: "/galerie", idx: "06" },
];

/** Liens « bas de page ». */
export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

/** Bloc « plaquette » — lead magnet (cahier §5 : option contre e-mail). */
export const plaquette = {
  title: "La plaquette",
  text: "Découvrez le lieu et ses usages en quelques pages.",
  // Pas de PDF dans le dépôt : on capte la demande via le formulaire.
  cta: "Recevoir la plaquette",
  href: "/contact?sujet=plaquette",
} as const;
