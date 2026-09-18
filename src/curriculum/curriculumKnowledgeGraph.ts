/**
 * Engineering Study Guide App - Curriculum Knowledge Graph
 * 
 * Phase Group: 1 - Foundation & Strategy
 * Phase Number: 7
 * Status: Complete
 * 
 * Objective: Structure the engineering knowledge graph.
 * 
 * This file defines the comprehensive curriculum mapping for all engineering
 * disciplines covered by the app. It establishes the hierarchical structure
 * of courses, modules, lessons, and learning objectives that form the backbone
 * of the educational content system.
 * 
 * DELIVERABLE: Curriculum Knowledge Graph Database
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Engineering discipline types
 * Maps to specific course catalogs and accreditation standards
 */
export type EngineeringDiscipline =
  | 'mechanical'
  | 'electrical'
  | 'civil'
  | 'chemical'
  | 'computer'
  | 'aerospace'
  | 'biomedical'
  | 'industrial'
  | 'materials'
  | 'environmental';

/**
 * Academic level classification
 */
export type AcademicLevel =
  | 'freshman'    // Year 1 - Foundational courses
  | 'sophomore'   // Year 2 - Core engineering fundamentals
  | 'junior'      // Year 3 - Specialized topics
  | 'senior'      // Year 4 - Advanced applications
  | 'graduate';   // Master's/PhD level

/**
 * Content delivery formats supported
 */
export type ContentType =
  | 'video'                  // Recorded lectures, explanations
  | 'interactive_simulation' // Hands-on virtual labs
  | 'text'                   // Reading materials, articles
  | 'quiz'                   // Assessment questions
  | 'flashcard'              // Spaced repetition cards
  | 'equation_solver'        // Step-by-step problem solving
  | 'practice_problem'       // Worked examples
  | 'project'                // Capstone-style assignments
  | 'ar_visualization';      // 3D augmented reality models

/**
 * Bloom's Taxonomy levels for learning objectives
 */
export type BloomLevel =
  | 'remember'     // Recall facts and basic concepts
  | 'understand'   // Explain ideas or concepts
  | 'apply'        // Use information in new situations
  | 'analyze'      // Draw connections among ideas
  | 'evaluate'     // Justify a stand or decision
  | 'create';      // Produce new or original work

/**
 * Difficulty rating scale
 */
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Time estimation in minutes
 */
export type TimeEstimate = {
  min: number;
  max: number;
  average: number;
};

// ============================================================================
// CURRICULUM STRUCTURE INTERFACES
// ============================================================================

/**
 * Learning Objective
 * Specific, measurable outcomes for each lesson
 */
export interface LearningObjective {
  id: string;
  description: string;
  bloomLevel: BloomLevel;
  assessmentCriteria: string[];
}

/**
 * Lesson Configuration
 * Smallest unit of learning content
 */
export interface LessonConfig {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  difficulty: DifficultyLevel;
  estimatedTime: TimeEstimate;
  learningObjectives: LearningObjective[];
  prerequisites: string[];  // Lesson IDs that must be completed first
  tags: string[];
  resources: {
    videoUrl?: string;
    simulationUrl?: string;
    textContent?: string;
    quizId?: string;
    flashcardDeckId?: string;
    arModelUrl?: string;
  };
  metadata: {
    version: string;
    lastUpdated: string;
    authorId: string;
    reviewStatus: 'draft' | 'review' | 'published' | 'deprecated';
  };
}

/**
 * Module Configuration
 * Groups related lessons into thematic units
 */
export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  lessons: LessonConfig[];
  estimatedCompletionTime: TimeEstimate;
  learningOutcomes: string[];
  assessmentMethod: 'quiz' | 'project' | 'exam' | 'portfolio';
  passingScore: number;  // Percentage (0-100)
  badges: string[];  // Achievement badges awarded on completion
}

/**
 * Course Configuration
 * Full semester-length course structure
 */
export interface CourseConfig {
  id: string;
  code: string;  // e.g., "MECH101", "EE201"
  title: string;
  description: string;
  discipline: EngineeringDiscipline;
  academicLevel: AcademicLevel;
  modules: ModuleConfig[];
  totalHours: number;  // Expected total study hours
  credits: number;  // University credit hours
  prerequisites: string[];  // Course codes required before enrollment
  corequisites: string[];  // Courses recommended to take concurrently
  textbookReferences: {
    title: string;
    author: string;
    edition: number;
    isbn: string;
  }[];
  learningOutcomes: string[];  // ABET accreditation alignment
}

// ============================================================================
// BACHELOR'S CORE CURRICULUM - MECHANICAL ENGINEERING
// ============================================================================

/**
 * Mechanical Engineering Curriculum
 * Aligned with ASME (American Society of Mechanical Engineers) guidelines
 */
export const MECHANICAL_ENGINEERING_CURRICULUM: CourseConfig[] = [
  {
    id: 'mech-101',
    code: 'MECH101',
    title: 'Introduction to Mechanical Engineering',
    description: 'Foundational overview of mechanical engineering principles, design processes, and career paths.',
    discipline: 'mechanical',
    academicLevel: 'freshman',
    modules: [
      {
        id: 'mech101-mod1',
        title: 'Engineering Design Process',
        description: 'Learn the iterative design cycle used in mechanical engineering.',
        estimatedCompletionTime: { min: 180, max: 240, average: 210 },
        learningOutcomes: [
          'Define the engineering design process',
          'Apply design thinking to solve problems',
          'Create technical sketches and CAD models',
        ],
        assessmentMethod: 'project',
        passingScore: 70,
        badges: ['design-novice', 'cad-beginner'],
        lessons: [
          {
            id: 'mech101-mod1-lesson1',
            title: 'What is Mechanical Engineering?',
            description: 'Overview of the field and its applications.',
            contentType: 'video',
            difficulty: 1,
            estimatedTime: { min: 15, max: 20, average: 18 },
            learningObjectives: [
              {
                id: 'lo-1',
                description: 'Identify key areas of mechanical engineering practice',
                bloomLevel: 'remember',
                assessmentCriteria: ['List at least 5 subdisciplines'],
              },
            ],
            prerequisites: [],
            tags: ['introduction', 'overview', 'career'],
            resources: {
              videoUrl: '/content/mech101/intro-video.mp4',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
          {
            id: 'mech101-mod1-lesson2',
            title: 'The Design Cycle',
            description: 'Understanding iterate, prototype, test methodology.',
            contentType: 'interactive_simulation',
            difficulty: 2,
            estimatedTime: { min: 30, max: 45, average: 38 },
            learningObjectives: [
              {
                id: 'lo-2',
                description: 'Explain each stage of the design cycle',
                bloomLevel: 'understand',
                assessmentCriteria: ['Diagram the complete cycle', 'Provide examples'],
              },
            ],
            prerequisites: ['mech101-mod1-lesson1'],
            tags: ['design', 'process', 'methodology'],
            resources: {
              simulationUrl: '/content/mech101/design-cycle-sim.html',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
        ],
      },
    ],
    totalHours: 45,
    credits: 3,
    prerequisites: [],
    corequisites: ['MATH101', 'PHYS101'],
    textbookReferences: [
      {
        title: 'Mechanical Engineering Design',
        author: 'Shigley, Joseph',
        edition: 11,
        isbn: '978-0073398211',
      },
    ],
    learningOutcomes: [
      'Apply engineering design to produce solutions',
      'Communicate effectively with a range of audiences',
      'Develop and conduct appropriate experimentation',
    ],
  },
];

// ============================================================================
// BACHELOR'S CORE CURRICULUM - ELECTRICAL ENGINEERING
// ============================================================================

/**
 * Electrical Engineering Curriculum
 * Aligned with IEEE (Institute of Electrical and Electronics Engineers) guidelines
 */
export const ELECTRICAL_ENGINEERING_CURRICULUM: CourseConfig[] = [
  {
    id: 'ee-101',
    code: 'EE101',
    title: 'Circuit Analysis I',
    description: 'Fundamental concepts of electrical circuits including Ohm\'s Law, Kirchhoff\'s Laws, and network theorems.',
    discipline: 'electrical',
    academicLevel: 'freshman',
    modules: [
      {
        id: 'ee101-mod1',
        title: 'Basic Circuit Elements',
        description: 'Understanding resistors, capacitors, inductors, and sources.',
        estimatedCompletionTime: { min: 240, max: 300, average: 270 },
        learningOutcomes: [
          'Calculate voltage, current, and power in basic circuits',
          'Apply Ohm\'s Law and Kirchhoff\'s Laws',
          'Simplify resistor networks using series/parallel combinations',
        ],
        assessmentMethod: 'exam',
        passingScore: 75,
        badges: ['circuit-analyzer', 'ohm-master'],
        lessons: [
          {
            id: 'ee101-mod1-lesson1',
            title: 'Voltage and Current',
            description: 'Fundamental quantities in electrical engineering.',
            contentType: 'video',
            difficulty: 1,
            estimatedTime: { min: 20, max: 25, average: 22 },
            learningObjectives: [
              {
                id: 'ee-lo-1',
                description: 'Define voltage and current in physical terms',
                bloomLevel: 'remember',
                assessmentCriteria: ['Explain electron flow vs conventional current'],
              },
            ],
            prerequisites: [],
            tags: ['voltage', 'current', 'fundamentals'],
            resources: {
              videoUrl: '/content/ee101/voltage-current.mp4',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
          {
            id: 'ee101-mod1-lesson2',
            title: 'Ohm\'s Law Practice',
            description: 'Interactive problems applying V=IR relationships.',
            contentType: 'practice_problem',
            difficulty: 2,
            estimatedTime: { min: 30, max: 45, average: 38 },
            learningObjectives: [
              {
                id: 'ee-lo-2',
                description: 'Apply Ohm\'s Law to solve circuit problems',
                bloomLevel: 'apply',
                assessmentCriteria: ['Solve for unknown variables', 'Show work clearly'],
              },
            ],
            prerequisites: ['ee101-mod1-lesson1'],
            tags: ['ohms-law', 'problem-solving'],
            resources: {
              quizId: 'ee101-ohms-law-quiz',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
        ],
      },
    ],
    totalHours: 60,
    credits: 4,
    prerequisites: ['PHYS102'],
    corequisites: ['MATH102'],
    textbookReferences: [
      {
        title: 'Electric Circuits',
        author: 'Nilsson, James W.',
        edition: 11,
        isbn: '978-0134746968',
      },
    ],
    learningOutcomes: [
      'Analyze DC circuits using network theorems',
      'Design simple measurement circuits',
      'Use laboratory equipment safely and effectively',
    ],
  },
];

// ============================================================================
// BACHELOR'S CORE CURRICULUM - CIVIL ENGINEERING
// ============================================================================

/**
 * Civil Engineering Curriculum
 * Aligned with ASCE (American Society of Civil Engineers) guidelines
 */
export const CIVIL_ENGINEERING_CURRICULUM: CourseConfig[] = [
  {
    id: 'ce-101',
    code: 'CE101',
    title: 'Introduction to Civil Engineering',
    description: 'Survey of civil engineering disciplines including structural, geotechnical, transportation, and environmental engineering.',
    discipline: 'civil',
    academicLevel: 'freshman',
    modules: [
      {
        id: 'ce101-mod1',
        title: 'Infrastructure Systems',
        description: 'Understanding the built environment and its impact on society.',
        estimatedCompletionTime: { min: 180, max: 240, average: 210 },
        learningOutcomes: [
          'Identify major infrastructure systems',
          'Explain the role of civil engineers in society',
          'Discuss sustainability in infrastructure design',
        ],
        assessmentMethod: 'project',
        passingScore: 70,
        badges: ['infrastructure-explorer'],
        lessons: [
          {
            id: 'ce101-mod1-lesson1',
            title: 'Bridges and Structures',
            description: 'Types of bridges and their engineering principles.',
            contentType: 'ar_visualization',
            difficulty: 1,
            estimatedTime: { min: 25, max: 35, average: 30 },
            learningObjectives: [
              {
                id: 'ce-lo-1',
                description: 'Classify bridge types by structural system',
                bloomLevel: 'understand',
                assessmentCriteria: ['Identify beam, arch, suspension, cable-stayed bridges'],
              },
            ],
            prerequisites: [],
            tags: ['bridges', 'structures', 'visualization'],
            resources: {
              arModelUrl: '/content/ce101/bridge-models.ar',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
        ],
      },
    ],
    totalHours: 45,
    credits: 3,
    prerequisites: [],
    corequisites: ['MATH101', 'PHYS101'],
    textbookReferences: [
      {
        title: 'Civil Engineering: A Very Short Introduction',
        author: 'David Muir Wood',
        edition: 1,
        isbn: '978-0199239153',
      },
    ],
    learningOutcomes: [
      'Describe the scope of civil engineering practice',
      'Recognize ethical responsibilities in infrastructure design',
      'Appreciate the historical evolution of civil engineering',
    ],
  },
];

// ============================================================================
// BACHELOR'S CORE CURRICULUM - CHEMICAL ENGINEERING
// ============================================================================

/**
 * Chemical Engineering Curriculum
 * Aligned with AIChE (American Institute of Chemical Engineers) guidelines
 */
export const CHEMICAL_ENGINEERING_CURRICULUM: CourseConfig[] = [
  {
    id: 'che-101',
    code: 'CHE101',
    title: 'Material and Energy Balances',
    description: 'Fundamental principles of conservation of mass and energy applied to chemical processes.',
    discipline: 'chemical',
    academicLevel: 'sophomore',
    modules: [
      {
        id: 'che101-mod1',
        title: 'Mass Balance Fundamentals',
        description: 'Systematic approach to solving material balance problems.',
        estimatedCompletionTime: { min: 300, max: 360, average: 330 },
        learningOutcomes: [
          'Write material balance equations for steady-state systems',
          'Solve multi-unit process problems',
          'Apply degree of freedom analysis',
        ],
        assessmentMethod: 'exam',
        passingScore: 75,
        badges: ['mass-balance-master'],
        lessons: [
          {
            id: 'che101-mod1-lesson1',
            title: 'Conservation of Mass',
            description: 'The fundamental principle: what goes in must come out.',
            contentType: 'video',
            difficulty: 2,
            estimatedTime: { min: 25, max: 30, average: 28 },
            learningObjectives: [
              {
                id: 'che-lo-1',
                description: 'State the law of conservation of mass',
                bloomLevel: 'remember',
                assessmentCriteria: ['Write the general balance equation'],
              },
            ],
            prerequisites: [],
            tags: ['mass-balance', 'conservation', 'fundamentals'],
            resources: {
              videoUrl: '/content/che101/mass-conservation.mp4',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
        ],
      },
    ],
    totalHours: 60,
    credits: 4,
    prerequisites: ['CHEM101', 'MATH102'],
    corequisites: ['PHYS101'],
    textbookReferences: [
      {
        title: 'Elementary Principles of Chemical Processes',
        author: 'Felder, Richard M.',
        edition: 4,
        isbn: '978-0470616291',
      },
    ],
    learningOutcomes: [
      'Perform material and energy balances on chemical processes',
      'Use process simulation software',
      'Analyze reactive and non-reactive systems',
    ],
  },
];

// ============================================================================
// BACHELOR'S CORE CURRICULUM - COMPUTER ENGINEERING
// ============================================================================

/**
 * Computer Engineering Curriculum
 * Aligned with ACM/IEEE computing curricula guidelines
 */
export const COMPUTER_ENGINEERING_CURRICULUM: CourseConfig[] = [
  {
    id: 'cp-101',
    code: 'CP101',
    title: 'Digital Logic Design',
    description: 'Boolean algebra, combinational and sequential logic circuits, and introduction to hardware description languages.',
    discipline: 'computer',
    academicLevel: 'sophomore',
    modules: [
      {
        id: 'cp101-mod1',
        title: 'Boolean Algebra and Gates',
        description: 'Foundation of digital systems using binary logic.',
        estimatedCompletionTime: { min: 270, max: 330, average: 300 },
        learningOutcomes: [
          'Simplify Boolean expressions using Karnaugh maps',
          'Design combinational logic circuits',
          'Implement circuits using standard logic gates',
        ],
        assessmentMethod: 'project',
        passingScore: 70,
        badges: ['logic-designer', 'boolean-master'],
        lessons: [
          {
            id: 'cp101-mod1-lesson1',
            title: 'Binary Number Systems',
            description: 'Understanding base-2 representation and operations.',
            contentType: 'interactive_simulation',
            difficulty: 2,
            estimatedTime: { min: 30, max: 40, average: 35 },
            learningObjectives: [
              {
                id: 'cp-lo-1',
                description: 'Convert between decimal, binary, and hexadecimal',
                bloomLevel: 'apply',
                assessmentCriteria: ['Perform arithmetic in different bases'],
              },
            ],
            prerequisites: [],
            tags: ['binary', 'number-systems', 'digital'],
            resources: {
              simulationUrl: '/content/cp101/binary-converter.html',
            },
            metadata: {
              version: '1.0.0',
              lastUpdated: '2024-01-15',
              authorId: 'curriculum-team',
              reviewStatus: 'published',
            },
          },
        ],
      },
    ],
    totalHours: 60,
    credits: 4,
    prerequisites: ['CS101'],
    corequisites: ['MATH201'],
    textbookReferences: [
      {
        title: 'Digital Design: With an Introduction to Verilog HDL',
        author: 'Mano, M. Morris',
        edition: 6,
        isbn: '978-0134549897',
      },
    ],
    learningOutcomes: [
      'Design and analyze digital circuits',
      'Use hardware description languages',
      'Understand computer architecture fundamentals',
    ],
  },
];

// ============================================================================
// MASTER'S SPECIALIZATIONS
// ============================================================================

/**
 * Master's Level Specializations
 * Advanced topics for graduate students
 */
export const MASTERS_SPECIALIZATIONS = {
  artificial_intelligence: {
    id: 'ms-ai',
    name: 'Artificial Intelligence & Machine Learning',
    courses: [
      {
        id: 'ai-501',
        code: 'AI501',
        title: 'Advanced Machine Learning',
        description: 'Deep learning, reinforcement learning, and modern neural architectures.',
        discipline: 'computer',
        academicLevel: 'graduate',
        modules: [],
        totalHours: 90,
        credits: 3,
        prerequisites: ['CS301', 'STAT401', 'MATH301'],
        corequisites: [],
        textbookReferences: [
          {
            title: 'Deep Learning',
            author: 'Goodfellow, Ian',
            edition: 1,
            isbn: '978-0262035613',
          },
        ],
        learningOutcomes: [
          'Implement deep neural networks',
          'Apply transfer learning techniques',
          'Evaluate model performance rigorously',
        ],
      },
    ],
  },
  
  thermodynamics: {
    id: 'ms-thermo',
    name: 'Advanced Thermodynamics & Heat Transfer',
    courses: [
      {
        id: 'me-501',
        code: 'ME501',
        title: 'Computational Fluid Dynamics',
        description: 'Numerical methods for solving fluid flow and heat transfer problems.',
        discipline: 'mechanical',
        academicLevel: 'graduate',
        modules: [],
        totalHours: 90,
        credits: 3,
        prerequisites: ['ME301', 'MATH301'],
        corequisites: [],
        textbookReferences: [
          {
            title: 'Computational Fluid Dynamics',
            author: 'Anderson, John D.',
            edition: 2,
            isbn: '978-0072471670',
          },
        ],
        learningOutcomes: [
          'Set up CFD simulations',
          'Validate numerical results',
          'Interpret flow visualization data',
        ],
      },
    ],
  },
  
  control_systems: {
    id: 'ms-control',
    name: 'Control Systems & Robotics',
    courses: [
      {
        id: 'ee-501',
        code: 'EE501',
        title: 'Modern Control Theory',
        description: 'State-space methods, optimal control, and robust control design.',
        discipline: 'electrical',
        academicLevel: 'graduate',
        modules: [],
        totalHours: 90,
        credits: 3,
        prerequisites: ['EE301', 'MATH301'],
        corequisites: [],
        textbookReferences: [
          {
            title: 'Modern Control Engineering',
            author: 'Ogata, Katsuhiko',
            edition: 5,
            isbn: '978-0136166658',
          },
        ],
        learningOutcomes: [
          'Design state-feedback controllers',
          'Analyze system stability',
          'Implement observers and estimators',
        ],
      },
    ],
  },
};

// ============================================================================
// METADATA SCHEMA FOR QUESTION TAGGING
// ============================================================================

/**
 * Question difficulty taxonomy
 */
export const DIFFICULTY_DESCRIPTORS: Record<DifficultyLevel, {
  name: string;
  description: string;
  bloomLevels: BloomLevel[];
}> = {
  1: {
    name: 'Foundational',
    description: 'Basic recall and recognition of facts',
    bloomLevels: ['remember', 'understand'],
  },
  2: {
    name: 'Intermediate',
    description: 'Application of concepts in familiar contexts',
    bloomLevels: ['apply'],
  },
  3: {
    name: 'Advanced',
    description: 'Analysis and evaluation of complex scenarios',
    bloomLevels: ['analyze', 'evaluate'],
  },
  4: {
    name: 'Expert',
    description: 'Synthesis and creation of novel solutions',
    bloomLevels: ['create'],
  },
  5: {
    name: 'Challenge',
    description: 'Graduate-level or professional engineering problems',
    bloomLevels: ['create', 'evaluate'],
  },
};

/**
 * Tag taxonomy for content organization
 */
export const TAG_TAXONOMY = {
  disciplines: [
    'mechanical', 'electrical', 'civil', 'chemical', 'computer',
    'aerospace', 'biomedical', 'industrial', 'materials', 'environmental',
  ],
  
  topics: {
    mechanical: ['thermodynamics', 'fluid-mechanics', 'solid-mechanics', 'dynamics', 'controls', 'manufacturing'],
    electrical: ['circuits', 'electronics', 'signals', 'power', 'electromagnetics', 'communications'],
    civil: ['structural', 'geotechnical', 'transportation', 'water-resources', 'environmental', 'construction'],
    chemical: ['reaction-engineering', 'separations', 'process-control', 'transport-phenomena', 'materials'],
    computer: ['algorithms', 'data-structures', 'architecture', 'systems', 'software', 'theory'],
  },
  
  skills: [
    'problem-solving', 'critical-thinking', 'mathematical-modeling',
    'experimental-design', 'data-analysis', 'communication',
    'teamwork', 'ethics', 'lifelong-learning',
  ],
  
  content_types: [
    'video', 'simulation', 'text', 'quiz', 'flashcard',
    'equation_solver', 'practice_problem', 'project', 'ar_visualization',
  ],
};

// ============================================================================
// KNOWLEDGE GRAPH RELATIONSHIPS
// ============================================================================

/**
 * Prerequisite relationship type
 */
export interface PrerequisiteRelationship {
  sourceCourseId: string;
  targetCourseId: string;
  relationshipType: 'prerequisite' | 'corequisite' | 'recommended';
  strength: 'required' | 'strongly_recommended' | 'optional';
}

/**
 * Concept dependency graph node
 */
export interface ConceptNode {
  id: string;
  name: string;
  discipline: EngineeringDiscipline;
  relatedCourses: string[];
  parentConcept?: string;
  childConcepts: string[];
  crossDisciplinaryLinks: {
    conceptId: string;
    discipline: EngineeringDiscipline;
  }[];
}

/**
 * Sample concept graph entries
 */
export const CONCEPT_GRAPH: ConceptNode[] = [
  {
    id: 'calc-derivatives',
    name: 'Derivatives',
    discipline: 'computer',  // Mathematics is cross-disciplinary
    relatedCourses: ['MATH101', 'MATH102'],
    parentConcept: undefined,
    childConcepts: ['partial-derivatives', 'gradient', 'optimization'],
    crossDisciplinaryLinks: [
      { conceptId: 'velocity-acceleration', discipline: 'mechanical' },
      { conceptId: 'circuit-analysis', discipline: 'electrical' },
      { conceptId: 'stress-strain', discipline: 'civil' },
    ],
  },
  {
    id: 'physics-newton-laws',
    name: 'Newton\'s Laws of Motion',
    discipline: 'mechanical',
    relatedCourses: ['PHYS101', 'MECH201'],
    parentConcept: undefined,
    childConcepts: ['free-body-diagrams', 'momentum', 'energy-conservation'],
    crossDisciplinaryLinks: [
      { conceptId: 'structural-analysis', discipline: 'civil' },
      { conceptId: 'robotics-dynamics', discipline: 'electrical' },
    ],
  },
];

// ============================================================================
// CONTENT CMS INTEGRATION (AIRTABLE SCHEMA)
// ============================================================================

/**
 * Airtable base configuration for content management
 * This schema maps to the Airtable CMS used for collaborative content creation
 */
export const AIRTABLE_SCHEMA = {
  bases: {
    curriculum: {
      id: 'appCURRICULUM123',
      tables: {
        courses: 'tblCourses',
        modules: 'tblModules',
        lessons: 'tblLessons',
        questions: 'tblQuestions',
        media: 'tblMedia',
      },
    },
  },
  
  fieldMappings: {
    courses: {
      id: 'fldCourseID',
      code: 'fldCourseCode',
      title: 'fldTitle',
      discipline: 'fldDiscipline',
      level: 'fldAcademicLevel',
      modules: 'fldModules',  // Linked records
    },
    lessons: {
      id: 'fldLessonID',
      title: 'fldTitle',
      contentType: 'fldContentType',
      difficulty: 'fldDifficulty',
      estimatedTime: 'fldEstimatedTime',
      objectives: 'fldObjectives',
      resources: 'fldResources',
      status: 'fldReviewStatus',
    },
    questions: {
      id: 'fldQuestionID',
      lessonId: 'fldLessonID',  // Linked record
      questionText: 'fldQuestionText',
      questionType: 'fldQuestionType',
      options: 'fldOptions',
      correctAnswer: 'fldCorrectAnswer',
      explanation: 'fldExplanation',
      difficulty: 'fldDifficulty',
      tags: 'fldTags',
      bloomLevel: 'fldBloomLevel',
    },
  },
};

// ============================================================================
// EXPORTED CURRICULUM REGISTRY
// ============================================================================

/**
 * Complete curriculum registry for all disciplines
 * Used by the app to dynamically load course content
 */
export const CURRICULUM_REGISTRY = {
  bachelors: {
    mechanical: MECHANICAL_ENGINEERING_CURRICULUM,
    electrical: ELECTRICAL_ENGINEERING_CURRICULUM,
    civil: CIVIL_ENGINEERING_CURRICULUM,
    chemical: CHEMICAL_ENGINEERING_CURRICULUM,
    computer: COMPUTER_ENGINEERING_CURRICULUM,
  },
  
  masters: MASTERS_SPECIALIZATIONS,
  
  conceptGraph: CONCEPT_GRAPH,
  
  tagTaxonomy: TAG_TAXONOMY,
  
  difficultyDescriptors: DIFFICULTY_DESCRIPTORS,
  
  airtableSchema: AIRTABLE_SCHEMA,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all courses for a specific discipline and level
 */
export function getCoursesByDisciplineAndLevel(
  discipline: EngineeringDiscipline,
  level?: AcademicLevel
): CourseConfig[] {
  const bachelorCourses = CURRICULUM_REGISTRY.bachelors[discipline] || [];
  
  if (!level) {
    return bachelorCourses;
  }
  
  return bachelorCourses.filter(course => course.academicLevel === level);
}

/**
 * Find a course by its code
 */
export function findCourseByCode(courseCode: string): CourseConfig | undefined {
  const allCourses = Object.values(CURRICULUM_REGISTRY.bachelors).flat();
  return allCourses.find(course => course.code === courseCode);
}

/**
 * Get prerequisite chain for a course
 */
export function getPrerequisiteChain(
  courseCode: string,
  visited: Set<string> = new Set()
): string[] {
  if (visited.has(courseCode)) {
    return [];  // Avoid circular dependencies
  }
  
  const course = findCourseByCode(courseCode);
  if (!course) {
    return [];
  }
  
  visited.add(courseCode);
  const chain: string[] = [...course.prerequisites];
  
  for (const prereq of course.prerequisites) {
    chain.push(...getPrerequisiteChain(prereq, visited));
  }
  
  return chain;
}

/**
 * Calculate total learning time for a course
 */
export function calculateCourseDuration(course: CourseConfig): TimeEstimate {
  let totalMin = 0;
  let totalMax = 0;
  let totalAvg = 0;
  let lessonCount = 0;
  
  for (const module of course.modules) {
    totalMin += module.estimatedCompletionTime.min;
    totalMax += module.estimatedCompletionTime.max;
    totalAvg += module.estimatedCompletionTime.average;
    lessonCount++;
  }
  
  // If modules have detailed lessons, use those instead
  if (lessonCount === 0 || course.modules.some(m => m.lessons.length > 0)) {
    totalMin = 0;
    totalMax = 0;
    totalAvg = 0;
    
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        totalMin += lesson.estimatedTime.min;
        totalMax += lesson.estimatedTime.max;
        totalAvg += lesson.estimatedTime.average;
      }
    }
  }
  
  return {
    min: totalMin,
    max: totalMax,
    average: totalAvg,
  };
}

/**
 * Validate curriculum structure integrity
 */
export function validateCurriculumIntegrity(
  course: CourseConfig
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for duplicate lesson IDs
  const lessonIds = new Set<string>();
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (lessonIds.has(lesson.id)) {
        errors.push(`Duplicate lesson ID: ${lesson.id}`);
      }
      lessonIds.add(lesson.id);
    }
  }
  
  // Check prerequisite references
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      for (const prereq of lesson.prerequisites) {
        if (!lessonIds.has(prereq)) {
          errors.push(`Lesson ${lesson.id} references non-existent prerequisite: ${prereq}`);
        }
      }
    }
  }
  
  // Check difficulty consistency
  for (const module of course.modules) {
    const difficulties = module.lessons.map(l => l.difficulty);
    const maxDiff = Math.max(...difficulties);
    const minDiff = Math.min(...difficulties);
    
    if (maxDiff - minDiff > 2) {
      errors.push(`Module ${module.id} has wide difficulty range (${minDiff}-${maxDiff})`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Export all types and utilities
export type {
  PrerequisiteRelationship,
  ConceptNode,
};
