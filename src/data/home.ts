/**
 * Contenu de l'accueil de pré-ouverture « Les Nuits au Château ».
 * Composition inspirée du flyer de référence validé.
 */
import { images, type Visual } from "./images";

export const homeSeo = {
  title:
    "Les Nuits au Château | Les Suites de Sainte-Lucie dans les Vosges",
  description:
    "Deux suites seulement dans un château familial de 1876 à Rambervillers : spa réservé, parc d'un hectare, piscine naturelle et dîner privatif.",
};

export const hero = {
  eyebrow: "Château de Sainte-Lucie · Vosges",
  title: "Les Nuits au Château",
  signature: "Les Suites de Sainte-Lucie",
  accroche: "Deux suites seulement. Le château, dans sa plus rare intimité.",
  descriptor: "Suites de caractère · spa réservé · table d'hôtes · domaine de 1876",
  image: images.projFacadeEclairageNuit as Visual,
};

export const maison = {
  eyebrow: "Une maison, pas un décor",
  title: ["Un château habité, ", "presque rien que pour vous."],
  paragraphs: [
    "Sainte-Lucie n'est pas un hôtel installé dans un château vide. C'est une demeure de 1876 toujours habitée, qui n'ouvre que deux suites et reçoit volontairement très peu d'hôtes à la fois.",
    "On y vient pour habiter le lieu : franchir le perron au soir, retrouver les boiseries et les cheminées, dîner à sa propre table, marcher sous les chênes puis gagner, à l'heure choisie, les eaux et la chaleur du spa.",
    "Le luxe tient ici à ce qui ne se multiplie pas : l'espace, le silence, la lumière, un parc d'un hectare et le temps personnel que la famille peut consacrer à chaque séjour.",
  ],
  image: images.salleAManger as Visual,
};

export const suitesTeaser = {
  eyebrow: "Deux suites seulement",
  title: ["Deux suites, ", "deux lumières."],
  text: "Chacune réunit deux pièces, une salle de bain et une terrasse privative. Deux véritables appartements d'hôtes, deux atmosphères, et jamais plus de deux suites ouvertes dans toute la demeure.",
  cta: "Découvrir les suites",
  href: "/les-suites",
};

export interface SejourStep {
  time: string;
  title: string;
  text: string;
}

export const sejour = {
  eyebrow: "Un séjour, du soir au matin",
  title: ["Le temps ", "ralentit."],
  steps: [
    {
      time: "Le soir",
      title: "Franchir le perron",
      text: "Arriver à la tombée du jour, s'installer dans sa suite, retrouver le calme des boiseries.",
    },
    {
      time: "À table",
      title: "La table d'hôtes",
      text: "Partager, sur réservation, une cuisine de maison servie dans un lieu spectaculaire sans cérémonial.",
    },
    {
      time: "La nuit",
      title: "Le silence d'une chambre haute",
      text: "Lire près d'une cheminée, éteindre, écouter le parc et la nuit vosgienne.",
    },
    {
      time: "Au matin",
      title: "Le parc au réveil",
      text: "Le petit-déjeuner, puis la rosée sous les chênes et, quand les conditions le permettent, la piscine naturelle.",
    },
  ] satisfies SejourStep[],
};

export interface ExpItem {
  icon: "window" | "dish" | "waves" | "tree";
  title: string;
  text: string;
}

export const experienceTeaser = {
  eyebrow: "L'expérience",
  title: ["Du perron ", "au petit matin."],
  items: [
    {
      icon: "window",
      title: "Les espaces partagés",
      text: "Hall en mosaïque, grand salon boisé, salle à manger et bibliothèque : les volumes d'une demeure, pas ceux d'une chambre.",
    },
    {
      icon: "dish",
      title: "La table d'hôtes",
      text: "Le soir, une table dressée pour votre tablée et un menu composé selon vos goûts.",
    },
    {
      icon: "waves",
      title: "Le spa réservé",
      text: "Hammam, bain nordique, sauna finlandais et piscine naturelle, à découvrir sur des temps choisis.",
    },
    {
      icon: "tree",
      title: "Le parc vivant",
      text: "Un hectare clos de prairies, de vieux arbres et de lisières, accessible directement depuis la maison.",
    },
  ] satisfies ExpItem[],
  cta: "Découvrir l'expérience",
  href: "/experience",
};

export const galerie = {
  eyebrow: "La galerie",
  title: ["Sainte-Lucie, ", "au fil des lumières."],
  cta: "Voir la galerie",
  href: "/galerie",
  strip: [
    images.projPerronArriveeSoir,
    images.projLumiereBain,
    { ...images.projPiscineHeureBleue, wide: true },
    images.projTableHotes,
    images.projPetitDejeunerTerrasse,
  ] as (Visual & { wide?: boolean })[],
};

export const signatureExperience = {
  eyebrow: "L'expérience signature",
  title: ["Du premier pas ", "au dernier matin."],
  text: "Avec deux suites seulement, Sainte-Lucie offre l'intimité rare d'une grande demeure : arrivée à la lueur des lanternes, suite préparée pour vous, temps réservé dans les eaux du parc, dîner privatif et petit-déjeuner face aux arbres.",
  items: [
    { image: images.projPerronArriveeSoir, moment: "À la nuit tombée", title: "L'arrivée au perron", text: "La maison éclairée, les clés remises et le temps qui change de rythme.", wide: true },
    { image: images.projTableHotes, moment: "Le soir", title: "Le dîner privatif", text: "Une table dressée pour votre tablée, un menu unique et l'accord des vins si vous le souhaitez." },
    { image: images.projPiscineHeureBleue, moment: "Entre chien et loup", title: "La piscine naturelle", text: "Le bassin et son lagunage dans la lumière bleue du jardin." },
    { image: images.projBainNordique, moment: "Sous les arbres", title: "Le spa aux quatre visages", text: "Hammam, bain nordique, sauna finlandais et piscine naturelle, sur des temps réservés." },
    { image: images.projPetitDejeunerTerrasse, moment: "Au réveil", title: "Le petit-déjeuner", text: "Un plateau simple et généreux, servi face au parc lorsque le temps le permet." },
  ],
};

export const histoireTeaser = {
  eyebrow: "Lucy, Lucia, lux",
  title: ["Une maison née ", "d'une histoire d'amour."],
  text: "En 1876, la demeure est offerte à Marie Lucy Velin. Son prénom lui donne son nom et son fil conducteur : la lumière. Un siècle et demi plus tard, la maison s'ouvre à nouveau, habitée et transmise.",
  image: images.histoireSepia as Visual,
  href: "/histoire",
};

export const ctaFinal = {
  eyebrow: "Votre séjour · avril 2027",
  title: ["Le château n'attend ", "que quelques hôtes."],
  text: "Composez dès maintenant votre séjour dans notre parcours de réservation en démonstration, ou laissez-nous vos coordonnées avant l'ouverture.",
  actions: [
    { label: "Faire ma réservation", href: "/demo/reservation", variant: "gold-light" as const },
    { label: "Nous contacter", href: "/contact", variant: "ghost-light" as const },
  ],
};
