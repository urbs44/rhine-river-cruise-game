import { useEffect, useState } from 'react';
import { Excursion } from '@/types/game.types';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useGameStore } from '@/store/gameStore';
import { getExcursionById } from '@/data/excursions';
import TriviaChallenge from '@/components/game/challenges/TriviaChallenge';
import CulturalChallenge from '@/components/game/challenges/CulturalChallenge';
import PhotographyChallenge from '@/components/game/challenges/PhotographyChallenge';
import PuzzleChallenge from '@/components/game/challenges/PuzzleChallenge';

export default function ExcursionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { gameStarted, player, completeExcursion } = useGameStore();
  
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    if (!gameStarted) {
      router.push('/');
      return;
    }
    
    if (id && typeof id === 'string') {
      const foundExcursion = getExcursionById(id);
      setExcursion(foundExcursion || null);
      setLoading(false);
      
      if (foundExcursion && player.completedExcursions.includes(foundExcursion.id)) {
        setCompleted(true);
      }
    }
  }, [id, gameStarted, router, player.completedExcursions]);
  
  const handleExcursionComplete = () => {
    if (excursion) {
      completeExcursion(excursion.id, excursion.rewards);
      setCompleted(true);
      setTimeout(() => {
        router.push('/journey');
      }, 3000);
    }
  };
  
  if (loading) {
    return (
      <Layout title="Loading Excursion...">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  if (!excursion) {
    return (
      <Layout title="Excursion Not Found">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Excursion Not Found</h1>
          <p className="mb-6">Sorry, we couldn&apos;t find the excursion you're looking for.</p>
          <button
            onClick={() => router.push('/journey')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Journey
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={`Rhine River Voyage - ${excursion.title}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/journey')}
            className="mr-4 text-blue-600 hover:text-blue-800"
          >
            &larr; Back
          </button>
          <h1 className="text-2xl font-bold text-blue-800">{excursion.title}</h1>
        </div>
        
        {completed ? (
          <div className="bg-green-50 border border-green-500 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-green-700 mb-2">Excursion Completed!</h2>
            <p className="mb-4">You have successfully completed this excursion.</p>
            <div className="flex justify-center space-x-2 mb-4">
              {excursion.rewards.travelPoints && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  +{excursion.rewards.travelPoints} Travel Points
                </span>
              )}
              {excursion.rewards.money && excursion.rewards.money > 0 && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  +€{excursion.rewards.money}
                </span>
              )}
              {excursion.rewards.culturalKnowledge && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  +{excursion.rewards.culturalKnowledge} Cultural Knowledge
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">Returning to journey map...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-6">{excursion.description}</p>
            
            {excursion.type === 'trivia' && (
              <TriviaChallenge 
                excursion={excursion} 
                onComplete={handleExcursionComplete} 
              />
            )}
            
            {excursion.type === 'cultural' && (
              <CulturalChallenge 
                excursion={excursion} 
                onComplete={handleExcursionComplete} 
              />
            )}
            
            {excursion.type === 'photography' && (
              <PhotographyChallenge 
                excursion={excursion} 
                onComplete={handleExcursionComplete} 
              />
            )}
            
            {excursion.type === 'puzzle' && (
              <PuzzleChallenge 
                excursion={excursion} 
                onComplete={handleExcursionComplete} 
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}