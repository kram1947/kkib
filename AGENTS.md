# KaniMath - IB MYP Assessment Platform

## Project Overview
An interactive assessment platform for IB MYP4 (International Baccalaureate Middle Years Programme Year 4) students covering Mathematics and Individuals & Societies subjects.

**Live Site**: https://kaniib.vercel.app

## Tech Stack
- React 18 + Vite (frontend)
- HTML5, CSS3 (for assessment files)
- Vercel (deployment)
- GitHub (version control)

## Project Structure
```
mathapp/
├── index.html              # SPA entry point (served by Vercel)
├── package.json
├── vite.config.js
├── vercel.json             # Updated for React build
├── src/
│   ├── assets/             # Images, icons
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── styles/             # CSS variables, globals
│   ├── utils/              # Helper functions
│   └── App.jsx             # Main app component with routing
├── assessments/            # UNCHANGED - all existing .html files
│   ├── myp4-*.html
│   └── content/
└── public/                 # Static assets
    └── vite.svg
```

## Assessment Types

### Mathematics (MYP4)
| File | Topics | Questions |
|------|--------|-----------|
| myp4-sets-venn-probability.html | Sets, Venn Diagrams, Probability | 16 |
| myp4-sets-venn-probability-advanced.html | 4-Set Venn, Bayes' Theorem | 50 |
| myp4-statistics.html | Mean, Median, Box Plots | 25 |
| myp4-statistics-part4.html | Advanced Statistics | 25 |
| myp4-comprehensive.html | Full Curriculum Review | 45 |

### Individuals & Societies (I&S)
| File | Topics | Questions |
|------|--------|-----------|
| myp4-ins-money-history.html | History of Money, Cryptocurrency | 20 |
| myp4-ins-supply-demand.html | Supply & Demand, Market Economics | 20 |

### Study Materials
| File | Description |
|------|-------------|
| myp4-ins-money-history-study.html | Interactive study guide for History of Money |
| myp4-ins-supply-demand.html | Study material for Supply & Demand |

## Adding New Assessments

### Approach 1: HTML Assessments (Maintains Backward Compatibility)
Existing assessment files (.html) continue to work as-is. To add new HTML assessments:

1. **Create Assessment File**
Copy the assessment structure:
```html
<!-- assessments/myp4-[topic].html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Standard meta tags -->
    <title>MYP4 [Subject] - [Topic]</title>
    <!-- Include fonts and jsPDF -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- CSS styles -->
</head>
<body>
    <!-- Sidebar with timer, progress, nav -->
    <!-- Main content with questions -->
    <!-- JavaScript for quiz logic -->
</body>
</html>
```

2. **Update index.html** (React App)
Add assessment card to the React application:
```html
<a href="assessments/myp4-[topic].html" class="assessment-card" data-category="myp4" data-topics="[topic]">
    <!-- Card content -->
</a>
```

Update stats in the React app:
- Assessments count
- Questions count
- Minutes count

### Approach 2: React Assessments (Future Migration Path)
For new development, assessments can be created as React components:
1. Create a new component in `src/pages/assessments/`
2. Add route in `src/App.jsx`
3. Link from the assessments page

Note: Existing HTML assessments will continue to work unchanged regardless of approach chosen.

### 3. Commit & Deploy
```bash
git add .
git commit -m "Add [topic] assessment"
git push origin main
```

## Assessment Features
- Timer with warnings
- Question navigator
- Multiple choice, short answer, essay questions
- Progress tracking
- PDF results download
- LocalStorage for history

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