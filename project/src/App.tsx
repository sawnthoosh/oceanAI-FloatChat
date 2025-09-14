import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FullChatInterface from './components/FullChatInterface';
import Dashboard from './components/Dashboard';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Team from './components/Team';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Smooth scroll behavior for section changes
  useEffect(() => {
    if (activeSection !== 'home') {
      const element = document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleStartChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Full Chat Interface Overlay */}
      {isChatOpen && (
        <FullChatInterface onClose={() => setIsChatOpen(false)} />
      )}
      
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main>
        {/* Hero Section */}
        <div id="home">
          <Hero onStartChat={handleStartChat} />
        </div>

        {/* Dashboard */}
        <div id="dashboard">
          <Dashboard />
        </div>

        {/* About */}
        <div id="about">
          <About />
        </div>

        {/* How It Works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Team */}
        <div id="team">
          <Team />
        </div>
      </main>
    </div>
  );
}

export default App;