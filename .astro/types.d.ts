declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"posts": {
"20220818.md": {
  id: "20220818.md",
  slug: "20220818",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20220820.md": {
  id: "20220820.md",
  slug: "20220820",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20220828.md": {
  id: "20220828.md",
  slug: "20220828",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20220830.md": {
  id: "20220830.md",
  slug: "20220830",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20221001.md": {
  id: "20221001.md",
  slug: "20221001",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20230222.md": {
  id: "20230222.md",
  slug: "20230222",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20230315.md": {
  id: "20230315.md",
  slug: "20230315",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
"20230316.md": {
  id: "20230316.md",
  slug: "20230316",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
