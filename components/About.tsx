
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-slate-800/50">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission & Vision</h2>
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Our Mission</h3>
                <p className="text-gray-300 text-lg">
                To strengthen students' foundational understanding of mathematics, empowering them to confidently solve any mathematical problem they encounter. We are committed to providing top-tier support tailored specifically for both <span className="text-white font-semibold">DBE</span> and <span className="text-white font-semibold">IEB</span> learners across South Africa.
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Our Vision</h3>
                <p className="text-gray-300 text-lg">
                To become the leading mathematics and science education centre in South Africa, recognised for excellence in teaching and student outcomes across all high school curricula.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
