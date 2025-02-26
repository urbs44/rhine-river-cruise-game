import React from 'react';
import Head from 'next/head';
import { useGameStore } from '@/store/gameStore';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Rhine River Voyage' }) => {
  const { player, gameStarted } = useGameStore();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="An interactive journey along the Rhine River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <header className="bg-blue-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Rhine River Voyage</h1>
            {gameStarted && (
              <div className="flex space-x-4">
                <div className="text-sm">
                  <span className="font-bold">Travel Points:</span> {player.resources.travelPoints}
                </div>
                <div className="text-sm">
                  <span className="font-bold">Money:</span> €{player.resources.money}
                </div>
                <div className="text-sm">
                  <span className="font-bold">Knowledge:</span> {player.resources.culturalKnowledge}
                </div>
              </div>
            )}
          </div>
        </header>
        
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        
        <footer className="bg-blue-800 text-white p-4 text-center text-sm">
          <div className="container mx-auto">
            <p>© {new Date().getFullYear()} Rhine River Voyage - An Educational Cruise Experience</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;