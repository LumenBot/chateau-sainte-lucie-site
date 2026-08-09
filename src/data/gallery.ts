/**
 * Galerie — patrimoine réel et projections de l'expérience après travaux.
 */
import { images, type Visual } from "./images";

export const gallerySeo = {
  title: "Galerie | Les Nuits au Château",
  description:
    "Le Château de Sainte-Lucie aujourd'hui et l'expérience imaginée après travaux : suites, piscine naturelle, dîner au château, spa et parc au fil des lumières.",
};

export const galleryHeader = {
  eyebrow: "Galerie",
  title: ["Sainte-Lucie, ", "au fil des lumières."],
  text: "Le lieu tel qu'il est, et l'expérience telle qu'elle se prépare. Les projections, clairement identifiées, ont été construites à partir des photographies, vidéos et plans du château.",
};

export interface GalleryItem {
  image: Visual;
  caption: string;
  wide?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { image: images.projFacadeEclairageNuit, caption: "Le château, éclairage projeté pour l'ouverture", wide: true },
  { image: images.projFacadeMatinAvril, caption: "Le château, un matin d'avril", wide: true },
  { image: images.projPerronArriveeSoir, caption: "L'arrivée au perron, à la nuit tombée" },
  { image: images.projParcDepuisPerronSoir, caption: "Le parc éclairé, vu depuis le perron" },
  { image: images.projCheminBainNordiqueSoir, caption: "Le chemin vers le bain nordique" },
  { image: images.projLumiereChambre, caption: "Suite Lumière — la chambre principale" },
  { image: images.projLumiereSalon, caption: "Suite Lumière — le salon privé" },
  { image: images.projLumiereBain, caption: "Suite Lumière — la salle de bain" },
  { image: images.projLumiereTerrasse, caption: "Suite Lumière — la terrasse à l'est" },
  { image: images.projFeuillageChambre, caption: "Suite Feuillage — la chambre principale" },
  { image: images.projFeuillageChambre2, caption: "Suite Feuillage — la seconde chambre" },
  { image: images.projFeuillageBain, caption: "Suite Feuillage — la salle de bain minérale" },
  { image: images.projFeuillageTerrasse, caption: "Suite Feuillage — la grande terrasse", wide: true },
  { image: images.projTableHotes, caption: "Le dîner au château dans les boiseries", wide: true },
  { image: images.projPetitDejeunerTerrasse, caption: "Le petit-déjeuner face au parc" },
  { image: images.projPiscineHeureBleue, caption: "La piscine naturelle à l'heure bleue", wide: true },
  { image: images.projBainNordique, caption: "Le bain nordique dans la lisière" },
  { image: images.projAccueilSpa, caption: "L'accueil de l'espace bien-être" },
  { image: images.projHammam, caption: "Le hammam" },
  { image: images.facadeNuit, caption: "La façade actuelle, sous les étoiles", wide: true },
  { image: images.piscineNuit, caption: "La piscine naturelle actuelle au crépuscule", wide: true },
  { image: images.cheneCentenaire, caption: "Un arbre centenaire du parc" },
  { image: images.daims, caption: "Les daims du parc" },
  { image: images.chateauJardin, caption: "Le château depuis le jardin" },
  { image: images.blason, caption: "Le blason sculpté, « Vis Unita Fit Fortior »" },
  { image: images.hallEntree, caption: "Le hall d'entrée et son sol en mosaïque" },
  { image: images.peintureBelleEpoque, caption: "« Fête au château à la Belle Époque », par P. Baulay", wide: true },
  { image: images.vueAerienne, caption: "Le domaine vu du ciel", wide: true },
  { image: images.perronNoel, caption: "Le perron, un soir de fête" },
  { image: images.chiensPerron, caption: "Les gardiens du château" },
  { image: images.chapelle, caption: "Une dépendance d'époque, à la nuit tombée" },
  { image: images.ecureuil, caption: "Un écureuil roux du parc" },
  { image: images.sittelle, caption: "Une sittelle dans le sous-bois" },
  { image: images.dogueSieste, caption: "Sieste au soleil sur la pierre" },
  { image: images.piscineChateauJour, caption: "Le château et sa piscine naturelle, aujourd'hui", wide: true },
];
