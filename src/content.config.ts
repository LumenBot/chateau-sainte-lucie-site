import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

/* =====================================================================
   Collection « suites » — les deux suites Lumière et Feuillage.
   Une entrée par suite (MD + frontmatter). Ne jamais inventer surfaces,
   couchages, équipements ou tarifs : champ `aConfirmer` prévu à cet effet.
   Emplacements d'images pensés pour un remplacement simple après la séance
   photographique de mars 2027.
   ===================================================================== */
const suites = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/suites" }),
  schema: z.object({
    order: z.number().default(0),
    nav: z.string(), // « Lumière »
    name: z.string(), // « Suite Lumière »
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      image: z.string(),
      imageAlt: z.string().optional(),
      imagePosition: z.string().optional(),
    }),
    /** Ligne de palette chromatique (validée). */
    palette: z.string(),
    /** Puces d'ambiance (matières / couleurs). */
    ambiance: z.array(z.string()).default([]),
    /** Paragraphe d'introduction (validé). */
    intro: z.string(),
    /** Composition validée (deux pièces, salle de bain, terrasse…). */
    composition: z.array(z.string()).default([]),
    /** Mention prudente sur les éléments non confirmés. */
    aConfirmer: z.string(),
    /** Résumé court + image pour la page /les-suites. */
    tagline: z.string(),
    cardImage: z.string(),
    cardPosition: z.string().optional(),
    /** Rendus de projection (non contractuels) présentés en galerie. */
    renders: z
      .array(z.object({ image: z.string(), caption: z.string() }))
      .default([]),
  }),
});

/* =====================================================================
   Collection « histoire » — page-récit long-form (registre nuit)
   ===================================================================== */

const chapterSection = z.object({
  type: z.literal("chapter"),
  no: z.string(),
  ...titleParts,
  lead: z.string().optional(),
  paragraphs: z.array(z.string()),
  image: z.string(),
  imageAlt: z.string().optional(),
  caption: z.string(),
  rev: z.boolean().default(false),
  contain: z.boolean().default(false),
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

export const collections = { suites, histoire };
