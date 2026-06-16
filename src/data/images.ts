/**
 * Manifeste des visuels — imports `astro:assets` centralisés.
 *
 * ⚠️ Les noms de fichiers d'origine ne décrivent pas toujours le contenu réel
 * (ex. « 13_facade_jour_piscine » est en fait l'arbre centenaire). Les clés et
 * les `alt` ci-dessous reflètent le CONTENU réel, vérifié visuellement.
 *
 * Non utilisés volontairement (ton funéraire, hors périmètre vitrine) :
 *   02_crypte*, 03_pierre_tombale* (caveau familial, pierre tombale d'enfant),
 *   06_maison_gardien_crop (doublon de la chapelle), cp_01_verriere (très basse
 *   définition), 04_blason_perron (version recadrée préférée).
 */
import type { ImageMetadata } from "astro";

import facadeNuit from "../assets/images/01_facade_nuit.jpeg";
import piscineChateauJour from "../assets/images/10_piscine_jour_chateau.jpeg";
import chateauJardin from "../assets/images/12_chene_centenaire.jpeg";
import cheneCentenaire from "../assets/images/13_facade_jour_piscine.jpeg";
import vueAerienne from "../assets/images/09_vue_aerienne.jpeg";
import blason from "../assets/images/04_blason_perron_crop.jpeg";
import perronIllumine from "../assets/images/05_perron_illumine.jpeg";
import perronNoel from "../assets/images/18_perron_noel.jpeg";
import chiensPerron from "../assets/images/08_chiens_perron.jpeg";
import dogueSieste from "../assets/images/17_dogue_sieste.jpeg";
import piscineNuit from "../assets/images/07_piscine_nuit.jpeg";
import piscineSalon from "../assets/images/11_piscine_salon.jpeg";
import daims from "../assets/images/14_daims.jpeg";
import sittelle from "../assets/images/15_sittelle.jpeg";
import ecureuil from "../assets/images/19_ecureuil.jpeg";
import chapelle from "../assets/images/06_chapelle_parc.jpeg";
import histoireSepia from "../assets/images/cp_03_facade_sepia.jpg";
import histoireGloriette from "../assets/images/cp_02_facade_arbres.jpg";
import histoirePerron from "../assets/images/cp_04_perron_gloriette.jpg";

export interface Visual {
  src: ImageMetadata;
  alt: string;
}

export const images = {
  facadeNuit: {
    src: facadeNuit,
    alt: "La façade du Château de Sainte-Lucie illuminée sous un ciel étoilé",
  },
  piscineChateauJour: {
    src: piscineChateauJour,
    alt: "Le château et son parc vus depuis la piscine naturelle, en été",
  },
  chateauJardin: {
    src: chateauJardin,
    alt: "Le château de Sainte-Lucie et son parc arboré, de jour",
  },
  cheneCentenaire: {
    src: cheneCentenaire,
    alt: "Un arbre centenaire du parc du château, au printemps",
  },
  vueAerienne: {
    src: vueAerienne,
    alt: "Vue aérienne du château et de son parc boisé",
  },
  blason: {
    src: blason,
    alt: "Blason sculpté « Vis Unita Fit Fortior » du château",
  },
  perronIllumine: {
    src: perronIllumine,
    alt: "Le perron du château orné de guirlandes lumineuses, la nuit",
  },
  perronNoel: {
    src: perronNoel,
    alt: "Le perron illuminé un soir de fête, un chien assis devant la porte",
  },
  chiensPerron: {
    src: chiensPerron,
    alt: "Trois chiens de la maison assis sur le perron du château",
  },
  dogueSieste: {
    src: dogueSieste,
    alt: "Un dogue assoupi sur la balustrade de pierre, au soleil",
  },
  piscineNuit: {
    src: piscineNuit,
    alt: "La piscine naturelle et son salon extérieur au crépuscule",
  },
  piscineSalon: {
    src: piscineSalon,
    alt: "Le salon extérieur au bord de la piscine naturelle, de jour",
  },
  daims: {
    src: daims,
    alt: "Une harde de daims dans le parc du château",
  },
  sittelle: {
    src: sittelle,
    alt: "Une sittelle sur une mangeoire, dans le sous-bois du parc",
  },
  ecureuil: {
    src: ecureuil,
    alt: "Un écureuil roux dans un arbre du parc",
  },
  chapelle: {
    src: chapelle,
    alt: "Une dépendance d'époque du parc, éclairée à la nuit tombée",
  },
  histoireSepia: {
    src: histoireSepia,
    alt: "Carte postale ancienne — le Château Sainte-Lucie à Rambervillers",
  },
  histoireGloriette: {
    src: histoireGloriette,
    alt: "Carte postale ancienne — le château et sa gloriette, vue de trois quarts",
  },
  histoirePerron: {
    src: histoirePerron,
    alt: "Carte postale ancienne — le perron du château et la gloriette du parc",
  },
} satisfies Record<string, Visual>;

export type ImageKey = keyof typeof images;

/**
 * Résout une image par sa clé (utilisé par les content collections où l'image
 * est référencée par chaîne). Lève une erreur explicite si la clé est inconnue.
 */
export function resolveVisual(key: string): Visual {
  const v = (images as Record<string, Visual>)[key];
  if (!v) {
    throw new Error(
      `Image inconnue : « ${key} ». Clés valides : ${Object.keys(images).join(", ")}`,
    );
  }
  return v;
}
