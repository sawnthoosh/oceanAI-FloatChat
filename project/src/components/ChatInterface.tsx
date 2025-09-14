import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BarChart3, Download } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  hasVisualization?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant for ARGO ocean data. Ask me anything about ocean temperature, salinity, depth profiles, or any other oceanographic data you\'d like to explore.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    simulateTyping();

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: 'Based on the ARGO float data from the North Atlantic, I can show you temperature variations at different depths. The surface temperature ranges from 18-24°C, with a thermocline at approximately 200m depth.',
          hasVisualization: true,
        },
        {
          content: 'I\'ve analyzed the salinity data from the Pacific region. The average salinity is 34.7 PSU, with significant variations near coastal areas. Would you like me to generate a depth profile chart?',
          hasVisualization: true,
        },
        {
          content: 'The ARGO data shows interesting seasonal patterns in ocean temperature. The data indicates warming trends in the upper 100m during summer months, with stable temperatures below 500m depth.',
          hasVisualization: false,
        },
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: randomResponse.content,
        timestamp: new Date(),
        hasVisualization: randomResponse.hasVisualization,
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Chat with Ocean Data
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ask natural language questions about ARGO ocean data and get instant insights with visualizations.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 border-b border-white/20 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium text-slate-700">FloatChat AI Assistant</span>
              <Sparkles className="h-4 w-4 text-sky-500" />
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`p-2 rounded-xl shadow-lg flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-sky-500 to-blue-600'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-xs md:max-w-md ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                      : 'bg-white/40 border border-white/30 text-slate-700'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.hasVisualization && message.type === 'bot' && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600 flex items-center">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Visualization available
                          </span>
                          <button className="text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full transition-colors duration-200 flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>View Chart</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/40 backdrop-blur-sm border border-white/30 p-4 rounded-2xl shadow-lg">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"
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
          <div className="border-t border-white/20 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about ocean temperature, salinity, depth profiles..."
                  className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-slate-500"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed group"
              >
                <Send className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}