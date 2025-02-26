import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useGameStore } from '@/store/gameStore';
import { destinations } from '@/data/destinations';
import { excursions } from '@/data/excursions';
import { souvenirs } from '@/data/souvenirs';

export default function GameCompletePage() {
  const { gameStarted, gameCompleted, player, completeGame, resetGame } = useGameStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!gameStarted) {
      router.push('/');
      return;
    }
    
    // Check if player is at final destination and has completed at least 1 excursion there
    const finalDestination = destinations[destinations.length - 1];
    const isAtFinalDestination = player.currentDestinationId === finalDestination.id;
    
    const finalDestinationExcursions = excursions.filter(
      excursion => excursion.destinationId === finalDestination.id
    );
    
    const hasCompletedFinalExcursion = finalDestinationExcursions.some(
      excursion => player.completedExcursions.includes(excursion.id)
    );
    
    if (isAtFinalDestination && hasCompletedFinalExcursion) {
      completeGame();
    } else if (!gameCompleted) {
      router.push('/journey');
    }
  }, [gameStarted, gameCompleted, player, router, completeGame]);
  
  if (!gameStarted || !gameCompleted) {
    return null;
  }
  
  // Calculate stats
  const totalDestinations = destinations.length;
  const visitedDestinations = player.visitedDestinations.length;
  
  const totalExcursions = excursions.length;
  const completedExcursions = player.completedExcursions.length;
  const excursionPercentage = Math.round((completedExcursions / totalExcursions) * 100);
  
  const totalSouvenirs = souvenirs.length;
  const collectedSouvenirs = player.collectedSouvenirs.length;
  const souvenirPercentage = Math.round((collectedSouvenirs / totalSouvenirs) * 100);
  
  // Determine player level
  let finalLevel = player.level;
  if (excursionPercentage >= 80 && souvenirPercentage >= 70) {
    finalLevel = 'cruiseVeteran';
  } else if (excursionPercentage >= 50 && souvenirPercentage >= 40) {
    finalLevel = 'historyBuff';
  }
  
  // Calculate final score
  const baseScore = player.score;
  const excursionBonus = completedExcursions * 15;
  const souvenirBonus = collectedSouvenirs * 20;
  const knowledgeBonus = Math.floor(player.resources.culturalKnowledge / 10) * 5;
  const finalScore = baseScore + excursionBonus + souvenirBonus + knowledgeBonus;
  
  const handlePlayAgain = () => {
    resetGame();
    router.push('/');
  };
  
  return (
    <Layout title="Rhine River Voyage - Journey Complete">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Congratulations, {player.name}!</h1>
          <p className="text-xl text-gray-700">You&apos;ve completed your Rhine River voyage!</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Journey Summary</h2>
          
          <div className="mb-8 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{finalScore}</div>
            <div className="text-gray-600">Final Score</div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Journey Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Traveled</div>
                <div className="text-2xl font-bold text-blue-700">{visitedDestinations}/{totalDestinations}</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Completed</div>
                <div className="text-2xl font-bold text-purple-700">
                  {completedExcursions}/{totalExcursions} ({excursionPercentage}%)
                </div>
                <div className="text-sm text-gray-600">Excursions</div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Collected</div>
                <div className="text-2xl font-bold text-green-700">
                  {collectedSouvenirs}/{totalSouvenirs} ({souvenirPercentage}%)
                </div>
                <div className="text-sm text-gray-600">Souvenirs</div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Acquired</div>
                <div className="text-2xl font-bold text-yellow-700">{player.resources.culturalKnowledge}</div>
                <div className="text-sm text-gray-600">Cultural Knowledge</div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Your Achievement</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
              <div className="text-xl font-bold mb-1 text-blue-800">
                {finalLevel === 'casualTraveler' ? 'Casual Traveler' :
                finalLevel === 'historyBuff' ? 'History Buff' :
                'Cruise Veteran'}
              </div>
              <p className="text-gray-600">
                {finalLevel === 'casualTraveler' 
                  ? 'You enjoyed the sights and sounds of the Rhine River. There\'s still much more to explore!'
                  : finalLevel === 'historyBuff'
                  ? 'You&apos;ve gained significant knowledge about the Rhine\'s history and culture. Well done!'
                  : 'You&apos;ve mastered the Rhine River experience! Your knowledge and experience are impressive!'}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handlePlayAgain}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Play Again
            </button>
            
            <div className="mt-4 text-sm text-gray-500">
              Start a new journey to discover more about the Rhine River and improve your score!
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}