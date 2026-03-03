---
description: Generates standardized English social media posts (X, Facebook, Instagram) for new articles published on arsi.dev. Use this skill when the user
---

## How to use it

When triggered, read the provided blog post context, markdown file, or URL. Your task is to generate three separate social media posts in English tailored for X (Twitter), Facebook, and Instagram.

### Post Requirements:

1. **Hook:** Start with an engaging hook to grab attention (e.g., a question or bold statement).
2. **Value Proposition:** Briefly explain what the user will learn or see in the post.
3. **Call to Action (CTA):**
   - **X & Facebook:** Provide the direct URL to the blog post.
   - **Instagram:** Use the phrase "🔗 Link in bio to read the full guide: [Post Title]". Do not output clickable URLs for Instagram.

### Boilerplate Signature:

You MUST append the exact following text block at the very end of the post description for ALL three social networks:

--
📖 Dive deeper on the blog: https://arsi.dev/blog/
Exploring AI prompt engineering today 🎨 | Front-end, UX & Web Dev tomorrow 💻.

### Hashtag Policy (STRICT):

Below the boilerplate signature, you must generate hashtags following these exact rules:

1. **Trending & Relevant:** Generate a set of hashtags that are highly relevant to the specific topic of the blog post, focusing on viral and trending keywords in the tech/AI space.
2. **Brand Tags (MANDATORY):** You must always end the hashtag list with these exact three tags: #arsi #arsiDev #arsistyle
3. **Nano Banana Rule:** If the blog post is about or mentions "Nano Banana", you must also include: #nanobanana #nanobananaprompt
