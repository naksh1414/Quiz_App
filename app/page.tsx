import Link from 'next/link';
import { CircleUser, Clock, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Interactive Quiz Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test your knowledge with our timed quizzes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <Clock className="w-12 h-12 mx-auto text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
              Timed Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              30 seconds per question to test your quick thinking
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
              Track Progress
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              View your scores and improvement over time
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <CircleUser className="w-12 h-12 mx-auto text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
              Multiple Attempts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Practice makes perfect - try as many times as you want
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/quiz"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Start Quiz
          </Link>
        </div>
      </main>
    </div>
  );
}