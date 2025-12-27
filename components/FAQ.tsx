
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { FAQItem } from '../types';

const FaqItemComponent: React.FC<{ item: FAQItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b-2 border-slate-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-6"
            >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                 <p className="text-gray-300 pb-6 pr-4">
                    {item.answer}
                </p>
            </div>
        </div>
    );
}

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 mt-2">Have questions? We have answers.</p>
        </div>
        <div className="space-y-4">
            {FAQS.map((faq, index) => (
                <FaqItemComponent key={index} item={faq} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
