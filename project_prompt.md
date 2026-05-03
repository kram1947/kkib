# KKIB E-Learning Portal Development Prompt

Uplevel KKIB into a modern, full-featured e-learning portal for IB students.

## CONTEXT
KKIB is an IB MYP assessment platform currently using React+Vite with vanilla HTML assessments. The platform covers Mathematics (Algebra, Trigonometry, Statistics, Probability) and Individuals & Societies (Economics, History) based on Haese curriculum.

## OBJECTIVES
1. Transform static HTML assessments into interactive React components
2. Create a modern, clean UI with clear subject/topic navigation
3. Add user progress tracking with database persistence
4. Build comprehensive study material pages with interactive elements
5. Expand to cover MYP5 and DP (Diploma Programme) levels

## TECH STACK REQUIREMENTS
- **Frontend**: React 18+ with Vite
- **Styling**: Tailwind CSS or styled-components (clean, modern design)
- **Database**: Supabase (PostgreSQL + Auth + Real-time)
- **State Management**: React Context or Zustand
- **Routing**: React Router v6
- **Math Rendering**: MathJax or KaTeX for LaTeX formulas
- **Charts**: Recharts or Chart.js for progress visualization
- **Deployment**: Vercel

## CORE FEATURES TO IMPLEMENT

### A. SUBJECT & TOPIC ORGANIZATION
- Clean hierarchical structure: Subject → Level (MYP4/MYP5/DP) → Topic → Study Material + Assessment
- Topics page with visual cards showing: topic name, description, difficulty, completion status
- Each topic has: Study Material (interactive guide), Practice Questions, Full Assessment
- Quick navigation sidebar/header with progress indicators

### B. INTERACTIVE STUDY MATERIALS
- Convert existing HTML study guides to React components
- Interactive examples with step-by-step solutions
- Math formula rendering with LaTeX
- Interactive graphs/calculators (desmos API or custom canvas)
- Downloadable PDF summaries
- Bookmark/save feature for important sections

### C. ASSESSMENT SYSTEM
- Timed assessments with countdown timer
- Multiple question types: MCQ, short answer, matching, drag-drop
- Section markers showing topic transitions
- Immediate feedback after each question (practice mode)
- Full assessment mode with results at end
- Question bank system (reusable questions, randomized order)
- Difficulty levels with visual indicators

### D. USER DASHBOARD
- Progress overview: subjects completed, time spent, average scores
- Streak tracking and gamification elements
- Weak areas identification with recommended study materials
- Achievement badges for milestones
- Study calendar/reminders

### E. ANALYTICS & REPORTING
- Detailed performance by topic and subtopic
- Time spent per question analysis
- Comparison with cohort (anonymous benchmarks)
- Downloadable PDF report cards
- Parent/teacher view (optional, with consent)

### F. AUTHENTICATION & USER MANAGEMENT
- Supabase Auth (email/password + OAuth options)
- User profiles with grade level and subjects
- Data export functionality (GDPR compliance)
- Optional: Class/teacher integration for school usage

## DATABASE SCHEMA (Supabase)
```
- users (id, email, name, grade_level, created_at)
- subjects (id, name, level, description)
- topics (id, subject_id, name, order_index, difficulty)
- study_materials (id, topic_id, content_json, updated_at)
- assessments (id, topic_id, title, time_limit, total_marks)
- questions (id, assessment_id, question_text, type, options_json, correct_answer, explanation, difficulty)
- attempts (id, user_id, assessment_id, started_at, completed_at, score, answers_json)
- progress (user_id, topic_id, status, last_accessed, time_spent)
```

## UI/UX REQUIREMENTS
- Clean, minimal design with IB-appropriate aesthetics
- Dark mode support
- Responsive: mobile, tablet, desktop
- Accessibility: WCAG 2.1 AA compliance
- Loading states and error boundaries
- Smooth animations for question transitions

## MIGRATION PLAN
1. Set up Supabase project with auth and database schema
2. Create new React component structure matching the schema
3. Migrate HTML assessments to React components (start with Algebra)
4. Build study material pages with interactive elements
5. Implement dashboard and analytics
6. Add remaining subjects (expand beyond current MYP4)
7. Test, optimize, deploy

## EXISTING ASSETS TO PRESERVE
- All assessment content (questions, explanations)
- Study material content (already well-structured)
- Interactive elements (canvas visualizations in study materials)
- Section/topic markers in assessments
- MathJax integration for formulas

## DELIVERABLES
1. Fully functional React application with all features
2. Supabase database with seed data from existing content
3. Comprehensive README with setup instructions
4. Updated AGENTS.md with new development commands
5. Deployment configuration for Vercel

## CONSTRAINTS
- Keep existing assessment content verbatim (questions, explanations)
- Maintain Haese curriculum alignment
- Preserve section markers showing topic transitions
- Mobile-first responsive design
- All user data must be properly secured with RLS (Row Level Security)

---

**Start by setting up the Supabase backend and creating the new component folder structure. Migrate the Algebra assessment and study material first as a proof-of-concept before expanding to other subjects.**
