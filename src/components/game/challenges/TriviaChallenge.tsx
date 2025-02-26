import { useState, useEffect } from 'react';
import { Excursion } from '@/types/game.types';
import { getHistoricalTrivia } from '@/data/historical-trivia';

interface TriviaChallengeProps {
  excursion: Excursion;
  onComplete: () => void;
}

interface TriviaQuestion {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
    explanation?: string;
  }

const TriviaChallenge: React.FC<TriviaChallengeProps> = ({ excursion, onComplete }) => {
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  useEffect(() => {
    // In a real implementation, this would fetch questions from an API or a larger dataset
    // For now, we'll use a dummy function that returns questions based on the destination
    const triviaQuestions = getHistoricalTrivia(excursion.destinationId);
    setQuestions(triviaQuestions);
  }, [excursion.destinationId]);
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correct = answerIndex === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };
  
  const handleComplete = () => {
    onComplete();
  };
  
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (showResult) {
    const passScore = Math.ceil(questions.length * 0.6); // 60% to pass
    const passed = score >= passScore;
    
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg mb-2">
          You got <span className="font-bold">{score}</span> out of {questions.length} correct!
        </p>
        
        {passed ? (
          <div className="mt-6">
            <p className="text-green-600 font-bold mb-4">Congratulations! You passed the challenge!</p>
            <button
              onClick={handleComplete}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Complete Excursion
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-red-600 font-bold mb-4">
              You need at least {passScore} correct answers to pass. Try again!
            </p>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setIsCorrect(null);
                setScore(0);
                setShowResult(false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium">
          Score: {score}
        </span>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.answers.map((answer: string, index: number) => (
            <button
              key={index}
              onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-3 rounded-lg border ${
                selectedAnswer === null 
                  ? 'border-gray-300 hover:border-blue-500' 
                  : selectedAnswer === index 
                    ? isCorrect 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                    : index === currentQuestion.correctAnswerIndex && selectedAnswer !== null
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 opacity-50'
              }`}
            >
              <span className="mr-2">
                {['A', 'B', 'C', 'D'][index]}.
              </span>
              {answer}
            </button>
          ))}
        </div>
      </div>
      
      {isCorrect !== null && (
        <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect 
            ? 'Correct! ' + (currentQuestion.explanation || '')
            : 'Incorrect. ' + (currentQuestion.explanation || '')
          }
        </div>
      )}
    </div>
  );
};

export default TriviaChallenge;