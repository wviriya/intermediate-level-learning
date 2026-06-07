import React, { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Target, Award, TrendingUp, Lock, Unlock } from 'lucide-react';

/**
 * Gamification System for Learning Hub
 * Tracks points, streaks, badges, and levels
 */

// Badge definitions
export const BADGES = {
  first_lesson: {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '👣',
    points: 50
  },
  quiz_master: {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Score 100% on a quiz',
    icon: '🎯',
    points: 100
  },
  flashcard_genius: {
    id: 'flashcard_genius',
    name: 'Flashcard Genius',
    description: 'Complete 50 flashcards',
    icon: '🧠',
    points: 75
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    points: 150
  },
  streak_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '⚡',
    points: 500
  },
  subject_explorer: {
    id: 'subject_explorer',
    name: 'Subject Explorer',
    description: 'Complete lessons in 4 different subjects',
    icon: '🌍',
    points: 200
  },
  level_master: {
    id: 'level_master',
    name: 'Level Master',
    description: 'Complete lessons in all 3 levels (Y7, Y8, Y9)',
    icon: '🏆',
    points: 300
  },
  perfect_week: {
    id: 'perfect_week',
    name: 'Perfect Week',
    description: 'Study every day for 7 days',
    icon: '⭐',
    points: 200
  }
};

// Level thresholds (points needed for each level)
export const LEVEL_THRESHOLDS = [
  { level: 1, points: 0, name: 'Novice', color: 'text-gray-600' },
  { level: 2, points: 500, name: 'Apprentice', color: 'text-green-600' },
  { level: 3, points: 1500, name: 'Scholar', color: 'text-blue-600' },
  { level: 4, points: 3000, name: 'Master', color: 'text-purple-600' },
  { level: 5, points: 5000, name: 'Grandmaster', color: 'text-yellow-600' },
  { level: 10, points: 50000, name: 'Legend', color: 'text-red-600' }
];

/**
 * Get user level based on total points
 */
export const getUserLevel = (totalPoints) => {
  let userLevel = LEVEL_THRESHOLDS[0];
  for (const level of LEVEL_THRESHOLDS) {
    if (totalPoints >= level.points) {
      userLevel = level;
    } else {
      break;
    }
  }
  return userLevel;
};

/**
 * Get points needed for next level
 */
export const getPointsToNextLevel = (totalPoints) => {
  const currentLevel = getUserLevel(totalPoints);
  const nextLevelIndex = LEVEL_THRESHOLDS.findIndex(l => l.level === currentLevel.level) + 1;

  if (nextLevelIndex >= LEVEL_THRESHOLDS.length) {
    return 0; // Already at max level
  }

  const nextLevel = LEVEL_THRESHOLDS[nextLevelIndex];
  return Math.max(0, nextLevel.points - totalPoints);
};

/**
 * Gamification Hook - Manages all gamification state
 */
export const useGamification = () => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('learningHubStats');
    return saved ? JSON.parse(saved) : {
      totalPoints: 0,
      totalLessonsCompleted: 0,
      totalQuizzesTaken: 0,
      totalFlashcardsStudied: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      badges: [],
      subjectsExplored: new Set(),
      levelsExplored: new Set(),
      dailyStudyLog: {} // { YYYY-MM-DD: points }
    };
  });

  // Save stats whenever they change
  useEffect(() => {
    const statsToSave = {
      ...stats,
      subjectsExplored: Array.from(stats.subjectsExplored),
      levelsExplored: Array.from(stats.levelsExplored)
    };
    localStorage.setItem('learningHubStats', JSON.stringify(statsToSave));
  }, [stats]);

  /**
   * Add points and update stats
   */
  const addPoints = (points, activityType = 'general') => {
    setStats(prev => {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = prev.lastStudyDate;

      // Calculate streak
      let newStreak = prev.currentStreak;
      let newLongestStreak = prev.longestStreak;

      if (lastDate !== today) {
        const lastDateObj = new Date(lastDate);
        const todayObj = new Date(today);
        const daysDiff = (todayObj - lastDateObj) / (1000 * 60 * 60 * 24);

        if (daysDiff === 1) {
          // Continue streak
          newStreak = prev.currentStreak + 1;
        } else if (daysDiff > 1) {
          // Streak broken
          newStreak = 1;
        } else if (daysDiff === 0) {
          // Same day
          newStreak = prev.currentStreak;
        }

        newLongestStreak = Math.max(newStreak, prev.longestStreak);
      }

      // Update daily log
      const today_key = new Date().toISOString().split('T')[0];
      const dailyLog = { ...prev.dailyStudyLog };
      dailyLog[today_key] = (dailyLog[today_key] || 0) + points;

      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastStudyDate: today,
        dailyStudyLog: dailyLog
      };
    });
  };

  /**
   * Record lesson completion
   */
  const completedLesson = (subject, level, quizScore = null) => {
    let basePoints = 50; // Base points for lesson
    if (quizScore === 100) basePoints += 50; // Bonus for perfect score
    else if (quizScore >= 80) basePoints += 25; // Bonus for good score

    setStats(prev => {
      const newSubjects = new Set(prev.subjectsExplored);
      const newLevels = new Set(prev.levelsExplored);
      newSubjects.add(subject);
      newLevels.add(level);

      return {
        ...prev,
        totalLessonsCompleted: prev.totalLessonsCompleted + 1,
        subjectsExplored: newSubjects,
        levelsExplored: newLevels
      };
    });

    addPoints(basePoints);
    checkBadges();
  };

  /**
   * Record quiz completion
   */
  const completedQuiz = (score, totalQuestions) => {
    const points = Math.round((score / totalQuestions) * 100); // Up to 100 points

    setStats(prev => ({
      ...prev,
      totalQuizzesTaken: prev.totalQuizzesTaken + 1
    }));

    addPoints(points);
    checkBadges();
  };

  /**
   * Record flashcard study
   */
  const studiedFlashcards = (cardCount) => {
    setStats(prev => ({
      ...prev,
      totalFlashcardsStudied: prev.totalFlashcardsStudied + cardCount
    }));

    addPoints(cardCount * 2); // 2 points per card
    checkBadges();
  };

  /**
   * Check and award badges
   */
  const checkBadges = () => {
    setStats(prev => {
      const newBadges = [...prev.badges];

      // First lesson
      if (prev.totalLessonsCompleted >= 1 && !newBadges.includes('first_lesson')) {
        newBadges.push('first_lesson');
      }

      // Quiz master (check if any quiz was 100%)
      // (This would need to be tracked separately)

      // Flashcard genius
      if (prev.totalFlashcardsStudied >= 50 && !newBadges.includes('flashcard_genius')) {
        newBadges.push('flashcard_genius');
      }

      // Streak badges
      if (prev.currentStreak >= 7 && !newBadges.includes('streak_7')) {
        newBadges.push('streak_7');
      }
      if (prev.currentStreak >= 30 && !newBadges.includes('streak_30')) {
        newBadges.push('streak_30');
      }

      // Subject explorer
      if (prev.subjectsExplored.size >= 4 && !newBadges.includes('subject_explorer')) {
        newBadges.push('subject_explorer');
      }

      // Level master
      if (prev.levelsExplored.size >= 3 && !newBadges.includes('level_master')) {
        newBadges.push('level_master');
      }

      return {
        ...prev,
        badges: newBadges
      };
    });
  };

  return {
    stats,
    addPoints,
    completedLesson,
    completedQuiz,
    studiedFlashcards,
    checkBadges
  };
};

/**
 * Gamification Display Component
 */
export const GamificationDisplay = ({ stats }) => {
  const userLevel = getUserLevel(stats.totalPoints);
  const pointsToNext = getPointsToNextLevel(stats.totalPoints);
  const levelProgress = pointsToNext === 0 ? 100 :
    ((stats.totalPoints - (LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.findIndex(l => l.level === userLevel.level)].points || 0)) /
     (pointsToNext === 0 ? 1 : pointsToNext)) * 100;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6 border-2 border-yellow-200">
      {/* Points and Level */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Points */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-semibold">Total Points</span>
            <Zap className="text-yellow-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.totalPoints}</p>
        </div>

        {/* Level */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-semibold">Level</span>
            <Trophy className="text-yellow-600" size={24} />
          </div>
          <p className={`text-3xl font-bold ${userLevel.color}`}>{userLevel.name}</p>
          <p className="text-sm text-gray-500">Level {userLevel.level}</p>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-semibold">Current Streak</span>
            <TrendingUp className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-600">{stats.currentStreak}</p>
          <p className="text-sm text-gray-500">Best: {stats.longestStreak} days</p>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-gray-700">Progress to Next Level</span>
          <span className="text-sm text-gray-600">
            {pointsToNext === 0 ? 'Max Level!' : `${pointsToNext} points left`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(levelProgress, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatBox
          icon={<Target size={20} />}
          label="Lessons"
          value={stats.totalLessonsCompleted}
          color="blue"
        />
        <StatBox
          icon={<Award size={20} />}
          label="Quizzes"
          value={stats.totalQuizzesTaken}
          color="purple"
        />
        <StatBox
          icon={<Star size={20} />}
          label="Flashcards"
          value={stats.totalFlashcardsStudied}
          color="green"
        />
        <StatBox
          icon={<Trophy size={20} />}
          label="Badges"
          value={stats.badges.length}
          color="yellow"
        />
      </div>

      {/* Badges Section */}
      {stats.badges.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-600" />
            Badges Earned
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.badges.map(badgeId => {
              const badge = BADGES[badgeId];
              return (
                <div key={badgeId} className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <p className="text-sm font-semibold text-gray-800">{badge.name}</p>
                  <p className="text-xs text-gray-600">{badge.points} pts</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Stat Box Component
 */
const StatBox = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  };

  return (
    <div className={`${colorMap[color]} rounded-lg p-3 border-2 text-center`}>
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};

/**
 * Daily Rewards Component
 */
export const DailyRewardPopup = ({ isNewDay, onClaim }) => {
  if (!isNewDay) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 text-center shadow-2xl max-w-sm">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Daily Bonus!</h2>
        <p className="text-gray-600 mb-6">Study again today to earn 50 bonus points!</p>
        <button
          onClick={onClaim}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-all"
        >
          Claim Reward! 🏆
        </button>
      </div>
    </div>
  );
};

/**
 * Achievement Notification Component
 */
export const AchievementNotification = ({ badge, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-2xl p-4 border-l-4 border-yellow-400 animate-slide-in">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{badge.icon}</div>
        <div>
          <h3 className="font-bold text-gray-800">{badge.name}</h3>
          <p className="text-sm text-gray-600">{badge.description}</p>
          <p className="text-sm font-semibold text-yellow-600">+{badge.points} points</p>
        </div>
      </div>
    </div>
  );
};
