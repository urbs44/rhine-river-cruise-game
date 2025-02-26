import { Excursion } from '@/types/game.types';

export const excursions: Excursion[] = [
  // Amsterdam Excursions
  {
    id: 'amsterdam-canal-tour',
    destinationId: 'amsterdam',
    title: 'Canal Tour Discovery',
    description: 'Explore Amsterdam\'s iconic canal system and learn about its historical significance.',
    type: 'cultural',
    difficulty: 'easy',
    rewards: {
      travelPoints: 5,
      culturalKnowledge: 10,
      money: -20
    },
    isCompleted: false,
    image: '/assets/images/excursions/amsterdam-canal.png'
  },
  {
    id: 'amsterdam-museum-visit',
    destinationId: 'amsterdam',
    title: 'Rijksmuseum Exploration',
    description: 'Visit the world-famous Rijksmuseum and discover Dutch masterpieces.',
    type: 'trivia',
    difficulty: 'medium',
    rewards: {
      culturalKnowledge: 15,
      money: -30
    },
    isCompleted: false,
    image: '/assets/images/excursions/amsterdam-museum.png'
  },
  {
    id: 'amsterdam-local-cuisine',
    destinationId: 'amsterdam',
    title: 'Dutch Cuisine Experience',
    description: 'Sample local delicacies and learn about Dutch culinary traditions.',
    type: 'cultural',
    difficulty: 'easy',
    rewards: {
      culturalKnowledge: 5,
      money: -25
    },
    isCompleted: false,
    image: '/assets/images/excursions/amsterdam-cuisine.png'
  },
  
  // Rotterdam Excursions
  {
    id: 'rotterdam-harbor-tour',
    destinationId: 'rotterdam',
    title: 'Harbor Boat Tour',
    description: 'Explore Europe\'s largest port and learn about its economic importance.',
    type: 'photography',
    difficulty: 'medium',
    rewards: {
      culturalKnowledge: 12,
      money: -35
    },
    isCompleted: false,
    image: '/assets/images/excursions/rotterdam-harbor.png'
  },
  {
    id: 'rotterdam-cube-houses',
    destinationId: 'rotterdam',
    title: 'Cube Houses Exploration',
    description: 'Visit the famous cubic houses and learn about innovative Dutch architecture.',
    type: 'photography',
    difficulty: 'easy',
    rewards: {
      culturalKnowledge: 8,
      money: -15
    },
    isCompleted: false,
    image: '/assets/images/excursions/rotterdam-cube-houses.png'
  },
  {
    id: 'rotterdam-market-hall',
    destinationId: 'rotterdam',
    title: 'Market Hall Culinary Tour',
    description: 'Explore the Market Hall and taste local delicacies while learning about food culture.',
    type: 'cultural',
    difficulty: 'easy',
    rewards: {
      culturalKnowledge: 6,
      money: -30
    },
    isCompleted: false,
    image: '/assets/images/excursions/rotterdam-market-hall.png'
  },
  
  // Cologne Excursions
  {
    id: 'cologne-cathedral-visit',
    destinationId: 'cologne',
    title: 'Cologne Cathedral Tour',
    description: 'Visit the magnificent Gothic cathedral and learn about its 600-year construction.',
    type: 'trivia',
    difficulty: 'medium',
    rewards: {
      culturalKnowledge: 15,
      money: -10
    },
    isCompleted: false,
    image: '/assets/images/excursions/cologne-cathedral.png'
  },
  {
    id: 'cologne-chocolate-museum',
    destinationId: 'cologne',
    title: 'Chocolate Museum Adventure',
    description: 'Discover the history of chocolate and sample some delicious treats.',
    type: 'cultural',
    difficulty: 'easy',
    rewards: {
      culturalKnowledge: 7,
      money: -25
    },
    isCompleted: false,
    image: '/assets/images/excursions/cologne-chocolate.png'
  },
  {
    id: 'cologne-old-town-tour',
    destinationId: 'cologne',
    title: 'Old Town Walking Tour',
    description: 'Explore the historic streets of Cologne\'s old town and discover hidden gems.',
    type: 'photography',
    difficulty: 'medium',
    rewards: {
      culturalKnowledge: 10,
      travelPoints: 5,
      money: -15
    },
    isCompleted: false,
    image: '/assets/images/excursions/cologne-old-town.png'
  },
  
  // Add more excursions for other destinations...
  // Koblenz Excursions
  {
    id: 'koblenz-fortress-visit',
    destinationId: 'koblenz',
    title: 'Ehrenbreitstein Fortress',
    description: 'Visit one of the largest preserved fortresses in Europe with panoramic Rhine views.',
    type: 'trivia',
    difficulty: 'hard',
    rewards: {
      culturalKnowledge: 20,
      money: -40
    },
    isCompleted: false,
    image: '/assets/images/excursions/koblenz-fortress.png'
  },
  
  // Basic entries for remaining excursions
  // Additional excursions will be similarly structured
];

export const getExcursionsByDestination = (destinationId: string): Excursion[] => {
  return excursions.filter(excursion => excursion.destinationId === destinationId);
};

export const getExcursionById = (id: string): Excursion | undefined => {
  return excursions.find(excursion => excursion.id === id);
};