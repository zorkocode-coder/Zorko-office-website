# Zorko-office-website

A separate React/Vite application for the company, workplace and people behind ZORKO. The existing food/franchise application is unchanged by this project.

## Local preview

Use Node.js 20.19 or newer. From this directory run `npm ci`, then `npm run dev`, and open http://127.0.0.1:5174/.

`npm run build` creates `dist/` with server-rendered content and HTML entry points for 19 routes. `npm run preview` serves that build on port 4174. Production hosting needs a fallback to `index.html` for any routes not represented by an entry point. Run `node scripts/check-content.mjs` after building to check route content, assets, internal links and content counts.

## Content and assets

The source is the user-supplied **ZORKO Spotlight, November 2026**, 64-page magazine, and the accompanying corporate website vision. Photography is extracted from that PDF; clean photographs and crops are used instead of reproducing magazine page layouts. Sixteen higher-resolution department photographs also come from the retained original ZORKO website, with source URLs recorded in `scripts/site-photo-provenance.json`. No AI-generated office, employee or founder images are used.

- `src/data.js`: company content, timeline, brand information, contact details and journal.
- `src/images.json`: curated photo directory with original magazine page references.
- `public/media/`: local photographs, crops and licensed fonts retained from the existing project.
- `scripts/extract-magazine.py`, `prepare-photography.py`, `refine-photography.py`: extraction/cropping provenance. Run with the bundled Python runtime plus Pillow and pypdf if refreshing the supplied PDF.

Network figures are explicitly attributed to the November 2026 magazine. Leadership titles use that edition. Department descriptions are editorial summaries of the supplied directory, not employee job descriptions. Journal entries are adaptations, with source attribution on each story.

## Animation

Short brand introduction, masked hero reveal, requestAnimationFrame parallax, IntersectionObserver section reveals, a sticky horizontal office walkthrough, animated timeline panels and a real-photo wordmark assembly. Mobile and reduced-motion users get a vertical office tour. No animation dependencies are needed.

## Functional boundaries

The site includes company, founders, office, people, culture, brands, recognition, careers, contact, journal and privacy pages, plus seven journal entries. Department and journal filters, brand tabs, keyboard-operable timeline, full-screen navigation and image galleries work locally.

The Careers portal includes culture photography, 15 magazine benefits grouped by tenure, searchable team exploration, employee recognition, office imagery, FAQs and an application enquiry form. It validates required fields and prepares a reviewable email draft to the company support address; it does not claim that vacancies are open or submit/store candidate data. The HR email, current openings, confirmation of current benefits, company legal disclosures, social profile URLs and corporate analytics/CMS remain items for the business to supply before a public launch. The contact address comes from magazine page 64. No messages are sent and nothing is deployed by running the local preview.

## Official website editorial additions

The Journal includes three clearly labelled adaptations of the official ZORKO team, careers and journey pages, with source links on every adapted article. Magazine stories retain their own attribution. The homepage, office and culture pages feature workplace stories; Journal search, category filters and related reading connect the seven articles. The original ZORKO logo is retained in the header, footer, introductory reveal and browser icon.

## People directory

The People page includes five management profiles, separate KMP Heads and SMP Heads sections, and 17 departmental sections with search and filters. All 24 section photographs are distinct. Individual portraits, KMP/SMP photographs and 16 departmental pictures come from the original team page; the warehouse photograph comes from the magazine. Management names and roles were checked against `https://zorko.in/our-team/` on 2 November 2026. Lead images for Careers, Culture and Contact differ, and article thumbnails can have a separate lead photograph for the full story.
