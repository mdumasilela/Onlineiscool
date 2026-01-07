
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
    <section id="marketing-ai" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">AI-Powered Marketing Assistant</h2>
          <p className="text-gray-400 mt-2">Generate marketing materials for ONLINE S'COOL instantly.</p>
        </div>

        <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow">
                <label htmlFor="copyType" className="block text-sm font-medium text-gray-300 mb-1">Content Type</label>
                <select
                    id="copyType"
                    value={copyType}
                    onChange={(e) => setCopyType(e.target.value as MarketingCopyType)}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500"
                >
                    {Object.values(MarketingCopyType).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full sm:w-auto self-end bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                </div>
              ) : 'Generate'}
            </button>
          </div>

          {error && <div className="bg-red-900/50 text-red-300 border border-red-700 p-4 rounded-lg mb-4">{error}</div>}
          
          {generatedCopy && (
            <div className="relative">
              <h4 className="text-lg font-semibold text-white mb-2">Generated Content:</h4>
              <pre className="bg-slate-900/50 p-4 rounded-lg text-gray-300 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed">
                {generatedCopy}
              </pre>
              <button 
                onClick={copyToClipboard}
                className="absolute top-0 right-0 mt-2 mr-2 bg-slate-700 hover:bg-slate-600 p-2 rounded-lg"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketingGenerator;
