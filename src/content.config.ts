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

export const collections = { offres };
