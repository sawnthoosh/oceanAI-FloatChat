import React, { useState } from 'react';
import { TrendingUp, Download, Map, BarChart3, LineChart, PieChart } from 'lucide-react';

export default function Dashboard() {
  const [activeChart, setActiveChart] = useState('temperature');

  const chartTypes = [
    { id: 'temperature', label: 'Temperature Profile', icon: TrendingUp },
    { id: 'salinity', label: 'Salinity Distribution', icon: BarChart3 },
    { id: 'depth', label: 'Depth Analysis', icon: LineChart },
    { id: 'location', label: 'Geographic Data', icon: Map },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Data Visualization Dashboard
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Interactive charts and visualizations generated from ARGO ocean data conversations.
          </p>
        </div>

        {/* Chart Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {chartTypes.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeChart === chart.id
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-white/20 backdrop-blur-sm border border-white/30 text-slate-700 hover:bg-white/40'
              }`}
            >
              <chart.icon className="h-4 w-4" />
              <span>{chart.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  {chartTypes.find(c => c.id === activeChart)?.label}
                </h3>
                <button className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl transition-colors duration-200">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>

              {/* Simulated Chart Area */}
              <div className="relative h-80 bg-gradient-to-br from-sky-100/50 to-blue-100/50 rounded-2xl border border-white/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">Interactive Chart</h4>
                  <p className="text-slate-600 text-sm max-w-md">
                    Real-time visualization of {chartTypes.find(c => c.id === activeChart)?.label.toLowerCase()} data from ARGO floats
                  </p>
                </div>

                {/* Simulated Data Points */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-sky-500 rounded-full animate-pulse opacity-60"
                      style={{
                        left: `${10 + (i * 7)}%`,
                        bottom: `${20 + Math.sin(i * 0.5) * 30}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Stats Cards */}
            {[
              { label: 'Active Floats', value: '3,847', change: '+12%' },
              { label: 'Data Points', value: '2.4M', change: '+8%' },
              { label: 'Coverage Area', value: '85%', change: '+3%' },
              { label: 'Last Updated', value: '2m ago', change: 'Live' },
            ].map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">{stat.label}</span>
                  <span className="text-xs text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
              <h4 className="font-semibold text-slate-800 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                {[
                  { label: 'Generate Report', icon: TrendingUp },
                  { label: 'Export Data', icon: Download },
                  { label: 'View Map', icon: Map },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 p-3 bg-white/20 hover:bg-white/40 rounded-xl transition-all duration-200 group"
                  >
                    <action.icon className="h-4 w-4 text-sky-600 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm text-slate-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}