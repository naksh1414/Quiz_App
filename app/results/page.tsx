"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuizDB } from '@/lib/db';
import { QuizAttempt } from '@/types';
import { BarChart, Clock, Trophy } from 'lucide-react';

export default function Results() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const loadAttempts = async () => {
      const quizAttempts = await QuizDB.getAttempts();
      setAttempts(quizAttempts as QuizAttempt[]);
    };
    loadAttempts();
  }, []);

  const latestAttempt = attempts[attempts.length - 1];
  const bestAttempt = attempts.reduce((best, current) => 
    current.score > best.score ? current : best
  , attempts[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Quiz Results
          </h1>
          {latestAttempt && (
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your latest score: {latestAttempt.score.toFixed(1)}%
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
            Attempt History
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
                {attempts.map((attempt) => (
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

        <div className="text-center mt-8">
          <Link
            href="/quiz"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}