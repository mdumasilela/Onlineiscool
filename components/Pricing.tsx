
import React from 'react';
import { PRICING_PACKAGES } from '../constants';
import { PricingPackage } from '../types';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const PricingCard: React.FC<{ pkg: PricingPackage }> = ({ pkg }) => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`bg-slate-800 rounded-lg p-8 shadow-lg flex flex-col ${pkg.highlight ? 'border-2 border-cyan-500 transform scale-105' : 'border-2 border-slate-700'}`}>
            {pkg.highlight && <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
            <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
            <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">R{pkg.price}</span>
                <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon />
                    <span className="text-gray-300">{feature}</span>
                </li>
                ))}
            </ul>
            <button 
                onClick={scrollToContact}
                className={`w-full mt-auto font-bold py-3 px-6 rounded-lg transition duration-300 ${pkg.highlight ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-cyan-400'}`}>
                Choose Plan
            </button>
        </div>
    );
};


const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 mt-2">Choose the plan that's right for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            {PRICING_PACKAGES.map(pkg => <PricingCard key={pkg.title} pkg={pkg} />)}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
