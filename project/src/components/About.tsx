import React from 'react';
import { Globe, Database, Waves, Thermometer, Droplets, Navigation } from 'lucide-react';

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
            About ARGO Ocean Data
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Understanding the comprehensive oceanographic dataset that powers our AI assistant.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-8 w-8 text-sky-600" />
                <h3 className="text-2xl font-bold text-slate-800">What is ARGO?</h3>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                ARGO is a global array of autonomous profiling floats that measure temperature, 
                salinity, and pressure in the Earth's oceans. This international program provides 
                critical data for climate research and ocean monitoring.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  <span className="text-slate-600">3,800+ active floats worldwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">Real-time data from all ocean basins</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-600">15+ years of continuous monitoring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Thermometer,
                title: 'Temperature Profiles',
                description: 'Vertical temperature measurements from surface to 2000m depth, revealing ocean thermal structure and climate patterns.',
              },
              {
                icon: Droplets,
                title: 'Salinity Data',
                description: 'Salt content measurements essential for understanding ocean circulation and water mass properties.',
              },
              {
                icon: Navigation,
                title: 'Pressure & Depth',
                description: 'Precise depth measurements enabling accurate 3D ocean property mapping and analysis.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Database className="h-12 w-12 text-sky-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Data Sources & Partners</h3>
            <p className="text-slate-600">FloatChat integrates with leading oceanographic institutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'ARGO Program',
                description: 'Global ocean observing system',
                url: 'https://argo.ucsd.edu/',
              },
              {
                name: 'INCOIS',
                description: 'Indian National Centre for Ocean Information Services',
                url: 'https://www.incois.gov.in/',
              },
              {
                name: 'NASA GODAE',
                description: 'Global Ocean Data Assimilation Experiment',
                url: 'https://www.godae.org/',
              },
            ].map((source, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-sky-100/50 to-blue-100/50 border border-white/30 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Waves className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">{source.name}</h4>
                  <p className="text-slate-600 text-sm mb-4">{source.description}</p>
                  <a
                    href={source.url}
                    className="text-sky-600 hover:text-sky-700 text-sm font-medium inline-flex items-center space-x-1 group-hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Learn more</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}