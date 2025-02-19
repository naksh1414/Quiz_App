"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { questions } from '@/data/questions';
import { QuizDB } from '@/lib/db';
import { Timer, CheckCircle, XCircle } from 'lucide-react';

export default function Quiz() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!quizComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !quizComplete) {
      handleNextQuestion();
    }
  }, [timeLeft, quizComplete]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }));
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
      const score = calculateScore();
      await saveQuizAttempt(score);
      router.push('/results');
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (questions[Number(questionIndex)].correctAnswer === answer) {
        score++;
      }
    });
    return (score / questions.length) * 100;
  };

  const saveQuizAttempt = async (score: number) => {
    const attempt = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      timeSpent: (30 - timeLeft) * questions.length,
      answers,
    };
    await QuizDB.saveAttempt(attempt);
  };

  const question = questions[currentQuestion];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-bold text-blue-500">{timeLeft}s</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? showFeedback
                      ? index === question.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-blue-100 border-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                } border-2 ${
                  showFeedback && index === question.correctAnswer
                    ? 'border-green-500'
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">{option}</span>
                  {showFeedback && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-8 text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}