

# Phases 4-10 Implementation Plan

## What's Already Built (Phases 1-3)
- Design system (off-white, deep red accent, serif/sans-serif fonts, spacing scale)
- Routing with gated build track (`/rb/01` through `/rb/08` + `/rb/proof`)
- Home page with CTA
- Types, storage utilities, TopBar component

## What We're Building Now

---

### Phase 4: Resume Builder (`/builder`)

**New files:**
- `src/components/builder/PersonalInfoSection.tsx` -- Name, email, phone, location, LinkedIn, GitHub fields
- `src/components/builder/SummarySection.tsx` -- Textarea with character guidance
- `src/components/builder/EducationSection.tsx` -- Add/remove multiple entries (institution, degree, field, dates)
- `src/components/builder/ExperienceSection.tsx` -- Add/remove entries with dynamic bullet arrays + bullet discipline hints
- `src/components/builder/ProjectsSection.tsx` -- Add/remove entries with description counter (200 char max), tag input for tech stack, optional URLs + bullet guidance
- `src/components/builder/SkillsSection.tsx` -- 3 categories (technical, soft, tools) with chip input, duplicate prevention, counts, and "Suggest Skills" button with simulated 1s loading
- `src/components/builder/ResumePreview.tsx` -- Live preview panel rendering resume data, hiding empty sections
- `src/components/builder/ChipInput.tsx` -- Reusable tag/chip input (Enter to add, X to remove)

**Modified files:**
- `src/pages/Builder.tsx` -- Two-column layout: left = accordion form sections, right = live preview. Uses `useState` initialized from `getResumeData()`, auto-saves to localStorage on every change via `useEffect`.

---

### Phase 5: ATS Scoring System

**New files:**
- `src/lib/scoring.ts` -- Pure function `calculateScore(data: ResumeData): { score: number; suggestions: string[] }` implementing the deterministic rules (+10 name, +10 email, +10 summary>50chars, +15 experience with bullets, +10 education, +10 five skills, +10 project, +5 phone, +5 LinkedIn, +5 GitHub, +10 action verbs in summary). Capped at 100. Returns up to 5 suggestions.
- `src/components/preview/ScoreCircle.tsx` -- Circular SVG progress indicator with color states (red 0-40, amber 41-70, green 71-100)
- `src/components/preview/SuggestionsList.tsx` -- Renders improvement suggestions

**Modified files:**
- `src/pages/Preview.tsx` -- Full preview page with template-rendered resume, score circle, suggestions, and export controls

---

### Phase 6: Bullet Discipline Guidance

Built directly into `ExperienceSection.tsx` and `ProjectsSection.tsx` (Phase 4). Each bullet input checks:
- Does it start with an action verb? If not, show subtle hint: "Start with a strong action verb."
- Does it contain a number, %, "k", or "X"? If not, suggest: "Add measurable impact."

These are inline, non-blocking advisory messages rendered below each bullet input.

---

### Phase 7: Template System

**New files:**
- `src/components/templates/ClassicTemplate.tsx` -- Single column, serif headers, horizontal rules
- `src/components/templates/ModernTemplate.tsx` -- Two-column with left sidebar (contact + skills), accent-colored sidebar
- `src/components/templates/MinimalTemplate.tsx` -- Single column, no borders, generous whitespace
- `src/components/templates/TemplateRenderer.tsx` -- Takes `ResumeData` + `TemplateName` and renders the correct template

**Modified files:**
- `src/pages/Preview.tsx` -- Add template switcher (3 buttons/tabs)
- `src/components/builder/ResumePreview.tsx` -- Use TemplateRenderer for builder live preview

---

### Phase 8: Color Theme Picker

**Modified files:**
- `src/pages/Preview.tsx` -- Add theme picker (5 color swatches). On select, set `data-theme` attribute on the resume container and persist via `saveTheme()`.

The CSS variables for themes are already defined in `index.css` (lines 110-114). Templates will use `hsl(var(--resume-accent))` for accent colors.

---

### Phase 9: Export System

**Modified files:**
- `src/pages/Preview.tsx` -- Add two buttons:
  1. "Print / Save as PDF" -- calls `window.print()`. Print CSS already exists in `index.css`; will add more specific rules to hide UI and style the resume cleanly.
  2. "Copy Resume as Text" -- generates structured plain text and copies to clipboard.
  
- Add pre-export validation: if missing name or no projects/experience, show a non-blocking warning toast.
- `src/index.css` -- Extended `@media print` rules for clean resume output (no colored backgrounds, no cut-offs, avoid page breaks inside sections).

---

### Phase 10: Proof System & Shipped Status

**Modified files:**
- `src/pages/Proof.tsx` -- Full proof page (currently placeholder) mirroring `/rb/proof` but for the main app flow. Shows completion checklist, proof links, and shipped status.

The `/rb/proof` page (`BuildProof.tsx`) is already fully built. The `/proof` route will share similar logic.

---

## Technical Details

### State Flow
All components read from and write to a single `ResumeData` object in the Builder page state. The Builder page initializes from `getResumeData()` and auto-saves on changes. Preview and Proof pages also read from `getResumeData()` on mount.

### File Count Summary
- **New files:** ~12 component files + 1 utility
- **Modified files:** ~4 pages + index.css

### Component Tree (Builder Page)
```text
Builder
+-- TopBar
+-- Left Column (Accordion)
|   +-- PersonalInfoSection
|   +-- SummarySection
|   +-- EducationSection (with bullet guidance)
|   +-- ExperienceSection (with bullet guidance)
|   +-- ProjectsSection (with bullet guidance)
|   +-- SkillsSection (with ChipInput)
+-- Right Column
    +-- TemplateRenderer
        +-- ClassicTemplate | ModernTemplate | MinimalTemplate
```

### Component Tree (Preview Page)
```text
Preview
+-- TopBar
+-- Controls (template switcher, theme picker, export buttons)
+-- ScoreCircle
+-- SuggestionsList
+-- TemplateRenderer (print target)
```

### Scoring Function (Pure)
```text
calculateScore(data) -> { score: number, suggestions: string[] }
  +10 if name present
  +10 if email present
  +10 if summary > 50 chars
  +15 if >= 1 experience with >= 1 bullet
  +10 if >= 1 education
  +10 if >= 5 total skills
  +10 if >= 1 project
  +5 if phone present
  +5 if LinkedIn present
  +5 if GitHub present
  +10 if summary contains action verbs
  Cap at 100
```

