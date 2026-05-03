# KKIB - IB MYP Assessment Platform
 
## Project Overview
An interactive assessment platform for IB MYP4 (International Baccalaureate Middle Years Programme Year 4) students covering Mathematics, Science, and Individuals & Societies subjects.

**Live Site**: https://kaniib.vercel.app
**GitHub Repo**: https://github.com/kram1947/kkib

## Tech Stack
- React 18 + Vite (frontend)
- HTML5, CSS3 (for assessment files)
- Vercel (deployment)
- GitHub (version control)

## Project Structure
```
kkib/
├── index.html              # SPA entry point (served by Vercel)
├── package.json
├── vite.config.js
├── vercel.json             # Updated for React build
├── AGENTS.md              # Developer documentation (this file)
├── project_prompt.md      # E-learning portal development prompt
├── src/
│   ├── assets/             # Images, icons
│   ├── components/         # Reusable UI components (ProtectedRoute)
│   ├── context/            # React Context (AuthContext)
│   ├── pages/              # Page components (Home, Topics, Assessments)
│   │   ├── auth/            # Authentication pages (Login, AuthLayout)
│   │   └── Home.jsx        # Main landing page with all assessments
│   ├── styles/             # CSS variables, globals
│   ├── main.jsx            # React entry point
│   └── App.jsx             # Main app component with routing
├── public/
│   ├── assess/            # ALL assessment HTML files
│   │   ├── myp4-algebra-study.html
│   │   ├── myp4-algebra-assessment.html
│   │   ├── myp4-science-ions-isotopes-study.html     # NEW: Science study
│   │   ├── myp4-science-ions-isotopes-assessment.html  # NEW: Science quiz
│   │   ├── myp4-trigonometry-study.html
│   │   ├── myp4-trigonometry-assessment.html
│   │   ├── content/         # Source materials (PDF, ODT, ODS files)
│   │   └── ... (other assessments)
│   └── vite.svg
└── api/                   # Serverless API functions (Supabase auth)
```

### Key Files for Adding Content
- **src/pages/Home.jsx**: Add new topics to `topicsData` and assessments to `assessmentsData`
- **public/assess/**: Create new HTML files for study materials and assessments
- **AGENTS.md**: Update this file with new content information

## Assessment Types

### Mathematics (MYP4)
| File | Topics | Questions |
|------|--------|-----------|
| myp4-algebra-study.html | Expressions, Linear, Quadratics, Functions | Study |
| myp4-algebra-assessment.html | Algebra Assessment | 25 |
| myp4-trigonometry-study.html | SOHCAHTOA, Sine/Cosine Rules | Study |
| myp4-trigonometry-assessment.html | Trigonometry Assessment | 25 |
| myp4-sets-venn-probability.html | Sets, Venn Diagrams, Probability | 16 |
| myp4-sets-venn-probability-advanced.html | 4-Set Venn, Bayes' Theorem | 50 |
| myp4-statistics.html | Mean, Median, Box Plots | 25 |
| myp4-statistics-part4.html | Advanced Statistics | 25 |
| myp4-comprehensive.html | Full Curriculum Review | 45 |

### Science (MYP4)
| File | Topics | Questions |
|------|--------|-----------|
| myp4-science-ions-isotopes-study.html | Ions, Isotopes, Ionic Bonding | Study |
| myp4-science-ions-isotopes-assessment.html | Ions, Isotopes, Properties, Applications | 20 |

### Individuals & Societies (I&S)
| File | Topics | Questions |
|------|--------|-----------|
| myp4-ins-money-history-study.html | Barter to Bitcoin, OPVL Analysis | Study |
| myp4-ins-money-history.html | History of Money, Cryptocurrency | 20 |
| myp4-ins-supply-demand.html | Supply & Demand, Market Economics | 20 |

### Study Materials
| File | Description |
|------|-------------|
| myp4-algebra-study.html | Interactive study guide for Algebra (7 sections) |
| myp4-trigonometry-study.html | Interactive study guide for Trigonometry |
| myp4-science-ions-isotopes-study.html | Science: Ions, Isotopes, Ionic Bonding (5 sections) |
| myp4-ins-money-history-study.html | Interactive study guide for History of Money |
| myp4-ins-supply-demand-study.html | Study material for Supply & Demand |

## Adding New Content (Study Material + Assessment)

### Step 1: Create Study Material HTML
Follow the template in `public/assess/[topic]-study.html`:
- Include topic sections with interactive examples
- Use MathJax for LaTeX formulas: `\(formula\)` for inline, `\[formula\]` for display
- Add SVG diagrams for visual concepts
- Include real-world examples (preferably Swedish context)
- Add "NEW SECTION" markers if multiple topics in one file

### Step 2: Create Assessment HTML
Follow the template in `public/assess/[topic]-assessment.html`:
- 20-25 questions with 4 options each
- Include `topic` field in each question for section markers
- Add section transitions using `isNewTopic` logic
- Timer: 45-60 minutes (2700-3600 seconds)
- Question format:
```javascript
{id:1, topic:"TopicName", difficulty:1-4, text:"Question?", options:["A","B","C","D"], correct:0, explanation:"Why this is correct"}
```

### Step 3: Update React App (src/pages/Home.jsx)
1. Add to `topicsData` array (for topic filter chips):
```javascript
{ id: 'topic', name: 'Topic Name', icon: '🎯', color: 'rgba(..., 0.15)' }
```

2. Add to `assessmentsData` array (for assessment cards):
```javascript
{
  id: N,
  title: 'Topic - Study/Assessment',
  description: 'Description...',
  topics: ['Subtopic1', 'Subtopic2'],
  topicId: 'topic',
  questionCount: 20,
  time: '45',
  marks: 80,
  difficulty: 3,
  href: 'assess/myp4-[topic].html',
  category: 'myp4',
  badge: 'MYP4',
  icon: '📊',
  iconBg: 'geometry'
}
```

3. Update stats in the return statement:
```javascript
<StatCard icon="📚" value="14" label="Assessments" ... />
<StatCard icon="📝" value="276" label="Questions" ... />
<StatCard icon="⏱" value="360" label="Minutes" ... />
```

### Step 4: Commit & Push
```bash
# Stage changes
git add src/pages/Home.jsx public/assess/myp4-*.html

# Commit with descriptive message
git commit -m "Add [Subject]: [Topic] - Study material + Assessment"

# Push to GitHub
git push origin main
```

### Verification
1. Local testing: `npm run dev` → visit http://localhost:5173
2. Check topic appears in filter chips
3. Verify assessment card shows correctly
4. Test study material renders with MathJax

## Assessment Features
- Timer with warnings (warning at 5min, danger at 1min)
- Question navigator with current/answered states
- Section markers showing topic transitions ("📚 NEW SECTION: Topic Name")
- Multiple choice questions with immediate feedback (after submit)
- Progress tracking with visual progress bar
- PDF results download (jsPDF)
- LocalStorage for history
- Topic tags on each question for easy identification

## Design System

### Colors
```css
--primary: #6366f1 (indigo)
--secondary: #10b981 (emerald)
--warning: #f59e0b (amber)
--danger: #ef4444 (red)
--bg-dark: #0a0f1a
--bg-card: #111827
--text-primary: #f9fafb
--text-secondary: #9ca3af
```

### Typography
- Headings: Inter (600-800 weight)
- Code/Numbers: Fira Code (monospace)

## Study Material Template
```html
<!-- assessments/myp4-[topic]-study.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>IB MYP [Subject]: [Topic] - Study Material</title>
    <!-- Standard styling -->
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>[Topic]</h1>
        </header>
        
        <!-- Topic sections -->
        <section class="topic-section">
            <h2>Section Title</h2>
            <!-- Concepts, key terms, examples -->
        </section>
        
        <!-- Link to assessment -->
        <a href="myp4-[topic].html">Start Assessment →</a>
    </div>
</body>
</html>
```

## Source Materials
Located in `assessments/content/`:
- `.docx` files: Original handwritten notes
- `.txt` files: Transcribed content
- `.html` files: Raw content for reference

## Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/assessments/(.*)", "destination": "/assessments/$1" } // Ensure assessment files are served correctly
  ]
}
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License
Open source - See GitHub repository