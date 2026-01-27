
import React, { useState } from 'react';
import { sendLeadEmail } from '../services/emailService';

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState('Online Classes - R500/month');
    const [submissionType, setSubmissionType] = useState<'enrollment' | 'consultation'>('enrollment');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const phone = (formData.get('phone') as string).replace(/\s+/g, ''); // Strip spaces for validation
        
        // Regex for exactly 10 digits
        const phoneRegex = /^\d{10}$/;
        
        if (!phoneRegex.test(phone)) {
            setError("Please enter a valid 10-digit phone number (e.g., 0123456789).");
            setIsSubmitting(false);
            return;
        }

        const data = {
            parentName: formData.get('parentName') as string,
            studentName: formData.get('studentName') as string,
            email: formData.get('email') as string,
            phone: phone, // Save the cleaned 10-digit version
            grade: formData.get('grade') as string,
            package: submissionType === 'consultation' ? 'Free Consultation Requested' : selectedPackage,
        };

        try {
            const result = await sendLeadEmail(data);
            if (result.success) {
                setSubmitted(true);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Something went wrong on our end. Please try again or email us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-500/20 text-yellow-500 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-yellow-500/30 uppercase tracking-widest">
            {submissionType === 'enrollment' ? 'Back to School Special' : 'Expert Guidance'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {submissionType === 'enrollment' ? 'Secure Your 50% Discount' : 'Book a Free Consultation'}
          </h2>
          <p className="text-gray-400 mt-2">
            {submissionType === 'enrollment' 
                ? 'Fill out the form to lock in your special rate before 31 January 2026.' 
                : 'Not sure if we are the right fit? Chat with our experts to find the perfect path for your child.'}
          </p>
        </div>

        {submitted ? (
             <div className="bg-cyan-900/30 text-center text-cyan-200 border border-cyan-700 p-10 rounded-2xl animate-fade-in shadow-2xl">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">
                    {submissionType === 'enrollment' ? "You're on the list!" : "Request Received!"}
                </h3>
                
                {submissionType === 'enrollment' ? (
                    <div className="animate-fade-in">
                        <p className="text-lg mb-6 leading-relaxed">We've just sent an automated <strong>Onboarding Information Request</strong> to your inbox from <span className="text-cyan-400 font-semibold underline decoration-cyan-500/30">admissions@onlineiscool.co.za</span>.</p>
                        <div className="bg-cyan-800/20 p-4 rounded-lg border border-cyan-700/30">
                            <p className="text-sm italic">Please check your inbox to complete the next steps. Once finished, we'll reach out to schedule your intro call.</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <p className="text-lg mb-6 leading-relaxed">Thank you for reaching out! One of our <strong>expert tutors or our course-coordinator</strong> will get in touch with you shortly to discuss your child's academic goals.</p>
                        <div className="bg-cyan-800/20 p-4 rounded-lg border border-cyan-700/30">
                            <p className="text-sm italic">We look forward to helping you unlock your child's full mathematical potential.</p>
                        </div>
                    </div>
                )}
                
                <button 
                    onClick={() => {setSubmitted(false); setSubmissionType('enrollment');}} 
                    className="mt-8 text-cyan-400 hover:text-white text-xs font-bold uppercase tracking-widest transition"
                >
                    ← Back to form
                </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl shadow-2xl space-y-6 border border-slate-700">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-red-400 text-sm flex items-center gap-3 animate-shake">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         {error}
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="parentName" className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Parent's Name</label>
                        <input type="text" name="parentName" id="parentName" placeholder="Full Name" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition placeholder:text-gray-600" />
                    </div>
                     <div>
                        <label htmlFor="studentName" className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Student's Name</label>
                        <input type="text" name="studentName" id="studentName" placeholder="Student Full Name" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition placeholder:text-gray-600" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Email Address</label>
                        <input type="email" name="email" id="email" placeholder="example@email.com" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition placeholder:text-gray-600" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Phone Number (10 Digits)</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            placeholder="0123456789" 
                            required 
                            maxLength={10}
                            minLength={10}
                            className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition placeholder:text-gray-600" 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="grade" className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Student's Grade</label>
                        <select name="grade" id="grade" required className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition">
                            <option>Grade 10</option>
                            <option>Grade 11</option>
                            <option>Grade 12</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="package" className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                            {submissionType === 'enrollment' ? 'Choose a Package' : 'Enquiry Type'}
                        </label>
                        {submissionType === 'enrollment' ? (
                            <select 
                                id="package" 
                                required 
                                value={selectedPackage}
                                onChange={(e) => setSelectedPackage(e.target.value)}
                                className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            >
                                <option>Online Classes - R500/month</option>
                            </select>
                        ) : (
                            <div className="w-full bg-slate-700/50 border border-slate-600 text-cyan-400 font-bold rounded-lg p-3 flex items-center">
                                Free Consultation Request
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full relative bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 px-6 rounded-lg transition duration-300 shadow-xl shadow-cyan-500/20 transform hover:-translate-y-1 active:scale-95 disabled:bg-slate-700 disabled:shadow-none disabled:cursor-not-allowed`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {submissionType === 'enrollment' ? 'Enrolling...' : 'Requesting...'}
                            </div>
                        ) : (submissionType === 'enrollment' ? "Secure My Spot (50% OFF)" : "Schedule My Consultation")}
                    </button>
                    <div className="flex flex-col items-center gap-2 mt-4">
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                            {submissionType === 'enrollment' ? 'Offer valid for 2026 intake until 31 January.' : 'Average response time: 2-4 hours.'}
                        </p>
                        {submissionType === 'enrollment' ? (
                            <button type="button" onClick={() => setSubmissionType('consultation')} className="text-cyan-400 text-[10px] font-bold uppercase hover:underline">
                                Prefer to book a consultation first?
                            </button>
                        ) : (
                            <button type="button" onClick={() => setSubmissionType('enrollment')} className="text-yellow-500 text-[10px] font-bold uppercase hover:underline">
                                Want to secure the 50% discount now?
                            </button>
                        )}
                    </div>
                </div>
            </form>
        )}

      </div>
    </section>
  );
};

export default Contact;
