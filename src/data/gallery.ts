/**
 * Galerie — sélection de visuels avec légendes (photos réelles du château).
 * Mélange architecture, parc, piscine, faune et art de vivre.
 */
import { images, type Visual } from "./images";

export const gallerySeo = {
  title: "Galerie — Château de Sainte-Lucie",
  description:
    "Le lieu, ses salles, son parc et ses détails — au fil des saisons. La galerie du Château de Sainte-Lucie, aux portes des Vosges.",
};

export const galleryHeader = {
  eyebrow: "Galerie",
  title: ["Le château ", "en lumière."],
  text: "Le lieu, son parc, sa piscine naturelle et ses hôtes — au fil des saisons.",
};

export interface GalleryItem {
  image: Visual;
  caption: string;
  wide?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { image: images.facadeNuit, caption: "La façade illuminée, sous les étoiles", wide: true },
  { image: images.perronIllumine, caption: "Le perron, paré de lumières" },
  { image: images.cheneCentenaire, caption: "Un arbre centenaire du parc" },
  { image: images.piscineNuit, caption: "La piscine naturelle au crépuscule", wide: true },
  { image: images.piscineSalon, caption: "Le salon au bord de l'eau" },
  { image: images.daims, caption: "Les daims du parc" },
  { image: images.chateauJardin, caption: "Le château depuis le jardin" },
  { image: images.blason, caption: "Le blason sculpté, « Vis Unita Fit Fortior »" },
  { image: images.salleAManger, caption: "Une salle de réception, table dressée" },
  { image: images.salonCheminee, caption: "Un salon de caractère, près de la cheminée" },
  { image: images.hallEntree, caption: "Le hall d'entrée et son sol en mosaïque" },
  { image: images.peintureBelleEpoque, caption: "« Fête au château à la Belle Époque », par P. Baulay", wide: true },
  { image: images.vueAerienne, caption: "Le domaine vu du ciel", wide: true },
  { image: images.perronNoel, caption: "Le perron, un soir de fête" },
  { image: images.chiensPerron, caption: "Les gardiens du château" },
  { image: images.chapelle, caption: "Une dépendance d'époque, à la nuit tombée" },
  { image: images.ecureuil, caption: "Un écureuil roux du parc" },
  { image: images.sittelle, caption: "Une sittelle dans le sous-bois" },
  { image: images.dogueSieste, caption: "Sieste au soleil sur la pierre" },
  { image: images.piscineChateauJour, caption: "Le château et sa piscine naturelle", wide: true },
];
