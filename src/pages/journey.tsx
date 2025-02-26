import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useGameStore } from '@/store/gameStore';
import { destinations } from '@/data/destinations';
import JourneyMap from '@/components/game/JourneyMap';
import DestinationInfo from '@/components/game/DestinationInfo';

export default function Journey() {
  const { gameStarted, player } = useGameStore();
  const router = useRouter();
  
  const currentDestination = destinations.find(
    destination => destination.id === player.currentDestinationId
  );
  
  useEffect(() => {
    if (!gameStarted) {
      router.push('/');
    }
  }, [gameStarted, router]);
  
  if (!gameStarted || !currentDestination) {
    return null;
  }
  
  return (
    <Layout title={`Rhine River Voyage - ${currentDestination.name}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <JourneyMap />
        </div>
        
        <div className="md:col-span-2">
          <DestinationInfo destination={currentDestination} />
        </div>
      </div>
    </Layout>
  );
}