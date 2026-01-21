import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeResume, analyzeSkillGap, predictCareerPaths } from '../services/geminiService';
import { AnalysisState } from '../types';

interface AnalyzeProps {
  onAnalysisComplete: (analysis: AnalysisState) => void;
}

const Analyze: React.FC<AnalyzeProps> = ({ onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [manualSkills, setManualSkills] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!resumeText && !manualSkills) {
      alert('Please provide resume text or enter skills manually.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const skillsToUse = manualSkills
        ? manualSkills.split(',').map(s => s.trim()).filter(s => s)
        : [];

      let atsResult;
      const hasResume = !!resumeText.trim();

      if (hasResume) {
        atsResult = await analyzeResume(resumeText);
        const extracted = atsResult.parsedData?.skills || [];
        extracted.forEach(s => {
          if (!skillsToUse.includes(s)) skillsToUse.push(s);
        });
      }

      const [skillGap, careerPaths] = await Promise.all([
        analyzeSkillGap(skillsToUse.length > 0 ? skillsToUse : ['Professional skills'], targetRole),
        predictCareerPaths(skillsToUse.length > 0 ? skillsToUse : ['Problem solving']),
      ]);

      const finalState: AnalysisState = {
        ats: atsResult,
        skillGap,
        careerPaths,
        hasResume,
        loading: false,
      };

      onAnalysisComplete(finalState);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Analysis failed (using stub). Check console.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setResumeText((event.target?.result as string) || '');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Career Potential Analyzer
        </h1>
        <p className="text-lg text-slate-600">
          Enter your skills or upload a resume to bridge the gap to your dream role.
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-indigo-400 transition-all group shadow-sm">
          <label className="block text-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept=".txt,.md,.pdf"
              onChange={handleFileUpload}
            />
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📄</div>
            <div className="text-xl font-bold text-slate-800 mb-2">Upload Resume</div>
            <p className="text-slate-500 mb-4 tracking-tight">
              Upload for ATS Score & Formatting insights. (Text only in this stub)
            </p>
            {resumeText && (
              <div className="text-indigo-600 font-bold text-sm bg-indigo-50 py-2 px-6 rounded-full inline-block animate-pulse border border-indigo-100">
                ✓ Resume Data Loaded
              </div>
            )}
          </label>
          <div className="mt-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Resume Content
            </p>
            <textarea
              className="w-full h-32 p-4 rounded-2xl bg-slate-100 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none resize-none text-black font-medium transition-all"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg shadow-lg shadow-indigo-200">
              ⌨
            </span>
            Manual Entry
          </h3>
          <div className="grid gap-8">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Your Skill Set
              </label>
              <input
                type="text"
                className="w-full p-5 rounded-2xl bg-slate-100 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none text-black font-bold transition-all placeholder:text-slate-400"
                placeholder="React, Node.js, Python, AWS..."
                value={manualSkills}
                onChange={e => setManualSkills(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Target Job Role
              </label>
              <div className="relative">
                <select
                  className="w-full p-5 rounded-2xl bg-slate-100 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none text-black font-bold transition-all appearance-none cursor-pointer"
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                >
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Cloud Engineer</option>
                  <option>Data Scientist</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className={`w-full py-6 rounded-3xl text-2xl font-black transition-all shadow-2xl ${
            isAnalyzing
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isAnalyzing ? 'Processing Career Data...' : 'Analyze My Path'}
        </button>
      </div>
    </div>
  );
};

export default Analyze;