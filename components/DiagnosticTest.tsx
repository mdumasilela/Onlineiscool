
import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../constants';
import { TopicResult, MathTopic } from '../types';

const DiagnosticTest: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Questions, 2: Results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const startTest = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentStep(1);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep(2);
    }
  };

  const calculateResults = (): TopicResult[] => {
    const topicData: Record<MathTopic, { score: number; total: number }> = {
      Algebra: { score: 0, total: 0 },
      Functions: { score: 0, total: 0 },
      Trigonometry: { score: 0, total: 0 },
      Geometry: { score: 0, total: 0 },
      Probability: { score: 0, total: 0 },
    };

    DIAGNOSTIC_QUESTIONS.forEach((q, index) => {
      topicData[q.topic].total += 1;
      if (answers[index] === q.correctAnswer) {
        topicData[q.topic].score += 1;
      }
    });

    return Object.entries(topicData).map(([topic, data]) => ({
      topic: topic as MathTopic,
      score: data.score,
      total: data.total,
    }));
  };

  const getRecommendation = (results: TopicResult[]) => {
    const weakTopics = results.filter(r => (r.score / r.total) < 0.6);
    if (weakTopics.length === 0) return "Excellent work! You have a solid foundation. Consider our Advanced Workshop to maintain your edge.";
    if (weakTopics.length > 2) return "You have some gaps in key foundational areas. We highly recommend our Online Classes to strengthen these concepts.";
    return `You're doing well, but ${weakTopics.map(t => t.topic).join(' and ')} could use some focus. Our tutors specialize in these topics!`;
  };

  const results = currentStep === 2 ? calculateResults() : [];
  const progress = ((currentQuestionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100;

  return (
    <section id="diagnostic-test" className="py-20 md:py-28 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Diagnostic Test</h2>
          <p className="text-gray-400 mt-2">Identify your strengths and weaknesses in under 10 minutes.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 min-h-[400px] flex flex-col justify-center border border-slate-700">
          {currentStep === 0 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Ready to test your skills?</h3>
              <p className="text-gray-300">This test covers Algebra, Functions, Trigonometry, Geometry, and Probability based on both <span className="text-cyan-400 font-bold">DBE & IEB</span> Grade 10-12 syllabuses.</p>
              <button 
                onClick={startTest}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-full transition duration-300 transform hover:scale-105"
              >
                Start Diagnostic Test
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-cyan-400">Question {currentQuestionIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}</span>
                <span className="text-xs text-gray-400">{DIAGNOSTIC_QUESTIONS[currentQuestionIndex].topic}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="text-left p-4 rounded-xl border-2 border-slate-700 bg-slate-700/50 hover:bg-slate-700 hover:border-cyan-500 text-gray-200 transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">Your Results</h3>
                <p className="text-gray-400">Here's how you performed across the syllabus:</p>
              </div>

              <div className="space-y-4">
                {results.map((res) => (
                  <div key={res.topic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white font-medium">{res.topic}</span>
                      <span className="text-gray-400">{res.score}/{res.total}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-1000 ${res.score/res.total > 0.7 ? 'bg-green-500' : res.score/res.total > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${(res.score / res.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h4 className="text-cyan-400 font-bold mb-2">Our Recommendation:</h4>
                <p className="text-gray-200 text-lg italic">
                  {getRecommendation(results)}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-4">
                <button 
                  onClick={() => setCurrentStep(0)}
                  className="px-6 py-3 rounded-lg border-2 border-slate-600 text-gray-300 hover:bg-slate-700 transition order-3 sm:order-1"
                >
                  Retake Test
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition order-1 sm:order-2 shadow-lg shadow-cyan-500/20"
                >
                  Enroll Now
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 rounded-lg bg-slate-700 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-slate-600 transition order-2 sm:order-3"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticTest;
