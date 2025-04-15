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
  preview?: string;
};

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "atom",
    description: "Exploration of matter, motion, energy, and the fundamental forces of the universe.",
    areas: [
      {
        name: "Mechanics",
        chapters: [
          { 
            id: 1, 
            title: "Physical Quantities", 
            notesPath: "/notes/physics/physical-quantities.pdf",
            preview: "Introduction to physical quantities and their measurements. Covers fundamental and derived units, dimensional analysis, and measurement accuracy." 
          },
          { 
            id: 2, 
            title: "Vectors", 
            notesPath: "/notes/physics/vectors.pdf",
            preview: "Study of vector quantities, vector operations, and their applications in physics. Includes vector addition, subtraction, and multiplication methods." 
          },
          { 
            id: 3, 
            title: "Kinematics", 
            notesPath: "/notes/physics/kinematics.pdf",
            preview: "Analysis of motion without considering its causes. Covers displacement, velocity, acceleration, and equations of motion." 
          },
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
    description: "Investigation of matter, its composition, properties, and transformations.",
    areas: [
      {
        name: "General and Physical Chemistry",
        chapters: [
          { 
            id: 1, 
            title: "Foundation and Fundamentals", 
            notesPath: "/notes/chemistry/foundations.pdf",
            preview: "Introduction to basic chemistry concepts and principles. Covers scientific method, matter classification, and physical/chemical changes."
          },
          { 
            id: 2, 
            title: "Stoichiometry", 
            notesPath: "/notes/chemistry/stoichiometry.pdf",
            preview: "Study of quantitative relationships in chemical reactions. Includes mole concepts, limiting reactants, and percent yield calculations."
          },
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
    description: "Analysis of patterns, numbers, quantities, structures, and their relationships.",
    areas: [
      {
        name: "Algebra",
        chapters: [
          { 
            id: 1, 
            title: "Logic and Set", 
            notesPath: "/notes/mathematics/logic-set.pdf",
            preview: "Fundamentals of logical reasoning and set theory. Covers logical operations, set operations, and their applications in mathematics."
          },
          { 
            id: 2, 
            title: "Functions", 
            notesPath: "/notes/mathematics/functions.pdf",
            preview: "Study of relations between sets. Includes domain, range, types of functions, and functional operations."
          },
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
    description: "Exploration of plant life, their structures, processes, and ecological roles.",
    areas: [
      {
        name: "Unit 1: Biomolecules and Cell Biology",
        chapters: [
          { id: 1, title: "Biomolecules", notesPath: "/notes/botany/biomolecules.pdf" },
          { id: 2, title: "Cell", notesPath: "/notes/botany/cell.pdf" }
        ]
      },
      {
        name: "Unit 2: Floral Diversity",
        chapters: [
          { id: 3, title: "Introduction", notesPath: "/notes/botany/floral-intro.pdf" },
          { id: 4, title: "Fungi", notesPath: "/notes/botany/fungi.pdf" },
          { id: 5, title: "Lichen", notesPath: "/notes/botany/lichen.pdf" },
          { id: 6, title: "Algae", notesPath: "/notes/botany/algae.pdf" },
          { id: 7, title: "Bryophyta", notesPath: "/notes/botany/bryophyta.pdf" },
          { id: 8, title: "Pteridophyta", notesPath: "/notes/botany/pteridophyta.pdf" },
          { id: 9, title: "Gymnosperm", notesPath: "/notes/botany/gymnosperm.pdf" },
          { id: 10, title: "Angiosperm", notesPath: "/notes/botany/angiosperm.pdf" }
        ]
      },
      {
        name: "Unit 3: Introductory Microbiology",
        chapters: [
          { id: 11, title: "Monera", notesPath: "/notes/botany/monera.pdf" },
          { id: 12, title: "Virus", notesPath: "/notes/botany/virus.pdf" },
          { id: 13, title: "Impacts of Biotechnology", notesPath: "/notes/botany/biotechnology.pdf" }
        ]
      },
      {
        name: "Unit 4: Ecology",
        chapters: [
          { id: 14, title: "Ecosystem Ecology", notesPath: "/notes/botany/ecosystem.pdf" },
          { id: 15, title: "Ecological Adaptation", notesPath: "/notes/botany/adaptation.pdf" },
          { id: 16, title: "Ecological Imbalances", notesPath: "/notes/botany/imbalances.pdf" }
        ]
      },
      {
        name: "Unit 5: Vegetation",
        chapters: [
          { id: 17, title: "Vegetation", notesPath: "/notes/botany/vegetation.pdf" }
        ]
      },
      {
        name: "Unit 6: Introduction to Biology",
        chapters: [
          { id: 18, title: "Introduction to Biology", notesPath: "/notes/botany/intro-biology.pdf" }
        ]
      },
      {
        name: "Unit 7: Evolutionary Biology",
        chapters: [
          { id: 19, title: "Life and its Origin", notesPath: "/notes/botany/life-origin.pdf" },
          { id: 20, title: "Evidences of Evolution", notesPath: "/notes/botany/evolution-evidence.pdf" },
          { id: 21, title: "Theories of Evolution", notesPath: "/notes/botany/evolution-theories.pdf" }
        ]
      }
    ]
  },
  {
    id: "zoology",
    name: "Zoology",
    icon: "mouse",
    description: "Exploration of animal life, including their behavior, biology, and habitats.",
    areas: [
      {
        name: "Unit 1: Biomolecules and Cell Biology",
        chapters: [
          { id: 1, title: "Cell Division", notesPath: "/notes/zoology/cell-division.pdf" }
        ]
      },
      {
        name: "Unit 7: Evolutionary Biology",
        chapters: [
          { id: 2, title: "Human Evolution", notesPath: "/notes/zoology/human-evolution.pdf" }
        ]
      },
      {
        name: "Unit 8: Faunal Diversity",
        chapters: [
          { id: 3, title: "Protista", notesPath: "/notes/zoology/protista.pdf" },
          { id: 4, title: "Animalia", notesPath: "/notes/zoology/animalia.pdf" },
          { id: 5, title: "Earthworm", notesPath: "/notes/zoology/earthworm.pdf" },
          { id: 6, title: "Frog", notesPath: "/notes/zoology/frog.pdf" }
        ]
      },
      {
        name: "Unit 9: Biota and Environment",
        chapters: [
          { id: 7, title: "Animal Adaptation", notesPath: "/notes/zoology/adaptation.pdf" },
          { id: 8, title: "Animal Behavior", notesPath: "/notes/zoology/behavior.pdf" },
          { id: 9, title: "Environmental Pollution", notesPath: "/notes/zoology/pollution.pdf" }
        ]
      },
      {
        name: "Unit 10: Conservation Biology",
        chapters: [
          { id: 10, title: "Conservation Biology", notesPath: "/notes/zoology/conservation.pdf" }
        ]
      }
    ]
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "laptop",
    description: "Study of algorithms, computational systems, and the principles of programming and data processing.",
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
    description: "Exploration of the English language, its literature, and communication skills.",
    areas: [
      {
        name: "Section II: Literature",
        chapters: [
          { id: 1, title: "Short Stories", notesPath: "/notes/english/short-stories.pdf" },
          { id: 2, title: "Poems", notesPath: "/notes/english/poems.pdf" },
          { id: 3, title: "Essays", notesPath: "/notes/english/essays.pdf" },
          { id: 4, title: "One Act Plays", notesPath: "/notes/english/one-act-plays.pdf" }
        ]
      },
      {
        name: "Short Stories",
        chapters: [
          { id: 5, title: "The Selfish Giant", notesPath: "/notes/english/short-stories/selfish-giant.pdf" },
          { id: 6, title: "The Oval Portrait", notesPath: "/notes/english/short-stories/oval-portrait.pdf" },
          { id: 7, title: "God Sees the Truth but Waits", notesPath: "/notes/english/short-stories/god-sees-truth.pdf" },
          { id: 8, title: "The Wish", notesPath: "/notes/english/short-stories/wish.pdf" },
          { id: 9, title: "Civil Peace", notesPath: "/notes/english/short-stories/civil-peace.pdf" },
          { id: 10, title: "Two Little Soldiers", notesPath: "/notes/english/short-stories/two-little-soldiers.pdf" },
          { id: 11, title: "An Astrologer's Day", notesPath: "/notes/english/short-stories/astrologers-day.pdf" }
        ]
      },
      {
        name: "Poems",
        chapters: [
          { id: 12, title: "Corona Says", notesPath: "/notes/english/poems/corona-says.pdf" },
          { id: 13, title: "A Red, Red Rose", notesPath: "/notes/english/poems/red-rose.pdf" },
          { id: 14, title: "All the World's a Stage", notesPath: "/notes/english/poems/worlds-stage.pdf" },
          { id: 15, title: "Who are you, little i?", notesPath: "/notes/english/poems/who-are-you.pdf" },
          { id: 16, title: "The Gift in Wartime", notesPath: "/notes/english/poems/gift-wartime.pdf" }
        ]
      },
      {
        name: "Essays",
        chapters: [
          { id: 17, title: "Sharing Tradition", notesPath: "/notes/english/essays/sharing-tradition.pdf" },
          { id: 18, title: "How to Live Before You Die", notesPath: "/notes/english/essays/how-to-live.pdf" },
          { id: 19, title: "What I Require from Life", notesPath: "/notes/english/essays/require-life.pdf" },
          { id: 20, title: "What is Poverty?", notesPath: "/notes/english/essays/what-poverty.pdf" },
          { id: 21, title: "Scientific Research is a Token of Humankind's Survival", notesPath: "/notes/english/essays/scientific-research.pdf" }
        ]
      },
      {
        name: "One Act Plays",
        chapters: [
          { id: 22, title: "Trifles", notesPath: "/notes/english/one-act-plays/trifles.pdf" },
          { id: 23, title: "A Sunny Morning", notesPath: "/notes/english/one-act-plays/sunny-morning.pdf" },
          { id: 24, title: "Refund", notesPath: "/notes/english/one-act-plays/refund.pdf" }
        ]
      }
    ]
  },
  {
    id: "nepali",
    name: "नेपाली",
    icon: "book",
    description: "Exploration of the Nepali language, its literature, and cultural significance.",
    areas: [
      {
        name: "Language and Literature",
        chapters: [
          { id: 1, title: "वीर पुर्खा (कविता)", notesPath: "/notes/nepali/poetry.pdf" },
          { id: 2, title: "गाउँको माया (सामाजिक कथा)", notesPath: "/notes/nepali/story.pdf" },
          { id: 3, title: "संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध)", notesPath: "/notes/nepali/essay.pdf" },
          { id: 4, title: "योगमाया (राष्ट्रिय जीवनी)", notesPath: "/notes/nepali/biography.pdf" },
          { id: 5, title: "साथीलाई चिठी (चिठी)", notesPath: "/notes/nepali/letter-writing.pdf" },
          { id: 6, title: "त्यो फेरि फर्कला ? (मनोवैज्ञानिक कथा)", notesPath: "/notes/nepali/short-drama.pdf" },
          { id: 7, title: "पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध)", notesPath: "/notes/nepali/reportage.pdf" },
          { id: 8, title: "लौ आयो ताजा खबर (लघु नाटक)", notesPath: "/notes/nepali/dialogue.pdf" },
          { id: 9, title: "सफलताको कथा (रिपोर्ताजमूलक रचना)", notesPath: "/notes/nepali/diary.pdf" },
          { id: 10, title: "कृषिशालामा एक दिन (संवाद)", notesPath: "/notes/nepali/speech.pdf" },  
          { id: 11, title: "रारा भ्रमण (दैनिकी)", notesPath: "/notes/nepali/essay.pdf" },
          { id: 12, title: "जलस्रोत र ऊर्जा (वक्तृता)", notesPath: "/notes/nepali/essay.pdf" }
        
        ]
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};
