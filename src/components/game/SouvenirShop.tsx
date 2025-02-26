import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getSouvenirsByDestination } from '@/data/souvenirs';
import { Souvenir } from '@/types/game.types';
import Image from 'next/image';

interface SouvenirShopProps {
  destinationId: string;
}

const SouvenirShop: React.FC<SouvenirShopProps> = ({ destinationId }) => {
  const { player, collectSouvenir, updateResources } = useGameStore();
  const [showShop, setShowShop] = useState(false);
  
  const availableSouvenirs = getSouvenirsByDestination(destinationId)
    .filter(souvenir => !player.collectedSouvenirs.includes(souvenir.id));
  
  const handlePurchaseSouvenir = (souvenir: Souvenir) => {
    // Check if player has enough money
    const cost = souvenir.rarity === 'common' ? 50 : 
                souvenir.rarity === 'rare' ? 150 : 300;
    
    if (player.resources.money >= cost) {
      // Deduct cost
      updateResources({ money: -cost });
      
      // Add souvenir to collection
      collectSouvenir(souvenir.id, souvenir.pointValue);
      
      // Apply bonus effect if any
      if (souvenir.bonusEffect) {
        updateResources(souvenir.bonusEffect);
      }
    } else {
      alert("You don't have enough money to buy this souvenir!");
    }
  };
  
  if (availableSouvenirs.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <button
        onClick={() => setShowShop(!showShop)}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
          />
        </svg>
        {showShop ? 'Close Souvenir Shop' : 'Visit Souvenir Shop'}
      </button>
      
      {showShop && (
        <div className="mt-4 bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Available Souvenirs</h3>
          
          <div className="space-y-4">
            {availableSouvenirs.map(souvenir => {
              const cost = souvenir.rarity === 'common' ? 50 : 
                          souvenir.rarity === 'rare' ? 150 : 300;
              
              return (
                <div key={souvenir.id} className="border rounded-lg p-3 flex">
                  <div className="w-16 h-16 bg-gray-100 rounded-md mr-3 flex-shrink-0 overflow-hidden">
                  <Image 
                    src={souvenir.image || '/assets/images/placeholder.png'} 
                    alt={souvenir.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{souvenir.name}</h4>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        souvenir.rarity === 'common' ? 'bg-green-100 text-green-800' :
                        souvenir.rarity === 'rare' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {souvenir.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{souvenir.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">€{cost}</span>
                      <button
                        onClick={() => handlePurchaseSouvenir(souvenir)}
                        disabled={player.resources.money < cost}
                        className={`px-3 py-1 rounded text-sm ${
                          player.resources.money >= cost
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {player.resources.money >= cost ? 'Purchase' : 'Not enough money'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SouvenirShop;