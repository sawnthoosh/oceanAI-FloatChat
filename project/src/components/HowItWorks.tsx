import React from 'react';
import { MessageSquare, Brain, BarChart3, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Ask Natural Questions',
      description: 'Type your question in plain English about ocean temperature, salinity, depth profiles, or any oceanographic data.',
      example: '"Show me temperature trends in the North Atlantic"',
    },
    {
      icon: Brain,
      title: 'AI Processing & Data Retrieval',
      description: 'Our AI understands your query and fetches relevant ARGO float data from global ocean databases in real-time.',
      example: 'AI connects to ARGO, INCOIS, and NASA datasets',
    },
    {
      icon: BarChart3,
      title: 'Smart Visualizations',
      description: 'Get instant charts, graphs, and insights generated from the oceanographic data, tailored to your specific question.',
      example: 'Interactive temperature depth profiles and maps',
    },
    {
      icon: Download,
      title: 'Export & Analysis',
      description: 'Download visualizations, export data, or ask follow-up questions to dive deeper into the ocean insights.',
      example: 'PDF charts, CSV data, detailed analysis reports',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
            How FloatChat Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Transform complex ocean data into actionable insights through simple conversation.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0">
            <div className="flex justify-between items-center max-w-4xl mx-auto px-12">
              {[0, 1, 2].map((i) => (
                <ArrowRight key={i} className="h-8 w-8 text-sky-300" />
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-20">
                  {index + 1}
                </div>

                <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{step.description}</p>
                  
                  {/* Example */}
                  <div className="bg-sky-50/50 border border-sky-200/50 rounded-xl p-3 text-center">
                    <p className="text-sm text-sky-700 italic">"{step.example}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-12">
            Key Features & Capabilities
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Data Access',
                description: 'Connect to live ARGO float networks for the most current ocean measurements',
                gradient: 'from-emerald-500 to-teal-600',
              },
              {
                title: 'Multi-parameter Analysis',
                description: 'Analyze temperature, salinity, pressure, and derived oceanographic properties',
                gradient: 'from-blue-500 to-indigo-600',
              },
              {
                title: 'Global Coverage',
                description: 'Access data from all major ocean basins and regional seas worldwide',
                gradient: 'from-purple-500 to-pink-600',
              },
              {
                title: 'Interactive Visualizations',
                description: 'Generate dynamic charts, maps, and 3D profiles from your conversations',
                gradient: 'from-orange-500 to-red-600',
              },
              {
                title: 'Export Capabilities',
                description: 'Download charts as PDF, export raw data as CSV, or share insights easily',
                gradient: 'from-cyan-500 to-blue-600',
              },
              {
                title: 'Scientific Accuracy',
                description: 'Built with oceanographic expertise and validated against peer-reviewed research',
                gradient: 'from-green-500 to-emerald-600',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}