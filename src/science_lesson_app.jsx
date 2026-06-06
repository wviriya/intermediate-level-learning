import React, { useState } from 'react';
import { Brain, Zap, Target, Eye } from 'lucide-react';

const ScienceLessonApp = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [weeklyScore, setWeeklyScore] = useState({});
  const [showAchievements, setShowAchievements] = useState(false);

  // Term 2 curriculum (Weeks 1-13)
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
      keyPoints: [
        "Respiration = using oxygen to release energy from food",
        "Happens in every cell, not just lungs",
        "Aerobic respiration (with oxygen) is most efficient",
        "Glucose + Oxygen → Carbon Dioxide + Water + Energy",
        "The respiratory system brings oxygen in and removes CO₂"
      ],
      diagram: "NOSE → TRACHEA → BRONCHI → LUNGS (ALVEOLI)",
      quiz: [
        { q: "Where does gas exchange happen?", opts: ["Trachea", "Alveoli", "Bronchi", "Larynx"], ans: 1 },
        { q: "What is aerobic respiration?", opts: ["Without oxygen", "With oxygen", "In muscles only", "Breathing"], ans: 1 }
      ]
    },
    2: {
      title: "How the Lungs Work",
      visual: "💨",
      keyPoints: [
        "Diaphragm is the main breathing muscle",
        "When diaphragm contracts → lung volume increases → air rushes in (INSPIRATION)",
        "When diaphragm relaxes → lung volume decreases → air pushed out (EXPIRATION)",
        "Intercostal muscles help lift ribcage",
        "Inhalation brings oxygen; exhalation removes CO₂"
      ],
      diagram: "DIAPHRAGM DOWN = LUNGS EXPAND | DIAPHRAGM UP = LUNGS CONTRACT",
      quiz: [
        { q: "What happens when the diaphragm contracts?", opts: ["Lungs shrink", "Air goes out", "Lungs expand", "Breathing stops"], ans: 2 },
        { q: "Which gas is inhaled more than exhaled?", opts: ["CO₂", "Nitrogen", "Oxygen", "Argon"], ans: 2 }
      ]
    },
    3: {
      title: "Exchange of Gases in Alveoli",
      visual: "🔄",
      keyPoints: [
        "Alveoli = tiny air sacs where gas exchange happens",
        "Oxygen from air → diffuses into bloodstream",
        "Carbon dioxide from blood → diffuses into alveoli",
        "Partially permeable wall allows this diffusion",
        "Large surface area of alveoli = efficient exchange"
      ],
      diagram: "OXYGEN IN ALVEOLI → BLOOD CAPILLARY | CO₂ FROM BLOOD → ALVEOLI (DIFFUSION)",
      quiz: [
        { q: "What process moves gases across the alveoli wall?", opts: ["Osmosis", "Diffusion", "Active transport", "Filtration"], ans: 1 },
        { q: "Why are alveoli good at gas exchange?", opts: ["Small surface area", "Thick walls", "Large surface area", "No capillaries"], ans: 2 }
      ]
    },
    4: {
      title: "Forces - Types & Effects",
      visual: "⚡",
      keyPoints: [
        "Force = push, pull, or twist",
        "Measured in Newtons (N)",
        "Contact forces: friction, tension, normal force",
        "Non-contact forces: gravity, magnetic, electrostatic",
        "Forces cause change in motion, shape, or direction"
      ],
      diagram: "PUSH ←→ PULL ↔ FRICTION ⚙ GRAVITY ↓ MAGNETIC →",
      quiz: [
        { q: "Which is NOT a type of force?", opts: ["Gravity", "Friction", "Temperature", "Tension"], ans: 2 },
        { q: "What is the SI unit for force?", opts: ["Joule", "Newton", "Pascal", "Watt"], ans: 1 }
      ]
    },
    5: {
      title: "Balanced & Unbalanced Forces",
      visual: "⚖️",
      keyPoints: [
        "Balanced forces = equal size, opposite direction → no change in motion",
        "Unbalanced forces = different size → object accelerates",
        "Net force = sum of all forces acting on object",
        "Balanced forces keep objects at rest OR moving at constant speed",
        "Unbalanced forces speed up, slow down, or change direction"
      ],
      diagram: "BALANCED: ← 10N → 10N = NO MOTION | UNBALANCED: ← 10N → 15N = ACCELERATION →",
      quiz: [
        { q: "What happens with balanced forces?", opts: ["Object accelerates", "No change in motion", "Object stops", "Force increases"], ans: 1 },
        { q: "If forces are unbalanced, the object will:", opts: ["Stay still", "Move at constant speed", "Accelerate", "Never move"], ans: 2 }
      ]
    },
    6: {
      title: "Motion & Speed",
      visual: "🚀",
      keyPoints: [
        "Speed = distance ÷ time (measured in m/s)",
        "Velocity = speed + direction",
        "Acceleration = change in velocity ÷ time",
        "Distance-time graph: steep slope = fast, flat = stationary",
        "Velocity-time graph: straight horizontal = constant speed, slope = acceleration"
      ],
      diagram: "SPEED = DISTANCE/TIME | ACCELERATION = CHANGE IN VELOCITY/TIME",
      quiz: [
        { q: "If a car travels 100m in 5 seconds, what's its speed?", opts: ["20 m/s", "500 m/s", "0.05 m/s", "5 m/s"], ans: 0 },
        { q: "What does a flat line on a distance-time graph mean?", opts: ["Fast movement", "Stationary", "Acceleration", "Deceleration"], ans: 1 }
      ]
    },
    7: {
      title: "Magnetism - Magnetic Fields",
      visual: "🧲",
      keyPoints: [
        "Magnetic field = region around magnet where magnetic force detected",
        "Detected using compass needle (points north) or iron filings",
        "Magnetic field lines show field strength and direction",
        "Stronger where lines are closer together",
        "Earth has magnetic field (used for compass navigation)"
      ],
      diagram: "MAGNET → FIELD LINES → STRONGER AT POLES",
      quiz: [
        { q: "How can you detect a magnetic field?", opts: ["Thermometer", "Iron filings", "Light", "Sound"], ans: 1 },
        { q: "Where is a magnetic field strongest?", opts: ["Center", "Poles", "Everywhere equal", "Outside only"], ans: 1 }
      ]
    },
    8: {
      title: "Poles & Attraction",
      visual: "↔️",
      keyPoints: [
        "Magnets have North pole and South pole",
        "Opposite poles attract (N-S attracts)",
        "Same poles repel (N-N or S-S repel)",
        "Every magnet has both poles - can't separate them",
        "Earth's magnetic field makes compasses point north"
      ],
      diagram: "N ← ATTRACT → S | N ↔ REPEL ↔ N | S ↔ REPEL ↔ S",
      quiz: [
        { q: "What happens when opposite magnetic poles meet?", opts: ["Repel", "Attract", "Nothing", "Stick temporarily"], ans: 1 },
        { q: "Can a magnet have only one pole?", opts: ["Yes", "No", "Sometimes", "Only electromagnets"], ans: 1 }
      ]
    },
    9: {
      title: "Diet & Nutrients",
      visual: "🥗",
      keyPoints: [
        "Carbohydrates = energy (glucose, starch, fiber)",
        "Proteins = growth and repair (amino acids)",
        "Fats = energy and insulation (saturated vs unsaturated)",
        "Vitamins (A, C, D) = health and disease prevention",
        "Minerals (calcium, iron) = bones, teeth, blood",
        "Fiber = digestive health; Water = hydration"
      ],
      diagram: "BALANCED DIET: Carbs 50% | Protein 20% | Fats 30% + Vitamins + Minerals",
      quiz: [
        { q: "Which nutrient works with calcium for strong bones?", opts: ["Vitamin A", "Vitamin C", "Vitamin D", "Iron"], ans: 2 },
        { q: "What do proteins do?", opts: ["Give energy", "Growth and repair", "Store energy", "Make bones"], ans: 1 }
      ]
    },
    10: {
      title: "Skeleton & Muscles",
      visual: "💪",
      keyPoints: [
        "Skeleton = 206 bones (support, protection, movement)",
        "Joints = where bones meet (hinge, ball-and-socket)",
        "Muscles work in pairs (antagonistic muscles)",
        "When bicep contracts → arm bends; tricep relaxes",
        "Tendons connect muscle to bone; Ligaments connect bones"
      ],
      diagram: "BICEP CONTRACTS ↑ | TRICEP RELAXES → ARM BENDS | TRICEP CONTRACTS ↓ | BICEP RELAXES → ARM STRAIGHTENS",
      quiz: [
        { q: "When your bicep contracts, what does your tricep do?", opts: ["Contracts", "Relaxes", "Stays same", "Gets shorter"], ans: 1 },
        { q: "What connects muscle to bone?", opts: ["Cartilage", "Tendon", "Ligament", "Joint"], ans: 1 }
      ]
    },
    11: {
      title: "Ecosystems & Food Chains",
      visual: "🌿",
      keyPoints: [
        "Ecosystem = living (biotic) + non-living (abiotic) factors",
        "Producers = make own food (plants - photosynthesis)",
        "Consumers = eat other organisms (primary, secondary, tertiary)",
        "Decomposers = break down dead matter (bacteria, fungi)",
        "Food chain shows energy flow: Producer → Consumer → Consumer",
        "Food web = interconnected food chains"
      ],
      diagram: "PLANT → HERBIVORE → CARNIVORE | DECOMPOSER BREAKS DOWN ALL",
      quiz: [
        { q: "Which organisms produce their own food?", opts: ["Consumers", "Producers", "Decomposers", "All equally"], ans: 1 },
        { q: "What is the first organism in every food chain?", opts: ["Carnivore", "Herbivore", "Plant", "Bacteria"], ans: 2 }
      ]
    },
    12: {
      title: "Adaptations & Species",
      visual: "🦁",
      keyPoints: [
        "Adaptation = feature helping organism survive in environment",
        "Physical adaptations = shape, color, size (camouflage, thick fur)",
        "Behavioral adaptations = actions (migration, hibernation, hunting)",
        "Species = organisms that can breed and produce fertile offspring",
        "Organisms with better adaptations more likely to survive (natural selection)"
      ],
      diagram: "ENVIRONMENT CHALLENGE → ORGANISM ADAPTATION → BETTER SURVIVAL",
      quiz: [
        { q: "What is a physical adaptation?", opts: ["Learning behavior", "Feature like thick fur", "Migration", "Hunting skill"], ans: 1 },
        { q: "Why do some animals hibernate?", opts: ["For fun", "To save energy in winter", "To escape predators", "To find mates"], ans: 1 }
      ]
    },
    13: {
      title: "Properties of Materials",
      visual: "🪨",
      keyPoints: [
        "Physical properties = hardness, density, melting point, boiling point",
        "Materials can be: solid (fixed shape), liquid (takes container shape), gas (fills space)",
        "States change: melting (solid→liquid), boiling (liquid→gas), condensation (gas→liquid)",
        "Density = mass ÷ volume (denser = heavier for same volume)",
        "Useful materials: metals (conduct heat/electricity), glass (transparent), rubber (elastic)"
      ],
      diagram: "SOLID ← MELTING → LIQUID ← BOILING → GAS | CONDENSATION",
      quiz: [
        { q: "What is melting?", opts: ["Gas to liquid", "Solid to liquid", "Liquid to gas", "Solid to gas"], ans: 1 },
        { q: "What is density?", opts: ["Weight", "Mass/Volume", "Hardness", "Temperature"], ans: 1 }
      ]
    }
  };

  const handleSelectLesson = (week) => {
    setCurrentLesson(week);
    setShowQuiz(false);
    setQuizScore(0);
    setCurrentQuizQuestion(0);
    setQuizAnswered(false);
    setSelectedAnswer(null);
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
      // Quiz complete
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
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 pt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">🔬 Science Mastery</h1>
            <p className="text-gray-600">Year 8 Term 2 - 30 Min Weekly Lessons</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{avgScore}%</div>
              <div className="text-xs text-gray-600">Avg Score</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">{completedWeeks}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <button
              onClick={() => setShowAchievements(true)}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:bg-purple-50"
            >
              <div className="text-2xl">🏆</div>
              <div className="text-xs text-gray-600">Achievements</div>
            </button>
          </div>

          {/* Lesson Grid */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Week by Week Curriculum</h2>
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

          {/* Tips Section */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">💡 Study Tips</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>✓ Spend 30 minutes per week on each topic</li>
              <li>✓ Read key points carefully</li>
              <li>✓ Try to explain diagrams to someone</li>
              <li>✓ Complete all quiz questions</li>
              <li>✓ Review weak areas before exams</li>
            </ul>
          </div>
        </div>

        {/* Achievements Modal */}
        {showAchievements && (
          <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-4 z-50">
            <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-md p-6 max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">🏆 Your Achievements</h2>
              <div className="space-y-3">
                {completedWeeks >= 1 && <div className="bg-blue-50 p-3 rounded-lg">🌟 First Step - Complete 1 lesson</div>}
                {completedWeeks >= 3 && <div className="bg-blue-50 p-3 rounded-lg">📚 Learner - Complete 3 lessons</div>}
                {completedWeeks >= 5 && <div className="bg-blue-50 p-3 rounded-lg">🚀 Scholar - Complete 5 lessons</div>}
                {completedWeeks >= 10 && <div className="bg-blue-50 p-3 rounded-lg">🎓 Expert - Complete 10 lessons</div>}
                {avgScore >= 80 && <div className="bg-green-50 p-3 rounded-lg">💯 Perfect Score - 80%+ average</div>}
                {completedWeeks === 0 && <div className="text-gray-500 italic">Complete lessons to unlock achievements!</div>}
              </div>
              <button
                onClick={() => setShowAchievements(false)}
                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Lesson View
  const lesson = lessonContent[currentLesson];
  const weekData = lessons.find(l => l.week === currentLesson);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 pt-4">
          <button
            onClick={() => setCurrentLesson(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Lessons
          </button>

          <div className={`${weekData.color} ${weekData.textColor} p-6 rounded-xl shadow-lg`}>
            <div className="text-5xl mb-2">{weekData.icon}</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Week {currentLesson}: {lesson.title}</h1>
            <p className="text-sm opacity-75">⏱️ 30 minutes of focused learning</p>
          </div>
        </div>

        {!showQuiz ? (
          // Lesson Content
          <div className="space-y-6">
            {/* Key Points */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Brain className="mr-2 text-blue-600" /> Key Points to Learn
              </h2>
              <div className="space-y-3">
                {lesson.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="text-blue-600 font-bold flex-shrink-0">{idx + 1}</div>
                    <div className="text-gray-700">{point}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Eye className="mr-2 text-purple-600" /> Visual Summary
              </h2>
              <div className="bg-white rounded-lg p-6 text-center font-mono text-sm md:text-base text-gray-700 overflow-x-auto">
                {lesson.diagram}
              </div>
            </div>

            {/* Challenge Question */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Zap className="mr-2 text-orange-600" /> Challenge Question
              </h2>
              <p className="text-gray-700 font-semibold mb-4">Can you explain in your own words:</p>
              <div className="bg-white rounded-lg p-4 text-gray-600 italic">
                {currentLesson <= 3 && "How does your respiratory system keep you alive?"}
                {currentLesson >= 4 && currentLesson <= 6 && "Why do objects move the way they do?"}
                {currentLesson >= 7 && currentLesson <= 8 && "How do magnets work without touching?"}
                {currentLesson >= 9 && currentLesson <= 10 && "How do your muscles and bones work together?"}
                {currentLesson >= 11 && currentLesson <= 12 && "How are all living things connected in nature?"}
                {currentLesson >= 13 && "Why do materials change state?"}
              </div>
            </div>

            {/* Start Quiz Button */}
            <button
              onClick={handleStartQuiz}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" /> Start Quiz (Test Your Understanding!)
            </button>

            {/* Learning Tips */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">📖 Quick Study Method:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>1️⃣ Read all key points</li>
                <li>2️⃣ Look at the diagram and try to redraw it</li>
                <li>3️⃣ Answer the challenge question aloud</li>
                <li>4️⃣ Take the quiz to test yourself</li>
                <li>5️⃣ Review any questions you got wrong</li>
              </ul>
            </div>
          </div>
        ) : (
          // Quiz View
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-md p-4">
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

            {/* Question */}
            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {lesson.quiz[currentQuizQuestion].q}
              </h2>

              {/* Answer Options */}
              <div className="space-y-3">
                {lesson.quiz[currentQuizQuestion].opts.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === lesson.quiz[currentQuizQuestion].ans;
                  const showResult = quizAnswered;

                  let buttonClass = "bg-white hover:bg-blue-50 text-gray-800 border-2 border-gray-200";
                  if (showResult) {
                    if (isCorrect) buttonClass = "bg-green-100 text-green-800 border-2 border-green-500";
                    if (isSelected && !isCorrect) buttonClass = "bg-red-100 text-red-800 border-2 border-red-500";
                  } else if (isSelected) {
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

              {/* Feedback */}
              {quizAnswered && (
                <div className={`mt-4 p-3 rounded-lg ${selectedAnswer === lesson.quiz[currentQuizQuestion].ans ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {selectedAnswer === lesson.quiz[currentQuizQuestion].ans
                    ? "🎉 Correct! Great job!"
                    : "💡 Not quite. Review the key points and try again next time."}
                </div>
              )}
            </div>

            {/* Next Button */}
            {quizAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                {currentQuizQuestion < lesson.quiz.length - 1 ? "Next Question →" : "Finish Quiz"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScienceLessonApp;