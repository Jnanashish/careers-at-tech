---
title: "Check if I'm keyword stuffing or under-using keywords"
slug: "keyword-density-check"
category: "ats"
categoryLabel: "ATS and keyword optimization"
description: "Find the balance between ATS-friendly and robotic-sounding. This prompt tells you if you've gone too far."
forWho: "Freshers who've already tailored their resume once and want a second opinion"
timeMinutes: 2
difficulty: "Intermediate"
worksWith: ["ChatGPT", "Claude", "Gemini"]
seoTitle: "Check Keyword Density on Your Resume | CareersAt.Tech"
seoDescription: "Free AI prompt to check if your resume keyword density is too low, balanced, or stuffed. Built for Indian freshers optimizing for ATS."
featured: false
---

```
I'll paste my resume and a job description. Tell me whether my keyword
density is too low, just right, or stuffed.

Analyze:
- How many times each top-10 JD keyword appears in my resume.
- Whether each appearance is contextual (used inside a real sentence) or
  dumped (listed as a word without context).
- Whether the same keyword appears so many times it sounds unnatural.

Output:
KEYWORD USAGE TABLE (keyword | count | contextual or dumped)
VERDICT: under-using, balanced, or stuffed
TOP 2 EDITS TO MAKE

Here is the JD:
[PASTE JD HERE]

Here is my resume:
[PASTE RESUME HERE]
```

## Who this is for

This prompt is for freshers who have already tailored their resume to a job description and want to make sure they did not overdo it or underdo it. If you used one of the other tailoring prompts in this toolkit or manually added keywords to your resume, this is your quality check.

Keyword stuffing is a real problem. Some students read advice about "ATS optimization" and add the same keyword eight times across their resume. The ATS might pick it up, but the recruiter who reads it afterward will notice that something sounds off. On the other hand, under-using keywords means the ATS may rank your resume lower than someone who matched the JD more closely.

This prompt gives you a clear, table-based view of exactly how many times each keyword appears and whether it appears in a natural context or is just dumped into a skills list. That distinction matters. A keyword mentioned inside a project bullet is stronger than the same keyword listed in a comma-separated skills dump.

It is most useful during placement season when you are sending out multiple applications and want each one to hit the right keyword balance.

## How to use it

**Step 1: Have both documents ready.** You need your current resume (the version you plan to submit) and the job description you are applying to. Copy both as plain text.

**Step 2: Copy the prompt and paste it into ChatGPT, Claude, or Gemini.** Paste the JD in the first placeholder and your resume in the second. The order matters because the AI scans the JD first to build the keyword list.

**Step 3: Read the verdict and the table.** The table shows each keyword, how many times it appears, and whether it is used in context or just listed. If the verdict says "stuffed," remove some duplicate mentions. If it says "under-using," look for natural places to add the missing keywords.

## Example before and after

**Before:** A student applies for a React developer role. They tailored their resume and used the word "React" seven times. Their keyword density check returns:

| Keyword | Count | Type |
| React | 7 | 4 contextual, 3 dumped |
| TypeScript | 0 | - |
| REST API | 1 | contextual |
| Redux | 3 | 2 contextual, 1 dumped |

VERDICT: Stuffed for "React," under-using "TypeScript."

TOP 2 EDITS: 1. Remove 2 instances of "React" from the skills list where it is already demonstrated in project bullets. 2. Add TypeScript mention to the project that used it.

**After:** The student removes redundant "React" mentions and adds TypeScript to a bullet where they actually used it. The follow-up check returns "balanced" with all keywords appearing contextually.

## Common mistakes to avoid

**Running this check without a specific JD.** Without a job description, the AI does not know which keywords to look for. This prompt is designed for targeted applications, not general resume reviews.

**Treating "balanced" as "perfect."** A balanced keyword density means you are not stuffing or under-using. It does not mean your bullet points are strong or your formatting is clean. Use the other prompts for content quality and ATS formatting.

**Adding keywords to your skills section instead of your bullets.** When the AI says a keyword is missing, the temptation is to add it to your skills list. That works for the ATS but reads as "dumped" rather than "contextual." Whenever possible, weave the keyword into a project bullet instead.

**Ignoring the "dumped" label.** If most of your keywords show as "dumped," your resume may pass the ATS but underwhelm the recruiter. Context is what makes a keyword convincing.

## When not to use this prompt

Skip this if you have not tailored your resume yet. Run the tailoring prompt first, then come back to this one as a second-opinion check.

Also skip this if you are applying to a startup that does not use an ATS. Small teams often read every resume manually, so keyword density matters less than content clarity and project quality.
