# IB MYP Assessment Platform

<p align="center">
  <img src="https://img.shields.io/badge/IB-MYP4-6366f1?style=for-the-badge" alt="IB MYP4">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/badge/License-Open%20Source-green?style=for-the-badge" alt="License">
</p>

An interactive assessment platform for IB MYP4 (International Baccalaureate Middle Years Programme Year 4) students. Practice Mathematics and Individuals & Societies with timed assessments, progress tracking, and PDF reports.

**🌐 Live Site**: [https://kaniib.vercel.app](https://kaniib.vercel.app)

---

## 📚 Available Assessments

### Mathematics (MYP4)

| Assessment | Topics | Questions | Time |
|------------|--------|-----------|------|
| [Sets, Venn & Probability](https://kaniib.vercel.app/assessments/myp4-sets-venn-probability.html) | Set theory, 3-set Venn, Probability | 16 | 45 min |
| [Sets, Venn & Probability - Advanced](https://kaniib.vercel.app/assessments/myp4-sets-venn-probability-advanced.html) | 4-set Venn, Bayes' Theorem, Combinatorics | 50 | 90 min |
| [Statistics](https://kaniib.vercel.app/assessments/myp4-statistics.html) | Mean, Median, Box Plots, IQR | 25 | 60 min |
| [Statistics Part 4](https://kaniib.vercel.app/assessments/myp4-statistics-part4.html) | Advanced Statistics, Z-scores | 25 | 60 min |
| [Comprehensive Math Review](https://kaniib.vercel.app/assessments/myp4-comprehensive.html) | Full curriculum coverage | 45 | 60 min |

### Individuals & Societies (I&S)

| Assessment | Topics | Questions | Time |
|------------|--------|-----------|------|
| [History & Future of Money](https://kaniib.vercel.app/assessments/myp4-ins-money-history.html) | Barter to Bitcoin, OPVL, Cryptocurrency | 20 | 90 min |
| [Supply & Demand](https://kaniib.vercel.app/assessments/myp4-ins-supply-demand.html) | Market economics, Equilibrium, Government intervention | 20 | 90 min |

---

## ✨ Features

- **⏱️ Timed Assessments** - Real exam conditions with countdown timer
- **📊 Progress Tracking** - Visual progress bar and question navigator
- **📄 PDF Reports** - Downloadable results with detailed feedback
- **📖 Study Materials** - Interactive guides with Swedish real-world examples
- **🎯 Multiple Question Types** - MCQ, short answer, and essay questions
- **💾 Local History** - Saves progress and results in browser

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Deployment**: [Vercel](https://vercel.com)
- **Version Control**: GitHub

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/kram1947/kaniib.git
   cd kaniib
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in a browser
   # Or use a local server:
   npx serve .
   ```

3. **Configure Supabase Auth**
   ```bash
   cp .env.example .env.local
   ```
   Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project. In Supabase Auth URL settings, add `http://localhost:5173/auth/callback` and `https://kaniib.vercel.app/auth/callback` as redirect URLs.

4. **Deploy to Vercel** (automatic)
   - Push to GitHub
   - Vercel auto-deploys from main branch

---

## 📁 Project Structure

```
kaniib/
├── index.html                 # Main landing page
├── vercel.json                # Vercel configuration
├── AGENTS.md                  # Developer documentation
├── assessments/
│   ├── myp4-*.html           # Assessment files
│   ├── myp4-ins-*-study.html # Study materials
│   └── content/              # Source materials
│       ├── *.docx            # Original notes
│       └── *.txt             # Transcribed content
```

---

## 🎓 IB MYP Framework

### Global Contexts
- **Orientation in Space and Time** - History & Future of Money
- **Global Interaction** - Supply & Demand economics

### Assessment Criteria (Individuals & Societies)
| Criterion | Description |
|-----------|-------------|
| A | Knowing & Understanding |
| B | Investigating |
| C | Communicating |
| D | Thinking Critically |

---

## 🇸🇪 Swedish Real-World Examples

The platform includes context-specific examples from Sweden:
- **Companies**: Volvo, H&M, Northvolt, Oatly, Spotify
- **Institutions**: Riksbank (Central Bank), Nord Pool (Electricity), ICA
- **Markets**: Stockholm Housing, Swedish Agriculture

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

Open source - Free to use and modify.

---

<p align="center">Built for IB MYP4 Students 🌍</p>
