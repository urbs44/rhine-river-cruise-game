import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/types/game.types';
import { getExcursionsByDestination } from '@/data/excursions';
import { useGameStore } from '@/store/gameStore';
import SouvenirShop from './SouvenirShop';
import AIGuide from './AIGuide';

interface DestinationInfoProps {
  destination: Destination;
}

const DestinationInfo: React.FC<DestinationInfoProps> = ({ destination }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'excursions'>('info');
  const { player } = useGameStore();
  
  const excursions = getExcursionsByDestination(destination.id);
  const completedExcursions = excursions.filter(excursion => 
    player.completedExcursions.includes(excursion.id)
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={destination.image || '/assets/images/placeholder.png'}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h1 className="text-2xl font-bold">{destination.name}</h1>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'info' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Information
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'excursions' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('excursions')}
          >
            Excursions ({completedExcursions.length}/{excursions.length})
          </button>
        </div>
        
        {activeTab === 'info' && (
          <div>
            <p className="text-gray-700 mb-4">{destination.description}</p>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-blue-800 mb-2">Journey Progress</h3>
              <div className="flex justify-between text-sm mb-1">
                <span>Amsterdam</span>
                <span>Basel</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(destination.position / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Link 
                href="/souvenirs"
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" 
                  />
                </svg>
                View Your Souvenirs
              </Link>
            </div>
            
            <SouvenirShop destinationId={destination.id} />
            
            <AIGuide destinationId={destination.id} />
          </div>
        )}
        
        {activeTab === 'excursions' && (
          <div className="space-y-4">
            {excursions.map(excursion => (
              <div 
                key={excursion.id}
                className={`border rounded-lg p-4 ${
                  player.completedExcursions.includes(excursion.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{excursion.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{excursion.description}</p>
                    
                    <div className="flex space-x-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        excursion.type === 'trivia' ? 'bg-blue-100 text-blue-800' :
                        excursion.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                        excursion.type === 'photography' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {excursion.type}
                      </span>
                      
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        excursion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        excursion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {excursion.difficulty}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Rewards: 
                      {excursion.rewards.travelPoints && (
                        <span className="ml-1 text-blue-600">
                          {excursion.rewards.travelPoints > 0 ? '+' : ''}
                          {excursion.rewards.travelPoints} TP
                        </span>
                      )}
                      {excursion.rewards.money && (
                        <span className={`ml-1 ${excursion.rewards.money > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {excursion.rewards.money > 0 ? '+' : ''}
                          €{excursion.rewards.money}
                        </span>
                      )}
                      {excursion.rewards.culturalKnowledge && (
                        <span className="ml-1 text-purple-600">
                          {excursion.rewards.culturalKnowledge > 0 ? '+' : ''}
                          {excursion.rewards.culturalKnowledge} CK
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {!player.completedExcursions.includes(excursion.id) && (
                    <Link 
                      href={`/excursion/${excursion.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Start
                    </Link>
                  )}
                  
                  {player.completedExcursions.includes(excursion.id) && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationInfo;