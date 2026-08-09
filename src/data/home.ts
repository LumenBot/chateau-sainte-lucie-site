/**
 * Contenu de l'accueil de pré-ouverture « Les Nuits au Château ».
 * Composition inspirée du flyer de référence validé.
 */
import { images, type Visual } from "./images";

export const homeSeo = {
  title:
    "Les Nuits au Château | Les Suites de Sainte-Lucie dans les Vosges",
  description:
    "Deux suites intimistes, chacune entièrement privative, dans un château familial de 1876 à Rambervillers : hammam et bain nordique réservés, parc d'un hectare, piscine naturelle et planche du territoire.",
};

export const hero = {
  eyebrow: "Château de Sainte-Lucie · Vosges",
  title: "Les Nuits au Château",
  signature: "Les Suites de Sainte-Lucie",
  accroche: "Deux suites intimistes, chacune entièrement privative.",
  descriptor: "Suites de caractère · spa réservé · saveurs du territoire · domaine de 1876",
  image: images.projFacadeEclairageNuit as Visual,
};

export const maison = {
  eyebrow: "Une maison, pas un décor",
  title: ["Un château habité, ", "presque rien que pour vous."],
  paragraphs: [
    "Sainte-Lucie n'est pas un hôtel installé dans un château vide. C'est une demeure de 1876 toujours habitée, qui n'ouvre que deux suites et reçoit volontairement très peu d'hôtes à la fois.",
    "On y vient pour habiter le lieu : franchir le perron au soir, retrouver les boiseries et les cheminées, partager une planche du territoire, marcher sous les chênes puis gagner, à l'heure choisie, les eaux et la chaleur du spa.",
    "Le luxe tient ici à ce qui ne se multiplie pas : l'espace, le silence, la lumière, un parc d'un hectare et le temps personnel que la famille peut consacrer à chaque séjour.",
  ],
  image: images.salleAManger as Visual,
};

export const suitesTeaser = {
  eyebrow: "Deux suites intimistes",
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
      title: "La planche du territoire",
      text: "Partager, sur réservation, une sélection locale prête à servir dans un lieu spectaculaire sans cérémonial.",
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
      title: "La planche du territoire",
      text: "Le soir, des produits locaux, une bouteille sélectionnée et une table dressée pour votre suite.",
    },
    {
      icon: "waves",
      title: "Le spa réservé",
      text: "Hammam, bain nordique et piscine naturelle, à découvrir sur des temps choisis.",
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
    images.projParcDepuisPerronSoir,
    { ...images.projPiscineHeureBleue, wide: true },
    images.projCheminBainNordiqueSoir,
    images.projPetitDejeunerTerrasse,
  ] as (Visual & { wide?: boolean })[],
};

export const signatureExperience = {
  eyebrow: "L'expérience signature",
  title: ["Du premier pas ", "au dernier matin."],
  text: "Avec deux suites intimistes, chacune entièrement privative, Sainte-Lucie offre la rareté d'une grande demeure accueillant très peu d'hôtes : arrivée à la lueur des lanternes, suite préparée pour vous, temps réservé dans les eaux du parc, planche du territoire et petit-déjeuner face aux arbres.",
  items: [
    { image: images.projPerronArriveeSoir, moment: "À la nuit tombée", title: "L'arrivée au perron", text: "La maison éclairée, les clés remises et le temps qui change de rythme.", wide: true },
    { image: images.projTableHotes, moment: "Le soir", title: "La planche du territoire", text: "Une table dressée, des produits locaux prêts à partager et une bouteille sélectionnée." },
    { image: images.projParcDepuisPerronSoir, moment: "Depuis le perron", title: "Le parc mis en lumière", text: "Un cheminement discret relie la demeure, les arbres centenaires et les eaux du jardin." },
    { image: images.projCheminBainNordiqueSoir, moment: "Sous les arbres", title: "Le spa au bout du chemin", text: "La lumière accompagne les pas jusqu'au bain nordique, puis au hammam et à la piscine naturelle." },
    { image: images.projPetitDejeunerTerrasse, moment: "Au réveil", title: "Le petit-déjeuner", text: "Un plateau simple et généreux, servi face au parc lorsque le temps le permet." },
  ],
};

export const histoireTeaser = {
  eyebrow: "Lucy, Lucia, lux",
  title: ["Une maison née ", "d'une histoire d'amour."],
  text: "En 1876, le vicomte Charles Alfred Chonet de Bollemont fait construire la demeure pour Marie Lucy Velin, épousée deux ans plus tôt. Son prénom lui donne son nom et son fil conducteur : la lumière. Disparus à moins de trois mois d'intervalle, ils reposent ensemble à Rambervillers.",
  image: images.histoireSepia as Visual,
  href: "/histoire",
};

export const ctaFinal = {
  eyebrow: "Ouverture · avril 2027",
  title: ["Soyez parmi les premiers ", "à en franchir le seuil."],
  text: "Inscrivez-vous sans engagement pour recevoir en priorité les premières dates disponibles. Le parcours de séjour reste accessible en démonstration.",
  actions: [
    { label: "Rejoindre la liste d’attente", href: "/liste-attente", variant: "gold-light" as const },
    { label: "Découvrir le parcours", href: "/demo/reservation", variant: "ghost-light" as const },
  ],
};
