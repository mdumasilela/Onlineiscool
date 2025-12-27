
import React from 'react';
import { FEATURES } from '../constants';
import { FeatureInfo } from '../types';

const FeatureCard: React.FC<{ feature: FeatureInfo }> = ({ feature }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-700 mb-4">
      {feature.icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
    <p className="text-gray-400">{feature.description}</p>
  </div>
);


const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose ONLINE S'COOL?</h2>
          <p className="text-gray-400 mt-2">The advantage that sets our students up for success.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
