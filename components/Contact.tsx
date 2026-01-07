
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle form submission here (e.g., API call)
        setSubmitted(true);
    };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Enroll Today</h2>
          <p className="text-gray-400 mt-2">Take the first step towards mathematical excellence. Fill out the form below to get started.</p>
        </div>

        {submitted ? (
             <div className="bg-green-900/50 text-center text-green-200 border border-green-700 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p>Your enrollment request has been received. We will be in touch shortly with the next steps.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-300 mb-1">Parent's Name</label>
                        <input type="text" id="parentName" required className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                     <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-300 mb-1">Student's Name</label>
                        <input type="text" id="studentName" required className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input type="tel" id="phone" required className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="package" className="block text-sm font-medium text-gray-300 mb-1">Choose a Package</label>
                    <select id="package" required className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500">
                        <option>Online Classes - R1000/month</option>
                        <option>Online + Workshop - R1300/month</option>
                    </select>
                </div>
                <div>
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-3 px-6 rounded-lg transition duration-300">Submit Enrollment</button>
                </div>
            </form>
        )}

      </div>
    </section>
  );
};

export default Contact;
