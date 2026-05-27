---
title: "Build a one-page internship resume from scratch"
slug: "internship-resume-builder"
category: "intern"
categoryLabel: "Internship resume"
description: "Turn a raw brain-dump of your degree, projects, and coursework into a clean, ATS-safe one-page internship resume — no fabricated experience."
forWho: "B.Tech and B.Sc students applying to their first internship with no existing resume"
timeMinutes: 5
difficulty: "Beginner"
worksWith: ["ChatGPT", "Claude", "Gemini"]
seoTitle: "Build a One-Page Internship Resume From Scratch | CareersAt.Tech"
seoDescription: "Free AI prompt that builds a one-page ATS-safe internship resume for Indian B.Tech students. No fake experience, no Experience section if you have none."
featured: false
---

```
You are an experienced campus placement coach who has helped Indian B.Tech and
B.Sc freshers land internships at companies like Razorpay, Flipkart, Swiggy,
Zomato, and smaller product startups. I will paste a raw, unstructured
brain-dump about myself. Build me a one-page internship resume in plain text.

Output rules (strict):
- Plain text only. No markdown bold, no asterisks, no tables, no emojis.
- Single column. ATS-safe. No graphics, no boxes, no horizontal lines made of
  dashes or equals signs (those break ATS parsers).
- Total length must fit on one A4 page when pasted into a doc with default
  margins (roughly 500 to 600 words including section headers).
- Use these sections in this exact order:
  1. Name and contact (name, phone, email, city, LinkedIn URL, GitHub URL)
  2. Summary (2 to 3 lines, role target + strongest skills + year of study)
  3. Education (college name, degree, branch, graduation year, CGPA only if
     it is 7.5 or higher — otherwise skip the CGPA line; include 12th and
     10th board percentages only if I provided them)
  4. Projects (2 to 4 projects, each with: project name, tech stack on one
     line, then 2 to 3 bullets describing what I built)
  5. Skills (grouped: Languages, Frameworks/Libraries, Tools, Databases —
     include only groups I actually have content for)
  6. Achievements (hackathons, coding contest ranks, scholarships, papers,
     responsibilities — only include if I mentioned at least one)
  7. Coursework (one line, comma-separated, only the courses relevant to my
     target role; skip section if I gave less than 4 relevant courses)

CRITICAL: Do NOT add an "Experience" or "Work Experience" or "Internships"
section if I have not mentioned any internship or work. An empty Experience
section signals fresher status and looks worse than no section at all. The
Projects section carries the weight.

Hard rules:
- Do not invent any project, internship, company, CGPA, percentage, certificate,
  hackathon rank, or skill that is not in my brain-dump.
- Do not pad bullets with vague phrases like "gained exposure to" or "worked
  with team to deliver". Every bullet must describe a concrete thing I built
  or implemented.
- If I gave you numbers, preserve them. If I did not give numbers, do not
  invent any — write the bullet without metrics.
- Use strong action verbs at the start of every project bullet (Built,
  Implemented, Designed, Shipped, Engineered).

Here is my raw info — degree, year, college, projects, coursework, skills,
anything I have done. It may be unstructured. Organize it for me:
[PASTE BRAIN-DUMP HERE]
```

## Who this is for

This prompt is for Indian B.Tech and B.Sc students sitting at midnight before the application deadline for a summer internship, with no resume, no template, and a half-empty Google Doc titled "Resume_v1." If you have never built a real resume before and the only template you found online is for someone with 5 years of experience, this prompt closes that gap in under ten minutes.

It is also for students who have a messy, three-page resume cobbled together from a Canva template, an SOP, and some LinkedIn summary text. Most fresher resumes fail because they include the wrong sections (an empty "Experience" section, a "Hobbies" section listing "reading and music"), use formatting that breaks ATS parsers (two columns, icons, photos), or pad content to fill a page they should have left at three-quarters full.

This prompt is opinionated. It will not give you an Experience section if you have no internships. It will not include your CGPA if it is below 7.5. It will not invent metrics. These are the same rules a placement coach at IIT or NIT would enforce, applied to your specific brain-dump.

It works for CSE, IT, ECE, EEE, mechanical, and most engineering branches. It also works for B.Sc Computer Science, B.Sc IT, BCA, and similar programs. As long as you have at least two real projects and some technical skills, you have enough raw material.

## How to use it

**Step 1: Brain-dump everything.** Open a blank doc. Type out, in any order: your full name, phone number, email, city, college name, degree, branch, graduation year, CGPA if you know it, every project you have built (name, what it does, what tech you used, your specific contribution if it was a team project), every technical skill you have actually used (not just heard of), any hackathon, coding contest, scholarship, club role, or paper, and the courses you have taken that are relevant to the role you want. Do not format. Just dump.

**Step 2: Decide your target role.** Add one line at the top of your brain-dump: "Target role: Frontend Developer Intern" or "Target role: Data Analyst Intern." This shapes how the AI writes the summary and which coursework to highlight.

**Step 3: Paste and run.** Copy the prompt into ChatGPT, Claude, or Gemini. Replace `[PASTE BRAIN-DUMP HERE]` with everything you wrote in step 1 and 2. Send. You will get a structured resume back in plain text.

**Step 4: Paste into a doc and review.** Open Google Docs or Word, paste the output, set the font to Calibri or Inter at 10 to 11pt, set margins to 0.7 inch. Check that everything fits on one page. If it spills over, cut your weakest project bullet, not your strongest skill.

**Step 5: Export as PDF and name it sensibly.** Export with a clean filename like "Rahul_Sharma_Frontend_Intern_2026.pdf". Never upload as Resume.docx or Final_Final_v3.pdf.

## Example before and after

**Before (raw brain-dump from a student):**
"my name is Priya Nair, i am from kochi, in final year of btech cse at govt engineering college thrissur, graduating 2026, cgpa 8.4. phone 98xx phone email priya@gmail.com github priyanair. projects - made an expense tracker app in react and firebase with login and charts, made a python script that scrapes job listings from naukri and sends them to my email daily, built a chat app in node and socket.io for hackathon at college won 2nd prize. skills - python js react node mongodb sql html css git linux. did coursework in dbms oops data structures algorithms operating systems web tech. want frontend intern role."

**After using this prompt:**

```
Priya Nair
98xxxxxxxx | priya@gmail.com | Kochi | linkedin.com/in/priyanair | github.com/priyanair

Summary
Final-year B.Tech CSE student targeting a Frontend Developer Intern role.
Hands-on experience with React, Firebase, and Node.js across three shipped
projects including a hackathon-winning real-time chat app.

Education
Government Engineering College, Thrissur
B.Tech in Computer Science and Engineering, 2026
CGPA: 8.4

Projects
Expense Tracker Web App | React, Firebase, Chart.js
Built a full-stack expense tracking app with email-password authentication.
Implemented per-user data isolation using Firestore security rules.
Designed a monthly spending dashboard with category-wise chart visualizations.

Naukri Job Scraper | Python, BeautifulSoup, smtplib
Built a daily Python script that scrapes new job listings matching custom
filters and sends a digest email.
Scheduled the script via cron on a personal Linux machine.

Real-Time Chat App | Node.js, Socket.io, Express
Engineered a multi-room chat application with persistent message history.
Won 2nd prize at the college-level hackathon.

Skills
Languages: Python, JavaScript, SQL, HTML, CSS
Frameworks/Libraries: React, Node.js, Express, Socket.io
Tools: Git, Linux
Databases: MongoDB, Firebase Firestore

Coursework
Data Structures, Algorithms, DBMS, OOP, Operating Systems, Web Technologies
```

Notice what the prompt did not do. It did not add an Experience section. It did not invent user counts for the expense tracker. It did not claim the chat app was "deployed to production" because Priya never said so. It did not include her 10th or 12th percentages because she did not provide them. Every line is honest and earned.

## Common mistakes to avoid

**Skipping the brain-dump and pasting one paragraph.** If your input is "I am a CSE student who built a React app," the output will be a generic, thin resume. The richer the brain-dump, the sharper the resume. Spend 15 minutes on the brain-dump. It is the highest-leverage time you will spend.

**Letting the AI invent a metric to "make the bullet stronger."** The prompt forbids this, but some students paste back the output and ask the AI to "add some numbers to make it look better." Do not do this. Made-up metrics get caught in interviews. A bullet without a number is better than a bullet with a fake one.

**Including hobbies, declarations, or photographs.** Indian college templates often have these. Strip them out. No recruiter at a tech company cares that your hobby is "playing cricket" or that you "hereby declare that the above information is true." A photograph on a resume is a red flag for most modern ATS systems.

**Making CGPA below 7 visible.** The prompt already skips CGPA below 7.5. If you manually add it back, you are giving the screener a reason to drop you before they read your projects. Lead with your projects. CGPA can come up later.

**Padding to two pages.** A one-page resume is not a limitation, it is a target. If your one-page resume looks half-empty, that means your projects need more substance or you need to build one more. The answer is not to stretch the formatting.

## When not to use this prompt

Do not use this prompt if you already have a working one-page resume and just need to tweak it for a specific JD. Use the tailor-to-JD prompt instead. This one builds from scratch and will rewrite parts you may not want rewritten.

Also skip this if you have one or more real internships completed. Once you have actual work experience, the structure changes — Experience comes before Projects, and bullet weight shifts. This prompt deliberately omits the Experience section, so it is the wrong tool for that case.

Finally, do not use this prompt if your brain-dump only contains tutorial-followalong projects (the to-do app, the weather app from a YouTube series, the Netflix clone). The resume will be technically correct but will not impress a Razorpay or Swiggy screener. Build one original project first, then come back.
