
import React, { useState } from 'react';
import { SAMPLE_STUDENTS } from '../constants';
import { Student } from '../types';

const StudentManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students] = useState<Student[]>(SAMPLE_STUDENTS);

    const filteredStudents = students.filter(s => 
        s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const copyZoomLink = (link: string) => {
        navigator.clipboard.writeText(link);
        alert('Zoom link copied to clipboard!');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Active Roster</h1>
                    <p className="text-gray-400">View and manage enrolled students for 2026 Intake.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <input 
                        type="text" 
                        placeholder="Search student or parent..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </header>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-950 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Student Info</th>
                                <th className="px-6 py-4">Grade</th>
                                <th className="px-6 py-4">Package</th>
                                <th className="px-6 py-4">Payment Status</th>
                                <th className="px-6 py-4 text-right">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredStudents.map(student => (
                                <tr key={student.id} className="hover:bg-slate-800/30 transition">
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-bold text-white">{student.studentName}</div>
                                        <div className="text-xs text-gray-500">Parent: {student.parentName}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                                            {student.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs text-gray-300">{student.package}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider
                                            ${student.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                              student.paymentStatus === 'Overdue' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                              'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}
                                        >
                                            {student.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => copyZoomLink(student.zoomLink)}
                                                className="p-2 text-gray-400 hover:text-cyan-400 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                                                title="Copy Zoom Link"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            </button>
                                            <a 
                                                href={`mailto:${student.email}`}
                                                className="p-2 text-gray-400 hover:text-cyan-400 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                                                title="Email Student"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManager;
