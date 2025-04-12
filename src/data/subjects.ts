
export type Subject = {
  id: string;
  name: string;
  icon: string;
  description: string;
  areas: ContentArea[];
};

export type ContentArea = {
  name: string;
  chapters: Chapter[];
};

export type Chapter = {
  id: number;
  title: string;
  notesPath?: string;
};

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "atom",
    description: "Study of matter, its motion, and behavior through space and time",
    areas: [
      {
        name: "Mechanics",
        chapters: [
          { id: 1, title: "Physical Quantities", notesPath: "/notes/physics/physical-quantities.pdf" },
          { id: 2, title: "Vectors", notesPath: "/notes/physics/vectors.pdf" },
          { id: 3, title: "Kinematics", notesPath: "/notes/physics/kinematics.pdf" },
          { id: 4, title: "Dynamics", notesPath: "/notes/physics/dynamics.pdf" },
          { id: 5, title: "Work, Energy, Power", notesPath: "/notes/physics/work-energy-power.pdf" },
          { id: 6, title: "Circular Motion", notesPath: "/notes/physics/circular-motion.pdf" },
          { id: 7, title: "Gravitation", notesPath: "/notes/physics/gravitation.pdf" },
          { id: 8, title: "Elasticity", notesPath: "/notes/physics/elasticity.pdf" }
        ]
      },
      {
        name: "Heat & Thermodynamics",
        chapters: [
          { id: 9, title: "Heat and Temperature", notesPath: "/notes/physics/heat-temperature.pdf" },
          { id: 10, title: "Thermal Expansion", notesPath: "/notes/physics/thermal-expansion.pdf" },
          { id: 11, title: "Quantity of Heat", notesPath: "/notes/physics/quantity-heat.pdf" },
          { id: 12, title: "Rate of Heat Flow", notesPath: "/notes/physics/heat-flow.pdf" },
          { id: 13, title: "Ideal Gas", notesPath: "/notes/physics/ideal-gas.pdf" }
        ]
      },
      {
        name: "Waves & Optics",
        chapters: [
          { id: 14, title: "Reflection at Curved Mirror", notesPath: "/notes/physics/curved-mirror.pdf" },
          { id: 15, title: "Refraction", notesPath: "/notes/physics/refraction.pdf" },
          { id: 16, title: "Prisms", notesPath: "/notes/physics/prisms.pdf" },
          { id: 17, title: "Lenses", notesPath: "/notes/physics/lenses.pdf" },
          { id: 18, title: "Dispersion", notesPath: "/notes/physics/dispersion.pdf" }
        ]
      },
      {
        name: "Electricity & Magnetism",
        chapters: [
          { id: 19, title: "Electric Charges", notesPath: "/notes/physics/electric-charges.pdf" },
          { id: 20, title: "Electric Field", notesPath: "/notes/physics/electric-field.pdf" },
          { id: 21, title: "Potential", notesPath: "/notes/physics/potential.pdf" },
          { id: 22, title: "Capacitor", notesPath: "/notes/physics/capacitor.pdf" },
          { id: 23, title: "DC Circuits", notesPath: "/notes/physics/dc-circuits.pdf" }
        ]
      },
      {
        name: "Modern Physics",
        chapters: [
          { id: 24, title: "Nuclear Physics", notesPath: "/notes/physics/nuclear-physics.pdf" },
          { id: 25, title: "Solids", notesPath: "/notes/physics/solids.pdf" },
          { id: 26, title: "Recent Trends", notesPath: "/notes/physics/recent-trends.pdf" }
        ]
      }
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "flask-conical",
    description: "Study of matter, its properties, and the changes it undergoes",
    areas: [
      {
        name: "General and Physical Chemistry",
        chapters: [
          { id: 1, title: "Foundation and Fundamentals", notesPath: "/notes/chemistry/foundations.pdf" },
          { id: 2, title: "Stoichiometry", notesPath: "/notes/chemistry/stoichiometry.pdf" },
          { id: 3, title: "Atomic Structure", notesPath: "/notes/chemistry/atomic-structure.pdf" },
          { id: 4, title: "Classification of Elements", notesPath: "/notes/chemistry/classification.pdf" },
          { id: 5, title: "Chemical Bonding", notesPath: "/notes/chemistry/chemical-bonding.pdf" },
          { id: 6, title: "Oxidation and Reduction", notesPath: "/notes/chemistry/redox.pdf" },
          { id: 7, title: "States of Matter", notesPath: "/notes/chemistry/states-matter.pdf" },
          { id: 8, title: "Chemical Equilibrium", notesPath: "/notes/chemistry/equilibrium.pdf" }
        ]
      },
      {
        name: "Inorganic Chemistry",
        chapters: [
          { id: 9, title: "Chemistry of Non-Metals", notesPath: "/notes/chemistry/non-metals.pdf" },
          { id: 10, title: "Chemistry of Metals", notesPath: "/notes/chemistry/metals.pdf" },
          { id: 11, title: "Bio-inorganic Chemistry", notesPath: "/notes/chemistry/bio-inorganic.pdf" }
        ]
      },
      {
        name: "Organic Chemistry",
        chapters: [
          { id: 12, title: "Basic Concepts", notesPath: "/notes/chemistry/organic-concepts.pdf" },
          { id: 13, title: "Fundamental Principles", notesPath: "/notes/chemistry/organic-principles.pdf" },
          { id: 14, title: "Hydrocarbons", notesPath: "/notes/chemistry/hydrocarbons.pdf" },
          { id: 15, title: "Aromatic Hydrocarbons", notesPath: "/notes/chemistry/aromatic.pdf" }
        ]
      },
      {
        name: "Applied Chemistry",
        chapters: [
          { id: 16, title: "Fundamentals of Applied Chemistry", notesPath: "/notes/chemistry/applied-fundamentals.pdf" },
          { id: 17, title: "Modern Chemical Manufactures", notesPath: "/notes/chemistry/modern-manufactures.pdf" }
        ]
      }
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "calculator",
    description: "Study of numbers, quantities, and shapes",
    areas: [
      {
        name: "Algebra",
        chapters: [
          { id: 1, title: "Logic and Set", notesPath: "/notes/mathematics/logic-set.pdf" },
          { id: 2, title: "Functions", notesPath: "/notes/mathematics/functions.pdf" },
          { id: 3, title: "Sequence/Series", notesPath: "/notes/mathematics/sequence-series.pdf" },
          { id: 4, title: "Matrices", notesPath: "/notes/mathematics/matrices.pdf" },
          { id: 5, title: "Quadratic Equations", notesPath: "/notes/mathematics/quadratic-equations.pdf" },
          { id: 6, title: "Complex Numbers", notesPath: "/notes/mathematics/complex-numbers.pdf" }
        ]
      },
      {
        name: "Trigonometry",
        chapters: [
          { id: 7, title: "Trigonometric Functions", notesPath: "/notes/mathematics/trigonometric-functions.pdf" },
          { id: 8, title: "Inverse Circular Functions", notesPath: "/notes/mathematics/inverse-circular.pdf" },
          { id: 9, title: "Trigonometric Equations", notesPath: "/notes/mathematics/trigonometric-equations.pdf" }
        ]
      },
      {
        name: "Analytic Geometry",
        chapters: [
          { id: 10, title: "Straight Lines", notesPath: "/notes/mathematics/straight-lines.pdf" },
          { id: 11, title: "Pair of Lines", notesPath: "/notes/mathematics/pair-of-lines.pdf" },
          { id: 12, title: "Coordinates in Space", notesPath: "/notes/mathematics/coordinates-space.pdf" }
        ]
      },
      {
        name: "Vectors",
        chapters: [
          { id: 13, title: "Collinear Vectors", notesPath: "/notes/mathematics/collinear-vectors.pdf" },
          { id: 14, title: "Linear Dependence", notesPath: "/notes/mathematics/linear-dependence.pdf" }
        ]
      },
      {
        name: "Statistics and Probability",
        chapters: [
          { id: 15, title: "Standard Deviation", notesPath: "/notes/mathematics/standard-deviation.pdf" },
          { id: 16, title: "Probability Laws", notesPath: "/notes/mathematics/probability-laws.pdf" }
        ]
      },
      {
        name: "Calculus",
        chapters: [
          { id: 17, title: "Limits", notesPath: "/notes/mathematics/limits.pdf" },
          { id: 18, title: "Derivatives", notesPath: "/notes/mathematics/derivatives.pdf" },
          { id: 19, title: "Integration", notesPath: "/notes/mathematics/integration.pdf" },
          { id: 20, title: "Area Under Curves", notesPath: "/notes/mathematics/area-curves.pdf" }
        ]
      },
      {
        name: "Computational Methods/Mechanics",
        chapters: [
          { id: 21, title: "Numerical Integration", notesPath: "/notes/mathematics/numerical-integration.pdf" },
          { id: 22, title: "Motion Under Gravity", notesPath: "/notes/mathematics/motion-gravity.pdf" }
        ]
      }
    ]
  },
  {
    id: "botany",
    name: "Botany",
    icon: "leaf",
    description: "Study of plants and their structures",
    areas: [
      {
        name: "Plant Sciences",
        chapters: [
          { id: 1, title: "Biomolecules & Cell Biology", notesPath: "/notes/botany/biomolecules.pdf" },
          { id: 2, title: "Floral Diversity", notesPath: "/notes/botany/floral-diversity.pdf" },
          { id: 3, title: "Introductory Microbiology", notesPath: "/notes/botany/microbiology.pdf" },
          { id: 4, title: "Ecology", notesPath: "/notes/botany/ecology.pdf" },
          { id: 5, title: "Vegetation", notesPath: "/notes/botany/vegetation.pdf" }
        ]
      }
    ]
  },
  {
    id: "zoology",
    name: "Zoology",
    icon: "mouse",
    description: "Study of animals and their behavior",
    areas: [
      {
        name: "Animal Sciences",
        chapters: [
          { id: 1, title: "Introduction to Biology", notesPath: "/notes/zoology/intro-biology.pdf" },
          { id: 2, title: "Evolutionary Biology", notesPath: "/notes/zoology/evolutionary.pdf" },
          { id: 3, title: "Faunal Diversity", notesPath: "/notes/zoology/faunal-diversity.pdf" },
          { id: 4, title: "Biota and Environment", notesPath: "/notes/zoology/biota-environment.pdf" },
          { id: 5, title: "Conservation Biology", notesPath: "/notes/zoology/conservation.pdf" }
        ]
      }
    ]
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "laptop",
    description: "Study of computers and computational systems",
    areas: [
      {
        name: "Computer Science",
        chapters: [
          { id: 1, title: "Computer System", notesPath: "/notes/computer-science/computer-system.pdf" },
          { id: 2, title: "Number System & Boolean Logic", notesPath: "/notes/computer-science/number-system.pdf" },
          { id: 3, title: "Computer Software & OS", notesPath: "/notes/computer-science/software-os.pdf" },
          { id: 4, title: "Application Package", notesPath: "/notes/computer-science/application-package.pdf" },
          { id: 5, title: "Programming Concepts", notesPath: "/notes/computer-science/programming-concepts.pdf" },
          { id: 6, title: "Web Technology", notesPath: "/notes/computer-science/web-technology.pdf" },
          { id: 7, title: "Multimedia", notesPath: "/notes/computer-science/multimedia.pdf" },
          { id: 8, title: "Information Security", notesPath: "/notes/computer-science/information-security.pdf" }
        ]
      }
    ]
  },
  {
    id: "english",
    name: "English",
    icon: "book-text",
    description: "Study of English language and literature",
    areas: [
      {
        name: "Language Skills",
        chapters: [
          { id: 1, title: "Listening", notesPath: "/notes/english/listening.pdf" },
          { id: 2, title: "Speaking", notesPath: "/notes/english/speaking.pdf" },
          { id: 3, title: "Reading", notesPath: "/notes/english/reading.pdf" },
          { id: 4, title: "Writing", notesPath: "/notes/english/writing.pdf" },
          { id: 5, title: "Grammar", notesPath: "/notes/english/grammar.pdf" },
          { id: 6, title: "Vocabulary", notesPath: "/notes/english/vocabulary.pdf" }
        ]
      }
    ]
  },
  {
    id: "nepali",
    name: "नेपाली",
    icon: "book",
    description: "Study of Nepali language and literature",
    areas: [
      {
        name: "Language and Literature",
        chapters: [
          { id: 1, title: "कविता (पद्य)", notesPath: "/notes/nepali/poetry.pdf" },
          { id: 2, title: "कथा", notesPath: "/notes/nepali/story.pdf" },
          { id: 3, title: "निबन्ध", notesPath: "/notes/nepali/essay.pdf" },
          { id: 4, title: "जीवनी", notesPath: "/notes/nepali/biography.pdf" },
          { id: 5, title: "पत्र लेखन", notesPath: "/notes/nepali/letter-writing.pdf" },
          { id: 6, title: "लघु नाटक", notesPath: "/notes/nepali/short-drama.pdf" },
          { id: 7, title: "रिपोर्ताज", notesPath: "/notes/nepali/reportage.pdf" },
          { id: 8, title: "संवादात्मक रचना", notesPath: "/notes/nepali/dialogue.pdf" },
          { id: 9, title: "दैनिकी रचना", notesPath: "/notes/nepali/diary.pdf" },
          { id: 10, title: "वक्तृता", notesPath: "/notes/nepali/speech.pdf" }
        ]
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};
