
export type NoteItem = {
  id: string;
  subject: string;
  title: string;
  type: 'note' | 'paper' | 'revision';
  year?: number;
  keywords: string[];
  path: string;
};

export const notes: NoteItem[] = [
  // Physics Notes
  {
    id: 'phys-note-1',
    subject: 'physics',
    title: 'Physical Quantities & Measurement',
    type: 'note',
    keywords: ['units', 'SI units', 'measurement', 'uncertainty', 'dimensions'],
    path: '/notes/physics/physical-quantities.pdf'
  },
  {
    id: 'phys-note-2',
    subject: 'physics',
    title: 'Vectors and Scalars',
    type: 'note',
    keywords: ['vectors', 'scalars', 'addition', 'cross product', 'dot product'],
    path: '/notes/physics/vectors.pdf'
  },
  
  // Chemistry Notes
  {
    id: 'chem-note-1',
    subject: 'chemistry',
    title: 'Atomic Structure',
    type: 'note',
    keywords: ['atom', 'nucleus', 'electron', 'proton', 'neutron', 'orbital'],
    path: '/notes/chemistry/atomic-structure.pdf'
  },
  {
    id: 'chem-note-2',
    subject: 'chemistry',
    title: 'Chemical Bonding',
    type: 'note',
    keywords: ['ionic bond', 'covalent', 'metallic', 'hydrogen bonding', 'VSEPR'],
    path: '/notes/chemistry/chemical-bonding.pdf'
  },
  
  // Mathematics Notes
  {
    id: 'math-note-1',
    subject: 'mathematics',
    title: 'Quadratic Equations',
    type: 'note',
    keywords: ['quadratic', 'roots', 'discriminant', 'completing square', 'formula'],
    path: '/notes/mathematics/quadratic-equations.pdf'
  },
  {
    id: 'math-note-2',
    subject: 'mathematics',
    title: 'Trigonometric Functions',
    type: 'note',
    keywords: ['sine', 'cosine', 'tangent', 'angle', 'identities', 'triangle'],
    path: '/notes/mathematics/trigonometric-functions.pdf'
  },
  
  // Computer Science Notes
  {
    id: 'cs-note-1',
    subject: 'computer-science',
    title: 'Number Systems',
    type: 'note',
    keywords: ['binary', 'decimal', 'hexadecimal', 'octal', 'conversion'],
    path: '/notes/computer-science/number-system.pdf'
  },
  {
    id: 'cs-note-2',
    subject: 'computer-science',
    title: 'C Programming Basics',
    type: 'note',
    keywords: ['C', 'programming', 'syntax', 'variables', 'functions', 'loops'],
    path: '/notes/computer-science/programming-concepts.pdf'
  },
  
  // Past Papers
  {
    id: 'phys-paper-2080',
    subject: 'physics',
    title: 'Physics 2080 Exam Paper',
    type: 'paper',
    year: 2080,
    keywords: ['exam', 'past paper', 'questions', 'solutions'],
    path: '/notes/past-papers/physics-2080.pdf'
  },
  {
    id: 'chem-paper-2080',
    subject: 'chemistry',
    title: 'Chemistry 2080 Exam Paper',
    type: 'paper',
    year: 2080,
    keywords: ['exam', 'past paper', 'questions', 'solutions'],
    path: '/notes/past-papers/chemistry-2080.pdf'
  },
  {
    id: 'math-paper-2080',
    subject: 'mathematics',
    title: 'Mathematics 2080 Exam Paper',
    type: 'paper',
    year: 2080,
    keywords: ['exam', 'past paper', 'questions', 'solutions', 'calculus'],
    path: '/notes/past-papers/mathematics-2080.pdf'
  },
  
  // Revision Materials
  {
    id: 'phys-rev-1',
    subject: 'physics',
    title: 'Physics Quick Revision Guide',
    type: 'revision',
    keywords: ['revision', 'summary', 'formulas', 'key concepts'],
    path: '/notes/revision/physics-revision.pdf'
  },
  {
    id: 'chem-rev-1',
    subject: 'chemistry',
    title: 'Chemistry Formula Sheet',
    type: 'revision',
    keywords: ['formulas', 'equations', 'periodic table', 'quick reference'],
    path: '/notes/revision/chemistry-formulas.pdf'
  },
  {
    id: 'math-rev-1',
    subject: 'mathematics',
    title: 'Mathematics Formula Booklet',
    type: 'revision',
    keywords: ['formulas', 'theorems', 'identities', 'quick reference'],
    path: '/notes/revision/math-formulas.pdf'
  }
];

export const searchNotes = (query: string): NoteItem[] => {
  const lowerQuery = query.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowerQuery) || 
    note.subject.toLowerCase().includes(lowerQuery) || 
    note.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
};

export const getNotesBySubject = (subjectId: string): NoteItem[] => {
  return notes.filter(note => note.subject === subjectId);
};

export const getPastPapers = (): NoteItem[] => {
  return notes.filter(note => note.type === 'paper');
};
