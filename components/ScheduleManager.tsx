
import React from 'react';
import { CLASS_SCHEDULE } from '../constants';

const ScheduleManager: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white">Class Schedule & Links</h1>
                <p className="text-gray-400">Digital classroom links and weekly topic rotation.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLASS_SCHEDULE.map(session => (
                    <div key={session.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-cyan-500/30 transition group">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                    session.day === 'Wednesday' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    session.day === 'Sunday' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                }`}>
                                    {session.day}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">{session.time}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition">{session.grade}</h3>
                            <p className="text-sm text-gray-400 mb-4">{session.topic}</p>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-5 w-5 bg-slate-800 rounded-full flex items-center justify-center">
                                    <svg className="h-3 w-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Tutor: {session.tutor}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-grow bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-lg text-xs transition border border-slate-700">
                                Edit Topic
                            </button>
                            <button className="flex-grow bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded-lg text-xs transition shadow-lg shadow-cyan-900/20">
                                Join Session
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Internal Resource Repository</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['2026 DBE Past Papers', '2026 IEB Guidelines', 'Workshop Workbook PDF', 'Formula Sheet Bundle'].map(doc => (
                        <div key={doc} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer flex items-center gap-3">
                            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            <span className="text-xs font-medium text-gray-300">{doc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduleManager;
