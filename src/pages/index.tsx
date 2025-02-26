import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useGameStore } from '@/store/gameStore';

export default function Home() {
  const { gameStarted, startGame, player, setPlayerName } = useGameStore();
  const router = useRouter();
  
  useEffect(() => {
    if (gameStarted) {
      router.push('/journey');
    }
  }, [gameStarted, router]);
  
  const handleStartGame = () => {
    if (player.name.trim()) {
      startGame();
    }
  };
  
  return (
    <Layout title="Rhine River Voyage - Welcome">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome to Rhine River Voyage</h1>
        <p className="mb-8 max-w-md text-gray-700">
          Embark on an educational journey down the Rhine River. 
          Explore historical cities, complete exciting excursions, and collect souvenirs!
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Begin Your Adventure</h2>
          
          <div className="mb-6">
            <label htmlFor="playerName" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Traveler Name
            </label>
            <input
              type="text"
              id="playerName"
              value={player.name}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          
          <button
            onClick={handleStartGame}
            disabled={!player.name.trim()}
            className={`w-full py-2 px-4 rounded font-medium ${
              player.name.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Start Journey
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-600 max-w-md">
          <p>Beginning in Amsterdam and ending in Basel, your cruise along the Rhine River will take you through beautiful landscapes and historic cities.</p>
        </div>
      </div>
    </Layout>
  );
}