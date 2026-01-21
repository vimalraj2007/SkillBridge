import React, { useState, useEffect, useRef } from 'react';
import { AnalysisState, RoadmapData } from '../types';
import { generateRoadmap } from '../services/geminiService';

interface DashboardProps {
  analysis: AnalysisState;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis }) => {
  const { ats, skillGap, careerPaths, hasResume } = analysis;
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapData | null>(null);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Details'>('Overview');
  
  // AI Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const fetchRoadmapForRole = async (roleName: string) => {
    setIsLoadingRoadmap(true);
    try {
      const skills = skillGap?.missingSkills ? [...skillGap.missingSkills] : [];
      const data = await generateRoadmap(roleName, skills);
      setSelectedRoadmap(data);
    } catch (err) {
      console.error(err);
      alert("Could not load roadmap.");
    } finally {
      setIsLoadingRoadmap(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchRoadmapForRole(searchQuery);
    }
  };

  const handleDownloadReport = () => {
    window.print();
  };

  // ---- STUBBED CHATBOT: NO GEMINI CALLS HERE ----
  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const userMsg = userInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text:
            "AI chat is temporarily disabled while we debug the Gemini integration. " +
            "The rest of the dashboard (ATS, Skill Gap, Roadmaps) is using stub data."
        }
      ]);
      setIsAiTyping(false);
    }, 500);
  };
  // -----------------------------------------------

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative min-h-screen">
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 no-print">
        <div>
          <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">Career Intelligence</h1>
          <p className="text-slate-500 font-medium">Data-driven insights for your professional advancement.</p>
        </div>
        <div className="flex gap-4">
           <div className="p-1 bg-white rounded-2xl border border-slate-200 flex shadow-sm">
             <button 
                onClick={() => setActiveTab('Overview')}
                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'Overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               Overview
             </button>
             <button 
                onClick={() => setActiveTab('Details')}
                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'Details' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               Details
             </button>
           </div>
        </div>
      </div>

      {/* PRINT-ONLY HEADER */}
      <div className="print-only mb-12 text-center border-b pb-8">
        <h1 className="text-4xl font-black text-slate-900 mb-2">SkillBridge Career Analysis Report</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
          Generated on {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* OVERVIEW TAB CONTENT */}
      {(activeTab === 'Overview' || window.matchMedia('print').matches) && (
        <div className="space-y-16 animate-fade-in">
          {/* ATS SCORE */}
          {hasResume && ats && (
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl card-print">
              <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl no-print">📄</span>
                ATS Optimized Profile
              </h2>
              <div className="grid lg:grid-cols-4 gap-12">
                <div className="flex flex-col items-center justify-center p-10 bg-slate-900 rounded-[2.5rem] text-white">
                    <div className="text-7xl font-black text-indigo-400 mb-2">{ats.score}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ATS Score</div>
                </div>
                <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Keyword Match</p>
                      <div className="text-3xl font-black text-slate-900">{ats.keywordMatch}%</div>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Formatting Health</p>
                      <p className="text-lg font-bold text-amber-600">{ats.formattingIssues[0] || 'Optimized'}</p>
                    </div>
                    <div className="sm:col-span-2 p-8 bg-white rounded-3xl border-2 border-indigo-50">
                      <p className="text-[10px] font-black text-indigo-400 uppercase mb-4 tracking-widest">AI Strategic Suggestion</p>
                      <p className="text-sm text-slate-700 font-medium italic">"{ats.suggestions[0]}"</p>
                    </div>
                </div>
              </div>
            </section>
          )}

          {/* SKILL GAP ANALYSIS */}
          {skillGap && (
            <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl card-print">
              <h2 className="text-3xl font-black mb-12">Skill Gap Matrix</h2>
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
                  <div className="text-5xl font-black text-indigo-400 mb-2">{skillGap.roleFitScore}%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                    Role Competency Fit
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGap.missingSkills && skillGap.missingSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-xl border border-red-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">
                      Recommended Certifications
                    </h4>
                    <ul className="space-y-3 text-sm">
                      {skillGap.recommendedCertifications && skillGap.recommendedCertifications.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8">
                      Recommended Courses
                    </h4>
                    <ul className="space-y-3 text-sm">
                      {skillGap.recommendedCourses && skillGap.recommendedCourses.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CAREER PATH PREDICTIONS */}
          {careerPaths && careerPaths.length > 0 && (
            <section className="space-y-12 no-print">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                 <div className="flex-grow">
                   <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                     <span className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl">
                       🚀
                     </span>
                     Career Path Predictions
                   </h2>
                   <p className="text-slate-500 mt-2 font-medium">
                     Trajectory paths calculated based on your current skill profile.
                   </p>
                 </div>
                 <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-auto">
                   <input 
                     type="text" 
                     className="flex-grow md:w-64 p-4 rounded-2xl bg-slate-100 border border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none text-black font-black shadow-inner"
                     placeholder="Search custom roadmap..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <button
                     type="submit"
                     className="bg-indigo-600 text-white p-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                   >
                      Search
                   </button>
                 </form>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {careerPaths.map((path, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => fetchRoadmapForRole(path.title)}
                    className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-indigo-400 hover:shadow-2xl hover:-translate-y-2 transition-all text-left"
                  >
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                      {path.title}
                    </h3>
                    <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-tighter">
                       View Visual Roadmap →
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* DETAILS TAB CONTENT */}
      {(activeTab === 'Details' || window.matchMedia('print').matches) && (
        <div className="space-y-16 animate-fade-in">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl card-print">
             <h2 className="text-3xl font-black text-slate-900 mb-8">Detailed Improvement Strategy</h2>
             <div className="grid lg:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                    Steps to Improve & Upskill
                  </h4>
                  {[
                    {title: "Optimize ATS Keywords", desc: "Integrate more action verbs and industry-specific tools identified in the Skill Gap Matrix."},
                    {title: "Skill Acquisition Phase", desc: "Prioritize learning the top 3 missing tools identified to improve role fit score."},
                    {title: "Certification Milestone", desc: "Complete at least one of the recommended certifications to validate your expertise to recruiters."}
                  ].map((step, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="font-bold text-slate-900 mb-1">{step.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
               </div>
               <div className="space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                    Learning Hub (Redirection Links)
                  </h4>
                  {skillGap?.recommendedCertifications && skillGap.recommendedCertifications.map((cert, i) => (
                    <a 
                      key={i} 
                      href={`https://www.coursera.org/search?query=${encodeURIComponent(cert)}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all group shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{cert}</p>
                          <p className="text-[10px] font-black text-indigo-600 uppercase mt-1">
                            Start Certification Path ↗
                          </p>
                        </div>
                        <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </a>
                  ))}
                  {skillGap?.recommendedCourses && skillGap.recommendedCourses.map((course, i) => (
                    <a 
                      key={i} 
                      href={`https://www.udemy.com/courses/search/?q=${encodeURIComponent(course)}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-indigo-500 transition-all group"
                    >
                      <p className="font-bold text-slate-700 text-sm">{course}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase mt-1">
                        Search Course ↗
                      </p>
                    </a>
                  ))}
               </div>
             </div>
          </section>

          <section className="p-10 bg-indigo-600 rounded-[3rem] text-white shadow-2xl card-print">
             <h3 className="text-3xl font-black mb-4">Summary Conclusion</h3>
             <p className="text-lg text-indigo-100 font-medium leading-relaxed mb-8 max-w-4xl">
               In conclusion, your current profile is a strong foundation for your target career path. 
               By focusing on the identified {skillGap?.missingSkills ? skillGap.missingSkills.length : 0} missing technical competencies 
               and optimizing your resume for modern ATS algorithms, you are well-positioned to reach your 
               professional goals within the next 6-12 months.
             </p>
             <button
               onClick={handleDownloadReport}
               className="no-print bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl"
             >
               Download Full Report (PDF)
             </button>
          </section>
        </div>
      )}

      {/* FLOATING AI CHATBOT (STUBBED) */}
      <div className="fixed bottom-8 right-8 z-[200] no-print floating-ai">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 rounded-3xl bg-indigo-600 text-white shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-all"
          >
            🤖
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden h-[500px] animate-scale-up">
            <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
              <span className="font-black text-sm">SkillBridge Assistant</span>
              <button onClick={() => setIsChatOpen(false)}>✕</button>
            </div>
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-100 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiTyping && <div className="text-slate-400 text-xs animate-pulse">AI is thinking...</div>}
            </div>
            <div className="p-4 border-t bg-white flex gap-2">
              <input
                type="text"
                className="flex-grow p-4 rounded-2xl bg-slate-100 border-none text-black font-bold text-sm"
                placeholder="Ask me anything..."
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ROADMAP MODAL */}
      {(isLoadingRoadmap || selectedRoadmap) && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-12 bg-slate-900/80 backdrop-blur-md no-print">
          <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden animate-scale-up">
            <div className="p-10 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                {selectedRoadmap?.title || 'Designing Roadmap...'}
              </h2>
              <button
                onClick={() => {
                  setSelectedRoadmap(null);
                  setSearchQuery('');
                }}
                className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-2xl font-black text-red-600 hover:bg-red-50 transition-colors shadow-sm"
              >
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-12">
              {isLoadingRoadmap ? (
                <div className="text-center py-20 text-2xl font-black text-slate-900 animate-pulse">
                  Generating your custom career path...
                </div>
              ) : (
                selectedRoadmap && (
                  <div className="space-y-12">
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {selectedRoadmap.overview}
                    </p>
                    {selectedRoadmap.steps.map((step, idx) => (
                      <div key={idx} className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-2xl font-black text-slate-900">
                            {idx + 1}. {step.title}
                          </h4>
                          <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-slate-600 font-medium mb-6">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.tools.map((tool, ti) => (
                            <span
                              key={ti}
                              className="px-4 py-2 bg-white text-slate-700 rounded-xl text-xs font-black border border-slate-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;