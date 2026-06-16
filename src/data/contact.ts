/**
 * Contenu de la page Contact (libellés de formulaire, coordonnées, aside).
 */
import { site, ctaLabels } from "./site";

export const contactSeo = {
  title: "Contact — Château de Sainte-Lucie",
  description:
    "Demande de proposition, de visite ou d'étude de tournage au Château de Sainte-Lucie. Formulaire qualifiant, réponse personnalisée.",
};

export const contactHeader = {
  place: "Contact",
  titleLead: "Parlons de votre ",
  titleGold: "projet.",
  text: "Dites-nous qui vous êtes et ce que vous cherchez. Nous revenons vers vous rapidement, avec une proposition à la hauteur du lieu.",
};

export const form = {
  typeLabel: "Type de demande",
  types: [
    { id: "seminaire", label: "Séminaire", checked: true },
    { id: "evenement", label: "Événement privé" },
    { id: "tournage", label: "Tournage" },
    { id: "autre", label: "Autre" },
  ],
  fields: {
    nom: { label: "Nom", placeholder: "Votre nom" },
    email: { label: "E-mail", placeholder: "vous@exemple.fr" },
    tel: { label: "Téléphone", placeholder: "Optionnel" },
    dates: { label: "Date(s) envisagée(s)", placeholder: "ex. mars 2026, ou flexible" },
    nombre: {
      label: "Nombre de personnes",
      hint: "— ou type de production",
      placeholder: "ex. 40 personnes · ou tournage pub automobile",
    },
    message: {
      label: "Votre projet",
      placeholder: "Décrivez votre projet, vos besoins, vos envies…",
    },
  },
  consentBefore: "J'accepte que mes informations soient utilisées pour traiter ma demande, conformément à la ",
  consentLink: { label: "politique de confidentialité", href: "/confidentialite" },
  consentAfter: ".",
  submit: "Envoyer ma demande",
  note: "Réponse sous 48 h ouvrées.",
};

export const aside = {
  write: {
    title: "Nous écrire",
    email: site.contact.email,
    phoneDisplay: site.contact.phoneDisplay,
    phoneHref: site.contact.phoneHref,
    hours: site.contact.hours,
  },
  projects: {
    title: "Selon votre projet",
    items: [
      { label: ctaLabels.proposition, href: "/seminaires" },
      { label: ctaLabels.visite, href: "/evenements-prives" },
      { label: ctaLabels.tournage, href: "/tournages" },
    ],
  },
  where: {
    title: "Où nous sommes",
    text: "Aux portes de Rambervillers, au cœur des Vosges — à ≈35 min d'Épinal et ≈50 min de Nancy.",
    note: "Demeure habitée : l'adresse exacte est communiquée aux clients confirmés.",
  },
};

export const merci = {
  title: "Merci — Château de Sainte-Lucie",
  description: "Votre demande a bien été envoyée au Château de Sainte-Lucie.",
  eyebrow: "Demande envoyée",
  titleLead: "Merci, votre demande ",
  titleGold: "nous est parvenue.",
  text: "Nous vous répondrons sous peu, avec une proposition adaptée à votre projet. Le château se visite sur rendez-vous.",
};
