
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('Online Classes - R500/month');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-500/20 text-yellow-500 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-yellow-500/30 uppercase tracking-widest">
            Back to School Special
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Secure Your 50% Discount</h2>
          <p className="text-gray-400 mt-2">Fill out the form to lock in your special rate before 1 March 2026.</p>
        </div>

        {submitted ? (
             <div className="bg-cyan-900/30 text-center text-cyan-200 border border-cyan-700 p-10 rounded-2xl animate-fade-in">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">You're on the list!</h3>
                <p className="text-lg mb-6">We've just sent an automated <strong>Onboarding Information Request</strong> to your email. Please check your inbox (and spam folder) to complete the next steps.</p>
                <div className="bg-cyan-800/20 p-4 rounded-lg border border-cyan-700/30">
                    <p className="text-sm">Once you complete the info request, our assistant will contact you to schedule your introductory call.</p>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl shadow-2xl space-y-6 border border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-300 mb-1 text-xs uppercase tracking-wider">Parent's Name</label>
                        <input type="text" id="parentName" placeholder="Full Name" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" />
                    </div>
                     <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-300 mb-1 text-xs uppercase tracking-wider">Student's Name</label>
                        <input type="text" id="studentName" placeholder="Student Full Name" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 text-xs uppercase tracking-wider">Email Address</label>
                        <input type="email" id="email" placeholder="example@email.com" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1 text-xs uppercase tracking-wider">Phone Number</label>
                        <input type="tel" id="phone" placeholder="012 345 6789" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-300 mb-1 text-xs uppercase tracking-wider">Student's Grade</label>
                        <select id="grade" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition">
                            <option>Grade 10</option>
                            <option>Grade 11</option>
                            <option>Grade 12</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="package" className="block text-sm font-medium text-gray-300 mb-1 text-xs uppercase tracking-wider">Choose a Package</label>
                        <select 
                            id="package" 
                            required 
                            value={selectedPackage}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                        >
                            <option>Online Classes - R500/month</option>
                            <option>Online + Workshop - R650/month</option>
                        </select>
                    </div>
                </div>

                {selectedPackage.includes('Workshop') && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-3 animate-fade-in">
                        <input type="checkbox" id="travelConfirm" required className="mt-1 w-4 h-4 text-cyan-500 rounded border-gray-300 focus:ring-cyan-500" />
                        <label htmlFor="travelConfirm" className="text-sm text-yellow-500 font-medium">
                            I confirm the learner is able to travel to the Rosebank/Sandton area (Johannesburg) for the monthly physical workshop.
                        </label>
                    </div>
                )}

                <div>
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 px-6 rounded-lg transition duration-300 shadow-xl shadow-cyan-500/20 transform hover:-translate-y-1">
                        Secure My Spot (50% OFF)
                    </button>
                    <p className="text-center text-gray-500 text-xs mt-4">
                        By submitting, you agree to our terms. Offer valid for signups before 1 March 2026.
                    </p>
                </div>
            </form>
        )}

      </div>
    </section>
  );
};

export default Contact;
