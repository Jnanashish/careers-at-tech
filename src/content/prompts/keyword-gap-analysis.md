---
title: "Find the keyword gap between my resume and a JD"
slug: "keyword-gap-analysis"
category: "tailor-to-jd"
categoryLabel: "Tailor to a specific JD"
description: "A diagnostic prompt that tells you exactly which JD keywords are missing from your resume — before you rewrite anything."
forWho: "Freshers who want to know what to fix before touching their resume"
timeMinutes: 2
difficulty: "Beginner"
worksWith: ["ChatGPT", "Claude", "Gemini"]
seoTitle: "Find the Keyword Gap Between Your Resume and a JD | CareersAt.Tech"
seoDescription: "Free AI prompt to compare your resume against a job description and find missing keywords. Built for Indian freshers applying to tech roles."
featured: false
---

```
Act as an ATS keyword analyzer. I'll paste a job description and my resume.
Your only job is to produce a gap report — do not rewrite anything yet.

Output exactly this structure:

TOP 15 KEYWORDS FROM THE JD
(numbered list — include technical skills, tools, frameworks, methodologies,
and domain terms)

KEYWORDS ALREADY IN MY RESUME
(list them)

KEYWORDS MISSING FROM MY RESUME
(list them, grouped into "truthfully addable" and "skill gap — address in
cover letter")

MATCH SCORE
(a percentage based on how many top-15 keywords appear in my resume)

ONE-LINE VERDICT
(should I apply, tailor first, or skip this role?)

Here is the JD:
[PASTE JD HERE]

Here is my resume:
[PASTE RESUME HERE]
```

## Who this is for

This prompt is for the fresher who wants a diagnosis before a prescription. Maybe you are a B.Tech student in your final semester, browsing roles on LinkedIn or Naukri, and you are not sure whether a particular JD is even worth applying to. Or maybe you have already written your resume and you want to understand how well it matches a specific posting before you start rewriting anything.

This is the prompt you use before the tailoring prompt. Think of it as a blood test before surgery. It tells you what is wrong, where the gaps are, and how serious they are. It does not change anything on your resume. It just gives you a clear, structured report so you can make informed decisions.

It is especially useful during off-campus placement season when you are applying to ten or fifteen roles in a week. You cannot tailor your resume for every single one. This prompt helps you triage. Run it against each JD, look at the match score, and decide which roles deserve a full resume rewrite and which ones you should skip or apply to with your general resume.

If you are someone who likes to understand the problem before jumping to the solution, this prompt fits your workflow perfectly. It respects the fact that not every job posting deserves a custom resume, and not every keyword gap means you should rewrite your bullets.

## How to use it

**Step 1: Gather the JD and your resume.**
Copy the complete job description from the job posting page. Include everything -- the company intro, the role summary, the responsibilities, the requirements, and even the "nice to have" section if there is one. Then copy your current resume in plain text. If your resume is in PDF format, open it in Google Docs or a PDF reader and copy the text.

**Step 2: Run the prompt.**
Paste the prompt into ChatGPT, Claude, or Gemini. Replace the two placeholders with your JD and resume text. Send the message. The AI will return a structured gap report with five sections: the top 15 keywords, what you already have, what you are missing, a match score, and a one-line verdict. Read the whole thing before taking any action.

**Step 3: Decide your next move.**
If the match score is above 70 percent, you are in good shape. Use the "truthfully addable" keywords to make minor edits and apply. If the score is between 40 and 70 percent, run the tailoring prompt next and invest time in a proper rewrite. If the score is below 40 percent, seriously consider whether this role is realistic for you right now. The one-line verdict will help, but the final call is yours.

## Example before and after

Let us say you are a final-year B.Tech CSE student applying for a back-end developer role at a mid-stage Bangalore startup. Your resume mentions Python, Flask, MySQL, and a couple of college projects. The JD asks for Python, Django, PostgreSQL, REST APIs, Docker, CI/CD, Git, Agile, microservices, AWS, unit testing, Redis, Celery, system design, and Linux.

**Gap report output (summarized):**

TOP 15 KEYWORDS FROM THE JD: Python, Django, PostgreSQL, REST APIs, Docker, CI/CD, Git, Agile, microservices, AWS, unit testing, Redis, Celery, system design, Linux

KEYWORDS ALREADY IN MY RESUME: Python, Git, REST APIs (mentioned once in project description), MySQL (close to PostgreSQL but not the same)

KEYWORDS MISSING -- TRUTHFULLY ADDABLE: Linux (you use Ubuntu daily but never listed it), unit testing (you wrote pytest tests in your Flask project but did not mention it), Agile (your final-year project used a Kanban board on Trello)

KEYWORDS MISSING -- SKILL GAP: Django (you know Flask, not Django), PostgreSQL (you used MySQL), Docker, CI/CD, AWS, Redis, Celery, microservices, system design

MATCH SCORE: 27%

ONE-LINE VERDICT: Significant skill gaps in infrastructure tools. Consider upskilling in Docker and Django before applying, or target roles that explicitly welcome Flask experience.

Without this report, you might have spent an hour rewriting your resume for a role where you match barely a quarter of the requirements. Now you know. You can either invest a few weeks learning Docker and Django, or find a role that fits your current stack.

## Common mistakes to avoid

**Treating the match score as a hard cutoff.** A 50 percent score does not mean you have a 50 percent chance of getting the job. Some keywords carry more weight than others. If you match on the primary language and framework but miss on nice-to-haves like Redis or Celery, you may still be competitive. Use the score as a rough guide, not a verdict.

**Confusing "truthfully addable" with "I could learn it in a weekend."** When the prompt says a keyword is truthfully addable, it means you have already used that skill but did not mention it on your resume. It does not mean you should list something you plan to learn by next Tuesday. If you have not used Docker, do not add Docker. Period.

**Running this prompt only once.** Your resume changes over time. You add projects, learn new tools, complete certifications. Run this prompt every time you are considering a new role. A JD that was a poor match three months ago might be a strong match today after you finished that Django tutorial and deployed a project on AWS.

**Ignoring the "skill gap" section.** The whole point of separating truthfully addable keywords from skill gaps is to give you a learning roadmap. If the same keywords keep showing up in the skill gap section across multiple JDs, that is the market telling you what to learn next. Listen to it.

**Skipping the company blurb.** Many freshers only paste the requirements bullet list. But the company introduction and role summary often contain domain-specific keywords like "fintech," "edtech," "healthtech," or "B2B SaaS" that an ATS might scan for. Paste everything.

## When not to use this prompt

Do not use this prompt if you have already decided to apply and just need your resume rewritten. In that case, skip straight to the tailoring prompt. This prompt is a diagnostic tool, not a rewriting tool. Running both back-to-back is fine, but if you are short on time and committed to the role, start with the rewrite.

Also skip this if the role is a mass-hiring campus drive at a service company like TCS, Infosys, or Cognizant. Those drives do not typically use ATS keyword filtering the way product companies do. They have their own aptitude and coding rounds, and your resume is often just a formality. Save this prompt for off-campus applications, startup roles, and product company postings where ATS filtering is a real barrier.

Finally, this prompt is not useful if you do not have a resume yet. It compares two documents. If you are still building your first resume, start with a resume-building prompt and come back to this one when you have something to compare.
