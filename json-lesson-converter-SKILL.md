---
name: json-lesson-converter
description: Convert educational materials (study guides, tests, lesson notes) into structured JSON lesson files. Use this whenever a user wants to create lesson content for an interactive tutoring app, transform existing educational materials into a standardized format, or build learning modules for Y7-Y9 students. The output is a properly formatted lesson_<number>_<topic>.json file with 20 flashcards, 10 quiz questions (3 easy, 5 intermediate, 2 advanced), ASCII diagrams, and comprehensive cheatsheets—everything needed for an effective e-learning platform.
compatibility: None required
---

# JSON Lesson Converter

This skill transforms educational materials into production-ready JSON lesson files following a strict schema. The output format is ideal for tutoring apps, learning platforms, and interactive study tools.

## When to Use This Skill

Use this skill when you need to:
- Convert study guides, textbooks, or class notes into structured lesson JSON
- Transform test papers or exam materials into interactive learning modules
- Create lessons for a tutoring app or LMS with a specific schema
- Ensure consistent, high-quality educational content across multiple lessons
- Generate comprehensive flashcard decks and quiz banks from existing materials

## Input Requirements

You'll need:
- **Source material**: Study guides, test papers, lesson notes, or any educational content
- **Subject area**: Science, Math, English, Social Science, etc.
- **Year level**: Y7, Y8, or Y9 (age ~12-14)
- **Topic**: Specific lesson topic (e.g., "Cells", "Fractions", "Early Māori")

## Output Specification

### File Naming Convention
```
lesson_<number>_<topic>.json
```

Examples:
- `lesson_1_cells.json`
- `lesson_2_electricity.json`
- `lesson_1_fractions.json`

### JSON Schema Structure

Always use this exact structure:

```json
{
  "id": "unique_identifier_slug",
  "week": 1,
  "title": "Full Lesson Title",
  "subject": "science|math|english|social-science",
  "level": "y7|y8|y9",
  "icon": "emoji",
  "color": "bg-color-100",
  "textColor": "text-color-700",
  "difficulty": "easy|intermediate|advanced",
  "introduction": "1-2 paragraph overview engaging students and explaining relevance",
  "sections": [
    {
      "title": "Section Title",
      "content": [
        "4-6 clear bullet points explaining the concept",
        "Each point should be 1-2 sentences",
        "Use simple, age-appropriate language",
        "Explain the 'why' not just the 'what'"
      ]
    }
  ],
  "diagram": "ASCII art or text-based diagram\nwith multiple lines\nshowing visual relationships",
  "flashcards": [
    {
      "id": "fc_1",
      "q": "Question or prompt?",
      "a": "Clear, concise answer"
    }
  ],
  "quiz": [
    {
      "id": "q_1",
      "q": "Question text?",
      "opts": ["Option A", "Option B", "Option C", "Option D"],
      "ans": 0,
      "difficulty": "easy"
    }
  ],
  "cheatsheet": {
    "Key Terms": {
      "Term": "Definition"
    },
    "Remember This": [
      "Memorable phrase or rule",
      "Another key concept"
    ],
    "Exam Focus": [
      "What students must know for tests"
    ]
  }
}
```

## Content Guidelines

### Sections
- Create 4-6 main sections covering different aspects of the topic
- Each section has a clear title and 4-6 bullet points
- Language is appropriate for Y7-Y9 (ages 12-14): clear, direct, avoiding jargon where possible
- Explain concepts progressively—basics first, complexity builds
- Include the "why" behind concepts, not just facts

### Flashcards (exactly 20)
Mix the types strategically:
- **Definition flashcards** (~6): "What is X?" → definition
- **Application flashcards** (~6): "Give an example" or "How would you use X?"
- **Relationship flashcards** (~4): "What's the difference between X and Y?"
- **Calculation/Process flashcards** (~4): "How do you calculate X?" or "What are the steps?"

All answers should be complete sentences or clear explanations, not single words.

### Quiz Questions (exactly 10)
**Distribution:**
- **3 Easy**: Basic recall, straightforward questions. Single correct answer, usually the most obvious option.
- **5 Intermediate**: Application, comparison, or understanding. Requires connecting concepts or choosing between plausible options.
- **2 Advanced**: Analysis, synthesis, or complex reasoning. Requires deeper understanding or evaluation.

**Structure for each question:**
- Clear, unambiguous question text
- Exactly 4 answer options (A, B, C, D)
- Vary the correct answer position: don't put correct answer in same position repeatedly
- Include plausible distractors (wrong answers that test common misconceptions)
- `ans` field is 0-indexed (0 = first option, 1 = second, etc.)

**Example variations:**
- Easy: "What is photosynthesis?" → recall definition
- Intermediate: "Why is photosynthesis important for ecosystems?" → application
- Advanced: "If a plant's chloroplasts were damaged, what would happen to its energy production?" → analysis

### ASCII Diagrams
Create visual representations using ASCII art:
- Clearly labeled components
- Show relationships or flow
- Use simple box/line drawing characters: ┌─┐│└┘┬┴┤├─ etc.
- Should be 8-15 lines typically
- Accompany with brief text description if complex

Example structure:
```
COMPONENT 1          COMPONENT 2
    ↓                    ↓
    └────────┬───────────┘
             ↓
         RESULT
```

### Cheatsheet
Organize into logical sections:
- **Key Terms**: Vocabulary with definitions (object format)
- **Key Formulas/Rules**: If applicable (string format or object)
- **Remember This**: Mnemonics or memorable phrases (array format)
- **Common Mistakes**: What to avoid (optional, array format)
- **Exam Focus**: What's tested (array format)

The cheatsheet is a study aid—it should help students quickly review and retain key information.

## Process

1. **Read the source material** and identify all major topics and concepts
2. **Extract key ideas** and organize into 4-6 logical sections
3. **Create sections** with clear, progressive explanations (4-6 bullet points each)
4. **Design an ASCII diagram** showing main relationships or processes
5. **Generate 20 flashcards**:
   - Start with definitions (basic understanding)
   - Add application questions (can they use it?)
   - Include comparisons (do they understand differences?)
   - Add process/calculation cards (can they perform steps?)
6. **Write 10 quiz questions** (3 easy, 5 intermediate, 2 advanced):
   - Easy questions test basic recall
   - Intermediate questions test application and understanding
   - Advanced questions require analysis or synthesis
   - Vary answer positions so correct answer isn't always in same spot
7. **Build the cheatsheet** with organized summaries for quick review
8. **Validate JSON** to ensure all fields are present and properly formatted

## Age-Appropriateness Checklist

For Y7-Y9 students (ages 12-14):
- [ ] Language is clear and direct (8th-grade reading level approximately)
- [ ] Concepts are explained with real-world examples
- [ ] Abstract ideas are grounded in concrete examples
- [ ] Technical terms are defined when first used
- [ ] Content is engaging and relevant to students' lives
- [ ] Sections build logically from simple to complex
- [ ] Instructions and questions are unambiguous

## Quality Assurance

Before finalizing, verify:
- [ ] JSON is valid (no syntax errors)
- [ ] Exactly 20 flashcards present
- [ ] Exactly 10 quiz questions present
- [ ] Quiz questions have: 4 options, correct answer index, and difficulty level
- [ ] Correct answer positions vary (not always in same position)
- [ ] All sections have 4-6 bullet points
- [ ] ASCII diagram is clearly formatted
- [ ] Cheatsheet sections are well-organized
- [ ] Content is age-appropriate and engaging
- [ ] Introduction explains why this topic matters

## Example Output Structure

```json
{
  "id": "respiration_1",
  "week": 1,
  "title": "Respiration and the Respiratory System",
  "subject": "science",
  "level": "y8",
  "icon": "🫁",
  "color": "bg-red-100",
  "textColor": "text-red-700",
  "difficulty": "intermediate",
  "introduction": "Every time you breathe, you're taking part in one of life's most essential processes...",
  "sections": [
    {
      "title": "The Respiratory System and How It Works",
      "content": [
        "The respiratory system includes the nose, trachea (windpipe), lungs...",
        "When you breathe in (inhale), your diaphragm contracts..."
      ]
    }
  ],
  "diagram": "HUMAN RESPIRATORY SYSTEM:\n\n    NASAL CAVITY\n          ↓\n      TRACHEA\n          ↓\n    LUNGS (L/R)\n          ↓\n    DIAPHRAGM",
  "flashcards": [
    {"id": "fc_1", "q": "What is the main function of the respiratory system?", "a": "To take in oxygen and remove carbon dioxide from the body"},
    ...20 total
  ],
  "quiz": [
    {"id": "q_1", "q": "What is the purpose of the respiratory system?", "opts": ["To pump blood", "To digest food", "To exchange oxygen and carbon dioxide", "To produce energy"], "ans": 2, "difficulty": "easy"},
    ...10 total
  ],
  "cheatsheet": {
    "Key Terms": {
      "Respiratory System": "System for breathing and gas exchange",
      "Alveoli": "Tiny air sacs where gas exchange occurs"
    },
    "Remember This": [
      "Every breath = gas exchange happening",
      "Oxygen in, carbon dioxide out"
    ],
    "Exam Focus": ["Know parts of respiratory system", "Understand breathing mechanics"]
  }
}
```

## Common Pitfalls to Avoid

1. **Inconsistent quiz answer positions**: Vary where the correct answer appears
2. **Weak flashcards**: Ensure they test understanding, not just memorization
3. **Overly complex language**: Remember your audience is 12-14 year olds
4. **Missing diagram**: Always include visual representation
5. **Unbalanced difficulty**: Ensure you have the right distribution (3-5-2)
6. **Incomplete cheatsheet**: Make it a useful study aid
7. **Invalid JSON**: Always validate before finalizing

## Tips for High-Quality Lessons

- **Start with the source material's learning objectives**: What should students know by the end?
- **Use analogies**: "A cell is like a tiny city" helps Y7-Y9 students understand complex concepts
- **Include real-world applications**: "Why does this matter to you?"
- **Create progression**: Easy → medium → hard both within sections and in quiz questions
- **Vary flashcard types**: Mix definitions, applications, comparisons, and processes
- **Make the ASCII diagram meaningful**: It should clarify, not confuse
- **Design the cheatsheet for last-minute review**: What's the essential knowledge to remember?

---

This skill ensures consistent, high-quality educational content that's engaging, age-appropriate, and structured for maximum learning effectiveness.
