import React, { useState } from 'react';
import { Brain, Zap, Target, Eye, ChevronDown, ChevronUp, RotateCw } from 'lucide-react';

const ScienceLessonApp = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [weeklyScore, setWeeklyScore] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);

  const lessons = [
    { week: 1, title: "Respiration & the Respiratory System", icon: "🫁", color: "bg-red-100", textColor: "text-red-700" },
    { week: 2, title: "How the Lungs Work", icon: "💨", color: "bg-red-100", textColor: "text-red-700" },
    { week: 3, title: "Exchange of Gases in Alveoli", icon: "🔄", color: "bg-red-100", textColor: "text-red-700" },
    { week: 4, title: "Forces - Types & Effects", icon: "⚡", color: "bg-blue-100", textColor: "text-blue-700" },
    { week: 5, title: "Balanced & Unbalanced Forces", icon: "⚖️", color: "bg-blue-100", textColor: "text-blue-700" },
    { week: 6, title: "Motion & Speed", icon: "🚀", color: "bg-blue-100", textColor: "text-blue-700" },
    { week: 7, title: "Magnetism - Magnetic Fields", icon: "🧲", color: "bg-purple-100", textColor: "text-purple-700" },
    { week: 8, title: "Poles & Attraction", icon: "↔️", color: "bg-purple-100", textColor: "text-purple-700" },
    { week: 9, title: "Diet & Nutrients", icon: "🥗", color: "bg-green-100", textColor: "text-green-700" },
    { week: 10, title: "Skeleton & Muscles", icon: "💪", color: "bg-green-100", textColor: "text-green-700" },
    { week: 11, title: "Ecosystems & Food Chains", icon: "🌿", color: "bg-emerald-100", textColor: "text-emerald-700" },
    { week: 12, title: "Adaptations & Species", icon: "🦁", color: "bg-emerald-100", textColor: "text-emerald-700" },
    { week: 13, title: "Properties of Materials", icon: "🪨", color: "bg-yellow-100", textColor: "text-yellow-700" }
  ];

  const lessonContent = {
    1: {
      title: "Respiration & the Respiratory System",
      visual: "🫁",
      introduction: "Respiration is a chemical process happening in every cell of your body right now. It's how your cells release energy from food. Don't confuse it with breathing—breathing is just the physical movement of air in and out of your lungs!",

      sections: [
        {
          title: "What is Respiration?",
          content: [
            "Respiration is a chemical reaction that happens inside cells",
            "It breaks down glucose (sugar) to release energy",
            "This energy is used for all body activities: moving, thinking, growing",
            "Happens in every cell, not just in lungs",
            "Two types: Aerobic (with oxygen) and Anaerobic (without oxygen)",
            "Aerobic respiration is much more efficient (releases more energy)"
          ]
        },
        {
          title: "Aerobic Respiration Equation",
          content: [
            "Glucose + Oxygen → Carbon Dioxide + Water + Energy",
            "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)",
            "This equation shows the chemical reaction",
            "Glucose comes from food we eat",
            "Oxygen comes from air we breathe",
            "CO₂ and water are waste products we get rid of"
          ]
        },
        {
          title: "Structure of Respiratory System",
          content: [
            "Nose/Mouth: Filters and warms air",
            "Trachea (windpipe): Carries air to lungs",
            "Bronchi: Trachea branches into two bronchi (one per lung)",
            "Bronchioles: Bronchi branch into smaller tubes",
            "Alveoli: Tiny air sacs where gas exchange happens (millions per lung!)",
            "Diaphragm: Muscle that controls breathing"
          ]
        }
      ],

      diagram: `
        RESPIRATORY SYSTEM PATH:

        Nose/Mouth
            ↓ (warm air)
        Trachea (windpipe)
            ↓
        Bronchi (splits into 2)
            ↓           ↓
        Left Lung    Right Lung
            ↓           ↓
        Bronchioles  Bronchioles
            ↓           ↓
        Alveoli (gas exchange!)
            ↓
        Oxygen → Blood
        CO₂ ← Blood
      `,

      flashcards: [
        { q: "What is respiration?", a: "A chemical process that breaks down glucose to release energy in cells" },
        { q: "Where does gas exchange happen?", a: "In the alveoli (tiny air sacs in lungs)" },
        { q: "Write the respiration equation", a: "Glucose + Oxygen → Carbon Dioxide + Water + Energy" },
        { q: "What's the difference between respiration and breathing?", a: "Breathing is physical movement of air; respiration is chemical energy release" },
        { q: "Why do we need oxygen?", a: "To break down glucose and release energy in cells" },
        { q: "What is the trachea?", a: "The windpipe that carries air from mouth/nose to lungs" }
      ],

      quiz: [
        { q: "Respiration mainly happens in...", opts: ["Lungs only", "Every cell", "Brain", "Stomach"], ans: 1 },
        { q: "The equation for aerobic respiration is...", opts: ["Glucose only", "Glucose + O₂ → CO₂ + H₂O + Energy", "Just water", "Only in lungs"], ans: 1 }
      ],

      cheatsheet: {
        "Key Terms": {
          "Respiration": "Breaking down glucose for energy (happens in cells)",
          "Breathing": "Physical movement of air in/out",
          "Aerobic": "With oxygen (more efficient)",
          "Alveoli": "Tiny air sacs where gas exchange occurs"
        },
        "Equation": "Glucose + O₂ → CO₂ + H₂O + Energy",
        "Remember": "Every cell respires, not just lungs!",
        "Exam Focus": "Know the difference between respiration and breathing. Know where gas exchange happens."
      }
    },

    2: {
      title: "How the Lungs Work",
      visual: "💨",
      introduction: "Your lungs are like two spongy balloons in your chest. They expand and contract to bring oxygen in and push carbon dioxide out. The diaphragm is the main muscle controlling this movement—let's learn how it works!",

      sections: [
        {
          title: "The Diaphragm - Main Breathing Muscle",
          content: [
            "The diaphragm is a large muscle below the lungs",
            "It's dome-shaped when relaxed",
            "When it contracts: flattens and moves DOWN",
            "This increases lung space → pressure decreases → air rushes IN (INSPIRATION)",
            "When it relaxes: returns to dome shape, moves UP",
            "This decreases lung space → pressure increases → air pushed OUT (EXPIRATION)",
            "Controls about 70% of breathing"
          ]
        },
        {
          title: "Intercostal Muscles (Rib Muscles)",
          content: [
            "Two layers of muscles between ribs",
            "External intercostal muscles: lift ribcage during inspiration",
            "Internal intercostal muscles: pull ribcage down during expiration",
            "Help the diaphragm with breathing",
            "More important during exercise or heavy breathing",
            "Work together to increase/decrease chest volume"
          ]
        },
        {
          title: "The Breathing Cycle - INSPIRATION (Breathing In)",
          content: [
            "1. Diaphragm contracts and moves downward",
            "2. External intercostal muscles contract, lifting ribs up and out",
            "3. Chest cavity volume INCREASES",
            "4. Air pressure inside lungs DECREASES (below atmospheric pressure)",
            "5. Air rushes in through nose/mouth to equalize pressure",
            "6. Oxygen-rich air fills lungs and alveoli"
          ]
        },
        {
          title: "The Breathing Cycle - EXPIRATION (Breathing Out)",
          content: [
            "1. Diaphragm relaxes and moves back up",
            "2. Internal intercostal muscles contract, pulling ribs down and in",
            "3. Chest cavity volume DECREASES",
            "4. Air pressure inside lungs INCREASES",
            "5. Air is pushed out through nose/mouth",
            "6. Carbon dioxide-rich air leaves lungs"
          ]
        }
      ],

      diagram: `
        INSPIRATION (BREATHING IN):

        Before:              During:
        ╭─────╮             ╭─────╮
        │░░░░░│             │░░░░░│
        │ L U │    →        │ L U │  (LUNGS EXPAND)
        │ N G │             │ N G │
        ╰──▲──╯             ╰──▲──╯
           │                   │
        ┏──┴────┓           ┏──┴────┓
        ┃  ▲ ▲  ┃           ┃  ▼ ▼  ┃  (DIAPHRAGM DOWN)
        ┗──────┘           ┗──────┘

        EXPIRATION (BREATHING OUT):

        Before:              During:
        ╭─────╮             ╭─────╮
        │░░░░░│             │░░░░░│
        │ L U │    →        │ L U │  (LUNGS SHRINK)
        │ N G │             │ N G │
        ╰──▲──╯             ╰──▲──╯
           │                   │
        ┏──┴────┓           ┏──┴────┐
        ┃  ▼ ▼  ┃           ┃  ▲ ▲  ┃  (DIAPHRAGM UP)
        ┗──────┘           ┗─────── ┘
      `,

      flashcards: [
        { q: "When diaphragm contracts, what happens?", a: "It flattens and moves down, lungs expand, air flows in" },
        { q: "What does 'inspiration' mean?", a: "Breathing in - air enters lungs" },
        { q: "What does 'expiration' mean?", a: "Breathing out - air leaves lungs" },
        { q: "Which muscle controls 70% of breathing?", a: "The diaphragm" },
        { q: "What are intercostal muscles?", a: "Muscles between ribs that help with breathing" },
        { q: "How does pressure cause air to flow?", a: "When lung volume increases, pressure decreases, and air rushes in to equalize" }
      ],

      quiz: [
        { q: "When the diaphragm contracts, lungs...", opts: ["Shrink", "Expand", "Stay same size", "Get hard"], ans: 1 },
        { q: "What happens during expiration?", opts: ["O₂ increases", "Diaphragm moves down", "Air is pushed out", "Ribs lift up"], ans: 2 }
      ],

      cheatsheet: {
        "Diaphragm Movement": {
          "Contracts (Down)": "Lungs expand → Air IN (Inspiration)",
          "Relaxes (Up)": "Lungs shrink → Air OUT (Expiration)"
        },
        "Remember": "Down = In, Up = Out",
        "Key Phrase": "Diaphragm controls breathing like a pump",
        "Exam Focus": "Know what happens to diaphragm during inspiration vs expiration"
      }
    },

    3: {
      title: "Exchange of Gases in Alveoli",
      visual: "🔄",
      introduction: "Alveoli are where the magic happens! These tiny air sacs are surrounded by blood capillaries. Oxygen from the air you breathe diffuses into your blood, while carbon dioxide waste diffuses out. It's a simple but brilliant system!",

      sections: [
        {
          title: "What are Alveoli?",
          content: [
            "Alveoli are tiny, grape-like air sacs in lungs",
            "Millions of them in each lung (about 300 million total!)",
            "Surrounded by a network of blood capillaries",
            "Walls are only ONE cell thick (very thin)",
            "Provide HUGE surface area for gas exchange",
            "About 70 square meters total (size of tennis court!)"
          ]
        },
        {
          title: "Gas Exchange Process - DIFFUSION",
          content: [
            "Diffusion: movement of molecules from high to low concentration",
            "In alveoli: O₂ concentration is high, in blood is low → O₂ diffuses IN",
            "In blood: CO₂ concentration is high, in alveoli is low → CO₂ diffuses OUT",
            "No energy needed (passive transport)",
            "Happens constantly as long as there's a concentration difference",
            "Both gases cross the thin alveoli wall"
          ]
        },
        {
          title: "Why Alveoli Are Perfect for Gas Exchange",
          content: [
            "1. HUGE SURFACE AREA: 70 m² for gas diffusion",
            "2. THIN WALLS: Only 1 cell thick - shortest distance for gases to travel",
            "3. MOIST SURFACE: Gases dissolve in moisture, then diffuse",
            "4. RICH BLOOD SUPPLY: Millions of capillaries remove O₂ and deliver CO₂",
            "5. SLOW AIR MOVEMENT: Time for diffusion to occur",
            "6. VENTILATION: Fresh air constantly replaces stale air"
          ]
        },
        {
          title: "What Happens to the Gases",
          content: [
            "OXYGEN IN LUNGS:",
            "- Binds to hemoglobin protein in red blood cells",
            "- Red blood cells transport O₂ to body cells",
            "- Body cells use O₂ for respiration",
            "",
            "CARBON DIOXIDE FROM BODY:",
            "- Produced by cells during respiration",
            "- Dissolves in blood and travels to lungs",
            "- Diffuses out into alveoli",
            "- Breathed out as waste"
          ]
        }
      ],

      diagram: `
        ALVEOLI - GAS EXCHANGE PROCESS:

        ╔═══════════════════════════════════════╗
        ║         AIR IN ALVEOLUS               ║
        ║     HIGH O₂, LOW CO₂                  ║
        ║                                       ║
        ║    O₂ ←←←← (diffuses out)            ║
        ║             (1 cell thick wall)      ║
        ║    CO₂ ←←←← (diffuses in)            ║
        ║                                       ║
        ║      BLOOD CAPILLARY                  ║
        ║   (LOW O₂, HIGH CO₂)                 ║
        ╚═══════════════════════════════════════╝
                        ↓
                   O₂ BINDS TO
                   HEMOGLOBIN
                        ↓
              RED BLOOD CELLS
                CARRY O₂ AWAY
                        ↓
                   TO BODY CELLS
      `,

      flashcards: [
        { q: "What is an alveolus?", a: "A tiny air sac in the lungs where gas exchange happens" },
        { q: "How many alveoli are in human lungs?", a: "About 300 million (millions in each lung)" },
        { q: "What is diffusion?", a: "Movement of molecules from high to low concentration areas" },
        { q: "Why are alveoli walls so thin?", a: "To allow gases to diffuse quickly across them" },
        { q: "What is the surface area of alveoli?", a: "About 70 square meters (size of a tennis court!)" },
        { q: "Where does O₂ bind in blood?", a: "To hemoglobin protein in red blood cells" }
      ],

      quiz: [
        { q: "Gas exchange in alveoli is called...", opts: ["Osmosis", "Active transport", "Diffusion", "Filtration"], ans: 2 },
        { q: "Alveoli walls are so effective because they are...", opts: ["Very thick", "Very thin (1 cell)", "Muscular", "Hard"], ans: 1 }
      ],

      cheatsheet: {
        "Alveoli Features": {
          "Size": "Microscopic (seen only with microscope)",
          "Number": "300 million in lungs",
          "Surface Area": "70 m² (tennis court size!)",
          "Wall Thickness": "1 cell thick (very thin)"
        },
        "Gas Exchange": {
          "O₂": "From air → diffuses → into blood",
          "CO₂": "From blood → diffuses → into air"
        },
        "Key Fact": "Thin walls + huge surface area = efficient gas exchange",
        "Exam Focus": "Explain WHY alveoli are good at gas exchange"
      }
    },

    4: {
      title: "Forces - Types & Effects",
      visual: "⚡",
      introduction: "A force is simply a push, pull, or twist. Forces are everywhere! When you kick a ball, you apply a force. Gravity pulls you down. Magnets attract metal. Let's explore the different types of forces and what they do.",

      sections: [
        {
          title: "What is a Force?",
          content: [
            "A force is a push, pull, or twist applied to an object",
            "Measured in Newtons (N) - named after Isaac Newton",
            "Forces have magnitude (size) AND direction",
            "Forces cause changes: motion, speed, direction, or shape",
            "Every force comes from interaction between two objects",
            "You can't have just one object with a force - always pair interaction"
          ]
        },
        {
          title: "Contact Forces (Objects Must Touch)",
          content: [
            "FRICTION: Opposes motion between surfaces",
            "- Example: Rubbing hands together, car brakes",
            "- Rough surfaces → more friction",
            "- Smooth surfaces → less friction",
            "",
            "TENSION: Pulling force in ropes, cables, strings",
            "- Example: Climbing rope, tug-of-war rope",
            "- Always pulls, never pushes",
            "",
            "NORMAL FORCE: Surface pushing on object",
            "- Example: Table pushing up on book",
            "- Perpendicular to surface",
            "",
            "APPLIED FORCE: Direct push or pull",
            "- Example: Pushing a cart, pulling a door",
            "- Human muscle force"
          ]
        },
        {
          title: "Non-Contact Forces (No Touching Needed)",
          content: [
            "GRAVITY: Pulls all objects toward Earth",
            "- Always acts downward",
            "- Stronger for heavier objects",
            "- Example: Ball falls, water flows down",
            "",
            "MAGNETIC FORCE: Between magnetic objects",
            "- Magnets attract iron, steel",
            "- North pole repels North pole",
            "- South pole attracts North pole",
            "",
            "ELECTROSTATIC FORCE: Between charged objects",
            "- Opposite charges attract",
            "- Same charges repel",
            "- Very strong but invisible"
          ]
        }
      ],

      diagram: `
        CONTACT FORCES (Need touching):

        FRICTION           TENSION          APPLIED FORCE
        ←→ ←→              ←───────→         ⟶
        rough surface      rope pull        push/pull


        NON-CONTACT FORCES (No touching):

        GRAVITY                MAGNETIC
           ↓ ↓ ↓               ⟲ N ⟳
           ↓ ↓ ↓            S

        (pulls down)      (attracts/repels)
      `,

      flashcards: [
        { q: "What is a force?", a: "A push, pull, or twist that causes change in motion, speed, or shape" },
        { q: "What is friction?", a: "A contact force that opposes motion between surfaces" },
        { q: "What is tension?", a: "A pulling force in ropes or cables" },
        { q: "What is gravity?", a: "Non-contact force that pulls all objects toward Earth" },
        { q: "Name 3 contact forces", a: "Friction, tension, normal force, applied force" },
        { q: "Name 3 non-contact forces", a: "Gravity, magnetic force, electrostatic force" }
      ],

      quiz: [
        { q: "Which is a non-contact force?", opts: ["Friction", "Gravity", "Tension", "Normal"], ans: 1 },
        { q: "Forces are measured in...", opts: ["Joules", "Newtons", "Meters", "Watts"], ans: 1 }
      ],

      cheatsheet: {
        "Contact Forces": "Need objects to touch - Friction, Tension, Normal, Applied",
        "Non-Contact Forces": "No touching needed - Gravity, Magnetic, Electrostatic",
        "Remember": "Force = Push, Pull, or Twist",
        "SI Unit": "Newton (N)",
        "Exam Focus": "Know the difference between contact and non-contact forces"
      }
    },

    5: {
      title: "Balanced & Unbalanced Forces",
      visual: "⚖️",
      introduction: "When forces on an object are equal and opposite, they cancel out—the object doesn't accelerate. But when forces are unequal, the object accelerates. This is the foundation of Newton's Laws of Motion!",

      sections: [
        {
          title: "Balanced Forces - No Change in Motion",
          content: [
            "Balanced forces = equal size, opposite directions",
            "Net force = 0 (they cancel each other out)",
            "Result: NO ACCELERATION",
            "Object stays at rest OR moves at constant speed",
            "",
            "Examples:",
            "- Book resting on table: weight down = normal force up",
            "- Car driving at constant 60 km/h: engine force = friction",
            "- Tug-of-war with equal teams: Team A force = Team B force",
            "- Parachutist at terminal velocity: gravity down = air resistance up"
          ]
        },
        {
          title: "Unbalanced Forces - Acceleration Occurs",
          content: [
            "Unbalanced forces = unequal sizes OR same direction",
            "Net force ≠ 0 (forces do NOT cancel)",
            "Result: ACCELERATION (change in velocity)",
            "Object speeds up, slows down, or changes direction",
            "",
            "Examples:",
            "- Pushing a cart harder → speeds up",
            "- Braking a car → slows down (deceleration)",
            "- Turning a corner at constant speed → changes direction",
            "- Kicking a ball → moves from rest to motion"
          ]
        },
        {
          title: "Newton's First Law of Motion",
          content: [
            "Objects at rest stay at rest",
            "Objects in motion stay in motion (at constant velocity)",
            "Unless acted upon by an UNBALANCED force",
            "",
            "Explanation:",
            "- A ball on the ground won't move until you push it (unbalanced force)",
            "- A rolling ball won't stop unless friction acts on it (unbalanced force)",
            "- This is called INERTIA: resistance to change in motion"
          ]
        },
        {
          title: "Calculating Net Force",
          content: [
            "Net Force = Sum of all forces",
            "Consider direction (left/right, up/down)",
            "",
            "Example 1:",
            "10N right + 15N right = 25N right (same direction)",
            "",
            "Example 2:",
            "10N left + 15N right = 5N right (opposite directions)",
            "",
            "Example 3:",
            "10N up + 10N down = 0N (balanced, no acceleration)"
          ]
        }
      ],

      diagram: `
        BALANCED FORCES (Net = 0):

        ←────10N────┃────10N──→
                Book on Table
        Net Force = 0, No acceleration, stays at rest


        UNBALANCED FORCES (Net ≠ 0):

        ←────10N────┃────20N──→
        Net Force = 10N right, Accelerates right


        NEWTON'S FIRST LAW:

        At Rest          In Motion
           ●              ━━━━━→

        (stays at rest)  (continues unless
                         unbalanced force acts)
      `,

      flashcards: [
        { q: "What are balanced forces?", a: "Equal size, opposite directions - net force = 0" },
        { q: "What happens with balanced forces?", a: "No acceleration - object stays at rest or constant speed" },
        { q: "What are unbalanced forces?", a: "Unequal forces - net force ≠ 0" },
        { q: "What happens with unbalanced forces?", a: "Acceleration occurs - speed up, slow down, or change direction" },
        { q: "State Newton's First Law", a: "Objects at rest stay at rest, objects in motion stay in motion unless unbalanced force acts" },
        { q: "What is inertia?", a: "Resistance of objects to change in motion" }
      ],

      quiz: [
        { q: "With balanced forces, an object will...", opts: ["Accelerate", "Not change motion", "Always move", "Stop immediately"], ans: 1 },
        { q: "If 10N pushes left and 15N pushes right, net force is...", opts: ["0N", "5N right", "25N right", "25N left"], ans: 1 }
      ],

      cheatsheet: {
        "Balanced Forces": "Equal & opposite → Net = 0 → No acceleration",
        "Unbalanced Forces": "Unequal → Net ≠ 0 → Acceleration",
        "Newton's 1st Law": "Object at rest stays at rest, in motion stays in motion (unless unbalanced force)",
        "Inertia": "Resistance to change in motion",
        "Exam Focus": "Know difference between balanced/unbalanced. Calculate net force."
      }
    },

    6: {
      title: "Motion & Speed",
      visual: "🚀",
      introduction: "Motion is change of position. Speed tells you how fast. Velocity includes direction. Acceleration is the rate of change. These concepts help us understand and predict how things move—from cars to planets!",

      sections: [
        {
          title: "Speed - How Fast Something Moves",
          content: [
            "Speed = Distance ÷ Time",
            "Formula: Speed = d/t",
            "Units: meters per second (m/s) or kilometers per hour (km/h)",
            "Scalar quantity (only has magnitude, no direction)",
            "",
            "Example:",
            "A car travels 100 meters in 5 seconds",
            "Speed = 100m ÷ 5s = 20 m/s",
            "",
            "Average speed = Total distance ÷ Total time",
            "(actual speed might vary, but average shows overall)"
          ]
        },
        {
          title: "Velocity - Speed with Direction",
          content: [
            "Velocity = Speed + Direction",
            "Formula: Velocity = Displacement ÷ Time",
            "Units: m/s in a specific direction",
            "Vector quantity (has magnitude AND direction)",
            "",
            "Examples:",
            "- 20 m/s (no direction) = speed",
            "- 20 m/s north (with direction) = velocity",
            "- 60 km/h east = velocity",
            "",
            "Important: Two cars can have same speed but different velocities"
          ]
        },
        {
          title: "Acceleration - Rate of Change of Velocity",
          content: [
            "Acceleration = Change in velocity ÷ Time",
            "Formula: a = (v - u) ÷ t",
            "- v = final velocity",
            "- u = initial velocity",
            "- t = time",
            "Units: m/s²",
            "",
            "Can mean:",
            "1. Speeding up (positive acceleration)",
            "2. Slowing down (negative acceleration/deceleration)",
            "3. Changing direction (even at constant speed)"
          ]
        },
        {
          title: "Distance-Time Graphs",
          content: [
            "X-axis = Time, Y-axis = Distance",
            "",
            "STRAIGHT HORIZONTAL LINE:",
            "- Flat line = object not moving (stationary)",
            "- Slope = 0, Speed = 0",
            "",
            "STRAIGHT DIAGONAL LINE:",
            "- Sloped line = constant speed",
            "- Steep slope = fast speed",
            "- Gentle slope = slow speed",
            "",
            "CURVED LINE:",
            "- Curve = changing speed (acceleration)",
            "- Curve getting steeper = speeding up",
            "- Curve getting gentler = slowing down"
          ]
        }
      ],

      diagram: `
        DISTANCE-TIME GRAPH:

        Distance ↑
               │     ╱ FAST (steep)
               │    ╱
               │   ╱ SLOW (gentle)
               │  ╱
               │─────────  STATIONARY (flat)
               │
               └─────────→ Time


        VELOCITY-TIME GRAPH:

        Velocity ↑
                │    ╱╱  ACCELERATING (slope up)
                │   ╱
                │  ─────  CONSTANT (flat)
                │ ╲
                │  ╲╲  DECELERATING (slope down)
                │
                └─────────→ Time

        CALCULATION:
        Speed = Distance ÷ Time
        Acceleration = Change in velocity ÷ Time
      `,

      flashcards: [
        { q: "What is speed?", a: "Distance traveled per unit time (scalar - no direction)" },
        { q: "What is velocity?", a: "Speed with direction (vector - magnitude + direction)" },
        { q: "Speed formula", a: "Speed = Distance ÷ Time" },
        { q: "What is acceleration?", a: "Rate of change of velocity (can be speeding up, slowing down, or changing direction)" },
        { q: "What does flat line mean on distance-time graph?", a: "Object is stationary (not moving)" },
        { q: "What does steep slope mean on distance-time graph?", a: "Object is moving fast" }
      ],

      quiz: [
        { q: "If car travels 100m in 5s, speed is...", opts: ["5 m/s", "20 m/s", "0.05 m/s", "500 m/s"], ans: 1 },
        { q: "Flat line on distance-time graph means...", opts: ["Fast", "Slow", "Stationary", "Accelerating"], ans: 2 }
      ],

      cheatsheet: {
        "Speed Formula": "Speed = Distance ÷ Time (d/t)",
        "Velocity": "Speed + Direction",
        "Acceleration": "Change in velocity ÷ Time (a = (v-u)/t)",
        "Graph Tips": "Flat = still, Steep = fast, Curved = accelerating",
        "Exam Focus": "Calculate speed/acceleration. Interpret distance-time graphs."
      }
    },

    7: {
      title: "Magnetism - Magnetic Fields",
      visual: "🧲",
      introduction: "Magnets are all around us—from Earth itself to your phone speaker! A magnetic field is an invisible region where magnetic force can be detected. Let's explore what it is, how to detect it, and why it matters.",

      sections: [
        {
          title: "What is a Magnetic Field?",
          content: [
            "A magnetic field is a region around a magnet where magnetic force can be detected",
            "You can't see it, but you can see its effects",
            "Extends in all directions from the magnet",
            "Stronger near the poles, weaker far away",
            "Passes through some materials (air, paper, plastic)",
            "Different from gravity, electricity, but related"
          ]
        },
        {
          title: "Detecting Magnetic Fields",
          content: [
            "METHOD 1: COMPASS NEEDLE",
            "- Compass needle aligns with magnetic field",
            "- Points in direction of field lines",
            "- North end of needle points toward Earth's North Pole",
            "- Works anywhere on Earth",
            "",
            "METHOD 2: IRON FILINGS",
            "- Sprinkle iron filings around magnet",
            "- Filings align with field lines",
            "- Shows field pattern and strength",
            "- Stronger field = more clustered filings",
            "",
            "METHOD 3: TEST OBJECTS",
            "- Move compass/iron objects near magnet",
            "- If they respond = magnetic field present"
          ]
        },
        {
          title: "Magnetic Field Lines",
          content: [
            "Field lines show direction and strength of field",
            "Direction: From North pole → to South pole (outside magnet)",
            "Inside magnet: From South → North",
            "Closer together = stronger field",
            "Further apart = weaker field",
            "",
            "Properties:",
            "- Never cross each other",
            "- Always continuous loops",
            "- Density shows field strength",
            "- Help visualize 3D field pattern"
          ]
        },
        {
          title: "Earth's Magnetic Field",
          content: [
            "Earth acts like a giant bar magnet",
            "Has North and South magnetic poles",
            "Compass needles align with this field",
            "Used for navigation (finding direction)",
            "Protects from solar radiation",
            "Aurora Borealis (Northern Lights) caused by interaction with solar wind"
          ]
        }
      ],

      diagram: `
        MAGNETIC FIELD LINES:

        Bar Magnet:
        ╔════════════╗
        ║ N ←─ ─→ S  ║
        ╠╱╱╱╱╱╱╱╱╱╱╱╣
        ║ (field lines ║
        ║ flowing N→S) ║
        ╠╲╲╲╲╲╲╲╲╲╲╲╣
        ╚════════════╝

        FIELD STRENGTH:
        N ║╲╲╲╲║ S    (strong, lines close)
        N ║ ╲ ║ S    (weaker, lines apart)

        DETECTING WITH COMPASS:
        ╱─┐  Needle aligns
        ╲ │  with field lines
         ╲│  Points N→S

        IRON FILINGS:
        ║: ║ ║ ║ ║  (follow field lines)
      `,

      flashcards: [
        { q: "What is a magnetic field?", a: "Invisible region around magnet where magnetic force is detected" },
        { q: "How do you detect a magnetic field?", a: "Compass needle aligns with field, or iron filings show field pattern" },
        { q: "Which way do field lines go?", a: "From North pole to South pole (outside magnet)" },
        { q: "What does field line density show?", a: "Stronger field = closer lines; weaker field = farther apart" },
        { q: "What does compass needle do?", a: "Aligns with magnetic field and points toward magnetic North" },
        { q: "What is Earth's magnetic field like?", a: "Like a giant bar magnet with North and South poles" }
      ],

      quiz: [
        { q: "How can you detect a magnetic field?", opts: ["Thermometer", "Compass or iron filings", "Light", "Sound"], ans: 1 },
        { q: "Where is magnetic field strongest?", opts: ["Center", "Poles", "Everywhere equal", "Outside only"], ans: 1 }
      ],

      cheatsheet: {
        "Magnetic Field": "Invisible region where magnetic force detected",
        "Detection Methods": "Compass needle, Iron filings, Test objects",
        "Field Lines": "Go N→S, Closer = stronger, Never cross",
        "Earth's Field": "Like giant bar magnet, compass aligns with it",
        "Exam Focus": "How to detect and represent magnetic fields"
      }
    },

    8: {
      title: "Poles & Attraction",
      visual: "↔️",
      introduction: "Every magnet has two poles—North and South. Opposite poles attract each other, like puzzle pieces fitting together. Same poles repel each other, like two magnets pushing away. You can never have just one pole!",

      sections: [
        {
          title: "Magnetic Poles - North and South",
          content: [
            "Every magnet has exactly 2 poles: North and South",
            "North pole: Points toward Earth's geographic North",
            "South pole: Points toward Earth's geographic South",
            "Poles are always equal in strength",
            "Cannot be separated (even if you break magnet, both pieces get N & S poles)",
            "If you break a bar magnet in half: you get 2 complete magnets, not isolated poles"
          ]
        },
        {
          title: "Attraction - Opposite Poles",
          content: [
            "RULE: Opposite poles ATTRACT",
            "North + South = Strong attraction",
            "N ←→ S",
            "",
            "Examples:",
            "- Compass needle (has S pole) attracted to Earth's N pole",
            "- Two bar magnets with opposite poles facing = pull together",
            "- Magnetic crane lifting steel (N pole attracts S pole of metal)",
            "",
            "Force is strongest when poles are closest together"
          ]
        },
        {
          title: "Repulsion - Same Poles",
          content: [
            "RULE: Same poles REPEL",
            "North + North = Strong repulsion",
            "South + South = Strong repulsion",
            "N ↔ N  (push apart)",
            "S ↔ S  (push apart)",
            "",
            "Examples:",
            "- Two N poles facing each other = push apart",
            "- Two S poles facing each other = push apart",
            "- Feel this force when pushing magnets together with same poles",
            "",
            "Force increases as magnets get closer (even without touching)"
          ]
        },
        {
          title: "Poles Cannot Be Separated",
          content: [
            "Impossible to get a magnet with only North pole or only South pole",
            "",
            "What happens if you cut a magnet in half:",
            "Original: N───────S",
            "Cut in middle:",
            "Piece 1: N─────S  (complete magnet!)",
            "Piece 2: N─────S  (complete magnet!)",
            "",
            "Each piece becomes a new, complete magnet",
            "This is why monopoles (single poles) don't exist in nature",
            "Fundamental property of magnetism"
          ]
        }
      ],

      diagram: `
        ATTRACTION (Opposite poles):

        ╔════N════╗    ╔════S════╗
        ║          │←──→│          ║
        ║ Magnet 1 │ ATTRACT Magnet 2│
        ║          │←──→│          ║
        ╚════S════╝    ╚════N════╝


        REPULSION (Same poles):

        ╔════N════╗    ╔════N════╗
        ║          ↔    ↔          ║
        ║ Magnet 1 │ REPEL Magnet 2│
        ║          ↔    ↔          ║
        ╚════S════╝    ╚════S════╝


        CUTTING A MAGNET:

        Before:
        ╔═══════════════╗
        ║ N ───────── S ║
        ╚═══════════════╝

        After:
        ╔──────╗  ╔──────╗
        ║ N─S  ║  ║ N─S  ║
        ╚──────╝  ╚──────╝
        (2 complete magnets!)
      `,

      flashcards: [
        { q: "What happens when opposite poles meet?", a: "They attract (pull together)" },
        { q: "What happens when same poles meet?", a: "They repel (push apart)" },
        { q: "Can you have a magnet with only one pole?", a: "No, every magnet has both North and South poles" },
        { q: "What happens when you cut a magnet?", a: "You get 2 complete magnets, each with N and S poles" },
        { q: "Which pole of Earth's magnet is at geographic North?", a: "Magnetic South pole (opposite of geographic North)" },
        { q: "How is magnetic force with distance?", a: "Stronger when closer, weaker when far apart" }
      ],

      quiz: [
        { q: "N pole + S pole = ", opts: ["Repel", "Attract", "Nothing", "Stick"], ans: 1 },
        { q: "Can magnets have only one pole?", opts: ["Yes", "No", "Sometimes", "Only electromagnets"], ans: 1 }
      ],

      cheatsheet: {
        "Attraction": "Opposite poles (N-S) attract each other",
        "Repulsion": "Same poles (N-N or S-S) repel each other",
        "Rule": "Opposites attract, Likes repel",
        "Poles": "Cannot be separated - always both N and S",
        "Exam Focus": "Predict pole interactions. Know poles can't separate."
      }
    },

    9: {
      title: "Diet & Nutrients",
      visual: "🥗",
      introduction: "Your body is like a sophisticated machine. Different nutrients fuel different processes. Carbs give energy, proteins build muscles, fats insulate, and vitamins/minerals keep everything running smoothly. A balanced diet means getting the right amount of everything!",

      sections: [
        {
          title: "Carbohydrates (50% of diet)",
          content: [
            "Function: ENERGY",
            "Break down into glucose (blood sugar)",
            "Primary fuel for brain and muscles",
            "",
            "SIMPLE CARBS:",
            "- Glucose, Fructose (sugars)",
            "- Quick energy, rapid blood sugar rise",
            "- Found in: fruits, honey, soda",
            "",
            "COMPLEX CARBS:",
            "- Starch (potatoes, bread, rice)",
            "- Slower energy release, steadier",
            "",
            "FIBER:",
            "- Can't be digested, but essential",
            "- Helps digestion, prevents constipation",
            "- Found in: vegetables, whole grains, fruits"
          ]
        },
        {
          title: "Proteins (20% of diet)",
          content: [
            "Function: GROWTH AND REPAIR",
            "Made of amino acids (building blocks)",
            "Build muscles, skin, hair, enzymes, antibodies",
            "",
            "SOURCES:",
            "- Meat (beef, chicken, fish)",
            "- Eggs",
            "- Dairy (milk, cheese, yogurt)",
            "- Beans and legumes (peas, lentils)",
            "- Nuts",
            "",
            "USES:",
            "- Build new cells",
            "- Repair damaged tissue",
            "- Make enzymes (speed up reactions)",
            "- Make antibodies (fight infection)"
          ]
        },
        {
          title: "Fats (30% of diet)",
          content: [
            "Function: ENERGY STORAGE, INSULATION, VITAMIN ABSORPTION",
            "High energy - more than twice carbs or proteins per gram",
            "",
            "SATURATED FATS (solid at room temp):",
            "- Mostly from animals (meat, butter, cheese)",
            "- Too much = high cholesterol, health risk",
            "- Use in moderation",
            "",
            "UNSATURATED FATS (liquid at room temp):",
            "- From plants (olive oil, nuts, avocados)",
            "- Fish oils are healthy",
            "- Better for heart health",
            "",
            "Functions:",
            "- Store long-term energy",
            "- Insulate body (heat retention)",
            "- Help absorb vitamins A, D, E, K"
          ]
        },
        {
          title: "Vitamins & Minerals - Keep Body Running",
          content: [
            "VITAMIN A: Eye health, skin",
            "- Sources: Carrots, spinach, sweet potatoes",
            "",
            "VITAMIN C: Immune system, collagen",
            "- Sources: Citrus fruits, berries, peppers",
            "",
            "VITAMIN D: Bone health, calcium absorption",
            "- Sources: Sunlight, fish, egg yolks",
            "- Works WITH calcium",
            "",
            "CALCIUM: Strong bones and teeth",
            "- Sources: Milk, cheese, leafy greens",
            "- Pairs with Vitamin D",
            "",
            "IRON: Blood health, oxygen transport",
            "- Sources: Red meat, beans, spinach",
            "- Carries oxygen in blood"
          ]
        },
        {
          title: "Water & Balanced Diet",
          content: [
            "WATER: 6-8 glasses daily",
            "- Transport nutrients in blood",
            "- Remove waste",
            "- Temperature regulation",
            "- Lubricates joints",
            "",
            "BALANCED DIET RATIO:",
            "- Carbohydrates: 50%",
            "- Proteins: 20%",
            "- Fats: 30%",
            "- PLUS vitamins, minerals, fiber, water",
            "",
            "HEALTHY EATING TIPS:",
            "- Variety of colors (different nutrients)",
            "- More whole grains than white bread",
            "- More fish than red meat",
            "- Limit sugary drinks and snacks"
          ]
        }
      ],

      diagram: `
        BALANCED DIET PIE CHART:

                ╭──50%──╮
                │ Carbs │
                ╰───────╯
         ╭─────────────────╮
         │ 30% Fats │20%P  │
         │         │rots  │
         ╰─────────────────╯


        NUTRIENT FUNCTIONS:

        Carbs    → ENERGY (glucose fuel)
        Proteins → GROWTH & REPAIR (building blocks)
        Fats     → LONG-TERM ENERGY & INSULATION
        Vitamins → BODY MAINTENANCE (A, C, D...)
        Minerals → BODY STRUCTURE (Calcium, Iron...)
        Water    → TRANSPORT & REGULATION
        Fiber    → DIGESTIVE HEALTH
      `,

      flashcards: [
        { q: "What do carbohydrates do?", a: "Provide energy (glucose for cells)" },
        { q: "What do proteins do?", a: "Growth and repair of cells, make enzymes and antibodies" },
        { q: "What do fats do?", a: "Store long-term energy, insulation, help absorb vitamins" },
        { q: "Which vitamin works with calcium for bones?", a: "Vitamin D" },
        { q: "Which mineral is needed for blood health?", a: "Iron" },
        { q: "Balanced diet ratio is:", a: "Carbs 50%, Proteins 20%, Fats 30%" }
      ],

      quiz: [
        { q: "Which nutrient works with calcium for strong bones?", opts: ["Vitamin A", "Vitamin C", "Vitamin D", "Iron"], ans: 2 },
        { q: "What % of diet should be protein?", opts: ["10%", "20%", "50%", "70%"], ans: 1 }
      ],

      cheatsheet: {
        "Nutrients": {
          "Carbs": "50% - Energy (glucose)",
          "Proteins": "20% - Growth & repair",
          "Fats": "30% - Long-term energy",
          "Vitamins": "A, C, D - Body functions",
          "Minerals": "Calcium, Iron - Structure",
          "Water": "6-8 glasses - Transport"
        },
        "Key Pairing": "Vitamin D + Calcium = Strong bones",
        "Exam Focus": "Nutrient functions, balanced diet ratio, deficiency effects"
      }
    },

    10: {
      title: "Skeleton & Muscles",
      visual: "💪",
      introduction: "Your skeleton and muscles work together to support, protect, and move your body. Bones are strong and rigid, muscles are flexible and contractile. When muscles contract, they pull on bones, creating movement. It's a beautiful mechanical system!",

      sections: [
        {
          title: "The Skeleton - Structure & Functions",
          content: [
            "206 bones in adult human body",
            "",
            "FUNCTIONS:",
            "1. SUPPORT: Gives shape and structure",
            "2. PROTECTION: Skull → brain, Ribcage → heart/lungs, Pelvis → organs",
            "3. MOVEMENT: Attachment point for muscles",
            "4. BLOOD PRODUCTION: Bone marrow makes red blood cells",
            "5. STORAGE: Stores calcium and phosphorus (minerals)",
            "",
            "BONE STRUCTURE:",
            "- Hard outer layer (compact bone)",
            "- Spongy inside (cancellous bone)",
            "- Bone marrow in center (makes blood)"
          ]
        },
        {
          title: "Types of Bones",
          content: [
            "LONG BONES:",
            "- Femur (thigh bone), Humerus (upper arm)",
            "- Support body weight, lever for movement",
            "",
            "SHORT BONES:",
            "- Carpals (wrist), Tarsals (ankle)",
            "- Compact, provide support",
            "",
            "FLAT BONES:",
            "- Ribs, sternum, pelvis, scapula",
            "- Protection, large muscle attachment",
            "",
            "IRREGULAR BONES:",
            "- Vertebrae (spine), bones of face",
            "- Complex shapes for various functions"
          ]
        },
        {
          title: "Joints - Where Bones Meet",
          content: [
            "HINGE JOINTS (one plane movement):",
            "- Examples: Elbow, knee, fingers",
            "- Allows bending and straightening only",
            "- Like door hinge",
            "",
            "BALL-AND-SOCKET JOINTS (multiple planes):",
            "- Examples: Shoulder, hip",
            "- Full rotation possible",
            "- Most flexible",
            "",
            "PIVOT JOINTS (rotation):",
            "- Example: Neck (atlas-axis)",
            "- Allows rotation (turning head)",
            "",
            "GLIDING JOINTS (sliding):",
            "- Examples: Vertebrae, wrist",
            "- Slight sliding movement"
          ]
        },
        {
          title: "Muscles - Movement & Support",
          content: [
            "Over 600 muscles in human body",
            "Cover and support skeleton",
            "",
            "MUSCLE FUNCTION:",
            "- Contract (shorten) to pull bones",
            "- Relax to allow movement back",
            "- Work in pairs (antagonistic muscles)",
            "- Require energy (ATP from respiration)",
            "",
            "MUSCLE TYPES:",
            "1. Skeletal: voluntary, attached to bones",
            "2. Cardiac: involuntary, heart muscle",
            "3. Smooth: involuntary, digestive system"
          ]
        },
        {
          title: "Antagonistic Muscle Pairs - Biceps & Triceps",
          content: [
            "BICEPS:",
            "- Front of upper arm",
            "- Contracts → arm bends (flexion)",
            "- When contracting: triceps relaxes",
            "",
            "TRICEPS:",
            "- Back of upper arm",
            "- Contracts → arm straightens (extension)",
            "- When contracting: biceps relaxes",
            "",
            "MOVEMENT CYCLE:",
            "1. Brain sends signal",
            "2. Biceps contracts, pulls forearm up",
            "3. Triceps relaxes, allows movement",
            "4. To lower: Triceps contracts, Biceps relaxes",
            "5. Always works as pair"
          ]
        },
        {
          title: "Connection Points",
          content: [
            "TENDONS: Connect muscle to bone",
            "- Attach at both ends of muscle",
            "- Very strong, don't stretch",
            "- Allow force transmission",
            "",
            "LIGAMENTS: Connect bone to bone",
            "- Hold joints together",
            "- Provide stability",
            "- Slightly flexible",
            "",
            "CARTILAGE: Smooth covering at joints",
            "- Reduces friction",
            "- Protects bones from wear",
            "- Rubbery texture"
          ]
        }
      ],

      diagram: `
        ARM MOVEMENT - ANTAGONISTIC MUSCLES:

        BEND ARM (Flexion):
        ╔═════════════════════╗
        ║ Biceps CONTRACTS ↓  ║
        ║ ╭──●──╮             ║
        ║ │  │  │ (shortens)  ║
        ║ ╰──●──╯             ║
        ║ Triceps RELAXES     ║
        ║ ═════════════       ║
        ║      Arm bends      ║
        ╚═════════════════════╝

        STRAIGHTEN ARM (Extension):
        ╔═════════════════════╗
        ║ Triceps CONTRACTS   ║
        ║ ════════════        ║
        ║        ╭────╮       ║
        ║ (pulls)│    │       ║
        ║        ╰────╯       ║
        ║ Biceps RELAXES ↑    ║
        ║ ═════════════       ║
        ║   Arm straightens   ║
        ╚═════════════════════╝


        SKELETAL STRUCTURE:
        Muscle ├─→ Tendon ├─→ Bone
               │
              Ligament (bone to bone)
      `,

      flashcards: [
        { q: "How many bones in adult skeleton?", a: "206 bones" },
        { q: "What do joints do?", a: "Allow movement where bones connect" },
        { q: "When bicep contracts, tricep does what?", a: "Relaxes" },
        { q: "What are tendons?", a: "Connect muscle to bone" },
        { q: "What are ligaments?", a: "Connect bone to bone, hold joints together" },
        { q: "What are antagonistic muscles?", a: "Pairs of muscles that work opposite (one contracts, one relaxes)" }
      ],

      quiz: [
        { q: "When your bicep contracts, your tricep...", opts: ["Contracts", "Relaxes", "Stays same", "Gets shorter"], ans: 1 },
        { q: "What connects muscle to bone?", opts: ["Cartilage", "Tendon", "Ligament", "Joint"], ans: 1 }
      ],

      cheatsheet: {
        "Skeleton": "206 bones, supports/protects body, makes blood",
        "Joints": {
          "Hinge": "Elbow, knee (one plane)",
          "Ball-socket": "Shoulder, hip (multiple planes)",
          "Pivot": "Neck (rotation)"
        },
        "Muscles": "Contract to shorten, pull bones, work in pairs",
        "Antagonistic Pair": "Biceps & Triceps - opposite actions",
        "Connections": "Tendons=muscle-bone, Ligaments=bone-bone",
        "Exam Focus": "Know movement of antagonistic pairs, muscle functions"
      }
    },

    11: {
      title: "Ecosystems & Food Chains",
      visual: "🌿",
      introduction: "An ecosystem is all living things plus their environment all working together. Energy flows through it via food chains. Plants capture sunlight, herbivores eat plants, carnivores eat herbivores. Everything is connected in this beautiful web of life!",

      sections: [
        {
          title: "What is an Ecosystem?",
          content: [
            "Ecosystem = all living organisms + non-living environment + their interactions",
            "",
            "BIOTIC FACTORS (living):",
            "- Plants (producers)",
            "- Animals (consumers)",
            "- Fungi and bacteria (decomposers)",
            "",
            "ABIOTIC FACTORS (non-living):",
            "- Sunlight (energy source)",
            "- Temperature (affects living things)",
            "- Water (essential for life)",
            "- Soil (growing medium)",
            "- Atmosphere (oxygen, CO₂)",
            "",
            "EXAMPLES OF ECOSYSTEMS:",
            "- Forest, ocean, desert, pond, grassland, coral reef"
          ]
        },
        {
          title: "Trophic Levels - Organisms by Function",
          content: [
            "PRODUCERS (Plants):",
            "- Make own food via photosynthesis",
            "- Capture solar energy",
            "- Foundation of all food chains",
            "- Examples: Grass, trees, algae",
            "",
            "PRIMARY CONSUMERS (Herbivores):",
            "- Eat plants",
            "- Get energy from plants",
            "- Examples: Rabbit, deer, cow, caterpillar",
            "",
            "SECONDARY CONSUMERS (Carnivores):",
            "- Eat herbivores",
            "- Get energy from primary consumers",
            "- Examples: Fox, hawk, snake",
            "",
            "TERTIARY CONSUMERS (Top predators):",
            "- Eat other carnivores",
            "- Highest trophic level",
            "- Examples: Lion, eagle, orca",
            "",
            "DECOMPOSERS:",
            "- Break down dead matter",
            "- Return nutrients to soil",
            "- Examples: Bacteria, fungi, earthworms"
          ]
        },
        {
          title: "Food Chains & Energy Flow",
          content: [
            "FOOD CHAIN: Linear path of energy",
            "Plant → Herbivore → Carnivore",
            "Example: Grass → Rabbit → Fox",
            "",
            "ENERGY FLOW:",
            "- Solar energy captured by plants (photosynthesis)",
            "- 10% energy passed to next level",
            "- 90% lost as heat/movement",
            "",
            "WHY ENERGY DECREASES:",
            "- Animals use energy for movement, heat, growth",
            "- Only ~10% stored as body mass",
            "- This is why there are fewer carnivores than herbivores",
            "",
            "FOOD CHAIN LENGTH:",
            "- Usually 3-4 levels maximum",
            "- After 3-4 levels, not enough energy left",
            "- Prevents top predators from being too large"
          ]
        },
        {
          title: "Food Webs & Interconnections",
          content: [
            "FOOD WEB: Multiple interconnected food chains",
            "Shows real relationships in ecosystem",
            "More realistic than single chains",
            "",
            "EXAMPLE:",
            "             Plant",
            "          /   |   \\",
            "      Rabbit Mouse Deer",
            "         \\   |   /",
            "          Fox/Hawk",
            "",
            "IMPORTANCE:",
            "- Shows biodiversity",
            "- Shows resilience (if one species dies, others survive)",
            "- Shows complex relationships",
            "- Ecosystem with more connections = more stable"
          ]
        },
        {
          title: "Pyramid of Biomass",
          content: [
            "Shows mass of organisms at each level",
            "",
            "SHAPE:",
            "      Carnivore (small mass)",
            "         Herbivore (medium)",
            "      Plant (large mass)",
            "",
            "WHY PYRAMID SHAPE:",
            "- Producers have most biomass (always present)",
            "- Herbivores have less (depend on plants)",
            "- Carnivores have least (depend on herbivores)",
            "- Reflects 10% energy transfer rule",
            "",
            "EXAMPLE:",
            "- 1000 kg grass supports 100 kg rabbits",
            "- 100 kg rabbits support 10 kg foxes"
          ]
        }
      ],

      diagram: `
        FOOD CHAIN:
        ☀ (Solar Energy)
          ↓
        🌱 (Producer: Plant)
          ↓
        🐰 (Primary: Herbivore)
          ↓
        🦊 (Secondary: Carnivore)
          ↓
        🪱 (Decomposer: Returns nutrients)


        ENERGY FLOW (10% rule):
        Plant: 1000 units energy
          ↓ (10%)
        Herbivore: 100 units
          ↓ (10%)
        Carnivore: 10 units


        PYRAMID OF BIOMASS:
              /\
             /  \  Carnivores (10 kg)
            /────\
           /  ▲▲▲ \  Herbivores (100 kg)
          /─────────\
         /  ▲▲▲▲▲▲▲ \  Plants (1000 kg)
        /───────────── \
      `,

      flashcards: [
        { q: "What is an ecosystem?", a: "Living organisms + non-living environment + their interactions" },
        { q: "What do producers do?", a: "Make own food through photosynthesis" },
        { q: "What is a food chain?", a: "Linear path of energy: Plant → Herbivore → Carnivore" },
        { q: "Why does energy decrease at each level?", a: "Because 90% is lost as heat/movement, only 10% stored" },
        { q: "Why are there fewer carnivores than herbivores?", a: "Less energy available at top of food chain" },
        { q: "What do decomposers do?", a: "Break down dead matter and return nutrients to soil" }
      ],

      quiz: [
        { q: "Which organisms produce their own food?", opts: ["Consumers", "Producers", "Decomposers", "All equally"], ans: 1 },
        { q: "What is the first organism in every food chain?", opts: ["Carnivore", "Herbivore", "Plant", "Bacteria"], ans: 2 }
      ],

      cheatsheet: {
        "Ecosystem": "Living + Non-living + Interactions",
        "Trophic Levels": {
          "Producers": "Plants (photosynthesis)",
          "Primary": "Herbivores (eat plants)",
          "Secondary": "Carnivores (eat herbivores)",
          "Tertiary": "Top predators",
          "Decomposers": "Bacteria, fungi (break down)"
        },
        "Energy": "10% rule - 10% energy to next level, 90% lost",
        "Pyramid": "Producers (most) → Consumers (less) → Carnivores (least)",
        "Exam Focus": "Trophic levels, energy flow, why pyramid shaped"
      }
    },

    12: {
      title: "Adaptations & Species",
      visual: "🦁",
      introduction: "Species are organisms that can breed together and produce fertile offspring. Adaptations are features that help organisms survive in their environment. Through millions of years, natural selection has created amazing diversity of life!",

      sections: [
        {
          title: "What is a Species?",
          content: [
            "Species: Group of organisms that can breed and produce fertile offspring",
            "If organisms produce sterile offspring → different species",
            "",
            "EXAMPLES:",
            "- Lion + Tiger = Liger (sterile) → different species",
            "- Horse + Donkey = Mule (sterile) → different species",
            "- Dog + Dog = fertile puppies → same species",
            "",
            "REPRODUCTIVE ISOLATION:",
            "- Species separated geographically can't breed",
            "- Behavioral differences prevent breeding",
            "- Different chromosome numbers prevent fertile offspring"
          ]
        },
        {
          title: "What is Adaptation?",
          content: [
            "Adaptation: Feature or behavior helping organism survive in environment",
            "Result of evolution over many generations",
            "Increases chances of survival and reproduction",
            "",
            "NATURAL SELECTION:",
            "1. Organisms with helpful adaptations → survive better",
            "2. They reproduce more → more offspring",
            "3. Beneficial traits → passed to offspring",
            "4. Over generations → trait becomes common",
            "5. Eventually → characteristic of species"
          ]
        },
        {
          title: "Physical (Structural) Adaptations",
          content: [
            "CAMOUFLAGE (color/pattern):",
            "- Lion tan color matches savanna",
            "- Polar bear white matches snow",
            "- Arctic hare white fur in winter",
            "- Helps hide from predators or sneak up on prey",
            "",
            "BODY SHAPE:",
            "- Streamlined fish for swimming",
            "- Long neck giraffe to reach tall trees",
            "- Powerful legs cheetah for sprinting",
            "",
            "BODY COVERING:",
            "- Thick fur: insulation in cold (polar bear)",
            "- Scales: protection (fish, snake)",
            "- Spines: defense (hedgehog, porcupine)",
            "",
            "APPENDAGES:",
            "- Webbed feet: swimming (duck)",
            "- Sharp talons: hunting (eagle)",
            "- Large ears: cooling (elephant)"
          ]
        },
        {
          title: "Behavioral Adaptations",
          content: [
            "MIGRATION:",
            "- Animals move to better location seasonally",
            "- Example: Wildebeest follow water in Africa",
            "- Example: Birds fly south for winter",
            "- Avoid harsh conditions, find food",
            "",
            "HIBERNATION:",
            "- Deep sleep through winter",
            "- Example: Bears, hedgehogs",
            "- Saves energy, survives cold",
            "",
            "HUNTING/FEEDING:",
            "- Hunting in packs (wolves, lions)",
            "- Catch larger prey together",
            "- Better success rate",
            "",
            "PLAYING DEAD:",
            "- Possum plays dead when threatened",
            "- Predators think it's dead, leave it",
            "",
            "TERRITORIAL:",
            "- Defend area for food/mates",
            "- Lions, birds sing to mark territory"
          ]
        }
      ],

      diagram: `
        ADAPTATION CYCLE:

        Environment Challenge
                ↓
        Some organisms better adapted
                ↓
        They survive better, reproduce more
                ↓
        Beneficial trait in more offspring
                ↓
        Over generations, trait becomes common
                ↓
        Species characteristic


        EXAMPLES:

        PHYSICAL:           BEHAVIORAL:
        🐻 Thick fur        🦁 Hunt in packs
        🦒 Long neck        🐦 Migrate
        🦗 Camouflage       🐻 Hibernate
        🦅 Sharp talons     🦌 Territorial
        🐟 Streamlined      🦆 Parenting
      `,

      flashcards: [
        { q: "What is a species?", a: "Organisms that can breed and produce fertile offspring" },
        { q: "What is an adaptation?", a: "Feature or behavior helping organism survive in environment" },
        { q: "Give an example of physical adaptation", a: "Thick fur, camouflage, long neck, webbed feet" },
        { q: "Give an example of behavioral adaptation", a: "Migration, hibernation, hunting in packs, playing dead" },
        { q: "How does natural selection work?", a: "Better adaptations survive more, reproduce more, trait spreads" },
        { q: "Why do organisms have adaptations?", a: "To help survive and reproduce in their specific environment" }
      ],

      quiz: [
        { q: "What is a physical adaptation?", opts: ["Learning behavior", "Feature like thick fur", "Migration", "Hunting skill"], ans: 1 },
        { q: "Why do some animals hibernate?", opts: ["For fun", "To save energy in winter", "To escape predators", "To find mates"], ans: 1 }
      ],

      cheatsheet: {
        "Species": "Can breed → fertile offspring",
        "Adaptation": "Feature/behavior helping survival",
        "Physical": "Camouflage, body shape, fur, appendages",
        "Behavioral": "Migration, hibernation, hunting, territorial",
        "Natural Selection": "Better traits → more survival → more reproduction → trait spreads",
        "Exam Focus": "Explain WHY organisms have specific adaptations"
      }
    },

    13: {
      title: "Properties of Materials",
      visual: "🪨",
      introduction: "All materials have properties—hardness, density, melting point, and more. These properties determine what materials are good for. Iron is hard but rusts. Glass is transparent but brittle. Understanding properties helps us choose the right material for the right job!",

      sections: [
        {
          title: "Physical Properties",
          content: [
            "Properties you can observe without changing material",
            "",
            "HARDNESS: Resistance to scratching",
            "- Soft: Lead pencil",
            "- Hard: Diamond",
            "",
            "DENSITY: Mass per unit volume (Mass ÷ Volume)",
            "- Light material: Cork (floats)",
            "- Dense material: Lead (sinks)",
            "- Denser than water → sinks",
            "- Less dense than water → floats",
            "",
            "MELTING POINT: Temp where solid becomes liquid",
            "- Ice melts at 0°C",
            "- Iron melts at 1538°C",
            "- Higher melting point = more heat resistant",
            "",
            "BOILING POINT: Temp where liquid becomes gas",
            "- Water boils at 100°C",
            "- Used to separate liquids"
          ]
        },
        {
          title: "States of Matter",
          content: [
            "SOLID:",
            "- Fixed shape (doesn't change)",
            "- Fixed volume",
            "- Particles tightly packed",
            "- Particles vibrate in place",
            "- Examples: Rock, wood, ice",
            "",
            "LIQUID:",
            "- No fixed shape (takes container shape)",
            "- Fixed volume",
            "- Particles less tightly packed",
            "- Particles can move around",
            "- Examples: Water, oil, mercury",
            "",
            "GAS:",
            "- No fixed shape (fills container)",
            "- No fixed volume",
            "- Particles far apart",
            "- Particles move freely",
            "- Examples: Air, oxygen, steam"
          ]
        },
        {
          title: "State Changes & Energy",
          content: [
            "MELTING (Solid → Liquid):",
            "- Add heat",
            "- Particles vibrate more, break bonds",
            "- Keeps volume same",
            "- Example: Ice → Water (0°C)",
            "",
            "BOILING (Liquid → Gas):",
            "- Add more heat",
            "- Particles escape as gas",
            "- Volume increases greatly",
            "- Example: Water → Steam (100°C)",
            "",
            "CONDENSATION (Gas → Liquid):",
            "- Remove heat",
            "- Particles cool, slow down",
            "- Form liquid",
            "- Example: Steam → Water",
            "",
            "FREEZING (Liquid → Solid):",
            "- Remove heat",
            "- Particles slow, settle in place",
            "- Form solid",
            "- Example: Water → Ice (0°C)"
          ]
        },
        {
          title: "Density & Floating/Sinking",
          content: [
            "DENSITY = Mass ÷ Volume",
            "Formula: ρ = m/v",
            "Units: g/cm³ or kg/m³",
            "",
            "WATER DENSITY = 1 g/cm³ (reference point)",
            "",
            "COMPARING DENSITIES:",
            "- Less dense than water → FLOATS (cork, ice, oil)",
            "- Same density as water → NEUTRAL (some fish)",
            "- More dense than water → SINKS (rock, metal, glass)",
            "",
            "EXAMPLES:",
            "- Cork: 0.24 g/cm³ (floats)",
            "- Ice: 0.92 g/cm³ (floats, but barely)",
            "- Water: 1.0 g/cm³ (reference)",
            "- Iron: 7.87 g/cm³ (sinks)",
            "- Lead: 11.34 g/cm³ (sinks heavily)"
          ]
        },
        {
          title: "Choosing Materials for Jobs",
          content: [
            "METALS (conduct heat/electricity):",
            "- Iron: Strong, cheap, but rusts",
            "  Use: Structures, tools, bridges",
            "- Copper: Conducts electricity, expensive",
            "  Use: Wiring, plumbing",
            "- Aluminum: Light, conducts, doesn't rust",
            "  Use: Aircraft, cans",
            "",
            "GLASS (transparent, hard, brittle):",
            "- Use: Windows, bottles, lenses",
            "- Problem: Breaks easily",
            "",
            "RUBBER (elastic, insulator):",
            "- Use: Tires, seals, handles",
            "- Problem: Not strong",
            "",
            "CERAMICS (hard, heat resistant, brittle):",
            "- Use: Pottery, tiles, heat shields",
            "- Problem: Breaks when shocked"
          ]
        }
      ],

      diagram: `
        STATES OF MATTER:

        SOLID          LIQUID         GAS
        ●●●●●●●        ●●●  ●         ● ●  ●
        ●●●●●●●         ●●● ●        ● ● ● ●
        ●●●●●●●        ●●●●●●        ● ● ● ●
        (Fixed shape)   (Takes shape)  (Fills space)


        STATE CHANGES:

        Melting↓  ┌────────────┐  ↑Condensing
        SOLID ←→ LIQUID ←→ GAS
        ↑            ↓
        Freezing  Boiling


        DENSITY COMPARISON:

        ρ < 1.0      ρ = 1.0      ρ > 1.0
        ↑ FLOATS     Reference    SINKS ↓
        Cork          Water        Iron
        Ice                        Lead
        Oil                        Glass
      `,

      flashcards: [
        { q: "What is melting?", a: "Solid turning into liquid by adding heat" },
        { q: "What is boiling?", a: "Liquid turning into gas by adding heat" },
        { q: "What is condensation?", a: "Gas turning into liquid by removing heat" },
        { q: "What is freezing?", a: "Liquid turning into solid by removing heat" },
        { q: "What is density?", a: "Mass divided by volume (m/v)" },
        { q: "Which floats: iron or cork?", a: "Cork (less dense than water)" }
      ],

      quiz: [
        { q: "What is melting?", opts: ["Gas to liquid", "Solid to liquid", "Liquid to gas", "Solid to gas"], ans: 1 },
        { q: "What is density?", opts: ["Weight", "Mass/Volume", "Hardness", "Temperature"], ans: 1 }
      ],

      cheatsheet: {
        "States": {
          "Solid": "Fixed shape & volume, particles packed",
          "Liquid": "Takes container shape, fixed volume, particles mobile",
          "Gas": "Fills container, no fixed volume, particles very free"
        },
        "Changes": {
          "Melting": "Solid→Liquid (add heat)",
          "Boiling": "Liquid→Gas (add heat)",
          "Condensation": "Gas→Liquid (remove heat)",
          "Freezing": "Liquid→Solid (remove heat)"
        },
        "Density": "ρ=m/v. <1 floats, >1 sinks (vs water)",
        "Exam Focus": "State changes, density, material properties"
      }
    }
  };

  const handleSelectLesson = (week) => {
    setCurrentLesson(week);
    setShowQuiz(false);
    setShowFlashcards(false);
    setQuizScore(0);
    setCurrentQuizQuestion(0);
    setQuizAnswered(false);
    setSelectedAnswer(null);
    setFlashcardFlipped(false);
    setCurrentFlashcard(0);
    setExpandedSection(null);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizQuestion(0);
    setSelectedAnswer(null);
    setQuizAnswered(false);
  };

  const handleAnswerQuestion = (answerIndex) => {
    if (!quizAnswered) {
      setSelectedAnswer(answerIndex);
      const isCorrect = answerIndex === lessonContent[currentLesson].quiz[currentQuizQuestion].ans;
      if (isCorrect) {
        setQuizScore(quizScore + 10);
      }
      setQuizAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizQuestion < lessonContent[currentLesson].quiz.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    } else {
      const weekKey = `week_${currentLesson}`;
      setWeeklyScore({ ...weeklyScore, [weekKey]: quizScore });
      setShowQuiz(false);
    }
  };

  const avgScore = Object.keys(weeklyScore).length > 0
    ? Math.round(Object.values(weeklyScore).reduce((a, b) => a + b) / Object.keys(weeklyScore).length)
    : 0;

  const completedWeeks = Object.keys(weeklyScore).length;

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 pt-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🔬 Science Mastery</h1>
            <p className="text-gray-600">Year 8 Term 2 - Enhanced Interactive Learning</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{avgScore}%</div>
              <div className="text-xs text-gray-600">Avg Score</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">{completedWeeks}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl">📚</div>
              <div className="text-xs text-gray-600">13 Topics</div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Select a Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lessons.map((lesson) => {
                const completed = weeklyScore[`week_${lesson.week}`] !== undefined;
                const score = weeklyScore[`week_${lesson.week}`];

                return (
                  <button
                    key={lesson.week}
                    onClick={() => handleSelectLesson(lesson.week)}
                    className={`p-4 rounded-lg text-left transition transform hover:scale-105 ${lesson.color} ${lesson.textColor} shadow-sm hover:shadow-md`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-3xl mb-1">{lesson.icon}</div>
                        <div className="text-sm font-semibold">Week {lesson.week}</div>
                        <div className="text-xs opacity-75 line-clamp-2">{lesson.title}</div>
                      </div>
                      {completed && (
                        <div className="text-right">
                          <div className="text-xl">✅</div>
                          <div className="text-xs font-bold">{score}%</div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lesson View
  const lesson = lessonContent[currentLesson];
  const weekData = lessons.find(l => l.week === currentLesson);

  if (showFlashcards) {
    const flashcards = lesson.flashcards;
    const currentCard = flashcards[currentFlashcard];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowFlashcards(false)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Lesson
          </button>

          <div className={`${weekData.color} ${weekData.textColor} p-6 rounded-xl shadow-lg mb-6`}>
            <h1 className="text-2xl font-bold">📇 Flashcard Review</h1>
            <p className="text-sm opacity-75">Card {currentFlashcard + 1} of {flashcards.length}</p>
          </div>

          <div className="w-full mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentFlashcard + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>

          <div
            onClick={() => setFlashcardFlipped(!flashcardFlipped)}
            className="bg-white rounded-xl shadow-lg p-8 min-h-64 flex flex-col justify-center items-center cursor-pointer hover:shadow-xl transition transform hover:scale-102 mb-6"
          >
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-4">
                {flashcardFlipped ? "Answer:" : "Question:"}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-4">
                {flashcardFlipped ? currentCard.a : currentCard.q}
              </div>
              <div className="text-xs text-gray-400 mt-6">Click to flip</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (currentFlashcard > 0) {
                  setCurrentFlashcard(currentFlashcard - 1);
                  setFlashcardFlipped(false);
                }
              }}
              disabled={currentFlashcard === 0}
              className="flex-1 bg-gray-400 hover:bg-gray-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                if (currentFlashcard < flashcards.length - 1) {
                  setCurrentFlashcard(currentFlashcard + 1);
                  setFlashcardFlipped(false);
                }
              }}
              disabled={currentFlashcard === flashcards.length - 1}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowQuiz(false)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Lesson
          </button>

          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-700">Question {currentQuizQuestion + 1} of {lesson.quiz.length}</span>
              <span className="font-bold text-green-600">Score: {quizScore} pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuizQuestion + 1) / lesson.quiz.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {lesson.quiz[currentQuizQuestion].q}
            </h2>

            <div className="space-y-3">
              {lesson.quiz[currentQuizQuestion].opts.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === lesson.quiz[currentQuizQuestion].ans;
                const showResult = quizAnswered;

                let buttonClass = "bg-white hover:bg-blue-50 text-gray-800 border-2 border-gray-200";
                if (showResult) {
                  if (isCorrect) buttonClass = "bg-green-100 text-green-800 border-2 border-green-500";
                  if (isSelected && !isCorrect) buttonClass = "bg-red-100 text-red-800 border-2 border-red-500";
                }  else if (isSelected) {
                  buttonClass = "bg-blue-100 text-blue-800 border-2 border-blue-500";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerQuestion(idx)}
                    disabled={quizAnswered}
                    className={`w-full p-4 rounded-lg font-semibold text-left transition transform ${buttonClass} ${!quizAnswered ? 'hover:scale-102 cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{option}</span>
                      {showResult && isCorrect && <span className="ml-auto text-xl">✅</span>}
                      {showResult && isSelected && !isCorrect && <span className="ml-auto text-xl">❌</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <div className={`mt-4 p-3 rounded-lg ${selectedAnswer === lesson.quiz[currentQuizQuestion].ans ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {selectedAnswer === lesson.quiz[currentQuizQuestion].ans
                  ? "🎉 Correct! Great job!"
                  : "💡 Not quite. Review the key points and try again!"}
              </div>
            )}
          </div>

          {quizAnswered && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              {currentQuizQuestion < lesson.quiz.length - 1 ? "Next Question →" : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Main Lesson Content
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentLesson(null)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
        >
          ← Back to Lessons
        </button>

        <div className={`${weekData.color} ${weekData.textColor} p-6 rounded-xl shadow-lg mb-6`}>
          <div className="text-5xl mb-2">{weekData.icon}</div>
          <h1 className="text-3xl font-bold mb-1">Week {currentLesson}: {lesson.title}</h1>
          <p className="text-sm opacity-75">⏱️ 30 minutes of rich, interactive learning</p>
        </div>

        {/* Introduction */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
          <p className="text-gray-700 italic">{lesson.introduction}</p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-4 mb-6">
          {lesson.sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
                {expandedSection === idx ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSection === idx && (
                <div className="border-t px-4 py-4 bg-gray-50">
                  {section.content.map((point, pidx) => (
                    <div key={pidx} className="mb-3 text-gray-700 leading-relaxed">
                      {point}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Diagram */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Eye className="mr-2 text-purple-600" /> Visual Diagram
          </h2>
          <div className="bg-white rounded-lg p-6 font-mono text-xs md:text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {lesson.diagram}
          </div>
        </div>

        {/* Flashcards Button */}
        <button
          onClick={() => setShowFlashcards(true)}
          className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg mb-6 flex items-center justify-center gap-2"
        >
          <span>📇</span> Study with Flashcards ({lesson.flashcards.length} cards)
        </button>

        {/* Quiz Button */}
        <button
          onClick={handleStartQuiz}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg mb-6 flex items-center justify-center gap-2"
        >
          <Target className="w-5 h-5" /> Take the Quiz ({lesson.quiz.length} questions)
        </button>

        {/* Cheatsheet */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">⚡ Quick Cheatsheet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(lesson.cheatsheet).map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">{key}</h3>
                {typeof value === 'object' ? (
                  <div className="space-y-2 text-sm text-gray-700">
                    {Object.entries(value).map(([k, v]) => (
                      <div key={k}><strong>{k}:</strong> {v}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceLessonApp;