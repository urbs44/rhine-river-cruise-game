export type ResourceType = 'travelPoints' | 'money' | 'culturalKnowledge';

export interface Resources {
  travelPoints: number;
  money: number;
  culturalKnowledge: number;
}

export type DestinationId = 'amsterdam' | 'rotterdam' | 'cologne' | 'koblenz' | 'rudesheim' | 'basel';

export interface Destination {
  id: DestinationId;
  name: string;
  description: string;
  position: number; // Position in the journey (0-based)
  requiredResources: Partial<Resources>; // Resources required to enter this destination
  image: string; // Path to the destination image
  excursions: ExcursionId[]; // Available excursions at this destination
}

export type ExcursionType = 'trivia' | 'cultural' | 'photography' | 'puzzle';

export type ExcursionId = string;

export interface Excursion {
  id: ExcursionId;
  destinationId: DestinationId;
  title: string;
  description: string;
  type: ExcursionType;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: Partial<Resources>; // Resources gained upon completion
  isCompleted: boolean;
  image?: string; // Optional path to excursion image
}

export type SouvenirRarity = 'common' | 'rare' | 'special';

export interface Souvenir {
  id: string;
  name: string;
  description: string;
  rarity: SouvenirRarity;
  pointValue: number;
  destinationId: DestinationId;
  image: string; // Path to souvenir image
  bonusEffect?: Partial<Resources>; // Optional gameplay bonus
}

export type PlayerLevel = 'casualTraveler' | 'historyBuff' | 'cruiseVeteran';

export interface PlayerState {
  name: string;
  level: PlayerLevel;
  resources: Resources;
  currentDestinationId: DestinationId;
  visitedDestinations: DestinationId[];
  completedExcursions: ExcursionId[];
  collectedSouvenirs: string[];
  score: number;
}

export interface GameState {
  player: PlayerState;
  gameStarted: boolean;
  currentDestinationIndex: number;
  gameCompleted: boolean;
}