import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Bridge the Gap to Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Dream Career
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            AI-powered resume optimization, skill gap analysis, and career roadmapping.
            Upload your resume and unlock your true professional potential today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyze"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
            >
              Analyze My Resume
            </Link>
            <Link
              to="/profile"
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              Build Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="📄"
              title="ATS Optimizer"
              description="Get your resume past the bots with our advanced scoring and optimization engine."
            />
            <FeatureCard
              icon="🎯"
              title="Skill Gap Analysis"
              description="Know exactly which tools and frameworks you're missing for your target job title."
            />
            <FeatureCard
              icon="🚀"
              title="Career Predictor"
              description="Explore non-obvious career trajectories based on your unique skill composition."
            />
            <FeatureCard
              icon="💼"
              title="Digital Portfolio"
              description="A central place to store and track your experience, certs, and project results."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default Home;