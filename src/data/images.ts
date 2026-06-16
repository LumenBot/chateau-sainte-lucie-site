/**
 * Manifeste des visuels — imports `astro:assets` centralisés.
 *
 * ⚠️ Ces fichiers sont des VISUELS DE REMPLACEMENT générés (voir
 * `scripts/generate-placeholders.mjs`). À remplacer par les photographies
 * définitives du château (mêmes chemins), puis relancer le build.
 *
 * `alt` par défaut décrit le sujet attendu ; il peut être surchargé au besoin.
 */
import type { ImageMetadata } from "astro";

import facadeNuit from "../assets/images/01_facade_nuit.jpg";
import piscineJourChateau from "../assets/images/02_piscine_jour_chateau.jpg";
import facadeJourPiscine from "../assets/images/03_facade_jour_piscine.jpg";
import perronNoel from "../assets/images/04_perron_noel.jpg";
import blason from "../assets/images/05_blason.jpg";
import vueAerienne from "../assets/images/06_vue_aerienne.jpg";
import perronIllumine from "../assets/images/07_perron_illumine.jpg";
import cheneCentenaire from "../assets/images/08_chene_centenaire.jpg";
import piscineNuit from "../assets/images/09_piscine_nuit.jpg";
import piscineSalon from "../assets/images/10_piscine_salon.jpg";
import daims from "../assets/images/11_daims.jpg";
import salonInterieur from "../assets/images/12_salon_interieur.jpg";
import escalier from "../assets/images/13_escalier.jpg";
import parcAllee from "../assets/images/14_parc_allee.jpg";
import tableMaison from "../assets/images/15_table_maison.jpg";
import facadeJour from "../assets/images/16_facade_jour.jpg";

export interface Visual {
  src: ImageMetadata;
  alt: string;
}

export const images = {
  facadeNuit: {
    src: facadeNuit,
    alt: "Le Château de Sainte-Lucie, façade illuminée la nuit",
  },
  piscineJourChateau: {
    src: piscineJourChateau,
    alt: "La façade du Château de Sainte-Lucie vue du parc",
  },
  facadeJourPiscine: {
    src: facadeJourPiscine,
    alt: "Façade du château et parc, de jour",
  },
  perronNoel: {
    src: perronNoel,
    alt: "Le perron du château illuminé un soir de fête",
  },
  blason: {
    src: blason,
    alt: "Blason sculpté, décor patrimonial du château",
  },
  vueAerienne: {
    src: vueAerienne,
    alt: "Vue aérienne du château et de son parc boisé",
  },
  perronIllumine: {
    src: perronIllumine,
    alt: "Le perron illuminé la nuit",
  },
  cheneCentenaire: {
    src: cheneCentenaire,
    alt: "Chênes centenaires du parc du château",
  },
  piscineNuit: {
    src: piscineNuit,
    alt: "La piscine naturelle au crépuscule",
  },
  piscineSalon: {
    src: piscineSalon,
    alt: "Salon extérieur près de la piscine naturelle",
  },
  daims: {
    src: daims,
    alt: "Daims dans le parc du château",
  },
  salonInterieur: {
    src: salonInterieur,
    alt: "Salon intérieur aux boiseries d'origine",
  },
  escalier: {
    src: escalier,
    alt: "Escalier monumental du château",
  },
  parcAllee: {
    src: parcAllee,
    alt: "Allée bordée d'arbres dans le parc",
  },
  tableMaison: {
    src: tableMaison,
    alt: "Table dressée — la cuisine maison du château",
  },
  facadeJour: {
    src: facadeJour,
    alt: "Façade en grès rose des Vosges, de jour",
  },
} satisfies Record<string, Visual>;

export type ImageKey = keyof typeof images;
