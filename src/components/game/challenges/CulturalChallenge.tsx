import { useState } from 'react';
import { Excursion } from '@/types/game.types';

interface CulturalChallengeProps {
  excursion: Excursion;
  onComplete: () => void;
}

const CulturalChallenge: React.FC<CulturalChallengeProps> = ({ excursion, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  
  // In a real implementation, these would come from a database or API
  const culturalScenarios = [
    {
      scenario: "You're invited to a local's home for dinner. What is the appropriate gesture?",
      options: [
        "Arrive exactly on time",
        "Bring a small gift like flowers or wine",
        "Take off your shoes before entering",
        "All of the above"
      ],
      correctOption: 3,
      explanation: "In Rhine region culture, punctuality is valued, bringing a small gift shows appreciation, and removing shoes is often expected."
    },
    {
      scenario: "You're at a traditional restaurant. When is it appropriate to toast?",
      options: [
        "As soon as drinks are served",
        "After the host makes the first toast",
        "Before you take your first sip",
        "Whenever you feel like it"
      ],
      correctOption: 2,
      explanation: "In German culture, it's customary to toast (saying 'Prost!' or 'Zum Wohl!') and make eye contact before taking your first sip."
    },
    {
      scenario: "You're visiting a historical church. What's the respectful behavior?",
      options: [
        "Take photos with flash to capture details",
        "Speak loudly so your group can hear you",
        "Dress modestly and speak quietly",
        "Touch artifacts to appreciate them better"
      ],
      correctOption: 2,
      explanation: "Churches along the Rhine are both active places of worship and historical sites. Modest dress and quiet voices show respect."
    }
  ];
  
  const handleOptionSelect = (optionIndex: number) => {
    const newUserChoices = [...userChoices];
    newUserChoices[currentStep] = optionIndex.toString();
    setUserChoices(newUserChoices);
    
    // Wait a moment to show feedback before moving to next
    setTimeout(() => {
      if (currentStep < culturalScenarios.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCompleted(true);
      }
    }, 1500);
  };
  
  const calculateScore = () => {
    let correctCount = 0;
    userChoices.forEach((choice, index) => {
      if (parseInt(choice) === culturalScenarios[index].correctOption) {
        correctCount++;
      }
    });
    return correctCount;
  };
  
  if (completed) {
    const score = calculateScore();
    const passed = score >= Math.ceil(culturalScenarios.length / 2);
    
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Cultural Challenge Results</h2>
        <p className="mb-2">
          You got {score} out of {culturalScenarios.length} scenarios correct!
        </p>
        
        {passed ? (
          <div className="mt-6">
            <p className="text-green-600 font-bold mb-4">
              You've shown good understanding of local customs and culture!
            </p>
            <button
              onClick={onComplete}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Complete Excursion
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-red-600 font-bold mb-4">
              You need to learn more about local customs to pass.
            </p>
            <button
              onClick={() => {
                setCurrentStep(0);
                setUserChoices([]);
                setCompleted(false);
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
  
  const currentScenario = culturalScenarios[currentStep];
  const userSelectedOption = userChoices[currentStep] !== undefined 
    ? parseInt(userChoices[currentStep]) 
    : undefined;
  
  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Scenario {currentStep + 1} of {culturalScenarios.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${((currentStep + 1) / culturalScenarios.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentScenario.scenario}</h3>
        
        <div className="space-y-3">
          {currentScenario.options.map((option, index) => (
            <button
              key={index}
              onClick={() => userSelectedOption === undefined && handleOptionSelect(index)}
              disabled={userSelectedOption !== undefined}
              className={`w-full text-left p-3 rounded-lg border ${
                userSelectedOption === undefined 
                  ? 'border-gray-300 hover:border-blue-500' 
                  : userSelectedOption === index 
                    ? index === currentScenario.correctOption 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                    : index === currentScenario.correctOption 
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 opacity-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {userSelectedOption !== undefined && (
        <div className={`p-3 rounded-lg mb-4 ${
          userSelectedOption === currentScenario.correctOption 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          <p>
            {userSelectedOption === currentScenario.correctOption 
              ? 'Correct! ' 
              : 'Incorrect. '
            }
            {currentScenario.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default CulturalChallenge;