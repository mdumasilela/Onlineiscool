
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
        <div className={`bg-slate-800 rounded-lg p-8 shadow-lg flex flex-col relative max-w-md mx-auto w-full ${pkg.highlight ? 'border-2 border-cyan-500' : 'border-2 border-slate-700'}`}>
            {pkg.highlight && <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">Best Value</span>}
            <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
            <div className="mb-6 flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">R{pkg.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-cyan-400 text-sm font-bold mt-1">25% OFF Back to School Price</p>
                <p className="text-gray-500 text-xs line-through">Usually R{pkg.price * 4/3}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon />
                    <span className="text-gray-300 text-sm">{feature}</span>
                </li>
                ))}
            </ul>
            <button 
                onClick={scrollToContact}
                className={`w-full mt-auto font-bold py-3 px-6 rounded-lg transition duration-300 ${pkg.highlight ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-cyan-400'}`}>
                Get Special Offer
            </button>
        </div>
    );
};


const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-cyan-500/20 border border-cyan-500/50 rounded-full px-4 py-1 mb-4">
            <span className="text-cyan-400 text-sm font-bold tracking-wider uppercase">Back to School Offer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">25% Off Monthly Plan</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Secure your spot before <span className="text-white font-bold text-xl block sm:inline">31 August 2026</span> to lock in this exclusive discount. 
            <span className="block mt-2 text-cyan-400 font-bold uppercase tracking-widest text-xs">Classes ongoing.</span>
          </p>
        </div>
        <div className="flex justify-center max-w-5xl mx-auto items-stretch">
            {PRICING_PACKAGES.map(pkg => <PricingCard key={pkg.title} pkg={pkg} />)}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
