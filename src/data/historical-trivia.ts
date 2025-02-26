interface TriviaQuestion {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
    explanation?: string;
  }
  
  interface TriviaData {
    [key: string]: TriviaQuestion[];
  }
  
  const historicalTrivia: TriviaData = {
    amsterdam: [
      {
        question: "In what year was Amsterdam founded?",
        answers: ["1200", "1275", "1300", "1350"],
        correctAnswerIndex: 1,
        explanation: "Amsterdam was founded around 1275 when a dam was built on the Amstel River."
      },
      {
        question: "Which famous painter lived in Amsterdam and created 'The Night Watch'?",
        answers: ["Vincent van Gogh", "Rembrandt van Rijn", "Johannes Vermeer", "Jan van Eyck"],
        correctAnswerIndex: 1,
        explanation: "Rembrandt van Rijn lived in Amsterdam and painted 'The Night Watch' in 1642."
      },
      {
        question: "What was the name of the Dutch trading company that operated from Amsterdam in the 17th century?",
        answers: ["West India Company", "Dutch Trading Guild", "East India Company (VOC)", "Amsterdam Merchants Association"],
        correctAnswerIndex: 2,
        explanation: "The Dutch East India Company (VOC) was established in 1602 and was the world's first multinational corporation."
      }
    ],
    rotterdam: [
      {
        question: "What major event in the 1940s led to the rebuilding of Rotterdam's city center?",
        answers: ["Economic recession", "Flooding", "Nazi bombing in WWII", "Urban renewal project"],
        correctAnswerIndex: 2,
        explanation: "Rotterdam was heavily bombed by the German Luftwaffe on May 14, 1940, destroying much of the city center."
      },
      {
        question: "What architectural features are the 'Cube Houses' in Rotterdam known for?",
        answers: ["Underground living spaces", "Tilted cube-shaped homes", "Floating on water", "Made entirely of glass"],
        correctAnswerIndex: 1,
        explanation: "The Cube Houses, designed by architect Piet Blom, are tilted 45 degrees and rest on hexagonal pylons."
      },
      {
        question: "Which famous bridge in Rotterdam is nicknamed 'The Swan'?",
        answers: ["Willemsbrug", "Erasmusbrug", "Maeslantkering", "Van Brienenoordbrug"],
        correctAnswerIndex: 1,
        explanation: "The Erasmus Bridge, completed in 1996, is nicknamed 'The Swan' due to its distinctive asymmetrical shape."
      }
    ],
    cologne: [
      {
        question: "How long did it take to complete the construction of Cologne Cathedral?",
        answers: ["25 years", "100 years", "Over 600 years", "200 years"],
        correctAnswerIndex: 2,
        explanation: "Construction of Cologne Cathedral began in 1248 and was completed in 1880, taking over 600 years."
      },
      {
        question: "What Roman emperor founded the city that would become Cologne?",
        answers: ["Julius Caesar", "Augustus", "Claudius", "Vespasian"],
        correctAnswerIndex: 1,
        explanation: "The Romans founded the city as Colonia Claudia Ara Agrippinensium in 50 AD, during the reign of Emperor Claudius."
      },
      {
        question: "What famous product was first produced in Cologne in the 18th century?",
        answers: ["Chocolate", "Eau de Cologne", "Beer", "Printing press"],
        correctAnswerIndex: 1,
        explanation: "Eau de Cologne (Cologne Water) was first produced in Cologne by Italian perfumer Johann Maria Farina in 1709."
      }
    ],
    koblenz: [
      {
        question: "What is the name of the fortress that overlooks Koblenz?",
        answers: ["Marksburg", "Ehrenbreitstein Fortress", "Stolzenfels Castle", "Rheinfels Castle"],
        correctAnswerIndex: 1,
        explanation: "Ehrenbreitstein Fortress sits 118 meters above the Rhine and is one of the largest preserved fortresses in Europe."
      },
      {
        question: "What significant geographical feature is found at Koblenz?",
        answers: ["The source of the Rhine", "The confluence of the Rhine and Moselle rivers", "The widest point of the Rhine", "The Rhine Falls"],
        correctAnswerIndex: 1,
        explanation: "Koblenz is located at the confluence of the Rhine and Moselle rivers, known as the 'Deutsches Eck' (German Corner)."
      },
      {
        question: "Approximately how old is the city of Koblenz?",
        answers: ["Over 2000 years", "About 1000 years", "About 500 years", "Less than 300 years"],
        correctAnswerIndex: 0,
        explanation: "Koblenz was established as a Roman military post around 8 BC, making it over 2000 years old."
      }
    ],
    rudesheim: [
      {
        question: "What wine is Rüdesheim particularly famous for producing?",
        answers: ["Cabernet Sauvignon", "Riesling", "Merlot", "Chardonnay"],
        correctAnswerIndex: 1,
        explanation: "Rüdesheim is renowned for its production of Riesling wines, which thrive in the region's climate and soil."
      },
      {
        question: "What is the name of the famous musical museum in Rüdesheim?",
        answers: ["Bach Museum", "Mechanical Musical Instrument Museum", "Rhine Music Hall", "Wagner Museum"],
        correctAnswerIndex: 1,
        explanation: "Siegfried's Mechanical Musical Instrument Museum displays a collection of self-playing mechanical musical instruments from the 18th to 20th centuries."
      },
      {
        question: "Which historical region is Rüdesheim part of?",
        answers: ["Bavaria", "Rhineland-Palatinate", "Black Forest", "Rhine Gorge"],
        correctAnswerIndex: 3,
        explanation: "Rüdesheim is part of the Upper Middle Rhine Valley, known as the Rhine Gorge, which is a UNESCO World Heritage Site."
      }
    ],
    basel: [
      {
        question: "In which country is Basel located?",
        answers: ["Germany", "France", "Switzerland", "Austria"],
        correctAnswerIndex: 2,
        explanation: "Basel is located in Switzerland, at the point where the Swiss, French and German borders meet."
      },
      {
        question: "What famous art fair is held annually in Basel?",
        answers: ["Documenta", "Venice Biennale", "Art Basel", "Frieze Art Fair"],
        correctAnswerIndex: 2,
        explanation: "Art Basel is one of the most prestigious art fairs in the world, founded in 1970."
      },
      {
        question: "Which famous historical figure taught at the University of Basel in the 1500s?",
        answers: ["Erasmus", "Martin Luther", "John Calvin", "Leonardo da Vinci"],
        correctAnswerIndex: 0,
        explanation: "The Dutch humanist scholar Erasmus taught at the University of Basel from 1521 to 1529."
      }
    ]
  };
  
  export const getHistoricalTrivia = (destinationId: string): TriviaQuestion[] => {
    return historicalTrivia[destinationId] || [];
  };