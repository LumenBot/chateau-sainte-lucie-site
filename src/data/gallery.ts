/**
 * Galerie — sélection de visuels avec légendes.
 * (Visuels de remplacement ; à substituer par la photothèque définitive.)
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
  text: "Le lieu, ses salles, son parc et ses détails — au fil des saisons.",
};

export interface GalleryItem {
  image: Visual;
  caption: string;
  wide?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { image: images.facadeNuit, caption: "La façade illuminée, à la nuit tombée", wide: true },
  { image: images.perronIllumine, caption: "Le perron illuminé" },
  { image: images.cheneCentenaire, caption: "Chênes centenaires du parc" },
  { image: images.piscineNuit, caption: "La piscine naturelle au crépuscule", wide: true },
  { image: images.piscineSalon, caption: "Le salon au bord de l'eau" },
  { image: images.daims, caption: "Daims dans le parc" },
  { image: images.vueAerienne, caption: "Vue aérienne du domaine", wide: true },
  { image: images.blason, caption: "Blason sculpté, détail patrimonial" },
  { image: images.salonInterieur, caption: "Salon aux boiseries d'origine" },
  { image: images.escalier, caption: "L'escalier monumental" },
  { image: images.parcAllee, caption: "Une allée du parc", wide: true },
  { image: images.tableMaison, caption: "La table maison, du parc à l'assiette" },
  { image: images.facadeJour, caption: "La façade en grès rose des Vosges" },
  { image: images.perronNoel, caption: "Le perron, un soir de fête" },
  { image: images.facadeJourPiscine, caption: "Le château et son parc, de jour" },
  { image: images.piscineJourChateau, caption: "La piscine et la demeure" },
];
