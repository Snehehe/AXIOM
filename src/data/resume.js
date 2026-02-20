/**
 * Sneh Shah's resume data — the single source of truth for all
 * profile information used across the app.
 */

export const PROFILE = {
  name:           'Sneh Shah',
  school:         'George Mason University',
  degree:         'B.S. Computer Science',
  graduationDate: 'May 2026',
  location:       'Ashburn, VA',
  email:          'sshah56@gmu.edu',
  github:         'github.com/snehehe',
  linkedin:       'linkedin.com/in/snehsshah/',
  target:         'New Grad AI/ML Software Engineer',
}

export const SKILL_DOMAINS = [
  { id: 'ml',       label: 'AI / Machine Learning',  mastery: 78, trend: '+11', color: '#00c8d4' },
  { id: 'backend',  label: 'Backend / Java',          mastery: 72, trend: '+8',  color: '#f0a500' },
  { id: 'python',   label: 'Python / Data Eng.',      mastery: 82, trend: '+6',  color: '#2ecc71' },
  { id: 'behavioral', label: 'Behavioral / STAR',     mastery: 55, trend: '+4',  color: '#f472b6' },
  { id: 'systems',  label: 'Systems Design',          mastery: 48, trend: '+7',  color: '#e74c3c' },
  { id: 'cloud',    label: 'Cloud / AWS / DevOps',    mastery: 70, trend: '+9',  color: '#a78bfa' },
]

export const GAP_ITEMS = [
  { concept: 'Systems Design at Scale',      severity: 'high',   domain: 'Systems Design' },
  { concept: 'STAR Story Quantification',    severity: 'high',   domain: 'Behavioral'     },
  { concept: 'Database Sharding/Partitioning', severity: 'medium', domain: 'Databases'    },
  { concept: 'Distributed Caching Patterns', severity: 'medium', domain: 'Systems Design' },
  { concept: 'ML Model Serving / MLOps',     severity: 'low',    domain: 'AI/ML'          },
]

export const KNOWLEDGE_UNITS = [
  { id: 'ku-001', content: 'Migrated production persistence layer from iBATIS to MyBatis at CACI',        topic: 'Backend', confidence: 0.91, source: 'Work Experience'       },
  { id: 'ku-002', content: '95%+ test coverage using JUnit and Mockito across service layers',             topic: 'Testing', confidence: 0.93, source: 'Work Experience'       },
  { id: 'ku-003', content: 'Built supervised ML movie rating predictor on AWS SageMaker + Glue',           topic: 'AI/ML',   confidence: 0.85, source: 'Work Experience'       },
  { id: 'ku-004', content: 'Real-time face recognition with DeepFace embeddings + cosine similarity',     topic: 'CV/AI',   confidence: 0.88, source: 'Project: Face-Aware'  },
  { id: 'ku-005', content: 'LLM-powered force-directed graph viz with Neo4j bidirectional sync',          topic: 'AI/ML',   confidence: 0.87, source: 'Project: ThoughtWeaver'},
  { id: 'ku-006', content: 'VGG16 CNN for skin cancer classification, validated with medical professionals', topic: 'CV/AI', confidence: 0.82, source: 'Project: Skin Cancer AI'},
  { id: 'ku-007', content: 'Kubernetes container orchestration research and integration at Ojasys',        topic: 'DevOps',  confidence: 0.74, source: 'Work Experience'       },
  { id: 'ku-008', content: 'OCI Generative AI Professional & AWS Cloud Practitioner certified',           topic: 'Cloud',   confidence: 0.95, source: 'Certifications'        },
]

export const CYCLE_STEPS = [
  { id: 1, label: 'Goal Interpretation',   icon: '⊙', desc: 'Translating objective into targets'  },
  { id: 2, label: 'Competency Mapping',    icon: '◈', desc: 'Identifying required domains'        },
  { id: 3, label: 'Capability Assessment', icon: '◎', desc: 'Comparing against skill model'       },
  { id: 4, label: 'Strategy Generation',   icon: '◉', desc: 'Building preparation plan'           },
  { id: 5, label: 'Action Execution',      icon: '▶', desc: 'Running simulation/exercises'        },
  { id: 6, label: 'Performance Evaluation',icon: '◆', desc: 'Scoring & error analysis'            },
  { id: 7, label: 'Knowledge Update',      icon: '⟳', desc: 'Adjusting mastery estimates'         },
  { id: 8, label: 'Plan Revision',         icon: '↻', desc: 'Recalculating next actions'          },
]

export const AGENDA = [
  { time: 'Today',     action: 'Systems Design: URL shortener walkthrough'              },
  { time: 'Today',     action: 'STAR: CACI iBATIS migration — quantify impact'         },
  { time: 'Tomorrow',  action: 'Mock: Design an LLM-powered recommendation system'     },
  { time: 'Tomorrow',  action: 'Behavioral: leadership at GMU Motorsport'              },
]

export const LEARNING_PLAN = [
  {
    week:  'Week 1',
    focus: 'Systems Design Foundations',
    items: ['URL shortener: capacity → components', 'Load balancing + caching layers', 'Database scaling: read replicas + sharding'],
  },
  {
    week:  'Week 2',
    focus: 'STAR Stories from Internships',
    items: ['CACI migration: quantify latency/coverage impact', 'Ojasys pipeline: frame scope + result', 'ThoughtWeaver: leadership + cross-functional narrative'],
  },
  {
    week:  'Week 3',
    focus: 'ML Production & Deployment',
    items: ['Model serving + MLOps pipeline', 'SageMaker endpoints + monitoring', 'Feature store + A/B testing patterns'],
  },
]

export const PERFORMANCE_SERIES = {
  'AI/ML':      [60, 64, 67, 70, 72, 74, 76, 78],
  'Python':     [70, 73, 75, 77, 79, 80, 81, 82],
  'Behavioral': [32, 36, 40, 44, 47, 50, 53, 55],
}

export const LONGITUDINAL_METRICS = [
  { label: 'Improvement Velocity', value: '+4.8', unit: 'pts/week',   color: '#2ecc71' },
  { label: 'Retention Decay',      value: '−0.6', unit: 'pts/week',   color: '#f0a500' },
  { label: 'Session Consistency',  value: '79%',  unit: 'adherence',  color: '#00c8d4' },
  { label: 'Predicted Readiness',  value: '88',   unit: 'by May 2026',color: '#f0a500' },
]
