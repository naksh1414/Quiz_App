"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { updateProfile } from '@/lib/redux/authSlice';
import { QuizDB } from '@/lib/db';
import { QuizAttempt } from '@/types';
import { BarChart, Clock, Trophy, User } from 'lucide-react';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadAttempts = async () => {
      const quizAttempts = await QuizDB.getAttempts();
      setAttempts(quizAttempts as QuizAttempt[]);
    };
    loadAttempts();
  }, [isAuthenticated, router]);

  const handleUpdateProfile = () => {
    if (name.trim()) {
      dispatch(updateProfile({ name: name.trim() }));
      setIsEditing(false);
    }
  };

  const bestAttempt = attempts.reduce((best, current) => 
    current.score > best.score ? current : best
  , attempts[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="w-12 h-12 text-gray-400" />
              {isEditing ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your name"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setName(user?.name || '');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
              Best Score
            </h2>
            <p className="text-2xl font-bold text-center text-blue-600">
              {bestAttempt?.score.toFixed(1)}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <BarChart className="w-12 h-12 mx-auto text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
              Total Attempts
            </h2>
            <p className="text-2xl font-bold text-center text-blue-600">
              {attempts.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <Clock className="w-12 h-12 mx-auto text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
              Average Time
            </h2>
            <p className="text-2xl font-bold text-center text-blue-600">
              {attempts.length > 0
                ? (
                    attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0) /
                    attempts.length
                  ).toFixed(0)
                : 0}s
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Recent Attempts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Date</th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Score</th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {attempts.slice(-5).map((attempt) => (
                  <tr key={attempt.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {new Date(attempt.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {attempt.score.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {attempt.timeSpent}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}