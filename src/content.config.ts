// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a collection
const series = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/articles/series",
  }),
  schema: z.object({
    metadata: z.object({
      storyTitle: z.string(),
      storyTitleSlug: z.string(),
      author: z.string(),
      category: z.string(),
      startedOn: z.coerce.date(),
      lastUpdatedOn: z.coerce.date(),
    }),
    chapters: z.array(
      z.object({
        frontmatter: z.object({
          title: z.string(),
          parentStory: z.string(),
          slug: z.string(),
          author: z.string(),
          category: z.string(),
          chapterSequence: z.number(),
          date: z.coerce.date(),
        }),
        content: z.string(),
      })
    ),
    chapterCount: z.number(),
  }),
});

export const collections = { series };
