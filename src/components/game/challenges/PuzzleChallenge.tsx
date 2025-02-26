import { useState, useEffect } from 'react';
import { Excursion } from '@/types/game.types';

interface PuzzleChallengeProps {
  excursion: Excursion;
  onComplete: () => void;
}

interface Puzzle {
    title: string;
    description: string;
    riddle: string;
    solution: string;
    facts: string[];
    hints: string[];
  }

const PuzzleChallenge: React.FC<PuzzleChallengeProps> = ({ excursion, onComplete }) => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null)
  const [userSolution, setUserSolution] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [showingHint, setShowingHint] = useState<boolean>(false);
  
  useEffect(() => {
    // In a real implementation, this would fetch a puzzle from an API
    // based on the excursion and destination
    const puzzleData = {
      title: "The Lost Artifact",
      description: "Solve the riddle to find the location of a hidden artifact in this city.",
      riddle: "I stand where waters meet and castles tower high,\nWhere eagles once watched over a corner of sky.\nAt my feet, two rivers join as one,\nAnd travelers pause to admire what time has done.\nWhat am I?",
      solution: "deutsches eck",
      facts: [
        "The Deutsches Eck (German Corner) is where the Rhine and Moselle rivers meet in Koblenz.",
        "It features a large monument of Emperor William I on horseback.",
        "The name 'Deutsches Eck' was first given to the land at this spot in 1216."
      ],
      hints: [
        "I'm a famous landmark in Koblenz.",
        "My name translates to 'German Corner' in English.",
        "I'm located at the confluence of two rivers."
      ]
    };
    
    setPuzzle(puzzleData);
    setHints(puzzleData.hints);
  }, [excursion.destinationId]);
  
  const handleSolutionSubmit = () => {
    if (!puzzle) return;
    
    const normalizedSolution = userSolution.trim().toLowerCase();
    const normalizedCorrect = puzzle.solution.trim().toLowerCase();
    
    if (normalizedSolution === normalizedCorrect) {
      setFeedback("Correct! You've solved the puzzle!");
      setFeedbackType('success');
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setFeedback("That's not quite right. Try again or use a hint.");
      setFeedbackType('error');
    }
  };
  
  const showHint = () => {
    if (hintIndex < hints.length) {
      setShowingHint(true);
    }
  };
  
  const getNextHint = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };
  
  if (!puzzle) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{puzzle.title}</h2>
      <p className="mb-6 text-gray-700">{puzzle.description}</p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">The Riddle:</h3>
        <p className="whitespace-pre-line text-blue-900">{puzzle.riddle}</p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-1">
          Your Answer:
        </label>
        <div className="flex">
          <input
            type="text"
            id="solution"
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your solution"
          />
          <button
            onClick={handleSolutionSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
      
      {feedback && (
        <div className={`p-3 rounded-lg mb-4 ${
          feedbackType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback}
        </div>
      )}
      
      <div className="mt-6">
        {!showingHint ? (
          <button
            onClick={showHint}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Need a hint?
          </button>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-1">Hint {hintIndex + 1}:</h4>
            <p className="text-yellow-700 mb-2">{hints[hintIndex]}</p>
            
            {hintIndex < hints.length - 1 && (
              <button
                onClick={getNextHint}
                className="text-yellow-800 hover:text-yellow-900 text-sm font-medium"
              >
                Need another hint?
              </button>
            )}
          </div>
        )}
      </div>
      
      {feedbackType === 'success' && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Historical Facts:</h3>
          <ul className="list-disc list-inside text-blue-900 space-y-1">
            {puzzle.facts.map((fact: string, index: number) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PuzzleChallenge;