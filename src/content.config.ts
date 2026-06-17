import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Collection « offres » — pages d'offre pilotées par le contenu (MD).
 * Le corps Markdown reste optionnel : la structure (sections) est décrite en
 * frontmatter et rendue par un composant de page réutilisable
 * (`src/pages/[offre].astro`). Préparé pour l'i18n (phase 2).
 */

const action = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["solid", "gold-light", "ghost", "ghost-light"]).optional(),
});

const titleParts = {
  eyebrow: z.string(),
  titleLead: z.string(),
  titleGold: z.string(),
  titleTail: z.string().optional(),
};

const introBlock = z.object({
  type: z.literal("intro"),
  ...titleParts,
  text: z.string(),
});

const timelineBlock = z.object({
  type: z.literal("timeline"),
  ...titleParts,
  items: z.array(
    z.object({ time: z.string(), title: z.string(), text: z.string() }),
  ),
});

const gridBlock = z.object({
  type: z.literal("grid"),
  ...titleParts,
  background: z.enum(["parch", "parch-2"]).optional(),
  items: z.array(
    z.object({
      icon: z.string().optional(),
      title: z.string(),
      text: z.string(),
    }),
  ),
});

const highlightBlock = z.object({
  type: z.literal("highlight"),
  ...titleParts,
  text: z.string(),
  image: z.string(),
  rev: z.boolean().default(false),
  contain: z.boolean().default(false), // afficher l'image entière (object-fit: contain)
  mini: z.array(z.string()).default([]),
});

const formatsBlock = z.object({
  type: z.literal("formats"),
  ...titleParts,
  items: z.array(
    z.object({
      ci: z.string(),
      title: z.string(),
      text: z.string(),
      price: z.string().optional(),
      priceUnit: z.string().optional(),
      feat: z.boolean().default(false),
    }),
  ),
  chips: z
    .array(z.object({ b: z.string(), rest: z.string() }))
    .default([]),
  note: z.string().optional(),
});

const block = z.discriminatedUnion("type", [
  introBlock,
  timelineBlock,
  gridBlock,
  highlightBlock,
  formatsBlock,
]);

const offres = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/offres" }),
  schema: z.object({
    order: z.number().default(0),
    nav: z.string(),
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      place: z.string(),
      /** Lignes du titre (jointes par <br>). */
      title: z.array(z.string()),
      lead: z.string(),
      image: z.string(),
      imageAlt: z.string().optional(),
      imagePosition: z.string().optional(), // object-position (cadrage du hero)
      placeColor: z.enum(["or", "dim"]).default("or"),
      actions: z.array(action).default([]),
    }),
    blocks: z.array(block).default([]),
    cta: z.object({
      ...titleParts,
      text: z.string(),
      actions: z.array(action),
    }),
  }),
});

/* =====================================================================
   Collection « histoire » — page-récit long-form (registre nuit)
   Une seule entrée ; structure pilotée par le frontmatter, rendue par
   src/pages/histoire.astro (fidèle à maquettes/site/histoire.html).
   ===================================================================== */

const chapterSection = z.object({
  type: z.literal("chapter"),
  no: z.string(), // chiffre romain
  ...titleParts,
  lead: z.string().optional(),
  paragraphs: z.array(z.string()),
  image: z.string(),
  imageAlt: z.string().optional(),
  caption: z.string(),
  rev: z.boolean().default(false),
  contain: z.boolean().default(false), // object-fit: contain (pierre, crypte)
  sepia: z.boolean().default(false),
  objectPosition: z.string().optional(),
  actions: z.array(action).default([]),
});

const duoFigure = z.object({
  image: z.string(),
  alt: z.string().optional(),
  caption: z.string(),
  sepia: z.boolean().default(false),
  objectPosition: z.string().optional(),
});

const duoSection = z.object({
  type: z.literal("duo"),
  no: z.string(),
  ...titleParts,
  paragraphs: z.array(z.string()),
  left: duoFigure,
  right: duoFigure,
  rev: z.boolean().default(false),
});

const exergueSection = z.object({
  type: z.literal("exergue"),
  image: z.string(),
  quote: z.string(),
  cite: z.string(),
});

const enigmeSection = z.object({
  type: z.literal("enigme"),
  no: z.string(),
  ...titleParts,
  intro: z.string(),
  blason: z.object({
    image: z.string(),
    alt: z.string().optional(),
    where: z.string(),
    motto: z.string(),
    trad: z.string(),
  }),
  motto: z.object({
    where: z.string(),
    motto: z.string(),
    trad: z.string(),
  }),
});

const timelineSection = z.object({
  type: z.literal("timeline"),
  no: z.string(),
  ...titleParts,
  lede: z.string(),
  items: z.array(
    z.object({
      year: z.string(),
      event: z.string(),
      lit: z.boolean().default(false),
    }),
  ),
});

const histoireSection = z.discriminatedUnion("type", [
  chapterSection,
  duoSection,
  exergueSection,
  enigmeSection,
  timelineSection,
]);

const histoire = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/histoire" }),
  schema: z.object({
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      sur: z.string(),
      titleLead: z.string(),
      titleGold: z.string(),
      titleTail: z.string().optional(),
      accroche: z.string(),
      scrollcue: z.string(),
      image: z.string(),
      imageAlt: z.string().optional(),
    }),
    sections: z.array(histoireSection).default([]),
  }),
});

export const collections = { offres, histoire };
