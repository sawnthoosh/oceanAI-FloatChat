import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Waves, 
  MapPin, 
  Activity,
  BarChart3,
  LineChart,
  Download,
  Maximize2
} from 'lucide-react';

interface VisualizationData {
  temperature: number[];
  salinity: number[];
  depth: number[];
  locations: { lat: number; lng: number; temp: number }[];
  timestamps: string[];
}

interface LiveVisualizationProps {
  userType: string;
  isVisible: boolean;
}

export default function LiveVisualization({ userType, isVisible }: LiveVisualizationProps) {
  const [activeChart, setActiveChart] = useState('temperature');
  const [data, setData] = useState<VisualizationData>({
    temperature: [],
    salinity: [],
    depth: [],
    locations: [],
    timestamps: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const generateData = () => {
      const newData: VisualizationData = {
        temperature: Array.from({ length: 24 }, (_, i) => 26 + Math.sin(i * 0.5) * 3 + Math.random() * 2),
        salinity: Array.from({ length: 24 }, (_, i) => 34.5 + Math.sin(i * 0.3) * 0.5 + Math.random() * 0.3),
        depth: Array.from({ length: 10 }, (_, i) => (i + 1) * 200),
        locations: Array.from({ length: 15 }, (_, i) => ({
          lat: 5 + Math.random() * 15, // Indian Ocean latitude range
          lng: 65 + Math.random() * 25, // Indian Ocean longitude range
          temp: 25 + Math.random() * 5
        })),
        timestamps: Array.from({ length: 24 }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() - (23 - i));
          return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        })
      };
      setData(newData);
      setIsLoading(false);
    };

    generateData();
    const interval = setInterval(generateData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getChartsForUserType = () => {
    switch (userType) {
      case 'student':
        return [
          { id: 'temperature', label: 'Temperature Profile', icon: Thermometer, color: 'from-red-500 to-orange-600' },
          { id: 'salinity', label: 'Salinity Levels', icon: Droplets, color: 'from-blue-500 to-cyan-600' },
          { id: 'depth', label: 'Depth Analysis', icon: Activity, color: 'from-purple-500 to-indigo-600' },
          { id: 'map', label: 'Geographic Distribution', icon: MapPin, color: 'from-green-500 to-emerald-600' }
        ];
      case 'scientist':
        return [
          { id: 'temperature', label: 'Thermal Structure', icon: Thermometer, color: 'from-red-500 to-orange-600' },
          { id: 'salinity', label: 'Halocline Analysis', icon: Droplets, color: 'from-blue-500 to-cyan-600' },
          { id: 'density', label: 'Water Density', icon: BarChart3, color: 'from-indigo-500 to-purple-600' },
          { id: 'currents', label: 'Ocean Currents', icon: Waves, color: 'from-teal-500 to-cyan-600' }
        ];
      case 'fisherman':
        return [
          { id: 'temperature', label: 'Water Temperature', icon: Thermometer, color: 'from-red-500 to-orange-600' },
          { id: 'fishing', label: 'Fishing Zones', icon: MapPin, color: 'from-green-500 to-emerald-600' },
          { id: 'weather', label: 'Weather Conditions', icon: Waves, color: 'from-blue-500 to-cyan-600' },
          { id: 'tides', label: 'Tidal Information', icon: Activity, color: 'from-purple-500 to-indigo-600' }
        ];
      case 'coastal':
        return [
          { id: 'temperature', label: 'Coastal Temperature', icon: Thermometer, color: 'from-red-500 to-orange-600' },
          { id: 'waves', label: 'Wave Height', icon: Waves, color: 'from-blue-500 to-cyan-600' },
          { id: 'weather', label: 'Weather Forecast', icon: Activity, color: 'from-green-500 to-emerald-600' },
          { id: 'alerts', label: 'Safety Alerts', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
        ];
      default:
        return [
          { id: 'temperature', label: 'Temperature', icon: Thermometer, color: 'from-red-500 to-orange-600' },
          { id: 'salinity', label: 'Salinity', icon: Droplets, color: 'from-blue-500 to-cyan-600' }
        ];
    }
  };

  const charts = getChartsForUserType();
  const activeChartData = charts.find(c => c.id === activeChart) || charts[0];

  if (!isVisible) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Live Indian Ocean Data</h3>
              <p className="text-sm text-slate-600">Real-time ARGO float measurements</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Download className="h-4 w-4 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Maximize2 className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Chart Selector */}
        <div className="flex flex-wrap gap-2">
          {charts.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeChart === chart.id
                  ? `bg-gradient-to-r ${chart.color} text-white shadow-lg`
                  : 'bg-white/20 text-slate-700 hover:bg-white/30'
              }`}
            >
              <chart.icon className="h-4 w-4" />
              <span className="text-sm">{chart.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-6">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading real-time data...</p>
            </div>
          </div>
        ) : (
          <div className="relative h-64 bg-gradient-to-br from-sky-50/50 to-blue-50/50 rounded-2xl border border-white/30 overflow-hidden">
            {/* Simulated Chart Background */}
            <div className="absolute inset-0 p-4">
              <div className="w-full h-full relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute w-full border-t border-slate-300" style={{ top: `${i * 25}%` }} />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute h-full border-l border-slate-300" style={{ left: `${i * 20}%` }} />
                  ))}
                </div>

                {/* Data Visualization */}
                <svg className="w-full h-full">
                  {/* Temperature Line Chart */}
                  {activeChart === 'temperature' && (
                    <polyline
                      fill="none"
                      stroke="url(#tempGradient)"
                      strokeWidth="3"
                      points={data.temperature.map((temp, i) => 
                        `${(i / (data.temperature.length - 1)) * 100}%,${100 - ((temp - 24) / 6) * 100}%`
                      ).join(' ')}
                      className="drop-shadow-lg"
                    />
                  )}

                  {/* Salinity Bar Chart */}
                  {activeChart === 'salinity' && data.salinity.map((sal, i) => (
                    <rect
                      key={i}
                      x={`${(i / data.salinity.length) * 100}%`}
                      y={`${100 - ((sal - 34) / 1) * 100}%`}
                      width={`${80 / data.salinity.length}%`}
                      height={`${((sal - 34) / 1) * 100}%`}
                      fill="url(#salGradient)"
                      className="opacity-80"
                    />
                  ))}

                  {/* Location Points for Map */}
                  {activeChart === 'map' && data.locations.map((loc, i) => (
                    <circle
                      key={i}
                      cx={`${((loc.lng - 65) / 25) * 100}%`}
                      cy={`${100 - ((loc.lat - 5) / 15) * 100}%`}
                      r="4"
                      fill={`hsl(${240 - (loc.temp - 25) * 20}, 70%, 60%)`}
                      className="animate-pulse"
                    />
                  ))}

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="salGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Data Points Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-sky-500 rounded-full animate-pulse opacity-60"
                      style={{
                        left: `${10 + (i * 12)}%`,
                        top: `${20 + Math.sin(i * 0.8) * 30}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Info Overlay */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Current Value</p>
                <p className="font-bold text-slate-800">
                  {activeChart === 'temperature' && '27.3°C'}
                  {activeChart === 'salinity' && '34.7 PSU'}
                  {activeChart === 'depth' && '1,200m'}
                  {activeChart === 'map' && '15 Floats'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Active Floats', value: '47', unit: 'units' },
            { label: 'Data Points', value: '12.4K', unit: 'today' },
            { label: 'Coverage', value: '89%', unit: 'Indian Ocean' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}