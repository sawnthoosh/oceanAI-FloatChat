import React from 'react';
import { MessageSquare, Database, TrendingUp, Waves } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
}

export default function Hero({ onStartChat }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0">
          {/* Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-sky-400/10 to-blue-400/10 animate-pulse"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main Content */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
            <Waves className="h-4 w-4 text-sky-600" />
            <span className="text-sm font-medium text-sky-700">SIH 2024 Project</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              FloatChat
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 mb-4 font-light">
            AI-Powered Conversational Interface for
          </p>
          <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-8">
            ARGO Ocean Data Discovery & Visualization
          </p>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover, analyze, and visualize ocean data using natural conversation. 
            Transform complex ARGO datasets into meaningful insights with the power of AI.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={onStartChat}
            className="group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/40 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-pulse"
          >
            <MessageSquare className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Open Full Chat Interface</span>
          </button>
          
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-slate-700 hover:text-sky-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <TrendingUp className="h-5 w-5" />
            <span>View Demo</span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: MessageSquare,
              title: 'Natural Conversations',
              description: 'Ask questions in plain English about ocean data and get instant insights.',
            },
            {
              icon: Database,
              title: 'ARGO Data Access',
              description: 'Direct integration with comprehensive ARGO float datasets worldwide.',
            },
            {
              icon: TrendingUp,
              title: 'Smart Visualizations',
              description: 'Generate beautiful charts and graphs from complex oceanographic data.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:shadow-xl transition-all duration-300 group"
            >
              <feature.icon className="h-8 w-8 text-sky-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}