

# AI Resume Builder — Implementation Plan

## Overview
A premium, portfolio-grade SaaS resume builder with deterministic ATS scoring, template switching, gated build-track system, and proof validation. All data persisted in localStorage — no backend required.

---

## Phase 1: Design System & Layout Foundation
- Set up the premium design system: off-white background (#F7F6F3), deep red accent (#8B0000), serif headings, sans-serif body, strict 8/16/24/40/64px spacing scale, max 4 colors
- Create the base layout components: top bar, main workspace, and reusable page shells
- Flat design only — no gradients, glassmorphism, or neon

## Phase 2: Routing & Build Track Gating
- Set up all required routes: `/`, `/builder`, `/preview`, `/proof`, and `/rb/01-problem` through `/rb/08-ship` plus `/rb/proof`
- Build the gated step system: sequential progression only, no skipping, redirect to current unlocked step on direct URL access
- Each `/rb` step page has: top bar with step indicator, 70/30 layout (workspace + build panel), artifact upload gating, and next button logic
- Artifacts stored as `rb_step_X_artifact` in localStorage

## Phase 3: Home Page
- Clean minimal landing page with headline "Build a Resume That Gets Read."
- Single CTA button → `/builder`

## Phase 4: Resume Builder (`/builder`)
- Two-column layout: form on left, live preview on right
- Accordion sections for: Personal Info, Summary, Education (multiple), Experience (multiple with bullet arrays), Projects (with description counter, tag input for tech stack, URLs), Skills (3 categories with chip input, duplicate prevention, counts, and "Suggest Skills" button)
- Auto-save all changes to `resumeBuilderData` in localStorage
- Safe parsing with fallback to empty defaults on corruption
- Live preview updates as user types, hiding empty sections

## Phase 5: ATS Scoring System
- Deterministic scoring (0–100) based on defined rules (name, email, summary length, experience, education, skills count, projects, phone, LinkedIn, GitHub, action verbs in summary)
- Circular progress indicator on `/preview` with color states: Red (0–40), Amber (41–70), Green (71–100)
- Live score updates
- Up to 5 improvement suggestions displayed below score

## Phase 6: Bullet Discipline Guidance
- Inline advisory suggestions in Experience and Projects sections
- Detect missing action verbs and missing measurable impact
- Non-blocking — advisory only

## Phase 7: Template System
- 3 templates: Classic (single column, serif, horizontal rules), Modern (two-column, sidebar), Minimal (single column, no borders, generous whitespace)
- Template switching changes layout only — never changes data or score
- Persist selected template in `resumeTemplate`

## Phase 8: Color Theme Picker
- 5 accent themes: Teal, Navy, Burgundy, Forest, Charcoal
- Applied via CSS variable
- Persist in `resumeTheme`

## Phase 9: Export System (`/preview`)
- "Print / Save as PDF" using browser print with clean styling rules (white background, hidden UI, no cut-offs, no colored backgrounds)
- "Copy Resume as Text" — structured plain text copied to clipboard
- Pre-export validation warning if missing name or no projects/experience (non-blocking)

## Phase 10: Proof System & Shipped Status
- `/rb/proof` page with 8-step completion overview, inputs for Lovable/GitHub/Deploy links with URL validation
- "Copy Final Submission" button with formatted output
- Shipped status badge logic: all 8 steps complete + all tests passed + all 3 proof links valid
- Calm "Project 3 Shipped Successfully." message — no confetti or animations

## Architecture Principles
- Central state object in localStorage, separate from presentation
- Templates consume the same state
- Score computed from state only — no duplication
- Graceful handling of corrupted localStorage
- Mobile responsive throughout
- Zero console errors

