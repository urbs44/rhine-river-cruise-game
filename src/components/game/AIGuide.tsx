import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

interface AIGuideProps {
  destinationId: string;
}

const AIGuide: React.FC<AIGuideProps> = ({ destinationId }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  const { } = useGameStore();
  
  // Pre-defined responses for each destination
  const guideResponses: Record<string, Record<string, string>> = {
    amsterdam: {
      history: "Amsterdam began as a small fishing village in the late 12th century. The city's name comes from Amstelredamme, indicating the city's origin as a dam on the river Amstel. It became one of the most important ports in the world during the Dutch Golden Age (17th century).",
      food: "Traditional Dutch food in Amsterdam includes herring ('haring'), stroopwafels (syrup waffles), poffertjes (mini pancakes), and erwtensoep (pea soup). Don't miss trying bitterballen, small deep-fried meatballs typically served with mustard.",
      attractions: "Key attractions include the Rijksmuseum, Van Gogh Museum, Anne Frank House, and the historic canal district (a UNESCO World Heritage site). A canal boat tour is one of the best ways to see the city.",
      tips: "Bikes are everywhere in Amsterdam - always look both ways before crossing and stay off the bike paths. The OV-chipkaart is the best way to use public transport. Most locals speak excellent English."
    },
    rotterdam: {
      history: "Rotterdam received city rights in 1340. The city was heavily bombed during WWII on May 14, 1940, which destroyed much of the city center. This led to Rotterdam becoming a showcase for innovative architecture during reconstruction.",
      food: "Rotterdam has a diverse food scene. Traditional Dutch options include kapsalon (a fast food dish with fries, shawarma, cheese, and salad) which was actually invented in Rotterdam. The Markthal (Market Hall) is a great place to sample various foods.",
      attractions: "Must-see attractions include the iconic Cube Houses, Markthal, Erasmus Bridge, and the Euromast observation tower. The Museum Boijmans Van Beuningen is one of the Netherlands' most important art museums.",
      tips: "Rotterdam is very different from Amsterdam with its modern architecture. The Rotterdam Welcome Card gives free or discounted entry to many attractions. Water taxis are a fun way to cross the river."
    },
    cologne: {
      history: "Cologne (Köln in German) is one of Germany's oldest cities, founded by the Romans in 38 BCE as Colonia Claudia Ara Agrippinensium. It became an important trade route and religious center in medieval times.",
      food: "Cologne is known for its hearty food. Try the local Kölsch beer (served in small 0.2L glasses), Himmel un Äd (Heaven and Earth - black pudding with mashed potatoes and apple sauce), and Halver Hahn (rye roll with cheese).",
      attractions: "The magnificent Cologne Cathedral (Dom) is the city's most famous landmark. Other attractions include the Ludwig Museum, the Old Town, and the Chocolate Museum. The Rhine promenade offers lovely views.",
      tips: "The locals are known for their friendliness and laid-back attitude. During Carnival season (February/March), the city transforms with parades and celebrations. Many museums are closed on Mondays."
    },
    koblenz: {
      history: "Koblenz is over 2,000 years old, founded around 8 BC as a Roman military post. Its name comes from the Latin 'confluentes', referring to the confluence of the Rhine and Moselle rivers. It was part of various territories throughout history including the Holy Roman Empire.",
      food: "Regional specialties include Döppekooche (a potato dish similar to hash browns), Rhenish Sauerbraten (marinated pot roast), and Debbekooche (potato cake). The region is also famous for its Riesling wines.",
      attractions: "The Deutsches Eck (German Corner) marks the confluence of the Rhine and Moselle rivers. Ehrenbreitstein Fortress offers panoramic views. The Electoral Palace and the Old Town are also worth visiting.",
      tips: "The cable car across the Rhine to Ehrenbreitstein Fortress provides spectacular views. Boat trips on both rivers are popular. Koblenz is a gateway to both the Rhine and Moselle wine regions."
    },
    rudesheim: {
      history: "Rüdesheim has a rich Roman and medieval history. It became part of the Rhine Gorge UNESCO World Heritage Site in 2002. The town has been a major wine-producing center for centuries.",
      food: "Rüdesheim Coffee (made with local brandy and whipped cream) is a specialty. The area is known for its wine, particularly Riesling. Try local dishes like Spundekäs (cream cheese spread) and Handkäse mit Musik (cheese with onions).",
      attractions: "The Drosselgasse is a famous narrow alley lined with shops and wine taverns. The Niederwald Monument offers panoramic views over the Rhine Valley. Siegfried's Mechanical Music Cabinet museum houses historical self-playing instruments.",
      tips: "The Rüdesheim Wine Festival in August is a major event. Take the cable car up to the Niederwald Monument for amazing views. The town can get very busy with tourists during summer."
    },
    basel: {
      history: "Basel is Switzerland's oldest university city, with the university founded in 1460. The city became an important center of humanism and printing in the Renaissance. It's located where the Swiss, French, and German borders meet.",
      food: "Basel cuisine blends Swiss, German, and French influences. Try Basler Läckerli (spiced biscuit), Basler Mehlsuppe (flour soup traditionally eaten during Carnival), and Swiss fondue or raclette.",
      attractions: "Basel's Old Town features a beautiful red sandstone town hall and cathedral. The city is known for its museums, including the Kunstmuseum (Fine Arts), Foundation Beyeler, and the unique Jean Tinguely Museum.",
      tips: "Basel has Switzerland's best-preserved old town center. The city operates on three currencies (Swiss Franc, Euro, and sometimes even US Dollar). The Basel Card gives free public transport and museum discounts to hotel guests."
    }
  };
  
  // Topics the guide can help with
  const helpTopics = [
    { id: 'history', label: 'Local History' },
    { id: 'food', label: 'Food & Cuisine' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'tips', label: 'Travel Tips' }
  ];
  
  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Simple keyword matching - in a real implementation, this would use NLP
      const lowerQuestion = question.toLowerCase();
      let bestResponse = "I'm not sure about that. You might want to ask about the local history, food, attractions, or travel tips for this destination.";
      
      // Check if there's a direct match with help topics
      for (const topic of helpTopics) {
        if (lowerQuestion.includes(topic.id) || 
            lowerQuestion.includes(topic.label.toLowerCase())) {
          bestResponse = guideResponses[destinationId][topic.id];
          break;
        }
      }
      
      // Check for other common keywords
      if (lowerQuestion.includes('eat') || lowerQuestion.includes('restaurant')) {
        bestResponse = guideResponses[destinationId].food;
      } else if (lowerQuestion.includes('visit') || lowerQuestion.includes('see') || 
                lowerQuestion.includes('sight')) {
        bestResponse = guideResponses[destinationId].attractions;
      } else if (lowerQuestion.includes('history') || lowerQuestion.includes('past') || 
                lowerQuestion.includes('founded')) {
        bestResponse = guideResponses[destinationId].history;
      } else if (lowerQuestion.includes('advice') || lowerQuestion.includes('tip') || 
                lowerQuestion.includes('recommend')) {
        bestResponse = guideResponses[destinationId].tips;
      }
      
      setResponse(bestResponse);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleHelpTopicClick = (topic: string) => {
    setResponse(guideResponses[destinationId][topic]);
  };
  
  return (
    <div className="mt-6">
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
        {showGuide ? 'Close AI Guide' : 'Ask AI Tour Guide'}
      </button>
      
      {showGuide && (
        <div className="mt-4 bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Virtual Tour Guide</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              What would you like to know about {destinationId.charAt(0).toUpperCase() + destinationId.slice(1)}?
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {helpTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => handleHelpTopicClick(topic.id)}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
                >
                  {topic.label}
                </button>
              ))}
            </div>
            
            <div className="flex">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
              />
              <button
                onClick={handleQuestionSubmit}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isLoading ? '...' : 'Ask'}
              </button>
            </div>
          </div>
          
          {response && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-200 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-blue-700" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-800">{response}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIGuide;