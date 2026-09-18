/**
 * Engineering Study Guide App - Curriculum Module Index
 * 
 * Phase Group: 1 - Foundation & Strategy
 * Phase Number: 7
 * Status: Complete
 * 
 * This file exports all curriculum-related modules and provides
 * a centralized access point for the knowledge graph system.
 */

// Core curriculum types and configurations
export {
  // Types
  type EngineeringDiscipline,
  type AcademicLevel,
  type ContentType,
  type BloomLevel,
  type DifficultyLevel,
  type TimeEstimate,
  
  // Interfaces
  type LearningObjective,
  type LessonConfig,
  type ModuleConfig,
  type CourseConfig,
  type PrerequisiteRelationship,
  type ConceptNode,
  
  // Curriculum Data
  MECHANICAL_ENGINEERING_CURRICULUM,
  ELECTRICAL_ENGINEERING_CURRICULUM,
  CIVIL_ENGINEERING_CURRICULUM,
  CHEMICAL_ENGINEERING_CURRICULUM,
  COMPUTER_ENGINEERING_CURRICULUM,
  MASTERS_SPECIALIZATIONS,
  
  // Metadata & Taxonomy
  DIFFICULTY_DESCRIPTORS,
  TAG_TAXONOMY,
  CONCEPT_GRAPH,
  AIRTABLE_SCHEMA,
  
  // Registry
  CURRICULUM_REGISTRY,
  
  // Utility Functions
  getCoursesByDisciplineAndLevel,
  findCourseByCode,
  getPrerequisiteChain,
  calculateCourseDuration,
  validateCurriculumIntegrity,
} from './curriculumKnowledgeGraph';

// ============================================================================
// MODULE DOCUMENTATION
// ============================================================================

/**
 * CURRICULUM KNOWLEDGE GRAPH MODULE
 * ==================================
 * 
 * This module implements Phase 7 of the development roadmap:
 * "Content Strategy & Curriculum Mapping"
 * 
 * Key Features:
 * -------------
 * 1. Hierarchical Structure: Course → Module → Lesson → Learning Objective
 * 2. Multi-Discipline Support: Mechanical, Electrical, Civil, Chemical, Computer
 * 3. Academic Levels: Freshman through Graduate
 * 4. Content Types: Video, Simulations, AR, Quizzes, Flashcards, etc.
 * 5. Bloom's Taxonomy: Learning objectives classified by cognitive level
 * 6. Prerequisite Chains: Automatic dependency tracking
 * 7. Time Estimates: Min/max/average completion times
 * 8. Accreditation Alignment: ABET, ASME, IEEE, ASCE, AIChE standards
 * 
 * Usage Examples:
 * ---------------
 * 
 * ```typescript
 * import { 
 *   CURRICULUM_REGISTRY,
 *   findCourseByCode,
 *   getCoursesByDisciplineAndLevel,
 *   validateCurriculumIntegrity
 * } from '@/curriculum';
 * 
 * // Get all mechanical engineering courses
 * const mechCourses = getCoursesByDisciplineAndLevel('mechanical');
 * 
 * // Find a specific course by code
 * const course = findCourseByCode('MECH101');
 * 
 * // Validate curriculum structure
 * const validation = validateCurriculumIntegrity(course);
 * if (!validation.valid) {
 *   console.error('Curriculum errors:', validation.errors);
 * }
 * 
 * // Access the full registry
 * const allBachelorsCourses = CURRICULUM_REGISTRY.bachelors;
 * const mastersSpecializations = CURRICULUM_REGISTRY.masters;
 * ```
 * 
 * Integration Points:
 * -------------------
 * - Content CMS (Airtable): Schema mappings for collaborative authoring
 * - Question Bank: Tag taxonomy for difficulty and topic classification
 * - Learning Analytics: Track progress through prerequisite chains
 * - Personalization Engine: Recommend courses based on discipline and level
 * - Gamification System: Award badges for module/course completion
 * 
 * Future Extensions:
 * ------------------
 * - Additional engineering disciplines (Aerospace, Biomedical, etc.)
 * - More detailed lesson content with actual media resources
 * - Adaptive learning paths based on student performance
 * - Cross-disciplinary concept mapping enhancements
 * - Integration with university course catalogs
 */

// Default export for convenience
import { CURRICULUM_REGISTRY } from './curriculumKnowledgeGraph';

export default CURRICULUM_REGISTRY;
