import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  History, 
  User, 
  GraduationCap, 
  Microscope, 
  Fish, 
  Users,
  Settings,
  LogOut,
  Trash2,
  Edit3
} from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  userType: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentUserType: string;
  onUserTypeChange: (type: string) => void;
  onNewChat: () => void;
  chatHistory: ChatHistory[];
  onSelectChat: (chatId: string) => void;
  activeChatId: string;
}

export default function ChatSidebar({ 
  isOpen, 
  onToggle, 
  currentUserType, 
  onUserTypeChange, 
  onNewChat,
  chatHistory,
  onSelectChat,
  activeChatId
}: ChatSidebarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userTypes = [
    { 
      id: 'student', 
      label: 'Student', 
      icon: GraduationCap, 
      color: 'from-blue-500 to-indigo-600',
      description: 'Academic research and learning'
    },
    { 
      id: 'scientist', 
      label: 'Scientist', 
      icon: Microscope, 
      color: 'from-emerald-500 to-teal-600',
      description: 'Professional research and analysis'
    },
    { 
      id: 'fisherman', 
      label: 'Fisherman', 
      icon: Fish, 
      color: 'from-orange-500 to-red-600',
      description: 'Fishing conditions and marine life'
    },
    { 
      id: 'coastal', 
      label: 'Coastal Resident', 
      icon: Users, 
      color: 'from-cyan-500 to-blue-600',
      description: 'Weather and coastal conditions'
    },
  ];

  const currentUser = userTypes.find(u => u.id === currentUserType) || userTypes[0];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:relative lg:z-auto`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-800">FloatChat</h1>
                <p className="text-xs text-slate-600">Indian Ocean Data</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-medium transition-all duration-300 hover:shadow-lg group"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Chat</span>
          </button>
        </div>

        {/* User Type Selector */}
        <div className="p-4 border-b border-white/20">
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center space-x-3 p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-200"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${currentUser.color}`}>
                <currentUser.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-800">{currentUser.label}</p>
                <p className="text-xs text-slate-600">{currentUser.description}</p>
              </div>
            </button>

            {/* User Type Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl z-10">
                {userTypes.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      onUserTypeChange(user.id);
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 hover:bg-white/20 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                      currentUserType === user.id ? 'bg-white/30' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${user.color}`}>
                      <user.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-slate-800">{user.label}</p>
                      <p className="text-xs text-slate-600">{user.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center space-x-2 mb-4">
            <History className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Recent Chats</span>
          </div>

          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeChatId === chat.id 
                    ? 'bg-sky-500/20 border border-sky-500/30' 
                    : 'hover:bg-white/20'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare className="h-4 w-4 text-slate-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{chat.title}</p>
                  <p className="text-xs text-slate-600">{chat.timestamp.toLocaleDateString()}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex space-x-1 transition-opacity">
                  <button className="p-1 hover:bg-white/20 rounded">
                    <Edit3 className="h-3 w-3 text-slate-600" />
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded">
                    <Trash2 className="h-3 w-3 text-slate-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-white/20 rounded-xl transition-colors">
              <Settings className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Settings</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-white/20 rounded-xl transition-colors">
              <LogOut className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}