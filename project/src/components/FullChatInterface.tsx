import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BarChart3, Download, Menu, X, Maximize2, Minimize2 } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import LiveVisualization from './LiveVisualization';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  hasVisualization?: boolean;
  userType?: string;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  userType: string;
}

interface FullChatInterfaceProps {
  onClose: () => void;
}

export default function FullChatInterface({ onClose }: FullChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUserType, setCurrentUserType] = useState('student');
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [isVisualizationExpanded, setIsVisualizationExpanded] = useState(false);
  const [chatHistory] = useState<ChatHistory[]>([
    { id: 'chat-1', title: 'Indian Ocean Temperature Analysis', timestamp: new Date(Date.now() - 86400000), userType: 'student' },
    { id: 'chat-2', title: 'Salinity Patterns Research', timestamp: new Date(Date.now() - 172800000), userType: 'scientist' },
    { id: 'chat-3', title: 'Fishing Conditions Today', timestamp: new Date(Date.now() - 259200000), userType: 'fisherman' },
    { id: 'chat-4', title: 'Coastal Weather Update', timestamp: new Date(Date.now() - 345600000), userType: 'coastal' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat based on user type
  useEffect(() => {
    const getInitialMessage = (userType: string) => {
      const messages = {
        student: "Hello! I'm your AI assistant for studying Indian Ocean data. I can help you understand temperature profiles, salinity patterns, and oceanographic concepts. What would you like to learn about?",
        scientist: "Welcome! I'm here to assist with your Indian Ocean research. I can provide detailed analysis of ARGO float data, statistical insights, and help generate research-quality visualizations. How can I support your work?",
        fisherman: "Namaste! I can help you with fishing conditions in the Indian Ocean - water temperature, weather patterns, and the best fishing zones. What information do you need for your fishing trip?",
        coastal: "Hello! I'm here to help with coastal conditions around the Indian Ocean. I can provide weather updates, wave heights, and safety information for coastal activities. What would you like to know?"
      };
      return messages[userType as keyof typeof messages] || messages.student;
    };

    setMessages([{
      id: '1',
      type: 'bot',
      content: getInitialMessage(currentUserType),
      timestamp: new Date(),
      userType: currentUserType
    }]);
  }, [currentUserType]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const getResponseForUserType = (userType: string, query: string) => {
    const responses = {
      student: [
        "Based on the latest ARGO data from the Indian Ocean, I can show you how temperature varies with depth. The thermocline is typically found between 100-200m depth, where temperature drops rapidly from surface values of 28°C to about 15°C.",
        "The Indian Ocean shows interesting salinity patterns. Surface salinity ranges from 34.5-35.5 PSU, with the Arabian Sea showing higher values due to evaporation. Would you like to see a depth profile?",
        "Ocean currents in the Indian Ocean are dominated by monsoon patterns. During summer, the Southwest Monsoon Current flows eastward, while winter brings the Northeast Monsoon Current. This affects temperature distribution significantly."
      ],
      scientist: [
        "Analysis of ARGO float data shows a significant warming trend in the upper 200m of the Indian Ocean over the past decade. The rate of warming is approximately 0.15°C per decade, with highest rates observed in the western tropical region.",
        "Salinity analysis reveals the presence of distinct water masses: Arabian Sea High Salinity Water (>35.5 PSU) and Bay of Bengal Low Salinity Water (<34 PSU). The mixing zone shows complex stratification patterns.",
        "Recent data indicates strengthening of the Indian Ocean Dipole, with temperature anomalies reaching ±2°C from the long-term mean. This has significant implications for regional climate patterns."
      ],
      fisherman: [
        "Current water temperature in your fishing area is 27.5°C - perfect for tuna fishing! The thermocline is at 150m depth, which is where you'll find the best fish concentrations. Weather looks good for the next 3 days.",
        "Based on satellite data, there's a productive fishing zone 15 nautical miles southeast of your location. Water temperature is 26°C with good oxygen levels. Avoid the area to the north - rough seas expected.",
        "The monsoon currents are bringing nutrient-rich water to the surface near the coast. This means good fishing conditions for the next week. Best fishing times are early morning and evening when water temperature is optimal."
      ],
      coastal: [
        "Current coastal conditions: Water temperature 28°C, wave height 1.2m, wind speed 15 km/h from southwest. Good conditions for beach activities. No weather warnings in effect.",
        "Tomorrow's forecast shows increasing wave heights to 2.5m due to distant storm activity. Swimming conditions will be moderate. High tide at 14:30, low tide at 20:45.",
        "Coastal water quality is good with no pollution alerts. Water temperature has been stable at 27-29°C this week. Perfect for water sports and swimming. UV index is high - use sun protection."
      ]
    };

    const userResponses = responses[userType as keyof typeof responses] || responses.student;
    return userResponses[Math.floor(Math.random() * userResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      userType: currentUserType
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    simulateTyping();

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getResponseForUserType(currentUserType, input),
        timestamp: new Date(),
        hasVisualization: Math.random() > 0.3, // 70% chance of having visualization
        userType: currentUserType
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      type: 'bot',
      content: `Starting a new chat session. How can I help you with Indian Ocean data today?`,
      timestamp: new Date(),
      userType: currentUserType
    }]);
    setActiveChatId(`chat-${Date.now()}`);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-50 to-blue-50 z-50 flex">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentUserType={currentUserType}
        onUserTypeChange={setCurrentUserType}
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        onSelectChat={setActiveChatId}
        activeChatId={activeChatId}
      />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : ''}`}>
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-slate-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h1 className="font-bold text-slate-800">Indian Ocean Data Chat</h1>
                  <p className="text-sm text-slate-600">Real-time ARGO float data • {currentUserType.charAt(0).toUpperCase() + currentUserType.slice(1)} mode</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsVisualizationExpanded(!isVisualizationExpanded)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isVisualizationExpanded ? <Minimize2 className="h-5 w-5 text-slate-600" /> : <Maximize2 className="h-5 w-5 text-slate-600" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Messages */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${isVisualizationExpanded ? 'lg:w-1/2' : ''}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-4 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className={`p-3 rounded-2xl shadow-lg flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-sky-500 to-blue-600'
                      : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-2xl ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                        : 'bg-white/40 border border-white/30 text-slate-700'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                      
                      {message.hasVisualization && message.type === 'bot' && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 flex items-center">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Live visualization available
                            </span>
                            <button className="text-sm bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2">
                              <Download className="h-4 w-4" />
                              <span>View Chart</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm border border-white/30 p-6 rounded-3xl shadow-xl">
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-slate-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/20 p-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask about Indian Ocean data (${currentUserType} mode)...`}
                    className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-3xl px-6 py-4 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-slate-500 text-slate-700"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white p-4 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed group"
                >
                  <Send className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Visualization Panel */}
          <div className={`transition-all duration-300 border-l border-white/20 ${
            isVisualizationExpanded ? 'w-1/2 p-6' : 'w-96 p-4'
          }`}>
            <LiveVisualization 
              userType={currentUserType} 
              isVisible={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}