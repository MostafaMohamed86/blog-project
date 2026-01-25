import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";

export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, arg) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const blogArticle = ctx.db.insert("posts", {
      title: arg.title,
      body: arg.body,
      authorId: user._id,
      imageStorgeId: arg.imageStorageId,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    // 1. جلب المستخدم الحالي (يجب تمرير الـ token من الصفحة)
    const user = await authComponent.safeGetAuthUser(ctx);
    
    // إذا لم يكن هناك مستخدم مسجل، نعيد مصفوفة فارغة
    if (!user) {
      return [];
    }

    // 2. جلب المقالات التي تخص هذا المستخدم فقط باستخدام الفلترة
    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), user._id))
      .order("desc")
      .collect();

    // 3. معالجة الصور (نفس الكود الخاص بك)
    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorgeId !== undefined
            ? await ctx.storage.getUrl(post.imageStorgeId)
            : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) {
      return null;
    }

    const resolvedImageUrl =
      post?.imageStorgeId !== undefined
        ? await ctx.storage.getUrl(post.imageStorgeId)
        : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface searchResultTypes {
  _id: string;
  title: string;
  body: string;
}

export const searchPosts = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = args.limit;

    const results: Array<searchResultTypes> = [];

    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<"posts">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;

        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
        });
        if (results.length >= limit) break;
      }
    };

    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.term))
      .take(limit);

    await pushDocs(titleMatches);

    if (results.length < limit) {
      const bodyMatches = await ctx.db
        .query("posts")
        .withSearchIndex("search_body", (q) => q.search("body", args.term))
        .take(limit);

      await pushDocs(bodyMatches);
    }
    return results;
  },
});
