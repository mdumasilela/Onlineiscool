
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-slate-800 p-8 rounded-lg shadow-lg flex flex-col h-full transform transition duration-300 hover:-translate-y-2 hover:shadow-cyan-500/10">
        <svg className="w-12 h-12 text-cyan-500 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        <blockquote className="text-gray-300 italic flex-grow">"{testimonial.quote}"</blockquote>
        <footer className="mt-6">
            <p className="font-bold text-white">{testimonial.name}</p>
            <p className="text-cyan-400 text-sm">{testimonial.relation}</p>
        </footer>
    </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="text-gray-400 mt-2">Real stories from parents and students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
