import { defineStackbitConfig, DocumentStringLikeFieldNonLocalized, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.7.0',
  ssgName: 'nextjs',
  nodeVersion: '18',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          labelField: "title",
          fields: [{ name: "title", type: "string", required: true }]
        },
        {
          name: "CarouselSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "items", type: "list" }]
        },
        {
          name: "FeaturedItemsSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "items", type: "list" }]
        },
        {
          name: "FeaturedPeopleSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "people", type: "list" }]
        },
        {
          name: "FeaturedPostsSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "posts", type: "list" }]
        },
        {
          name: "GenericSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "content", type: "string" }]
        },
        {
          name: "ImageGallerySection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "images", type: "list" }]
        },
        {
          name: "PagedPostsSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "posts", type: "list" }]
        },
        {
          name: "PostFeedLayout",
          type: "page",
          filePath: "content/pages/post-feed.md",
          labelField: "title",
          fields: [{ name: "title", type: "string" }]
        },
        {
          name: "PostFeedSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "posts", type: "list" }]
        },
        {
          name: "PricingSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "plans", type: "list" }]
        },
        {
          name: "RecentPostsSection",
          type: "data",
          labelField: "title",
          fields: [{ name: "title", type: "string" }, { name: "posts", type: "list" }]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
      }
    })
  ],
  siteMap: ({ documents, models }): SiteMapEntry[] => {
    const pageModels = models.filter((model) => model.type === 'page').map((model) => model.name);
    return documents
      .filter((document) => pageModels.includes(document.modelName))
      .map((document) => {
        let slug = (document.fields.slug as DocumentStringLikeFieldNonLocalized)?.value;
        if (!slug) return null;
        slug = slug.replace(/^\/+/, '');
        switch (document.modelName) {
          case 'PostFeedLayout':
            return {
              urlPath: '/blog',
              document: document
            };
          default:
            return {
              urlPath: `/${slug}`,
              document: document
            };
        }
      });
  }
});
