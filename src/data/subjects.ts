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
    description: "Physics is the study of matter, energy, and their interactions. It is a fundamental science that provides a framework for understanding the natural world.",
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
          { id: 3, title: "Atomic Structure", notesPath: "https://drive.google.com/file/d/1KUizHD7aIgPuVkRo7KVl8i0fqOgCzHN5/view?usp=sharing", preview: "Study of the structure of atoms, including protons, neutrons, and electrons. Covers atomic number, atomic mass, and electron configurations." },
          { id: 4, title: "Classification of Elements", notesPath: "/notes/chemistry/classification.pdf", preview: "Classification of elements based on their atomic structure and chemical properties. Includes periodic table, electron configurations, and chemical reactivity." },
          { id: 5, title: "Chemical Bonding", notesPath: "/notes/chemistry/chemical-bonding.pdf", preview: "Study of the formation and properties of chemical bonds. Includes covalent, ionic, and metallic bonds." },
          { id: 6, title: "Oxidation and Reduction", notesPath: "/notes/chemistry/redox.pdf", preview: "Study of oxidation and reduction reactions. Includes electron transfer, oxidation states, and redox reactions." },
          { id: 7, title: "States of Matter", notesPath: "/notes/chemistry/states-matter.pdf", preview: "Study of the physical states of matter. Includes gas laws, phase transitions, and intermolecular forces."   },
          { id: 8, title: "Chemical Equilibrium", notesPath: "/notes/chemistry/equilibrium.pdf", preview: "Study of chemical reactions at equilibrium. Includes equilibrium constants, Le Chatelier's principle, and reaction direction." }
        ]
      },
      {
        name: "Inorganic Chemistry",
        chapters: [
          { id: 9, title: "Chemistry of Non-Metals", notesPath: "https://drive.google.com/file/d/1qoKEdrVarNrrJLmSHDxMRoCt4RMfO7dh/view?usp=sharing", preview: "Study of the chemistry of non-metals. Includes halogens, noble gases, and other non-metallic elements." },
          { id: 10, title: "Chemistry of Metals", notesPath: "/notes/chemistry/metals.pdf", preview: "Study of the chemistry of metals. Includes transition metals, alkaline earth metals, and other metallic elements."   },
          { id: 11, title: "Bio-inorganic Chemistry", notesPath: "/notes/chemistry/bio-inorganic.pdf", preview: "Study of the chemistry of living organisms. Includes enzymes, coenzymes, and other biologically active compounds." }
        ]
      },
      {
        name: "Organic Chemistry",
        chapters: [
          { id: 12, title: "Basic Concepts", notesPath: "/notes/chemistry/organic-concepts.pdf", preview: "Introduction to organic chemistry. Covers functional groups, isomers, and chemical reactions." },
          { id: 13, title: "Fundamental Principles", notesPath: "/notes/chemistry/organic-principles.pdf", preview: "Study of the fundamental principles of organic chemistry. Includes molecular structure, bonding, and reaction mechanisms." },
          { id: 14, title: "Hydrocarbons", notesPath: "/notes/chemistry/hydrocarbons.pdf", preview: "Study of the chemistry of hydrocarbons. Includes alkanes, alkenes, and alkynes." },
          { id: 15, title: "Aromatic Hydrocarbons", notesPath: "/notes/chemistry/aromatic.pdf", preview: "Study of the chemistry of aromatic hydrocarbons. Includes benzene, toluene, and xylene." }
        ]
      },
      {
        name: "Applied Chemistry",
        chapters: [
          { id: 16, title: "Fundamentals of Applied Chemistry", notesPath: "/notes/chemistry/applied-fundamentals.pdf", preview: "Study of the fundamentals of applied chemistry. Includes chemical reactions, stoichiometry, and chemical equilibrium." },
          { id: 17, title: "Modern Chemical Manufactures", notesPath: "/notes/chemistry/modern-manufactures.pdf", preview: "Study of the modern chemical manufacturing process. Includes chemical reactions, stoichiometry, and chemical equilibrium." }
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
            preview: "Fundamentals of logical reasoning and set theory. Covers logical operations, set operations, and their applications in mathematics ."
          },
          { 
            id: 2, 
            title: "Functions", 
            notesPath: "/notes/mathematics/functions.pdf",
            preview: "Study of relations between sets. Includes domain, range, types of functions, and functional operations."
          },
          { id: 3, title: "Sequence/Series", notesPath: "/notes/mathematics/sequence-series.pdf", preview: "Study of sequences and series. Includes arithmetic and geometric sequences, series, and their applications in mathematics." },
          { id: 4, title: "Matrices", notesPath: "/notes/mathematics/matrices.pdf", preview: "Study of matrices and their operations. Includes matrix addition, subtraction, multiplication, and determinant." },
          { id: 5, title: "Quadratic Equations", notesPath: "/notes/mathematics/quadratic-equations.pdf", preview: "Study of quadratic equations and their solutions. Includes quadratic formula, discriminant, and quadratic equations." },
          { id: 6, title: "Complex Numbers", notesPath: "/notes/mathematics/complex-numbers.pdf", preview: "Study of complex numbers and their operations. Includes complex numbers, complex plane, and complex equations." }
        ]
      },
      {
        name: "Trigonometry",
        chapters: [
          { id: 7, title: "Trigonometric Functions", notesPath: "/notes/mathematics/trigonometric-functions.pdf", preview: "Study of trigonometric functions. Includes sine, cosine, tangent, and their properties." },
          { id: 8, title: "Inverse Circular Functions", notesPath: "/notes/mathematics/inverse-circular.pdf", preview: "Study of inverse circular functions. Includes arcsine, arccosine, and arctangent." },
          { id: 9, title: "Trigonometric Equations", notesPath: "/notes/mathematics/trigonometric-equations.pdf", preview: "Study of trigonometric equations and their solutions. Includes trigonometric identities, equations, and their applications in mathematics." }
        ]
      },
      {
        name: "Analytic Geometry",
        chapters: [
          { id: 10, title: "Straight Lines", notesPath: "/notes/mathematics/straight-lines.pdf", preview: "Study of straight lines and their properties. Includes slope, intercept, and distance between points." },
          { id: 11, title: "Pair of Lines", notesPath: "/notes/mathematics/pair-of-lines.pdf", preview: "Study of pair of lines and their properties. Includes angle between lines, distance between lines, and pair of lines." },
          { id: 12, title: "Coordinates in Space", notesPath: "/notes/mathematics/coordinates-space.pdf", preview: "Study of coordinates in space. Includes coordinates in three-dimensional space, distance between points, and coordinates in space." }
        ]
      },
      {
        name: "Vectors",
        chapters: [
          { id: 13, title: "Collinear Vectors", notesPath: "/notes/mathematics/collinear-vectors.pdf", preview: "Study of collinear vectors and their properties. Includes collinear vectors, distance between vectors, and collinear vectors." },
          { id: 14, title: "Linear Dependence", notesPath: "/notes/mathematics/linear-dependence.pdf", preview: "Study of linear dependence and their properties. Includes linear dependence, distance between vectors, and linear dependence." }
        ]
      },
      {
        name: "Statistics and Probability",
        chapters: [
          { id: 15, title: "Standard Deviation", notesPath: "/notes/mathematics/standard-deviation.pdf", preview: "Study of standard deviation and their properties. Includes standard deviation, distance between vectors, and standard deviation." },
          { id: 16, title: "Probability Laws", notesPath: "/notes/mathematics/probability-laws.pdf", preview: "Study of probability laws and their properties. Includes probability laws, distance between vectors, and probability laws." }
        ]
      },
      {
        name: "Calculus",
        chapters: [
          { id: 17, title: "Limits", notesPath: "/notes/mathematics/limits.pdf", preview: "Study of limits and their properties. Includes limits, distance between vectors, and limits." },
          { id: 18, title: "Derivatives", notesPath: "/notes/mathematics/derivatives.pdf", preview: "Study of derivatives and their properties. Includes derivatives, distance between vectors, and derivatives." },
          { id: 19, title: "Integration", notesPath: "/notes/mathematics/integration.pdf", preview: "Study of integration and their properties. Includes integration, distance between vectors, and integration." },
          { id: 20, title: "Area Under Curves", notesPath: "/notes/mathematics/area-curves.pdf", preview: "Study of area under curves and their properties. Includes area under curves, distance between vectors, and area under curves." }
        ]
      },
      {
        name: "Computational Methods/Mechanics",
        chapters: [
          { id: 21, title: "Numerical Integration", notesPath: "/notes/mathematics/numerical-integration.pdf", preview: "Study of numerical integration and their properties. Includes numerical integration, distance between vectors, and numerical integration." },
          { id: 22, title: "Motion Under Gravity", notesPath: "/notes/mathematics/motion-gravity.pdf", preview: "Study of motion under gravity and their properties. Includes motion under gravity, distance between vectors, and motion under gravity." }
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
          { id: 1, title: "Biomolecules", notesPath: "/notes/botany/biomolecules.pdf", preview: "Study of biomolecules and their properties. Includes biomolecules, distance between vectors, and biomolecules." },
          { id: 2, title: "Cell", notesPath: "/notes/botany/cell.pdf", preview: "Study of cell and their properties. Includes cell, distance between vectors, and cell." }
        ]
      },
      {
        name: "Unit 2: Floral Diversity",
        chapters: [
          { id: 3, title: "Introduction", notesPath: "/notes/botany/floral-intro.pdf", preview: "Study of introduction and their properties. Includes introduction, distance between vectors, and introduction." },
          { id: 4, title: "Fungi", notesPath: "/notes/botany/fungi.pdf", preview: "Study of fungi and their properties. Includes fungi, distance between vectors, and fungi." },
          { id: 5, title: "Lichen", notesPath: "/notes/botany/lichen.pdf", preview: "Study of lichen and their properties. Includes lichen, distance between vectors, and lichen." },
          { id: 6, title: "Algae", notesPath: "/notes/botany/algae.pdf", preview: "Study of algae and their properties. Includes algae, distance between vectors, and algae." },
          { id: 7, title: "Bryophyta", notesPath: "/notes/botany/bryophyta.pdf", preview: "Study of bryophyta and their properties. Includes bryophyta, distance between vectors, and bryophyta."  },
          { id: 8, title: "Pteridophyta", notesPath: "/notes/botany/pteridophyta.pdf", preview: "Study of pteridophyta and their properties. Includes pteridophyta, distance between vectors, and pteridophyta." },
          { id: 9, title: "Gymnosperm", notesPath: "/notes/botany/gymnosperm.pdf", preview: "Study of gymnosperm and their properties. Includes gymnosperm, distance between vectors, and gymnosperm."   },
          { id: 10, title: "Angiosperm", notesPath: "/notes/botany/angiosperm.pdf", preview: "Study of angiosperm and their properties. Includes angiosperm, distance between vectors, and angiosperm." }
        ]
      },
      {
        name: "Unit 3: Introductory Microbiology",
        chapters: [
          { id: 11, title: "Monera", notesPath: "/notes/botany/monera.pdf", preview: "Study of monera and their properties. Includes monera, distance between vectors, and monera." },
          { id: 12, title: "Virus", notesPath: "/notes/botany/virus.pdf", preview: "Study of virus and their properties. Includes virus, distance between vectors, and virus." },
          { id: 13, title: "Impacts of Biotechnology", notesPath: "/notes/botany/biotechnology.pdf", preview: "Study of impacts of biotechnology and their properties. Includes impacts of biotechnology, distance between vectors, and impacts of biotechnology." }
        ]
      },
      {
        name: "Unit 4: Ecology",
        chapters: [
          { id: 14, title: "Ecosystem Ecology", notesPath: "/notes/botany/ecosystem.pdf", preview: "Study of ecosystem ecology and their properties. Includes ecosystem ecology, distance between vectors, and ecosystem ecology." },
          { id: 15, title: "Ecological Adaptation", notesPath: "/notes/botany/adaptation.pdf", preview: "Study of ecological adaptation and their properties. Includes ecological adaptation, distance between vectors, and ecological adaptation." },
          { id: 16, title: "Ecological Imbalances", notesPath: "/notes/botany/imbalances.pdf", preview: "Study of ecological imbalances and their properties. Includes ecological imbalances, distance between vectors, and ecological imbalances." }
        ]
      },
      {
        name: "Unit 5: Vegetation",
        chapters: [
          { id: 17, title: "Vegetation", notesPath: "/notes/botany/vegetation.pdf", preview: "Study of vegetation and their properties. Includes vegetation, distance between vectors, and vegetation." }
        ]
      },
      
    ]
  },
  {
    id: "zoology",
    name: "Zoology",
    icon: "mouse",
    description: "Exploration of animal life, including their behavior, biology, and habitats.",
    areas: [
      {
        name: "Unit 6: Introduction to Biology",
        chapters: [
          { id: 1, title: "Introduction to Biology", notesPath: "/notes/botany/intro-biology.pdf", preview: "Study of introduction to biology and their properties. Includes introduction to biology, distance between vectors, and introduction to biology." }
        ]
      },
      {
        name: "Unit 7: Evolutionary Biology",
        chapters: [
          { id: 2, title: "Life and its Origin", notesPath: "/notes/botany/life-origin.pdf", preview: "Study of life and its origin and their properties. Includes life and its origin, distance between vectors, and life and its origin." },
          { id: 3, title: "Evidences of Evolution", notesPath: "/notes/botany/evolution-evidence.pdf", preview: "Study of evidences of evolution and their properties. Includes evidences of evolution, distance between vectors, and evidences of evolution." },
          { id: 4, title: "Theories of Evolution", notesPath: "/notes/botany/evolution-theories.pdf", preview: "Study of theories of evolution and their properties. Includes theories of evolution, distance between vectors, and theories of evolution." },
          { id: 5, title: "Human Evolution", notesPath: "/notes/botany/human-evolution.pdf", preview: "Study of human evolution and their properties. Includes human evolution, distance between vectors, and human evolution." }
        ]
      },
      {
        name: "Unit 8: Faunal Diversity",
        chapters: [
          { id: 6, title: "Protista", notesPath: "/notes/zoology/protista.pdf", preview: "Study of protista and their properties. Includes protista, distance between vectors, and protista." },
          { id: 7, title: "Animalia", notesPath: "/notes/zoology/animalia.pdf", preview: "Study of animalia and their properties. Includes animalia, distance between vectors, and animalia." },
          { id: 8, title: "Earthworm", notesPath: "/notes/zoology/earthworm.pdf", preview: "Study of earthworm and their properties. Includes earthworm, distance between vectors, and earthworm." },
          { id: 9, title: "Frog", notesPath: "/notes/zoology/frog.pdf", preview: "Study of frog and their properties. Includes frog, distance between vectors, and frog." }
        ]
      },
      {
        name: "Unit 9: Biota and Environment",
        chapters: [
          { id: 10, title: "Animal Adaptation", notesPath: "/notes/zoology/adaptation.pdf", preview: "Study of animal adaptation and their properties. Includes animal adaptation, distance between vectors, and animal adaptation." },
          { id: 11, title: "Animal Behavior", notesPath: "/notes/zoology/behavior.pdf", preview: "Study of animal behavior and their properties. Includes animal behavior, distance between vectors, and animal behavior." },
          { id: 12, title: "Environmental Pollution", notesPath: "/notes/zoology/pollution.pdf", preview: "Study of environmental pollution and their properties. Includes environmental pollution, distance between vectors, and environmental pollution." }
        ]
      },
      {
        name: "Unit 10: Conservation Biology",
        chapters: [
          { id: 13, title: "Conservation Biology", notesPath: "/notes/zoology/conservation.pdf", preview: "Study of conservation biology and their properties. Includes conservation biology, distance between vectors, and conservation biology." }
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
          { id: 1, title: "Computer System", notesPath: "/notes/computer-science/computer-system.pdf", preview: "Study of computer system and their properties. Includes computer system, distance between vectors, and computer system." },
          { id: 2, title: "Number System & Boolean Logic", notesPath: "/notes/computer-science/number-system.pdf", preview: "Study of number system and boolean logic and their properties. Includes number system, distance between vectors, and number system." },
          { id: 3, title: "Computer Software & OS", notesPath: "/notes/computer-science/software-os.pdf", preview: "Study of computer software and os and their properties. Includes computer software, distance between vectors, and computer software." },
          { id: 4, title: "Application Package", notesPath: "/notes/computer-science/application-package.pdf", preview: "Study of application package and their properties. Includes application package, distance between vectors, and application package." },
          { id: 5, title: "Programming Concepts", notesPath: "/notes/computer-science/programming-concepts.pdf", preview: "Study of programming concepts and their properties. Includes programming concepts, distance between vectors, and programming concepts."   },
          { id: 6, title: "Web Technology", notesPath: "/notes/computer-science/web-technology.pdf", preview: "Study of web technology and their properties. Includes web technology, distance between vectors, and web technology."   },
          { id: 7, title: "Multimedia", notesPath: "/notes/computer-science/multimedia.pdf", preview: "Study of multimedia and their properties. Includes multimedia, distance between vectors, and multimedia."   },
          { id: 8, title: "Information Security", notesPath: "/notes/computer-science/information-security.pdf", preview: "Study of information security and their properties. Includes information security, distance between vectors, and information security." }
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
          { id: 1, title: "Short Stories", notesPath: "/notes/english/short-stories.pdf", preview: "Study of short stories and their properties. Includes short stories, distance between vectors, and short stories." },
          { id: 2, title: "Poems", notesPath: "/notes/english/poems.pdf", preview: "Study of poems and their properties. Includes poems, distance between vectors, and poems." },
          { id: 3, title: "Essays", notesPath: "/notes/english/essays.pdf", preview: "Study of essays and their properties. Includes essays, distance between vectors, and essays." },
          { id: 4, title: "One Act Plays", notesPath: "/notes/english/one-act-plays.pdf", preview: "Study of one act plays and their properties. Includes one act plays, distance between vectors, and one act plays."  }
        ]
      },
      {
        name: "Short Stories",
        chapters: [
          { id: 5, title: "The Selfish Giant", notesPath: "/notes/english/short-stories/selfish-giant.pdf", preview: "Study of the selfish giant and their properties. Includes the selfish giant, distance between vectors, and the selfish giant." },
          { id: 6, title: "The Oval Portrait", notesPath: "/notes/english/short-stories/oval-portrait.pdf", preview: "Study of the oval portrait and their properties. Includes the oval portrait, distance between vectors, and the oval portrait." },
          { id: 7, title: "God Sees the Truth but Waits", notesPath: "/notes/english/short-stories/god-sees-truth.pdf", preview: "Study of god sees the truth but waits and their properties. Includes god sees the truth but waits, distance between vectors, and god sees the truth but waits." },
          { id: 8, title: "The Wish", notesPath: "/notes/english/short-stories/wish.pdf", preview: "Study of the wish and their properties. Includes the wish, distance between vectors, and the wish." },
          { id: 9, title: "Civil Peace", notesPath: "/notes/english/short-stories/civil-peace.pdf", preview: "Study of civil peace and their properties. Includes civil peace, distance between vectors, and civil peace." },
          { id: 10, title: "Two Little Soldiers", notesPath: "/notes/english/short-stories/two-little-soldiers.pdf", preview: "Study of two little soldiers and their properties. Includes two little soldiers, distance between vectors, and two little soldiers." },
          { id: 11, title: "An Astrologer's Day", notesPath: "/notes/english/short-stories/astrologers-day.pdf", preview: "Study of an astrologer's day and their properties. Includes an astrologer's day, distance between vectors, and an astrologer's day." }
        ]
      },
      {
        name: "Poems",
        chapters: [
          { id: 12, title: "Corona Says", notesPath: "/notes/english/poems/corona-says.pdf", preview: "Study of corona says and their properties. Includes corona says, distance between vectors, and corona says." },
          { id: 13, title: "A Red, Red Rose", notesPath: "/notes/english/poems/red-rose.pdf", preview: "Study of a red, red rose and their properties. Includes a red, red rose, distance between vectors, and a red, red rose." },
          { id: 14, title: "All the World's a Stage", notesPath: "/notes/english/poems/worlds-stage.pdf", preview: "Study of all the world's a stage and their properties. Includes all the world's a stage, distance between vectors, and all the world's a stage." },
          { id: 15, title: "Who are you, little i?", notesPath: "/notes/english/poems/who-are-you.pdf", preview: "Study of who are you, little i? and their properties. Includes who are you, little i?, distance between vectors, and who are you, little i?." },
          { id: 16, title: "The Gift in Wartime", notesPath: "/notes/english/poems/gift-wartime.pdf", preview: "Study of the gift in wartime and their properties. Includes the gift in wartime, distance between vectors, and the gift in wartime." }
        ]
      },
      {
        name: "Essays",
        chapters: [
          { id: 17, title: "Sharing Tradition", notesPath: "/notes/english/essays/sharing-tradition.pdf", preview: "Study of sharing tradition and their properties. Includes sharing tradition, distance between vectors, and sharing tradition." },
          { id: 18, title: "How to Live Before You Die", notesPath: "/notes/english/essays/how-to-live.pdf", preview: "Study of how to live before you die and their properties. Includes how to live before you die, distance between vectors, and how to live before you die." },
          { id: 19, title: "What I Require from Life", notesPath: "/notes/english/essays/require-life.pdf", preview: "Study of what i require from life and their properties. Includes what i require from life, distance between vectors, and what i require from life." },
          { id: 20, title: "What is Poverty?", notesPath: "/notes/english/essays/what-poverty.pdf", preview: "Study of what is poverty and their properties. Includes what is poverty, distance between vectors, and what is poverty." },
          { id: 21, title: "Scientific Research is a Token of Humankind's Survival", notesPath: "/notes/english/essays/scientific-research.pdf", preview: "Study of scientific research is a token of humankind's survival and their properties. Includes scientific research is a token of humankind's survival, distance between vectors, and scientific research is a token of humankind's survival." }
        ]
      },
      {
        name: "One Act Plays",
        chapters: [
          { id: 22, title: "Trifles", notesPath: "/notes/english/one-act-plays/trifles.pdf", preview: "Study of trifles and their properties. Includes trifles, distance between vectors, and trifles." },
          { id: 23, title: "A Sunny Morning", notesPath: "/notes/english/one-act-plays/sunny-morning.pdf", preview: "Study of a sunny morning and their properties. Includes a sunny morning, distance between vectors, and a sunny morning." },
          { id: 24, title: "Refund", notesPath: "/notes/english/one-act-plays/refund.pdf", preview: "Study of refund and their properties. Includes refund, distance between vectors, and refund." }
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
          { id: 1, title: "वीर पुर्खा (कविता)", notesPath: "/notes/nepali/poetry.pdf", preview: "Study of वीर पुर्खा (कविता) and their properties. Includes वीर पुर्खा (कविता), distance between vectors, and वीर पुर्खा (कविता)." },
          { id: 2, title: "गाउँको माया (सामाजिक कथा)", notesPath: "/notes/nepali/story.pdf", preview: "Study of गाउँको माया (सामाजिक कथा) and their properties. Includes गाउँको माया (सामाजिक कथा), distance between vectors, and गाउँको माया (सामाजिक कथा)." },
          { id: 3, title: "संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध)", notesPath: "/notes/nepali/essay.pdf", preview: "Study of संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध) and their properties. Includes संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध), distance between vectors, and संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध)."   },
          { id: 4, title: "योगमाया (राष्ट्रिय जीवनी)", notesPath: "/notes/nepali/biography.pdf", preview: "Study of योगमाया (राष्ट्रिय जीवनी) and their properties. Includes योगमाया (राष्ट्रिय जीवनी), distance between vectors, and योगमाया (राष्ट्रिय जीवनी)."  },
          { id: 5, title: "साथीलाई चिठी (चिठी)", notesPath: "/notes/nepali/letter-writing.pdf", preview: "Study of साथीलाई चिठी (चिठी) and their properties. Includes साथीलाई चिठी (चिठी), distance between vectors, and साथीलाई चिठी (चिठी)."  },
          { id: 6, title: "त्यो फेरि फर्कला ? (मनोवैज्ञानिक कथा)", notesPath: "/notes/nepali/short-drama.pdf", preview: "Study of त्यो फेरि फर्कला ? (मनोवैज्ञानिक कथा) and their properties. Includes त्यो फेरि फर्कला ? (मनोवैज्ञानिक कथा), distance between vectors, and त्यो फेरि फर्कला ? (मनोवैज्ञानिक कथा)."  },
          { id: 7, title: "पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध)", notesPath: "/notes/nepali/reportage.pdf", preview: "Study of पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध) and their properties. Includes पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध), distance between vectors, and पर्यापर्यटनका सम्भावना र आयाम (वस्तुपरक निबन्ध)."  },
          { id: 8, title: "लौ आयो ताजा खबर (लघु नाटक)", notesPath: "/notes/nepali/dialogue.pdf", preview: "Study of लौ आयो ताजा खबर (लघु नाटक) and their properties. Includes लौ आयो ताजा खबर (लघु नाटक), distance between vectors, and लौ आयो ताजा खबर (लघु नाटक)."   },
          { id: 9, title: "सफलताको कथा (रिपोर्ताजमूलक रचना)", notesPath: "/notes/nepali/diary.pdf", preview: "Study of सफलताको कथा (रिपोर्ताजमूलक रचना) and their properties. Includes सफलताको कथा (रिपोर्ताजमूलक रचना), distance between vectors, and सफलताको कथा (रिपोर्ताजमूलक रचना)."  },
          { id: 10, title: "कृषिशालामा एक दिन (संवाद)", notesPath: "/notes/nepali/speech.pdf", preview: "Study of कृषिशालामा एक दिन (संवाद) and their properties. Includes कृषिशालामा एक दिन (संवाद), distance between vectors, and कृषिशालामा एक दिन (संवाद)."  },  
          { id: 11, title: "रारा भ्रमण (दैनिकी)", notesPath: "/notes/nepali/essay.pdf", preview: "Study of रारा भ्रमण (दैनिकी) and their properties. Includes रारा भ्रमण (दैनिकी), distance between vectors, and रारा भ्रमण (दैनिकी)." },
          { id: 12, title: "जलस्रोत र ऊर्जा (वक्तृता)", notesPath: "/notes/nepali/essay.pdf" }
        
        ]
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};
