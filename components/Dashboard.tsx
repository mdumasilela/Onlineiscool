
import React, { useState, useEffect } from 'react';
import { SAMPLE_STUDENTS, SAMPLE_LEADS } from '../constants';
import { Lead } from '../types';

const Dashboard: React.FC = () => {
    const [liveLeads, setLiveLeads] = useState<Lead[]>([]);

    const syncLiveStats = () => {
        const stored = JSON.parse(localStorage.getItem('online_scool_leads') || '[]');
        setLiveLeads(stored);
    };

    useEffect(() => {
        syncLiveStats();
        window.addEventListener('leads_updated', syncLiveStats);
        return () => window.removeEventListener('leads_updated', syncLiveStats);
    }, []);

    // Combine for global stats
    const totalStudents = SAMPLE_STUDENTS.length;
    const allLeads = [...liveLeads, ...SAMPLE_LEADS.filter(s => !liveLeads.find(l => l.id === s.id))];
    const totalLeads = allLeads.length;
    
    const monthlyRevenue = SAMPLE_STUDENTS.reduce((acc, curr) => {
        const price = curr.package.includes('Workshop') ? 650 : 500;
        return acc + price;
    }, 0);
    
    const workshopCount = SAMPLE_STUDENTS.filter(s => s.package.includes('Workshop')).length;

    const stats = [
        { label: 'Active Students', value: totalStudents, color: 'text-cyan-400', icon: '👨‍🎓' },
        { label: 'Pipeline Leads', value: totalLeads, color: 'text-yellow-400', icon: '⚡' },
        { label: 'Monthly Revenue', value: `R${monthlyRevenue}`, color: 'text-green-400', icon: '💰' },
        { label: 'Workshop Seats', value: workshopCount, color: 'text-purple-400', icon: '🏢' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">Business Overview</h1>
                    <p className="text-gray-400">Welcome back! Here is your real-time performance data.</p>
                </div>
                {liveLeads.length > 0 && (
                    <div className="text-[10px] bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20 font-bold uppercase animate-pulse">
                        {liveLeads.length} New Live Submission(s)
                    </div>
                )}
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-2xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Feed</span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Grade Distribution */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6">Student Grade Distribution</h3>
                    <div className="space-y-6">
                        {[12, 11, 10].map(grade => {
                            const count = SAMPLE_STUDENTS.filter(s => s.grade.includes(grade.toString())).length;
                            const percentage = (count / (totalStudents || 1)) * 100;
                            return (
                                <div key={grade}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300 font-medium text-lg">Grade {grade}</span>
                                        <span className="text-cyan-400 font-bold">{count} Students</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                                        <div 
                                            className="bg-cyan-500 h-3 rounded-full transition-all duration-1000" 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Important Reminders */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Admin Quick Tips</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                                <p className="text-gray-400 text-sm">Target <span className="text-white font-medium">31 January</span> campaign. 50% discount expires then.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                                <p className="text-gray-400 text-sm">You have <span className="text-white font-medium">2 pending payments</span> to follow up on this week.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                                <p className="text-gray-400 text-sm">New leads automatically appear in the <span className="text-white font-medium">Pipeline</span> tab.</p>
                            </li>
                        </ul>
                    </div>
                    <button 
                        onClick={() => window.open('https://zoom.us', '_blank')}
                        className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl border border-slate-700 transition shadow-lg"
                    >
                        Access Zoom Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
