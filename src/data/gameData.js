// src/data/gameData.js
export const portsData = [
    {
      id: 1,
      name: "Basel",
      country: "Switzerland",
      description: "Starting point of your journey along the Rhine.",
      coordinates: { x: 10, y: 90 },
      souvenirPoints: 50,
      souvenirName: "Swiss Chocolate",
      facts: [
        "Basel is located where the Swiss, French and German borders meet",
        "The city is known for its museums and art scene",
        "Basel is Switzerland's third-most-populous city"
      ]
    },
    {
      id: 2,
      name: "Breisach",
      country: "Germany",
      description: "Gateway to the Alsatian wine road and Black Forest.",
      coordinates: { x: 20, y: 80 },
      souvenirPoints: 75,
      souvenirName: "Black Forest Cuckoo Clock",
      facts: [
        "Breisach sits on a hill overlooking the Rhine",
        "The town has a beautiful St. Stephen's Cathedral",
        "It's the launching point for excursions along the Route des Vins"
      ]
    },
    {
      id: 3,
      name: "Strasbourg",
      country: "France",
      description: "Historic town with cobbled lanes and half-timbered homes.",
      coordinates: { x: 30, y: 70 },
      souvenirPoints: 100,
      souvenirName: "Alsatian Pottery",
      facts: [
        "Strasbourg houses the European Parliament",
        "The city's Gothic cathedral was once the world's tallest building",
        "The historic center is a UNESCO World Heritage site"
      ]
    },
    {
      id: 4,
      name: "Speyer",
      country: "Germany",
      description: "Known for its Romanesque cathedral with four red towers.",
      coordinates: { x: 40, y: 60 },
      souvenirPoints: 75,
      souvenirName: "Speyer Cathedral Model",
      facts: [
        "Speyer Cathedral is one of the most important Romanesque monuments from the Holy Roman Empire",
        "The city was founded by the Romans",
        "It houses the Technik Museum with rare technological exhibits"
      ]
    },
    {
      id: 5,
      name: "Rüdesheim",
      country: "Germany",
      description: "Picturesque wine town along the Rhine.",
      coordinates: { x: 50, y: 50 },
      souvenirPoints: 125,
      souvenirName: "Rüdesheimer Coffee Set",
      facts: [
        "Famous for its Drosselgasse lane lined with shops and taverns",
        "Surrounded by vineyards producing Riesling wines",
        "Home to the impressive Niederwald Monument"
      ]
    },
    {
      id: 6,
      name: "Braubach",
      country: "Germany",
      description: "Home to the Marksburg Castle overlooking the Rhine.",
      coordinates: { x: 60, y: 40 },
      souvenirPoints: 100,
      souvenirName: "Marksburg Castle Miniature",
      facts: [
        "Marksburg is the only hilltop castle on the Rhine that has never been destroyed",
        "The castle dates back to the 13th century",
        "It offers panoramic views of the Rhine Valley"
      ]
    },
    {
      id: 7,
      name: "Koblenz",
      country: "Germany",
      description: "Historic town at the confluence of Rhine and Moselle rivers.",
      coordinates: { x: 70, y: 30 },
      souvenirPoints: 150,
      souvenirName: "German Corner Medallion",
      facts: [
        "Known for the 'Deutsches Eck' (German Corner) monument",
        "Has a 2,000-year-old history dating back to Roman times",
        "Famous for the 'Spitting Boy' fountain that spits without warning"
      ]
    },
    {
      id: 8,
      name: "Cologne",
      country: "Germany",
      description: "City with a magnificent Gothic cathedral and rich history.",
      coordinates: { x: 80, y: 20 },
      souvenirPoints: 175,
      souvenirName: "Cologne Cathedral Crystal",
      facts: [
        "Cologne Cathedral took over 600 years to complete",
        "The city is famous for its 'Kölsch' beer and perfume (Eau de Cologne)",
        "It has twelve Romanesque churches within the old city walls"
      ]
    },
    {
      id: 9,
      name: "Amsterdam",
      country: "Netherlands",
      description: "Final destination with canals, historic buildings, and museums.",
      coordinates: { x: 90, y: 10 },
      souvenirPoints: 200,
      souvenirName: "Dutch Windmill Figurine",
      facts: [
        "Amsterdam has more than 100 kilometers of canals",
        "The city has more bridges than Venice",
        "It's home to the famous Rijksmuseum with works by Rembrandt and Vermeer"
      ]
    }
  ];
  
  export const obstacles = [
    {
      type: "Rocks",
      damage: 15,
      speed: 2,
      frequency: 0.05,
      sprite: "🪨"
    },
    {
      type: "Whirlpool",
      damage: 25,
      speed: 3,
      frequency: 0.03,
      sprite: "🌀"
    },
    {
      type: "Logs",
      damage: 10,
      speed: 2.5,
      frequency: 0.08,
      sprite: "🪵"
    },
    {
      type: "Other Boats",
      damage: 20,
      speed: 4,
      frequency: 0.04,
      sprite: "🚢"
    }
  ];
  
  export const powerUps = [
    {
      type: "Engine Boost",
      effect: "speed",
      value: 1.5,
      duration: 5000,
      frequency: 0.02,
      sprite: "⚡"
    },
    {
      type: "Shield",
      effect: "invulnerability",
      value: 1,
      duration: 3000,
      frequency: 0.01,
      sprite: "🛡️"
    },
    {
      type: "Repair Kit",
      effect: "health",
      value: 20,
      duration: 0,
      frequency: 0.015,
      sprite: "🔧"
    },
    {
      type: "Double Points",
      effect: "points",
      value: 2,
      duration: 7000,
      frequency: 0.01,
      sprite: "💎"
    }
  ];
  
  export const riverSegments = [
    {
      from: "Basel",
      to: "Breisach",
      distance: 65,
      difficulty: 1,
      scenery: "Vineyards and rolling hills"
    },
    {
      from: "Breisach",
      to: "Strasbourg",
      distance: 55,
      difficulty: 2,
      scenery: "Villages and farmlands"
    },
    {
      from: "Strasbourg",
      to: "Speyer",
      distance: 85,
      difficulty: 2,
      scenery: "Forests and industrial areas"
    },
    {
      from: "Speyer",
      to: "Rüdesheim",
      distance: 90,
      difficulty: 3,
      scenery: "Rocky terrain and small towns"
    },
    {
      from: "Rüdesheim",
      to: "Braubach",
      distance: 35,
      difficulty: 4,
      scenery: "Steep vineyards and castles"
    },
    {
      from: "Braubach",
      to: "Koblenz",
      distance: 25,
      difficulty: 3,
      scenery: "Castle views and gorges"
    },
    {
      from: "Koblenz",
      to: "Cologne",
      distance: 110,
      difficulty: 2,
      scenery: "Open riverbanks and suburbs"
    },
    {
      from: "Cologne",
      to: "Amsterdam",
      distance: 240,
      difficulty: 1,
      scenery: "Wide river and flat landscapes"
    }
  ];
  
  export const gameSettings = {
    playerInitialHealth: 100,
    playerBaseSpeed: 3,
    maxLevel: 9,
    scoreMultiplier: 10,
    bulletSpeed: 5,
    gameWidth: 800,
    gameHeight: 600
  };