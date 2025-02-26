import { Destination } from '@/types/game.types';

export const destinations: Destination[] = [
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    description: 'Begin your journey in the beautiful canal city of Amsterdam, known for its artistic heritage, elaborate canal system and narrow houses.',
    position: 0,
    requiredResources: {},
    image: '/assets/images/destinations/amsterdam.png',
    excursions: ['amsterdam-canal-tour', 'amsterdam-museum-visit', 'amsterdam-local-cuisine']
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    description: 'Rotterdam is a major port city in the Dutch province of South Holland. The Maritime Museum here showcases the city\'s seafaring history.',
    position: 1,
    requiredResources: {
      travelPoints: 10
    },
    image: '/assets/images/destinations/rotterdam.png',
    excursions: ['rotterdam-harbor-tour', 'rotterdam-cube-houses', 'rotterdam-market-hall']
  },
  {
    id: 'cologne',
    name: 'Cologne',
    description: 'Cologne is a 2,000-year-old city spanning the Rhine River in western Germany, featuring the twin-spired Cologne Cathedral.',
    position: 2,
    requiredResources: {
      travelPoints: 20,
      culturalKnowledge: 5
    },
    image: '/assets/images/destinations/cologne.png',
    excursions: ['cologne-cathedral-visit', 'cologne-chocolate-museum', 'cologne-old-town-tour']
  },
  {
    id: 'koblenz',
    name: 'Koblenz',
    description: 'Koblenz is a city situated on both banks of the Rhine where it is joined by the Moselle river. The city is a gateway to the terraced vineyards of the Rhine Gorge.',
    position: 3,
    requiredResources: {
      travelPoints: 30,
      culturalKnowledge: 10
    },
    image: '/assets/images/destinations/koblenz.png',
    excursions: ['koblenz-fortress-visit', 'koblenz-wine-tasting', 'koblenz-cable-car-ride']
  },
  {
    id: 'rudesheim',
    name: 'Rüdesheim',
    description: 'Rüdesheim am Rhein is a town in the Rhine Gorge known for winemaking, especially of Riesling wines. Its charming old town is a popular attraction.',
    position: 4,
    requiredResources: {
      travelPoints: 40,
      culturalKnowledge: 15,
      money: 200
    },
    image: '/assets/images/destinations/rudesheim.png',
    excursions: ['rudesheim-wine-tasting', 'rudesheim-music-museum', 'rudesheim-cable-car']
  },
  {
    id: 'basel',
    name: 'Basel',
    description: 'Basel is a city on the Rhine River in northwest Switzerland, with a medieval old town center. Its vibrant art scene is showcased in the world-renowned Art Basel.',
    position: 5,
    requiredResources: {
      travelPoints: 50,
      culturalKnowledge: 20,
      money: 300
    },
    image: '/assets/images/destinations/basel.png',
    excursions: ['basel-old-town-tour', 'basel-art-museum', 'basel-rhine-swimming']
  }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};

export const getNextDestination = (currentId: string): Destination | undefined => {
  const currentIndex = destinations.findIndex(destination => destination.id === currentId);
  if (currentIndex >= 0 && currentIndex < destinations.length - 1) {
    return destinations[currentIndex + 1];
  }
  return undefined;
};