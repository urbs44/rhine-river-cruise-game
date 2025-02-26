import { Souvenir } from '@/types/game.types';

export const souvenirs: Souvenir[] = [
  // Amsterdam Souvenirs
  {
    id: 'amsterdam-wooden-shoes',
    name: 'Miniature Wooden Shoes',
    description: 'Traditional Dutch clogs (klompen) in miniature form.',
    rarity: 'common',
    pointValue: 10,
    destinationId: 'amsterdam',
    image: '/assets/images/souvenirs/wooden-shoes.png'
  },
  {
    id: 'amsterdam-delft-blue',
    name: 'Delft Blue Porcelain',
    description: 'Hand-painted porcelain piece in the traditional Dutch Delft style.',
    rarity: 'rare',
    pointValue: 20,
    destinationId: 'amsterdam',
    image: '/assets/images/souvenirs/delft-blue.png',
    bonusEffect: {
      culturalKnowledge: 5
    }
  },
  
  // Rotterdam Souvenirs
  {
    id: 'rotterdam-cube-house-model',
    name: 'Cube House Model',
    description: 'A miniature model of Rotterdam\'s famous cube houses.',
    rarity: 'common',
    pointValue: 10,
    destinationId: 'rotterdam',
    image: '/assets/images/souvenirs/cube-house.png'
  },
  {
    id: 'rotterdam-port-painting',
    name: 'Rotterdam Harbor Painting',
    description: 'A watercolor painting depicting the busy Rotterdam harbor.',
    rarity: 'rare',
    pointValue: 20,
    destinationId: 'rotterdam',
    image: '/assets/images/souvenirs/rotterdam-painting.png',
    bonusEffect: {
      culturalKnowledge: 5
    }
  },
  
  // Cologne Souvenirs
  {
    id: 'cologne-eau-de-cologne',
    name: 'Original Eau de Cologne',
    description: 'The original fragrance created in Cologne in 1709.',
    rarity: 'common',
    pointValue: 10,
    destinationId: 'cologne',
    image: '/assets/images/souvenirs/cologne-perfume.png'
  },
  {
    id: 'cologne-cathedral-model',
    name: 'Cologne Cathedral Model',
    description: 'A detailed miniature model of the famous Cologne Cathedral.',
    rarity: 'rare',
    pointValue: 20,
    destinationId: 'cologne',
    image: '/assets/images/souvenirs/cathedral-model.png',
    bonusEffect: {
      culturalKnowledge: 5
    }
  },
  
  // Koblenz Souvenirs
  {
    id: 'koblenz-wine',
    name: 'Koblenz Wine Bottle',
    description: 'A bottle of local wine from the vineyards around Koblenz.',
    rarity: 'common',
    pointValue: 10,
    destinationId: 'koblenz',
    image: '/assets/images/souvenirs/koblenz-wine.png'
  },
  {
    id: 'koblenz-fortress-replica',
    name: 'Ehrenbreitstein Fortress Replica',
    description: 'A small replica of the famous fortress overlooking Koblenz.',
    rarity: 'rare',
    pointValue: 20,
    destinationId: 'koblenz',
    image: '/assets/images/souvenirs/fortress-replica.png',
    bonusEffect: {
      culturalKnowledge: 5
    }
  },
  
  // Rüdesheim Souvenirs
  {
    id: 'rudesheim-music-box',
    name: 'Rüdesheim Music Box',
    description: 'A traditional music box playing German folk songs.',
    rarity: 'common',
    pointValue: 10,
    destinationId: 'rudesheim',
    image: '/assets/images/souvenirs/music-box.png'
  },
  {
    id: 'rudesheim-wine-glasses',
    name: 'Rüdesheim Wine Glasses',
    description: 'Hand-crafted wine glasses specific to Riesling wines.',
    rarity: 'rare',
    pointValue: 20,
    destinationId: 'rudesheim',
    image: '/assets/images/souvenirs/wine-glasses.png',
    bonusEffect: {
      money: 50
    }
  },
  
  // Basel Souvenirs
  {
    id: 'basel-chocolate',
    name: 'Swiss Chocolate Selection',
    description: 'A box of premium Swiss chocolates from Basel.',
    rarity: 'common',
    pointValue: 10,
    destinationId: 'basel',
    image: '/assets/images/souvenirs/swiss-chocolate.png'
  },
  {
    id: 'basel-art-print',
    name: 'Basel Art Print',
    description: 'A limited edition print from a local Basel artist.',
    rarity: 'rare',
    pointValue: 20,
    destinationId: 'basel',
    image: '/assets/images/souvenirs/art-print.png',
    bonusEffect: {
      culturalKnowledge: 10
    }
  },
  
  // Special Souvenirs (obtainable through special achievements)
  {
    id: 'rhine-journey-map',
    name: 'Antique Rhine Journey Map',
    description: 'A detailed reproduction of a historical map of the Rhine River.',
    rarity: 'special',
    pointValue: 50,
    destinationId: 'basel', // Final destination
    image: '/assets/images/souvenirs/antique-map.png',
    bonusEffect: {
      travelPoints: 20,
      culturalKnowledge: 15
    }
  }
];

export const getSouvenirsByDestination = (destinationId: string): Souvenir[] => {
  return souvenirs.filter(souvenir => souvenir.destinationId === destinationId);
};

export const getSouvenirById = (id: string): Souvenir | undefined => {
  return souvenirs.find(souvenir => souvenir.id === id);
};