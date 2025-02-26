import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  GameState, 
  PlayerState, 
  DestinationId, 
  Resources, 
  ExcursionId 
} from '@/types/game.types';

// Initial player state
const initialPlayerState: PlayerState = {
  name: '',
  level: 'casualTraveler',
  resources: {
    travelPoints: 100,
    money: 1000,
    culturalKnowledge: 0
  },
  currentDestinationId: 'amsterdam',
  visitedDestinations: ['amsterdam'],
  completedExcursions: [],
  collectedSouvenirs: [],
  score: 0
};

// Initial game state
const initialGameState: GameState = {
  player: initialPlayerState,
  gameStarted: false,
  currentDestinationIndex: 0,
  gameCompleted: false
};

interface GameStore extends GameState {
  // Player actions
  setPlayerName: (name: string) => void;
  updateResources: (resources: Partial<Resources>) => void;
  moveToDestination: (destinationId: DestinationId) => void;
  completeExcursion: (excursionId: ExcursionId, rewards: Partial<Resources>) => void;
  collectSouvenir: (souvenirId: string, pointValue: number) => void;
  
  // Game state actions
  startGame: () => void;
  resetGame: () => void;
  completeGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialGameState,
      
      // Player actions
      setPlayerName: (name) => set((state) => ({
        player: { ...state.player, name }
      })),
      
      updateResources: (resources) => set((state) => ({
        player: {
          ...state.player,
          resources: {
            travelPoints: state.player.resources.travelPoints + (resources.travelPoints || 0),
            money: state.player.resources.money + (resources.money || 0),
            culturalKnowledge: state.player.resources.culturalKnowledge + (resources.culturalKnowledge || 0)
          }
        }
      })),
      
      moveToDestination: (destinationId: string) => set((state) => {
        const destinations = ['amsterdam', 'rotterdam', 'cologne', 'koblenz', 'rudesheim', 'basel'];
        const destinationIndex = destinations.indexOf(destinationId);
        
        return {
          player: {
            ...state.player,
            currentDestinationId: destinationId as DestinationId,
            visitedDestinations: Array.from(new Set([...state.player.visitedDestinations, destinationId as DestinationId]))
          },
          currentDestinationIndex: destinationIndex
        };
      }),
      
      completeExcursion: (excursionId, rewards) => set((state) => ({
        player: {
          ...state.player,
          completedExcursions: [...state.player.completedExcursions, excursionId],
          resources: {
            travelPoints: state.player.resources.travelPoints + (rewards.travelPoints || 0),
            money: state.player.resources.money + (rewards.money || 0),
            culturalKnowledge: state.player.resources.culturalKnowledge + (rewards.culturalKnowledge || 0)
          },
          score: state.player.score + 10 // Base score for completing an excursion
        }
      })),
      
      collectSouvenir: (souvenirId, pointValue) => set((state) => ({
        player: {
          ...state.player,
          collectedSouvenirs: [...state.player.collectedSouvenirs, souvenirId],
          score: state.player.score + pointValue
        }
      })),
      
      // Game state actions
      startGame: () => set({ gameStarted: true }),
      
      resetGame: () => set({ ...initialGameState }),
      
      completeGame: () => set({ gameCompleted: true })
    }),
    {
      name: 'rhine-river-game-storage'
    }
  )
);