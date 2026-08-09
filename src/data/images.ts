/**
 * Manifeste des visuels — imports `astro:assets` centralisés.
 *
 * ⚠️ Les noms de fichiers d'origine ne décrivent pas toujours le contenu réel
 * (ex. « 13_facade_jour_piscine » est en fait l'arbre centenaire). Les clés et
 * les `alt` ci-dessous reflètent le CONTENU réel, vérifié visuellement.
 *
 * Non utilisés volontairement (hors périmètre vitrine, réservés à /histoire ou
 * écartés) : 06_chapelle vs 06_maison_gardien (deux cadrages de la même
 * dépendance), cp_01_verriere (très basse définition), 04_blason_perron
 * (version recadrée préférée).
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
import maisonGardien from "../assets/images/06_maison_gardien_crop.jpeg";
import pierreTombale from "../assets/images/03_pierre_tombale_crop.jpeg";
import crypte from "../assets/images/02_crypte_crop.jpeg";
import histoireSepia from "../assets/images/cp_03_facade_sepia.jpg";
import histoireGloriette from "../assets/images/cp_02_facade_arbres.jpg";
import histoirePerron from "../assets/images/cp_04_perron_gloriette.jpg";
import peintureBelleEpoque from "../assets/images/20_fete_belle_epoque.jpg";
import hallEntree from "../assets/images/21_hall_entree.jpg";
import salleAManger from "../assets/images/22_salle_a_manger.jpg";
import salonCheminee from "../assets/images/23_salon_cheminee.jpg";

// --- Rendus de projection (homestaging / extensions), NON CONTRACTUELS ---
// Générés à partir des photos, vidéos et plans du lieu. Toujours affichés avec
// une mention « Visuel de projection ». À remplacer par les photos réelles
// après travaux (mars 2027).
import projLumiereChambre from "../assets/images/projection/lumiere-chambre.jpg";
import projLumiereRosace from "../assets/images/projection/lumiere-rosace.jpg";
import projLumiereNuit from "../assets/images/projection/lumiere-nuit.jpg";
import projLumiereSalon from "../assets/images/projection/lumiere-salon.jpg";
import projLumiereBain from "../assets/images/projection/lumiere-bain.jpg";
import projLumiereTerrasse from "../assets/images/projection/lumiere-terrasse.jpg";
import projFeuillageChambre from "../assets/images/projection/feuillage-chambre.jpg";
import projFeuillageChambre2 from "../assets/images/projection/feuillage-chambre2.jpg";
import projFeuillageBain from "../assets/images/projection/feuillage-bain.jpg";
import projFeuillageTerrasse from "../assets/images/projection/feuillage-terrasse.jpg";
import projTableHotes from "../assets/images/projection/table-hotes.jpg";
import projBainNordique from "../assets/images/projection/bain-nordique.jpg";
import projHammam from "../assets/images/projection/hammam.jpg";
import projSpaTerrasse from "../assets/images/projection/spa-terrasse.jpg";
import projFacadeEclairageNuit from "../assets/images/projection/facade-eclairage-nuit.jpg";
import projPiscineHeureBleue from "../assets/images/projection/piscine-heure-bleue.jpg";
import projPerronArriveeSoir from "../assets/images/projection/perron-arrivee-soir.jpg";
import projPetitDejeunerTerrasse from "../assets/images/projection/petit-dejeuner-terrasse.jpg";
import projAccueilSpa from "../assets/images/projection/accueil-spa.jpg";
import projFacadeMatinAvril from "../assets/images/projection/facade-matin-avril.jpg";
import projParcDepuisPerronSoir from "../assets/images/projection/parc-depuis-perron-soir.jpeg";
import projCheminBainNordiqueSoir from "../assets/images/projection/chemin-bain-nordique-soir.jpeg";

export interface Visual {
  src: ImageMetadata;
  alt: string;
  /** Rendu de projection non contractuel (affiché avec mention). */
  projection?: boolean;
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
  maisonGardien: {
    src: maisonGardien,
    alt: "Une dépendance du parc illuminée à la nuit tombée",
  },
  pierreTombale: {
    src: pierreTombale,
    alt: "La pierre tombale de l'enfant, sculptée de feuilles de lierre, conservée au château",
  },
  crypte: {
    src: crypte,
    alt: "La crypte familiale « Élie Velin et de Bollemont », au cimetière de Rambervillers",
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
  peintureBelleEpoque: {
    src: peintureBelleEpoque,
    alt: "« Fête au château à la Belle Époque » — tableau de P. Baulay représentant une réception en costumes d'époque devant le château",
  },
  hallEntree: {
    src: hallEntree,
    alt: "Le hall d'entrée du château : poutres, sol en mosaïque et boiseries d'époque",
  },
  salleAManger: {
    src: salleAManger,
    alt: "Une salle de réception aux boiseries d'origine, table dressée et cheminée de marbre",
  },
  salonCheminee: {
    src: salonCheminee,
    alt: "Un salon de caractère : cheminée de marbre, parquet et boiseries, aménagé pour une journée de travail",
  },

  // --- Rendus de projection (non contractuels) ---
  projLumiereChambre: { src: projLumiereChambre, alt: "Suite Lumière — chambre principale (visuel de projection non contractuel)", projection: true },
  projLumiereRosace: { src: projLumiereRosace, alt: "Suite Lumière — rosace sculptée du plafond (visuel de projection non contractuel)", projection: true },
  projLumiereNuit: { src: projLumiereNuit, alt: "Suite Lumière — chambre à la nuit tombée (visuel de projection non contractuel)", projection: true },
  projLumiereSalon: { src: projLumiereSalon, alt: "Suite Lumière — salon privé (visuel de projection non contractuel)", projection: true },
  projLumiereBain: { src: projLumiereBain, alt: "Suite Lumière — salle de bain (visuel de projection non contractuel)", projection: true },
  projLumiereTerrasse: { src: projLumiereTerrasse, alt: "Suite Lumière — terrasse tournée vers le parc (visuel de projection non contractuel)", projection: true },
  projFeuillageChambre: { src: projFeuillageChambre, alt: "Suite Feuillage — chambre principale (visuel de projection non contractuel)", projection: true },
  projFeuillageChambre2: { src: projFeuillageChambre2, alt: "Suite Feuillage — seconde chambre (visuel de projection non contractuel)", projection: true },
  projFeuillageBain: { src: projFeuillageBain, alt: "Suite Feuillage — salle de bain minérale (visuel de projection non contractuel)", projection: true },
  projFeuillageTerrasse: { src: projFeuillageTerrasse, alt: "Suite Feuillage — grande terrasse à balustrade (visuel de projection non contractuel)", projection: true },
  projTableHotes: { src: projTableHotes, alt: "La table dressée pour la planche du territoire dans les boiseries (visuel de projection non contractuel)", projection: true },
  projBainNordique: { src: projBainNordique, alt: "Bain nordique habillé de bois dans une clairière du parc (visuel de projection non contractuel)", projection: true },
  projHammam: { src: projHammam, alt: "Espace bien-être et hammam (visuel de projection non contractuel)", projection: true },
  projSpaTerrasse: { src: projSpaTerrasse, alt: "Terrasse de détente au crépuscule (visuel de projection non contractuel)", projection: true },
  projFacadeEclairageNuit: { src: projFacadeEclairageNuit, alt: "Le château et son futur éclairage architectural, la nuit (visuel de projection non contractuel)", projection: true },
  projPiscineHeureBleue: { src: projPiscineHeureBleue, alt: "La piscine naturelle aménagée pour l'heure bleue (visuel de projection non contractuel)", projection: true },
  projPerronArriveeSoir: { src: projPerronArriveeSoir, alt: "Le perron illuminé pour l'arrivée des hôtes (visuel de projection non contractuel)", projection: true },
  projPetitDejeunerTerrasse: { src: projPetitDejeunerTerrasse, alt: "Petit-déjeuner servi sur la terrasse de pierre au lever du jour (visuel de projection non contractuel)", projection: true },
  projAccueilSpa: { src: projAccueilSpa, alt: "L'accueil de l'espace bien-être dans les boiseries du château (visuel de projection non contractuel)", projection: true },
  projFacadeMatinAvril: { src: projFacadeMatinAvril, alt: "La façade du château par un matin d'avril (visuel de projection non contractuel)", projection: true },
  projParcDepuisPerronSoir: { src: projParcDepuisPerronSoir, alt: "Le parc et son cheminement éclairé vus depuis le perron au crépuscule (visuel de projection non contractuel)", projection: true },
  projCheminBainNordiqueSoir: { src: projCheminBainNordiqueSoir, alt: "Le chemin éclairé conduisant au bain nordique dans la lisière (visuel de projection non contractuel)", projection: true },
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
