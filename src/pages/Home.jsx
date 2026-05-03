import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import { useAuth } from '../context/AuthContext';

const subjectsData = [
  { 
    id: 'math', 
    name: 'Mathematics', 
    icon: '📐', 
    color: 'rgba(99, 102, 241, 0.15)',
    topics: [
      { id: 'number', name: 'Number', icon: '🔢' },
      { id: 'algebra', name: 'Algebra', icon: '𝑥𝑦' },
      { id: 'geometry', name: 'Geometry', icon: '△' },
      { id: 'trigonometry', name: 'Trigonometry', icon: '📐' },
      { id: 'probability', name: 'Probability', icon: '🎲' },
      { id: 'statistics', name: 'Statistics', icon: '📊' }
    ]
  },
  { 
    id: 'ins', 
    name: 'Individuals & Societies', 
    icon: '🏛', 
    color: 'rgba(234, 88, 12, 0.15)',
    topics: [
      { id: 'money', name: 'Money & Economy', icon: '💰' },
      { id: 'supply-demand', name: 'Supply & Demand', icon: '📈' }
    ]
  },
  { 
    id: 'science', 
    name: 'Science', 
    icon: '⚛️', 
    color: 'rgba(16, 185, 129, 0.15)',
    topics: [
      { id: 'ions', name: 'Ions & Isotopes', icon: '🧬' },
      { id: 'ionic-bonding', name: 'Ionic Bonding', icon: '⚡' }
    ]
  },
  { 
    id: 'technology', 
    name: 'Technology', 
    icon: '💻', 
    color: 'rgba(6, 182, 212, 0.15)',
    topics: [
      { id: 'coding', name: 'Coding Basics', icon: '⚙️' },
      { id: 'ai', name: 'AI & ML', icon: '🤖' }
    ]
  },
  { 
    id: 'games', 
    name: 'Games & Puzzles', 
    icon: '🎮', 
    color: 'rgba(236, 72, 153, 0.15)',
    topics: [
      { id: 'sudoku', name: 'Sudoku', icon: '🔢' },
      { id: 'riddles', name: 'Riddles', icon: '🧩' }
    ]
  },
  { 
    id: 'biotech', 
    name: 'BioTechnology', 
    icon: '🧬', 
    color: 'rgba(245, 158, 11, 0.15)',
    topics: [
      { id: 'news', name: 'Latest News', icon: '📰' },
      { id: 'innovations', name: 'Innovations', icon: '💡' }
    ]
  }
];

const assessmentsData = [
  {
    id: 1,
    title: 'Sets, Venn & Probability',
    description: 'Master set theory, 3-set Venn diagrams, inclusion-exclusion principle, and compound probability calculations.',
    topics: ['Sets', 'Venn Diagrams', 'Probability'],
    topicId: 'probability',
    subjectId: 'math',
    questionCount: 16,
    time: '45',
    marks: 70,
    difficulty: 3,
    href: 'assess/myp4-sets-venn-probability.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '∪∩',
    iconBg: 'probability'
  },
  {
    id: 2,
    title: 'Sets, Venn & Probability - Advanced',
    description: 'Expert-level challenge: 4-set Venn diagrams, multi-stage Bayes\' theorem, advanced combinatorics, and probability paradoxes.',
    topics: ['4-Set Venn', 'Bayes\' Theorem', 'Combinatorics'],
    topicId: 'probability',
    subjectId: 'math',
    questionCount: 50,
    time: '90',
    marks: 400,
    difficulty: 5,
    href: 'assess/myp4-sets-venn-probability-advanced.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '∪∩',
    iconBg: 'probability'
  },
  {
    id: 3,
    title: 'Statistics & Data Analysis',
    description: 'Measures of central tendency, spread, box plots, histograms, and correlation.',
    topics: ['Mean/Median', 'Box Plots', 'IQR'],
    topicId: 'statistics',
    subjectId: 'math',
    questionCount: 25,
    time: '60',
    marks: 150,
    difficulty: 3,
    href: 'assess/myp4-statistics.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '📊',
    iconBg: 'stats'
  },
  {
    id: 4,
    title: 'Set & Probability - Advanced (Part 3)',
    description: 'Elite assessment: PIE, derangements, mean-median identity, Z-scores, combinatorics. AMC/Kangaroo style with charts.',
    topics: ['PIE', 'Derangements', 'Z-scores'],
    topicId: 'probability',
    subjectId: 'math',
    questionCount: 25,
    time: '90',
    marks: 175,
    difficulty: 5,
    href: 'assess/myp4-sets-venn-probability-part3.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '🎯',
    iconBg: 'stats'
  },
  {
    id: 5,
    title: 'Statistics & Data Analysis - Part 4',
    description: 'Mastery portal: Criterion A-D knowledge, patterns, communication, real-life application with AoPS elite challenges.',
    topics: ['Mean/Median', 'Std Dev', 'Box Plots'],
    topicId: 'statistics',
    subjectId: 'math',
    questionCount: 25,
    time: '60',
    marks: 100,
    difficulty: 4,
    href: 'assess/myp4-statistics-part4.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '📊',
    iconBg: 'stats'
  },
  {
    id: 6,
    title: 'History & Future of Money',
    description: 'Explore 11,000 years of monetary evolution: barter to Bitcoin. OPVL analysis, PESTEL framework, and cryptocurrency debate.',
    topics: ['Barter Systems', 'Fiat Currency', 'Blockchain'],
    topicId: 'money',
    subjectId: 'ins',
    questionCount: 20,
    time: '90',
    marks: 44,
    difficulty: 3,
    href: 'assess/myp4-ins-money-history.html',
    category: 'myp4',
    badge: 'MYP4 I&S',
    icon: '🏛',
    iconBg: 'geometry'
  },
  {
    id: 7,
    title: 'Supply & Demand',
    description: 'Master market economics: Law of Demand/Supply, equilibrium, shifts, and government intervention with Swedish examples.',
    topics: ['Demand', 'Supply', 'Equilibrium'],
    topicId: 'supply-demand',
    subjectId: 'ins',
    questionCount: 20,
    time: '90',
    marks: 84,
    difficulty: 3,
    href: 'assess/myp4-ins-supply-demand.html',
    category: 'myp4',
    badge: 'MYP4 I&S',
    icon: '📊',
    iconBg: 'geometry'
  },
  {
    id: 8,
    title: 'Comprehensive Math Review',
    description: 'Full curriculum coverage: Number, Algebra, Geometry, Coordinate Geometry, Statistics, Probability, and Problem Solving.',
    topics: ['Number', 'Algebra', 'Geometry', '+more'],
    topicId: 'all',
    subjectId: 'math',
    questionCount: 45,
    time: '60',
    marks: 45,
    difficulty: 3,
    href: 'assess/myp4-comprehensive.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '∑',
    iconBg: 'math'
  },
  {
    id: 9,
    title: 'Trigonometry - Study Material',
    description: 'Comprehensive trigonometry study guide with interactive diagrams, real-world examples, and all Haese MYP4 topics covered with LaTeX formulas.',
    topics: ['SOHCAHTOA', 'Sine Rule', 'Cosine Rule', 'Bearings'],
    topicId: 'trigonometry',
    subjectId: 'math',
    questionCount: 0,
    time: 'Self-paced',
    marks: 0,
    difficulty: 0,
    href: 'assess/myp4-trigonometry-study.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '📐',
    iconBg: 'geometry'
  },
  {
    id: 10,
    title: 'Trigonometry Assessment',
    description: '25 questions covering SOHCAHTOA, sine/cosine rules, bearings, area formula, trig graphs, and real-world problems. LaTeX formatted with interactive diagrams.',
    topics: ['SOHCAHTOA', 'Sine Rule', 'Cosine Rule', 'Bearings', 'Real World'],
    topicId: 'trigonometry',
    subjectId: 'math',
    questionCount: 25,
    time: '60',
    marks: 100,
    difficulty: 3,
    href: 'assess/myp4-trigonometry-assessment.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '△',
    iconBg: 'geometry'
  },
  {
    id: 11,
    title: 'Algebra - Study Material',
    description: 'Comprehensive algebra study guide with interactive graphing, equations solving, functions, sequences, and real-world applications. Based on Haese MYP4 curriculum.',
    topics: ['Expressions', 'Linear Equations', 'Quadratics', 'Functions', 'Sequences'],
    topicId: 'algebra',
    subjectId: 'math',
    questionCount: 0,
    time: 'Self-paced',
    marks: 0,
    difficulty: 0,
    href: 'assess/myp4-algebra-study.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '𝑥𝑦',
    iconBg: 'geometry'
  },
  {
    id: 12,
    title: 'Algebra Assessment',
    description: '25 questions covering algebraic expressions, linear/quadratic equations, simultaneous equations, functions, sequences, and real-world problems.',
    topics: ['Expressions', 'Linear Equations', 'Quadratics', 'Functions', 'Sequences'],
    topicId: 'algebra',
    subjectId: 'math',
    questionCount: 25,
    time: '60',
    marks: 100,
    difficulty: 3,
    href: 'assess/myp4-algebra-assessment.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '📊',
    iconBg: 'geometry'
  },
  {
    id: 13,
    title: 'Science - Ions, Isotopes & Ionic Bonding',
    description: 'Comprehensive science study guide covering ion formation, isotope notation, ionic bonding, and properties of ionic compounds. Based on MYP4 Science curriculum.',
    topics: ['Ions', 'Isotopes', 'Ionic Bonding', 'Properties'],
    topicId: 'ions',
    subjectId: 'science',
    questionCount: 0,
    time: 'Self-paced',
    marks: 0,
    difficulty: 0,
    href: 'assess/myp4-science-ions-isotopes-study.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '⚛️',
    iconBg: 'stats'
  },
  {
    id: 14,
    title: 'Science Assessment - Ions & Bonding',
    description: '20 questions covering ions, isotopes, ionic bonding, properties of ionic compounds, and real-world applications. LaTeX formatted with interactive diagrams.',
    topics: ['Ions', 'Isotopes', 'Ionic Bonding', 'Properties', 'Real World'],
    topicId: 'ions',
    subjectId: 'science',
    questionCount: 20,
    time: '45',
    marks: 80,
    difficulty: 3,
    href: 'assess/myp4-science-ions-isotopes-assessment.html',
    category: 'myp4',
    badge: 'MYP4',
    icon: '⚡',
    iconBg: 'geometry'
  },
];

  const comingSoon = [
    { icon: '📐', title: 'Functions & Graphing', topics: 'Coming Soon • Domain, range, transformations', category: 'myp5', subject: 'math' },
    { icon: '📊', title: 'Statistics & Probability', topics: 'Coming Soon • Mean, median, standard deviation', category: 'myp5', subject: 'math' },
    { icon: '🎓', title: 'DP Mathematics AA', topics: 'Coming Soon • IB Diploma Programme content', category: 'dp', subject: 'math' },
    { icon: '💻', title: 'Web Development', topics: 'Coming Soon • HTML, CSS, JavaScript', category: 'myp5', subject: 'technology' },
    { icon: '🎮', title: 'Chess Puzzles', topics: 'Coming Soon • Strategy & Logic', category: 'myp5', subject: 'games' },
    { icon: '🧬', title: 'Genetics Basics', topics: 'Coming Soon • DNA, Inheritance', category: 'myp5', subject: 'biotech' },
  ];

function StatCard({ icon, value, label, colorClass }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${colorClass}`}>{icon}</div>
      <div className={`stat-value ${colorClass}`} data-count={value}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function AssessmentCard({ assessment }) {
  const difficultyDots = [];
  for (let i = 0; i < 5; i++) {
    difficultyDots.push(<span key={i} className={i < assessment.difficulty ? 'active' : ''}></span>);
  }
  
  return (
    <a href={assessment.href} className="assessment-card" data-category={assessment.category} data-subject={assessment.subjectId || 'all'} data-topic={assessment.topicId || 'all'} aria-label={`Start ${assessment.title} assessment`} onClick={(e) => {
      if (assessment.href && assessment.href.includes('.html')) {
        e.preventDefault();
        window.location.assign(assessment.href);
      }
    }}>
      <div className="card-header">
        <div className={`card-icon ${assessment.iconBg}`}>{assessment.icon}</div>
        <span className={`card-badge badge-${assessment.category}`}>{assessment.badge}</span>
      </div>
      <h3 className="card-title">{assessment.title}</h3>
      <p className="card-desc">{assessment.description}</p>
      <div className="card-topics">
        {assessment.topics.map((t, i) => <span key={i} className="topic-tag">{t}</span>)}
      </div>
      <div className="card-meta">
        <div className="meta-item"><span className="icon">📝</span>{assessment.questionCount} Questions</div>
        <div className="meta-item"><span className="icon">⏱</span>{assessment.time} mins</div>
        <div className="meta-item"><span className="icon">🏆</span>{assessment.marks} marks</div>
      </div>
      <div className="card-footer">
        <div className="difficulty"><span className="difficulty-label">Difficulty</span>{difficultyDots}</div>
        <span className="start-btn">Start Exam →</span>
      </div>
    </a>
  );
}

function ComingSoonCard({ item }) {
  return (
    <div className="assessment-card coming-soon" data-category={item.category} data-subject={item.subject}>
      <div className="coming-soon-icon">{item.icon}</div>
      <div className="coming-soon-title">{item.title}</div>
      <div className="coming-soon-topics">{item.topics}</div>
    </div>
  );
}

export default function Home() {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [statsAnimated, setStatsAnimated] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
          }
        });
      }, { threshold: 0.5 });
      observer.observe(statsSection);
      return () => observer.disconnect();
    }
  }, [statsAnimated]);

  const animateStats = () => {
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    statValues.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          stat.textContent = target;
        }
      };
      update();
    });
  };

  const toggleSubject = (subjectId) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    document.querySelectorAll('.assessment-card:not(.coming-soon)').forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.subject === filter) {
        card.style.display = 'block';
      } else if (['myp4', 'myp5', 'dp'].includes(filter) && card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  return (
    <div>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="account-bar" aria-label="Account">
        <span>{user?.email}</span>
        <button type="button" onClick={signOut}>Log out</button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-badge">
            <span></span>
            Free IB Practice
          </div>
          <h1 id="hero-title">Master <span>Subjects</span><br/>with KaniMath</h1>
          <p className="hero-desc">Interactive assessments aligned with IB curriculum. Track your progress, identify knowledge gaps, and achieve excellence.</p>
          <div className="hero-actions">
            <a href="#subjects" className="btn btn-primary">
              Explore Subjects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#assessments" className="btn btn-secondary">
              View Assessments
            </a>
          </div>
        </div>
      </section>

      <section className="subjects-section" id="subjects" aria-labelledby="subjects-title">
        <div className="section-header">
          <h2 id="subjects-title">Explore Subjects</h2>
          <p>Click on a subject to view available topics</p>
        </div>
        <div className="subjects-grid" role="tablist" aria-label="Subject navigation">
          {subjectsData.map(subject => (
            <div key={subject.id} className="subject-card">
              <button 
                className={`subject-header ${expandedSubject === subject.id ? 'expanded' : ''}`}
                onClick={() => toggleSubject(subject.id)}
                aria-expanded={expandedSubject === subject.id}
                aria-controls={`topics-${subject.id}`}
              >
                <div className="subject-icon" style={{ background: subject.color }}>{subject.icon}</div>
                <div className="subject-info">
                  <h3>{subject.name}</h3>
                  <span className="topic-count">{subject.topics.length} topics</span>
                </div>
                <svg className="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {expandedSubject === subject.id && (
                <div className="topics-list" id={`topics-${subject.id}`} role="tabpanel">
                  {subject.topics.map(topic => (
                    <a 
                      key={topic.id} 
                      href={`#topic-${topic.id}`}
                      className="topic-item"
                    >
                      <span className="topic-icon-small">{topic.icon}</span>
                      <span>{topic.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section" aria-label="Platform statistics">
        <div className="stats-grid">
          <StatCard icon="📚" value="14" label="Assessments" colorClass="purple" />
          <StatCard icon="📝" value="276" label="Questions" colorClass="green" />
          <StatCard icon="⏱" value="360" label="Minutes" colorClass="amber" />
          <StatCard icon="🎯" value="MYP4" label="Curriculum" colorClass="cyan" />
        </div>
      </section>

      <main id="main-content" className="container">
        <div className="assessments-header">
          <h2>Available Assessments</h2>
          <div className="filter-tabs" role="tablist" aria-label="Level filters">
            <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} data-filter="all" role="tab" aria-selected={activeFilter === 'all'} onClick={() => handleFilterClick('all')}>All</button>
            <button className={`filter-tab ${activeFilter === 'myp4' ? 'active' : ''}`} data-filter="myp4" role="tab" aria-selected={activeFilter === 'myp4'} onClick={() => handleFilterClick('myp4')}>MYP4</button>
            <button className={`filter-tab ${activeFilter === 'myp5' ? 'active' : ''}`} data-filter="myp5" role="tab" aria-selected={activeFilter === 'myp5'} onClick={() => handleFilterClick('myp5')}>MYP5</button>
            <button className={`filter-tab ${activeFilter === 'dp' ? 'active' : ''}`} data-filter="dp" role="tab" aria-selected={activeFilter === 'dp'} onClick={() => handleFilterClick('dp')}>DP</button>
          </div>
        </div>

        <div id="assessments" className="assessments-grid">
          {assessmentsData.map(assessment => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
          {comingSoon.map((item, i) => (
            <ComingSoonCard key={i} item={item} />
          ))}
        </div>
      </main>

      <section className="features-section" aria-labelledby="features-title">
        <div className="section-header">
          <h2 id="features-title">Why Choose KaniMath?</h2>
          <p>Designed to help you succeed</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Detailed performance analysis shows your strengths and areas for improvement after each assessment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱</div>
            <h3>Timed Practice</h3>
            <p>Build exam stamina with realistic time limits. The timer helps you manage your pace effectively.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>PDF Reports</h3>
            <p>Download comprehensive result reports with personalized study plans to guide your revision.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="https://github.com/kram1947/mathapp">GitHub</a>
            <a href="#topics">Topics</a>
            <a href="#assessments">Assessments</a>
          </nav>
          <p className="footer-text">KaniMath • Built for IB Students • Open Source</p>
        </div>
      </footer>
    </div>
  );
}
