import React from 'react';
import { Users, Mail, Award, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Full Stack Developer & AI Specialist',
      expertise: 'React, Node.js, Machine Learning',
      avatar: 'AC',
    },
    {
      name: 'Priya Sharma',
      role: 'Oceanographer & Data Scientist',
      expertise: 'ARGO Data, Python, Ocean Modeling',
      avatar: 'PS',
    },
    {
      name: 'Rajesh Kumar',
      role: 'UI/UX Designer & Frontend Lead',
      expertise: 'Design Systems, TypeScript, Animation',
      avatar: 'RK',
    },
    {
      name: 'Sarah Johnson',
      role: 'Backend Engineer & DevOps',
      expertise: 'Cloud Architecture, APIs, Deployment',
      avatar: 'SJ',
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'SIH 2024 Participant',
      description: 'Selected for Smart India Hackathon 2024',
    },
    {
      icon: Users,
      title: 'Multidisciplinary Team',
      description: 'Combined expertise in tech and oceanography',
    },
    {
      icon: ExternalLink,
      title: 'Open Source',
      description: 'Contributing to ocean data accessibility',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A passionate group of developers, designers, and ocean scientists working together to make ocean data accessible.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center h-full">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                <p className="text-sky-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{member.expertise}</p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <button className="p-2 bg-white/20 hover:bg-white/40 rounded-xl transition-colors duration-200">
                    <Github className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/40 rounded-xl transition-colors duration-200">
                    <Linkedin className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/40 rounded-xl transition-colors duration-200">
                    <Mail className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Info */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Project Achievements</h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">{achievement.title}</h4>
                    <p className="text-slate-600 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Get In Touch</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Institution</h4>
                <p className="text-slate-600">Your College Name</p>
                <p className="text-slate-600">Department of Computer Science</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Contact</h4>
                <div className="flex items-center space-x-2 text-slate-600 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>floatchat@youruni.edu</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Github className="h-4 w-4" />
                  <span>github.com/yourteam/floatchat</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-2">SIH Problem Statement</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg">
                View Project Repository
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-slate-600 mb-4">
            Built with ❤️ for Smart India Hackathon 2024
          </p>
          <div className="flex justify-center space-x-6 text-sm text-slate-500">
            <span>Made with React & TypeScript</span>
            <span>•</span>
            <span>Powered by ARGO Data</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </div>
      </div>
    </section>
  );
}