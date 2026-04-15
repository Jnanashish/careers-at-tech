---
title: "Tailor your resume to any job description"
slug: "tailor-resume-to-jd"
category: "tailor-to-jd"
categoryLabel: "Tailor to a specific JD"
description: "The master prompt for rewriting your resume against a specific job posting without inventing experience."
forWho: "Any fresher applying to a specific role with a JD in hand"
timeMinutes: 5
difficulty: "Beginner"
worksWith: ["ChatGPT", "Claude", "Gemini"]
seoTitle: "Tailor Your Resume to Any Job Description | CareersAt.Tech"
seoDescription: "Free AI prompt that rewrites your resume to match a specific job description. Built for Indian freshers — no fake experience, no buzzwords."
featured: true
---

```
You are an expert tech recruiter who hires Indian freshers. I will paste (1) a
job description and (2) my current resume. I need you to tailor my resume to
the JD without inventing any experience I don't have.

Do this in order:
1. Extract the top 15 keywords and skills from the JD that an ATS would scan for.
2. Compare those keywords against my resume and tell me which are missing.
3. Rewrite my bullet points so the missing keywords appear naturally — but only
   where they are truthful based on what I have actually done.
4. Flag any hard requirement I don't meet so I can address it in a cover letter
   instead of faking it on my resume.
5. Write a 3-line professional summary for the top of my resume that uses the
   role title from the JD and 2 keywords from step 1.

Rules:
- Never invent metrics, skills, tools, or companies I haven't mentioned.
- Keep the tone confident but honest. I'm a fresher, not a senior engineer.
- Output plain text only. No markdown, no tables, no emojis.

Here is the job description:
[PASTE JD HERE]

Here is my current resume:
[PASTE RESUME HERE]
```

## Who this is for

If you are a final-year B.Tech student or a recent graduate in India sitting in front of a job posting thinking "my resume says nothing about what they want," this prompt is for you.

Maybe you built a few projects during college. Maybe you did one internship or none at all. You have a resume, but it was written for a general audience, and the JD you are looking at asks for specific frameworks, methodologies, or tools you have used but never named on your resume. Or perhaps you are applying through an off-campus portal like Naukri, Instahyre, or LinkedIn, and you know the first filter is an ATS that will never see your resume unless the right keywords are present.

This prompt is not for someone who wants to fabricate experience. It will not create fictional internships at TCS or invent a React project you never built. It is designed for the honest fresher who has done real work -- in college labs, hackathons, personal projects, or freelance gigs -- but has not described that work in the language a recruiter expects. The gap is not in your experience. It is in your vocabulary.

If you have a JD in hand and a resume ready, you have everything you need. Five minutes with this prompt can close the gap between what you have done and how you describe it.

## How to use it

**Step 1: Collect your inputs.**
Open the job posting and copy the full text of the job description. Do not summarize it or pick out the parts you think matter. The prompt needs the complete JD so it can identify keywords you might miss. Then open your current resume in whatever format you have -- a Google Doc, a Word file, a plain text draft. Copy the full text.

**Step 2: Paste and run.**
Copy the prompt above into ChatGPT, Claude, or Gemini. Replace `[PASTE JD HERE]` with the full job description and `[PASTE RESUME HERE]` with your full resume text. Hit send. The AI will first extract keywords, then compare, then rewrite. Do not interrupt the process or send follow-up messages until it finishes.

**Step 3: Review and verify.**
Read every rewritten bullet point. If the AI added a keyword you have not actually used or a metric you cannot verify, remove it. The prompt is designed to avoid fabrication, but no AI is perfect. You are the final filter. Once you are satisfied, copy the rewritten bullets and summary into your resume document and save a version named for this specific role, like "Resume_Infosys_SDE_2026.pdf."

## Example before and after

Here is what a real transformation looks like when you use this prompt honestly.

**Before (original resume bullet):**
"Made a website for college fest using HTML and JavaScript. It had a registration form and event schedule."

**After (tailored to a front-end developer JD that mentions React, responsive design, and REST APIs):**
"Built a responsive event registration portal for a college fest serving 500+ students, using HTML5 and vanilla JavaScript with form validation and a dynamic event schedule."

Notice what changed and what did not. The word "responsive" was added because the student did build a mobile-friendly layout -- they just never used that word. The number "500+" was already known to the student and verifiable from college records. The phrase "REST APIs" from the JD was not added because this project did not use one. That is the discipline this prompt enforces.

**Before (professional summary):**
"I am a hardworking and passionate B.Tech student looking for opportunities to grow."

**After (tailored to a front-end developer role at a mid-size product company):**
"Final-year B.Tech CSE student with hands-on experience in responsive web development and JavaScript. Built 3 full-stack projects including a student portal used by 500+ users. Seeking a front-end developer role where I can ship user-facing features in a product-driven team."

The summary now names the role, includes keywords from the JD, and replaces vague adjectives with concrete details. No lies. No inflation. Just clearer language.

## Common mistakes to avoid

**Pasting a partial JD.** If you only paste the "requirements" section and skip the "responsibilities" section, the prompt misses half the keywords. Always paste the full posting, including the company blurb at the top. Some keywords hide there.

**Accepting every edit without reading.** AI sometimes adds a word that is technically adjacent to what you did but not accurate. If the JD says "Kubernetes" and your project used Docker Compose, the prompt might slip in a container orchestration reference that overstates your experience. Read every line.

**Using the same tailored resume for five different roles.** The entire point of this prompt is that each JD is different. If you apply to a React role at Flipkart and a Python role at Razorpay with the same tailored resume, you have missed the point. Run the prompt once per JD.

**Ignoring the "flag" section.** When the prompt tells you a hard requirement is missing, do not just skip that information. Use it. Write a one-line note in your cover letter or email body that acknowledges the gap and explains what you are doing about it. Recruiters respect honesty more than silence.

**Over-stuffing keywords.** If the prompt gives you 15 keywords and you try to force all 15 into a one-page resume, it will read like keyword spam. Aim for 8 to 10 naturally placed keywords. Quality over quantity.

## When not to use this prompt

Do not use this prompt if you do not have a specific JD. If you are writing a general-purpose resume for mass applications during placement season, this is the wrong tool. You need a general resume prompt instead, one that highlights your strongest skills without targeting a single role.

Also skip this prompt if the JD is for a role that requires 3+ years of experience and you are a fresher with zero internships. Tailoring your resume will not close a gap that large. You would be better off finding roles that explicitly welcome freshers or graduates, which is what most service companies like Infosys, Wipro, and TCS offer during campus drives. Save this prompt for roles where you meet at least 60 percent of the stated requirements and need help surfacing the right language.

Finally, do not use this prompt as a substitute for actually learning a skill. If a JD asks for AWS and you have never touched a cloud console, no amount of resume tailoring will help you survive the technical round. Learn first, then tailor.
