
import React from 'react';
import { TUTORS } from '../constants';
import { Tutor } from '../types';

const TutorCard: React.FC<{ tutor: Tutor }> = ({ tutor }) => (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden text-center p-6 transform transition duration-300 hover:scale-105 hover:shadow-cyan-500/20">
        <img 
            src={tutor.imageUrl} 
            alt={`Mathematics Tutor ${tutor.name} - ${tutor.title}`} 
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-700 object-cover"
            loading="lazy"
        />
        <h3 className="text-xl font-bold text-white">{tutor.name}</h3>
        <p className="text-cyan-400 font-semibold mb-3">{tutor.title}</p>
        <div className="text-gray-400 text-sm">
            {tutor.credentials.map((cred, i) => <p key={i}>{cred}</p>)}
        </div>
        <p className="text-gray-300 text-sm mt-4 italic">"{tutor.bio}"</p>
    </div>
);

const Tutors: React.FC = () => {
  return (
    <section id="tutors" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Expert Mathematics Tutors</h2>
          <p className="text-gray-400 mt-2">Passionate educators from top South African universities dedicated to your success.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TUTORS.map((tutor) => (
            <TutorCard key={tutor.name} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutors;
