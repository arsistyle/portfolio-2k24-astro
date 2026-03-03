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

### Boilerplate Signature (STRICT COMPLIANCE):

You MUST append the exact following text block at the very end of ALL three social media posts. Do not modify it:

--

📖 Dive deeper on the blog: https://arsi.dev/blog/
Exploring AI prompt engineering today 🎨 | Front-end, UX & Web Dev tomorrow 💻.

#PromptEngineering #FrontEnd #AIArt #arsiDev

### Conditional Hashtags:

Evaluate the content of the blog post. If the topic involves, mentions, or is related to "Nano Banana", you MUST append the following hashtags to the end of the boilerplate signature:
#nanobanana #nanobananaprompt
