/**
 * Contenu de la page Contact de pré-ouverture (formulaire d'information).
 * Aucun téléphone du domaine affiché (non confirmé). Champ téléphone visiteur
 * facultatif.
 */
import { site } from "./site";

export const contactSeo = {
  title: "Contact | Les Nuits au Château",
  description:
    "Les Suites de Sainte-Lucie ouvrent en avril 2027. Laissez-nous vos coordonnées pour être informé de l'ouverture des réservations ou nous poser une question.",
};

export const contactHeader = {
  place: "Contact · Pré-ouverture",
  titleLead: "Soyez parmi les premiers ",
  titleGold: "à en franchir le seuil.",
  text: "Les Suites de Sainte-Lucie ouvriront en avril 2027. Laissez-nous vos coordonnées pour être informé de l'ouverture des réservations, ou pour nous poser une question.",
};

export const form = {
  objetLabel: "Objet",
  objets: [
    { id: "ouverture", label: "Ouverture", checked: true },
    { id: "sejour", label: "Séjour", checked: false },
    { id: "autre", label: "Autre", checked: false },
  ],
  fields: {
    prenom: { label: "Prénom", placeholder: "Votre prénom" },
    nom: { label: "Nom", placeholder: "Votre nom" },
    email: { label: "E-mail", placeholder: "vous@exemple.fr" },
    tel: { label: "Téléphone", placeholder: "Facultatif" },
    message: {
      label: "Votre message",
      placeholder: "Une question, une intention de séjour, une date envisagée…",
    },
  },
  consentBefore:
    "J'accepte que mes informations soient utilisées pour répondre à ma demande, conformément à la ",
  consentLink: { label: "politique de confidentialité", href: "/confidentialite" },
  consentAfter: ".",
  submit: "Envoyer",
  note: "Nous reviendrons vers vous, et vous préviendrons dès l'ouverture des réservations.",
};

export const aside = {
  write: {
    title: "Nous écrire",
    email: site.contact.email,
  },
  where: {
    title: "Où nous sommes",
    text: "Aux portes de Rambervillers, au cœur des Vosges.",
    note: "Demeure habitée : l'adresse exacte est communiquée aux clients confirmés.",
  },
  opening: {
    title: "Ouverture",
    text: "Les deux suites ouvriront en avril 2027 ; les réservations, au printemps 2027.",
  },
};

export const merci = {
  title: "Merci | Les Nuits au Château",
  description: "Votre message a bien été envoyé aux Nuits au Château.",
  eyebrow: "Message envoyé",
  titleLead: "Merci, votre message ",
  titleGold: "nous est parvenu.",
  text: "Nous reviendrons vers vous, et vous préviendrons dès l'ouverture des réservations des Suites de Sainte-Lucie.",
};
