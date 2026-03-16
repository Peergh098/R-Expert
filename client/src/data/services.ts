import type { ServiceInfo } from '../types';

export const services: ServiceInfo[] = [
  {
    id: 'plagiarism-check',
    title: 'Plagiarism Check',
    shortDesc: 'Comprehensive plagiarism detection using advanced tools',
    description:
      'Our plagiarism check service uses industry-leading software to scan your document against billions of online sources, academic databases, and previously submitted papers. Get a detailed similarity report in 24 hours.',
    icon: '🔍',
    price: 'From ₹499/document',
    features: [
      'Detailed similarity report',
      'Source-by-source breakdown',
      'Turnitin & iThenticate compatible',
      'Quick 24-hour turnaround',
      'Confidential & secure',
    ],
    deliverables: ['Plagiarism report PDF', 'Similarity score', 'Source citations'],
    turnaround: '24 hours',
    color: 'blue',
  },
  {
    id: 'plagiarism-removal',
    title: 'Plagiarism Removal',
    shortDesc: 'Expert content rewriting to reduce similarity scores below 10%',
    description:
      'Our expert editors rewrite flagged sections while preserving your original meaning and academic integrity. We guarantee bringing your similarity score below 10% with before & after reports.',
    icon: '✏️',
    price: 'From ₹999/document',
    features: [
      'Similarity reduced to <10%',
      'Meaning & context preserved',
      'Academic integrity maintained',
      'Before & after reports',
      'Unlimited revisions',
    ],
    deliverables: ['Rewritten document', 'Before/after plagiarism reports', 'Revision notes'],
    turnaround: '48 hours',
    color: 'red',
  },
  {
    id: 'proofreading',
    title: 'Proofreading',
    shortDesc: 'Grammar, spelling, and style correction by academic experts',
    description:
      'Professional proofreading by academic experts who correct grammar, spelling, punctuation, and improve sentence structure while maintaining your academic voice and style.',
    icon: '📝',
    price: 'From ₹399/document',
    features: [
      'Grammar & spelling correction',
      'Punctuation fixes',
      'Sentence structure improvement',
      'Clarity & readability',
      'Style consistency',
    ],
    deliverables: ['Proofread document', 'Track changes version', 'Correction summary'],
    turnaround: '24 hours',
    color: 'green',
  },
  {
    id: 'citation-formatting',
    title: 'Citation Formatting',
    shortDesc: 'APA, MLA, Chicago, Harvard and all major citation styles',
    description:
      'Our specialists format all your citations, references, and bibliography according to your required style guide — APA, MLA, Chicago, Harvard, Vancouver, or any other academic style.',
    icon: '📋',
    price: 'From ₹299/document',
    features: [
      'All major citation styles',
      'In-text citations formatted',
      'Reference list formatted',
      'Bibliography creation',
      'Citation verification',
    ],
    deliverables: ['Formatted document', 'Reference list', 'Style compliance report'],
    turnaround: '24 hours',
    color: 'purple',
  },
  {
    id: 'thesis-writing',
    title: 'Thesis Writing',
    shortDesc: 'Complete thesis writing assistance by PhD scholars',
    description:
      'Get comprehensive thesis writing assistance from PhD-qualified scholars in your field. From research proposal to final submission, we guide you through every chapter with expert knowledge.',
    icon: '📚',
    price: 'From ₹4,999/chapter',
    features: [
      'PhD-qualified writers',
      'Research proposal writing',
      'Literature review',
      'Methodology & analysis',
      'Full dissertation support',
    ],
    deliverables: ['Complete thesis chapters', 'Abstract', 'Research outline', 'Reference list'],
    turnaround: '7+ days',
    color: 'amber',
  },
  {
    id: 'document-formatting',
    title: 'Document Formatting',
    shortDesc: 'Professional formatting for journals and universities',
    description:
      'We format your research paper or thesis to meet exact journal or university submission guidelines, including page layout, fonts, headers, margins, figures, and tables.',
    icon: '📄',
    price: 'From ₹299/document',
    features: [
      'Journal-specific formatting',
      'University template compliance',
      'Figure & table formatting',
      'Table of contents',
      'Page numbering & headers',
    ],
    deliverables: ['Formatted document', 'Word & PDF versions', 'Formatting checklist'],
    turnaround: '24 hours',
    color: 'indigo',
  },
];

export const SERVICE_LABELS: Record<string, string> = {
  'plagiarism-check': 'Plagiarism Check',
  'plagiarism-removal': 'Plagiarism Removal',
  proofreading: 'Proofreading',
  'citation-formatting': 'Citation Formatting',
  'thesis-writing': 'Thesis Writing',
  'document-formatting': 'Document Formatting',
};
