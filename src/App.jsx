import React, { useState } from 'react';
import SubjectSelector from './SubjectSelector';
import TutorApp from './TutorApp';

function App() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonSelect = (lessonInfo) => {
    setSelectedLesson(lessonInfo);
  };

  const handleBackToSubjects = () => {
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    return (
      <div>
        <button
          onClick={handleBackToSubjects}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
        >
          ← Back to Subjects
        </button>
        <TutorApp
          subject={selectedLesson.subject}
          level={selectedLesson.level}
          lessonFile={selectedLesson.lessonFile}
          lessonData={selectedLesson.lessonData}
        />
      </div>
    );
  }

  return <SubjectSelector onSelect={handleLessonSelect} />;
}

export default App;
