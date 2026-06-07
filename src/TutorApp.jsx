import React, { useState, useEffect } from 'react';
import { Target, Eye, ChevronDown, ChevronUp, Home } from 'lucide-react';
import { loadLesson, randomizeQuestions, randomizeFlashcards } from './utils/contentLoader';
import { useGamification, GamificationDisplay } from './Gamification';

const TutorApp = ({ subject, level, lessonFile, lessonData, onBack }) => {
  const gamification = useGamification();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [randomizedFlashcards, setRandomizedFlashcards] = useState([]);

  // Load lesson data on mount or when subject/level/lesson changes
  useEffect(() => {
    const loadLessonData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use pre-fetched lesson data from Google Drive if available
        const data = lessonData || await loadLesson(subject, level, lessonFile);
        setLesson(data);
        setRandomizedQuestions(randomizeQuestions(data.quiz));
        setRandomizedFlashcards(randomizeFlashcards(data.flashcards));
      } catch (err) {
        setError(`Failed to load lesson: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (subject && level && lessonFile) {
      loadLessonData();
    }
  }, [subject, level, lessonFile]);

  const handleQuizStart = () => {
    setShowQuiz(true);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setSelectedAnswer(null);
    setRandomizedQuestions(randomizeQuestions(lesson.quiz));
  };

  const handleFlashcardStart = () => {
    setShowFlashcards(true);
    setCurrentFlashcard(0);
    setFlashcardFlipped(false);
    setRandomizedFlashcards(randomizeFlashcards(lesson.flashcards));
  };

  const handleAnswerQuestion = (answerIndex) => {
    if (!quizAnswered) {
      setSelectedAnswer(answerIndex);
      const currentQuestion = randomizedQuestions[currentQuizQuestion];
      if (answerIndex === currentQuestion.ans) {
        setQuizScore(quizScore + 1);
      }
      setQuizAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizQuestion < randomizedQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    } else {
      // Quiz finished - award points
      const percentage = (quizScore / randomizedQuestions.length) * 100;
      gamification.completedQuiz(quizScore, randomizedQuestions.length);
      setShowQuiz(false);

      // Show completion message
      setTimeout(() => {
        alert(`Quiz Complete! 🎉\nScore: ${quizScore}/${randomizedQuestions.length} (${Math.round(percentage)}%)\n+${Math.round(percentage)} points earned!`);
      }, 500);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion(currentQuizQuestion - 1);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleNextFlashcard = () => {
    if (currentFlashcard < randomizedFlashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setFlashcardFlipped(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
      setFlashcardFlipped(false);
    }
  };

  const handleFlashcardsFinish = () => {
    // Award points for studying flashcards
    gamification.studiedFlashcards(randomizedFlashcards.length);
    setShowFlashcards(false);
    setTimeout(() => {
      alert(`Great job! 🌟\nStudied ${randomizedFlashcards.length} flashcards\n+${randomizedFlashcards.length * 2} points earned!`);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-lg text-gray-700">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Lesson</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-gray-700">No lesson data available</p>
      </div>
    );
  }

  // Render Quiz View
  if (showQuiz) {
    const currentQuestion = randomizedQuestions[currentQuizQuestion];
    const isAnswered = quizAnswered;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setShowQuiz(false)}
            className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Home size={20} /> Back to Lesson
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">Quiz: {lesson.title}</h2>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">
                  Question {currentQuizQuestion + 1} of {randomizedQuestions.length}
                </span>
                <span className="text-lg font-bold text-indigo-600">
                  Score: {quizScore}/{randomizedQuestions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuizQuestion + 1) / randomizedQuestions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {currentQuestion.q}
              </h3>

              <div className="space-y-3">
                {currentQuestion.opts.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerQuestion(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all font-semibold
                      ${!isAnswered ? 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer' : 'cursor-default'}
                      ${selectedAnswer === idx && !isAnswered ? 'border-indigo-600 bg-indigo-50' : ''}
                      ${isAnswered && idx === currentQuestion.ans ? 'border-green-500 bg-green-50 text-green-700' : ''}
                      ${isAnswered && idx !== currentQuestion.ans && selectedAnswer === idx ? 'border-red-500 bg-red-50 text-red-700' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {isAnswered && (
              <div className={`mb-6 p-4 rounded-lg ${
                selectedAnswer === currentQuestion.ans
                  ? 'bg-green-50 border-2 border-green-500 text-green-700'
                  : 'bg-red-50 border-2 border-red-500 text-red-700'
              }`}>
                {selectedAnswer === currentQuestion.ans
                  ? '✓ Correct! Well done!'
                  : '✗ Incorrect. Try again next time.'}
              </div>
            )}

            <div className="flex gap-4 justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuizQuestion === 0}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  isAnswered
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {currentQuizQuestion === randomizedQuestions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Flashcard View
  if (showFlashcards) {
    const currentCard = randomizedFlashcards[currentFlashcard];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setShowFlashcards(false)}
            className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Home size={20} /> Back to Lesson
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Flashcards: {lesson.title}</h2>

            <div className="mb-6 flex justify-between items-center">
              <span className="text-gray-600">
                Card {currentFlashcard + 1} of {randomizedFlashcards.length}
              </span>
            </div>

            <div
              onClick={() => setFlashcardFlipped(!flashcardFlipped)}
              className="min-h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 cursor-pointer
                         flex items-center justify-center transform transition-transform duration-300 hover:scale-105
                         border-2 border-purple-300 shadow-lg"
            >
              <div className="text-center">
                <p className="text-sm font-semibold text-purple-600 mb-4">
                  {flashcardFlipped ? 'Answer' : 'Question'}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {flashcardFlipped ? currentCard.a : currentCard.q}
                </p>
                <p className="text-sm text-gray-600 mt-6">Click to flip</p>
              </div>
            </div>

            <div className="flex gap-4 justify-between mt-8">
              <button
                onClick={handlePrevFlashcard}
                disabled={currentFlashcard === 0}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={currentFlashcard === randomizedFlashcards.length - 1 ? handleFlashcardsFinish : handleNextFlashcard}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  currentFlashcard === randomizedFlashcards.length - 1
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {currentFlashcard === randomizedFlashcards.length - 1 ? 'Finish ✓' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Main Lesson View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Gamification Stats */}
        <GamificationDisplay stats={gamification.stats} />

        {/* Header */}
        <div className={`${lesson.color} rounded-lg shadow-lg p-8 mb-8`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-6xl mb-4">{lesson.icon}</div>
              <h1 className={`text-4xl font-bold ${lesson.textColor} mb-4`}>{lesson.title}</h1>
              <p className="text-gray-700 text-lg">{lesson.introduction}</p>
            </div>
            <div className={`${lesson.textColor} text-right`}>
              <div className="text-5xl font-bold mb-2">Week {lesson.week}</div>
              <div className="text-sm font-semibold">{lesson.subject.toUpperCase()} - {lesson.level.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Lesson Content</h2>

          {lesson.sections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <button
                onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                className="w-full flex items-center justify-between bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <h3 className="text-xl font-semibold text-indigo-700">{section.title}</h3>
                {expandedSection === idx ? (
                  <ChevronUp className="text-indigo-600" />
                ) : (
                  <ChevronDown className="text-indigo-600" />
                )}
              </button>

              {expandedSection === idx && (
                <div className="mt-4 pl-6 border-l-4 border-indigo-300">
                  <ul className="space-y-2">
                    {section.content.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-gray-700 flex items-start">
                        <span className="mr-3 text-indigo-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {lesson.diagram && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Diagram</h3>
              <pre className="text-sm text-gray-700 font-mono overflow-x-auto whitespace-pre-wrap">
                {lesson.diagram}
              </pre>
            </div>
          )}
        </div>

        {/* Cheatsheet */}
        {lesson.cheatsheet && (
          <div className="bg-yellow-50 rounded-lg shadow-lg p-8 mb-8 border-2 border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-800 mb-6">⚡ Cheatsheet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(lesson.cheatsheet).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-700 mb-2">{key}</h4>
                  {typeof value === 'string' ? (
                    <p className="text-gray-700">{value}</p>
                  ) : (
                    <ul className="space-y-2">
                      {Object.entries(value).map(([k, v]) => (
                        <li key={k} className="text-sm text-gray-700">
                          <span className="font-semibold">{k}:</span> {v}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleFlashcardStart}
              className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg
                       transition-all transform hover:scale-105 font-bold text-lg flex items-center justify-center gap-3"
            >
              <Eye size={24} />
              Flashcards ({randomizedFlashcards.length})
            </button>
            <button
              onClick={handleQuizStart}
              className="p-6 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg
                       transition-all transform hover:scale-105 font-bold text-lg flex items-center justify-center gap-3"
            >
              <Target size={24} />
              Quiz ({randomizedQuestions.length} questions)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorApp;
