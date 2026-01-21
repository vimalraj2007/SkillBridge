import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyse';   // matches Analyse.tsx
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import { AnalysisState } from './types';

const App: React.FC = () => {
  // Initial analysis state
  const [analysis, setAnalysis] = useState<AnalysisState>({
    loading: false,
    hasResume: false
  });

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/analyze" 
              element={<Analyze onAnalysisComplete={setAnalysis} />} 
            />
            <Route 
              path="/dashboard" 
              element={
                analysis.ats || analysis.skillGap 
                  ? <Dashboard analysis={analysis} /> 
                  : <Navigate to="/analyze" />
              } 
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;