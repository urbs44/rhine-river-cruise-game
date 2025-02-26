import { useGameStore } from '@/store/gameStore';
import { destinations } from '@/data/destinations';
import { useRouter } from 'next/router';
import { DestinationId } from '@/types/game.types';

const JourneyMap = () => {
  const { player, moveToDestination } = useGameStore();
  const router = useRouter();
  
  const handleDestinationClick = (destinationId: string) => {
    const clickedDestination = destinations.find(d => d.id === destinationId);
    const currentDestination = destinations.find(d => d.id === player.currentDestinationId);
    
    if (!clickedDestination || !currentDestination) return;
    
    // Can only travel to adjacent destinations or already visited ones
    const isAdjacent = Math.abs(clickedDestination.position - currentDestination.position) === 1;
    const isVisited = player.visitedDestinations.includes(destinationId as DestinationId);
    
    if (isAdjacent || isVisited) {
      // Check if player has enough resources
      const requiredResources = clickedDestination.requiredResources;
      const hasEnoughResources = 
        (requiredResources.travelPoints || 0) <= player.resources.travelPoints &&
        (requiredResources.money || 0) <= player.resources.money &&
        (requiredResources.culturalKnowledge || 0) <= player.resources.culturalKnowledge;
      
      if (hasEnoughResources) {
        moveToDestination(destinationId as DestinationId);
        router.push('/journey');
      } else {
        alert('You don\'t have enough resources to travel to this destination!');
      }
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Rhine River Journey</h2>
      
      <div className="relative py-4">
        {/* Journey line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-300"></div>
        
        {/* Destinations */}
        {destinations.map((destination, index) => {
          const isVisited = player.visitedDestinations.includes(destination.id);
          const isCurrent = player.currentDestinationId === destination.id;
          const isAccessible = 
            isVisited || 
            destinations.find(d => d.id === player.currentDestinationId)?.position === destination.position - 1;
          
          return (
            <div key={destination.id} className="relative mb-6 flex items-center">
              <div 
                className={`rounded-full h-8 w-8 flex items-center justify-center z-10 mr-4 
                  ${isCurrent ? 'bg-blue-600 text-white' : isVisited ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
                  ${isAccessible && !isVisited && !isCurrent ? 'cursor-pointer hover:bg-blue-400' : ''}
                `}
                onClick={() => isAccessible ? handleDestinationClick(destination.id) : null}
              >
                {index + 1}
              </div>
              
              <div className="flex flex-col">
                <span className={`font-semibold ${isCurrent ? 'text-blue-600' : ''}`}>
                  {destination.name}
                </span>
                
                {!isVisited && !isCurrent && (
                  <span className="text-xs text-gray-500">
                    {Object.entries(destination.requiredResources)
                      .map(([key, value]) => {
                        if (key === 'travelPoints') return `${value} TP`;
                        if (key === 'money') return `€${value}`;
                        if (key === 'culturalKnowledge') return `${value} CK`;
                        return '';
                      })
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyMap;