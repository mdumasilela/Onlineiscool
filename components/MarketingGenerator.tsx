
import React, { useState } from 'react';
import { generateMarketingCopy } from '../services/geminiService';
import { MarketingCopyType } from '../types';

const MarketingGenerator: React.FC = () => {
  const [copyType, setCopyType] = useState<MarketingCopyType>(MarketingCopyType.FACEBOOK_POST);
  const [generatedCopy, setGeneratedCopy] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedCopy('');
    try {
      const result = await generateMarketingCopy(copyType);
      setGeneratedCopy(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-slate-800 p-6 md:p-8 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-grow">
              <label htmlFor="copyType" className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Content Channel</label>
              <select
                  id="copyType"
                  value={copyType}
                  onChange={(e) => setCopyType(e.target.value as MarketingCopyType)}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              >
                  {Object.values(MarketingCopyType).map(type => (
                      <option key={type} value={type}>{type}</option>
                  ))}
              </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full sm:w-auto self-end bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:bg-slate-700 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg shadow-cyan-900/20"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Drafting...
              </div>
            ) : 'Generate Copy'}
          </button>
        </div>

        {error && <div className="bg-red-900/30 text-red-300 border border-red-800 p-4 rounded-lg mb-4 text-sm">{error}</div>}
        
        {generatedCopy ? (
          <div className="relative animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preview & Refine</h4>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy Text
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl text-gray-200 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed max-h-[500px] overflow-y-auto">
              {generatedCopy}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="border-2 border-dashed border-slate-700 rounded-xl py-20 flex flex-col items-center justify-center text-slate-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15h6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11h6" /></svg>
               <p className="text-sm font-medium">Select a channel and click "Generate Copy" to begin.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MarketingGenerator;
