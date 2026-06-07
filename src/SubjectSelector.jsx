import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { SUBJECTS, LEVELS } from './utils/contentLoader';
import {
  loadGoogleAPI,
  getLessonsBySubjectAndLevel
} from './utils/googleDriveClient';

const SubjectSelector = ({ onSelect }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiReady, setApiReady] = useState(false);

  // Initialize Google API on mount
  useEffect(() => {
    console.log('Initializing Google Drive API...');
    loadGoogleAPI()
      .then(() => {
        console.log('✓ Google Drive API initialized successfully');
        setApiReady(true);
      })
      .catch((err) => {
        console.error('✗ Failed to initialize Google Drive API:', err);
        setError('Google Drive API not available');
      });
  }, []);

  const loadLessons = useCallback(async () => {
    if (!apiReady) {
      console.warn('API not ready yet');
      setError('Google Drive API is loading... Please wait.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log(`Loading lessons for ${selectedSubject}/${selectedLevel}...`);
      // Load from Google Drive
      const googleDriveLessons = await getLessonsBySubjectAndLevel(selectedSubject, selectedLevel);

      if (googleDriveLessons && googleDriveLessons.length > 0) {
        console.log(`✓ Loaded ${googleDriveLessons.length} lessons`);
        setLessons(googleDriveLessons);
      } else {
        console.warn(`No lessons found for ${selectedSubject}/${selectedLevel}`);
        setError(`No lessons found for ${selectedSubject} ${selectedLevel}. Please check Google Drive folder structure.`);
        setLessons([]);
      }
    } catch (err) {
      console.error('Error loading lessons from Google Drive:', err);
      setError('Failed to load lessons. Check console for details.');
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSubject, selectedLevel, apiReady]);

  // Load lessons when subject and level are selected
  useEffect(() => {
    if (selectedSubject && selectedLevel && apiReady) {
      loadLessons();
    }
  }, [selectedSubject, selectedLevel, loadLessons, apiReady]);

  const handleLessonSelect = (lesson) => {
    onSelect({
      subject: selectedSubject,
      level: selectedLevel,
      lessonFile: lesson.id,
      lessonData: lesson
    });
  };

  const handleBack = () => {
    if (selectedLevel && selectedSubject) {
      setSelectedLevel(null);
      setLessons([]);
    } else if (selectedSubject) {
      setSelectedSubject(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            📚 Learning Hub
          </h1>
          <p className="text-xl text-gray-600">Master any subject with interactive lessons, flashcards, and quizzes</p>
        </div>

        {/* Subject Selection */}
        {!selectedSubject && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Choose a Subject</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105
                           border-2 border-transparent hover:border-indigo-400"
                >
                  <div className="text-5xl mb-4 text-center">{subject.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center">{subject.name}</h3>
                  <p className="text-indigo-600 text-center mt-2 flex items-center justify-center gap-2 font-semibold">
                    Get Started <ArrowRight size={20} />
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level Selection */}
        {selectedSubject && !selectedLevel && (
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
            >
              ← Back
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Choose a Level - {SUBJECTS.find(s => s.id === selectedSubject)?.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105
                           border-2 border-transparent hover:border-indigo-400"
                >
                  <div className="text-4xl mb-4 text-center">📖</div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{level.name}</h3>
                  <p className="text-indigo-600 text-center flex items-center justify-center gap-2 font-semibold">
                    Select <ArrowRight size={20} />
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lesson Selection */}
        {selectedSubject && selectedLevel && (
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
            >
              ← Back
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Choose a Lesson
              {' - '}
              <span className="text-indigo-600">
                {SUBJECTS.find(s => s.id === selectedSubject)?.name} {LEVELS.find(l => l.id === selectedLevel)?.name}
              </span>
            </h2>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Loading lessons...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-red-700 text-center">
                {error}
              </div>
            )}

            {!loading && lessons.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all text-left
                             border-2 border-transparent hover:border-indigo-400 hover:bg-indigo-50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">Week {lesson.week}</p>
                      </div>
                      <ArrowRight className="text-indigo-600" size={24} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600">
          <p className="text-sm">💡 Tip: Start with any subject and level. Practice makes perfect!</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelector;
