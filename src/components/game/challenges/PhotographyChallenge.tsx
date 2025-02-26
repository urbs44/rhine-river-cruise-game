import { useState } from 'react';
import { Excursion } from '@/types/game.types';

interface PhotographyChallengeProps {
  excursion: Excursion;
  onComplete: () => void;
}

const PhotographyChallenge: React.FC<PhotographyChallengeProps> = ({ excursion, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  
  // In a real implementation, these would be more dynamic and varied
  const photographyTargets = [
    {
      name: "Historical Building",
      description: "Find and photograph the main historical landmark.",
      hint: "Look for Gothic architecture with twin spires.",
      image: "/assets/images/challenges/photography-target-1.png"
    },
    {
      name: "Local Food",
      description: "Capture a photo of traditional local cuisine.",
      hint: "Visit the market area for authentic dishes.",
      image: "/assets/images/challenges/photography-target-2.png"
    },
    {
      name: "River View",
      description: "Take a stunning photograph of the Rhine River.",
      hint: "Try to include both banks of the river in your shot.",
      image: "/assets/images/challenges/photography-target-3.png"
    }
  ];
  
  const handleNextStep = () => {
    if (currentStep < photographyTargets.length - 1) {
      setCurrentStep(currentStep + 1);
      setPhotoTaken(false);
    } else {
      setCompleted(true);
    }
  };
  
  const takePhoto = () => {
    // In a real implementation, this would access the device camera
    // For now, we'll simulate taking a photo
    setPhotoTaken(true);
  };
  
  if (completed) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Photography Challenge Complete!</h2>
        <p className="mb-6">You've successfully captured all the required photographs.</p>
        <button
          onClick={onComplete}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Complete Excursion
        </button>
      </div>
    );
  }
  
  const currentTarget = photographyTargets[currentStep];
  
  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Photo {currentStep + 1} of {photographyTargets.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${((currentStep + 1) / photographyTargets.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{currentTarget.name}</h3>
      <p className="mb-4">{currentTarget.description}</p>
      
      <div className="mb-6 border rounded-lg overflow-hidden">
        <img 
          src={currentTarget.image} 
          alt={currentTarget.name} 
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="mb-4">
        <button 
          onClick={takePhoto}
          disabled={photoTaken}
          className={`mb-4 px-6 py-3 rounded-lg flex items-center justify-center w-full ${
            photoTaken 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          {photoTaken ? 'Photo Taken!' : 'Take Photo'}
        </button>
        
        {photoTaken && (
          <button
            onClick={handleNextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
          >
            {currentStep < photographyTargets.length - 1 ? 'Next Photo' : 'Complete Challenge'}
          </button>
        )}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-1">Hint:</h4>
        <p className="text-yellow-700">{currentTarget.hint}</p>
      </div>
    </div>
  );
};

export default PhotographyChallenge;