import fs from "fs";
import path from "path";
import matter from "gray-matter";

const promptsDirectory = path.join(process.cwd(), "src/content/prompts");

/**
 * Returns all prompt slugs for getStaticPaths.
 * Format: [{ params: { slug: "tailor-resume-to-jd" } }, ...]
 */
export function getAllPromptSlugs() {
    const fileNames = fs.readdirSync(promptsDirectory);
    return fileNames
        .filter((name) => name.endsWith(".md"))
        .map((name) => ({
            params: { slug: name.replace(/\.md$/, "") },
        }));
}

/**
 * Reads and parses a single prompt file by slug.
 * Returns { frontmatter, content } where content is the raw markdown body.
 */
export function getPromptBySlug(slug) {
    if (!/^[a-z0-9-]+$/i.test(slug)) {
        throw new Error("Invalid prompt slug");
    }

    const baseDir = path.resolve(promptsDirectory);
    const fullPath = path.resolve(baseDir, `${slug}.md`);
    if (!fullPath.startsWith(`${baseDir}${path.sep}`)) {
        throw new Error("Invalid prompt slug");
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        frontmatter: data,
        content,
    };
}

/**
 * Returns all prompts with frontmatter (no body content).
 * Sorted by category then by title.
 */
export function getAllPrompts() {
    const fileNames = fs.readdirSync(promptsDirectory);
    const prompts = fileNames
        .filter((name) => name.endsWith(".md"))
        .map((name) => {
            const fullPath = path.join(promptsDirectory, name);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);
            return data;
        });

    return prompts.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return a.title.localeCompare(b.title);
    });
}

/**
 * Groups prompts by category.
 * Returns { "tailor-to-jd": [...], "no-experience": [...], ... }
 */
export function getPromptsByCategory() {
    const prompts = getAllPrompts();
    const grouped = {};
    for (const prompt of prompts) {
        const cat = prompt.category;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(prompt);
    }
    return grouped;
}

/**
 * Returns prompts where featured === true.
 */
export function getFeaturedPrompts() {
    return getAllPrompts().filter((p) => p.featured === true);
}

/**
 * Returns up to `limit` related prompts from the same category, excluding the current slug.
 */
export function getRelatedPrompts(currentSlug, category, limit = 3) {
    return getAllPrompts()
        .filter((p) => p.category === category && p.slug !== currentSlug)
        .slice(0, limit);
}

// CATEGORIES moved to @/lib/categories.js to avoid bundling 'fs' on the client
