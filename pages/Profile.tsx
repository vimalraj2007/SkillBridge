import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { UserProfile, Certification } from '../types';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(storageService.getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [newCert, setNewCert] = useState<Partial<Certification>>({
    name: '',
    issuer: '',
    year: '',
  });

  const handleUpdate = (updates: Partial<UserProfile>) => {
    const updated = storageService.updateProfile(updates);
    setProfile(updated);
  };

  const handleAddCert = () => {
    if (newCert.name && newCert.issuer && newCert.year) {
      const cert: Certification = {
        id: Date.now().toString(),
        name: newCert.name,
        issuer: newCert.issuer,
        year: newCert.year,
        date: new Date().toLocaleDateString(),
      };
      handleUpdate({ certifications: [...profile.certifications, cert] });
      setIsAddingCert(false);
      setNewCert({ name: '', issuer: '', year: '' });
    } else {
      alert("Please fill in all certification fields.");
    }
  };

  const removeCert = (id: string) => {
    handleUpdate({ certifications: profile.certifications.filter(c => c.id !== id) });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        {/* Header without Image */}
        <div className="h-40 bg-slate-900 relative">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute inset-0 flex items-center px-12">
             <h2 className="text-white text-3xl font-black uppercase tracking-[0.2em] opacity-20">
               My Career Portfolio
             </h2>
          </div>
        </div>

        <div className="px-12 pt-12 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
            <div className="flex-grow">
              {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Full Name
                    </label>
                    <input 
                      className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-black font-bold" 
                      value={profile.fullName} 
                      onChange={e => handleUpdate({ fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Age
                    </label>
                    <input 
                      className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-black font-bold" 
                      value={profile.age} 
                      onChange={e => handleUpdate({ age: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Country
                    </label>
                    <input 
                      className="w-full p-4 rounded-2xl bg-slate-100 border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-black font-bold" 
                      value={profile.country} 
                      onChange={e => handleUpdate({ country: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-5xl font-black text-slate-900 mb-2">{profile.fullName}</h1>
                  <div className="flex flex-wrap gap-4 text-slate-500 font-bold uppercase text-xs tracking-widest">
                    <span>{profile.age} Years Old</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5"></span>
                    <span>{profile.country}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5"></span>
                    <span className="text-indigo-600 font-black">{profile.email}</span>
                  </div>
                </>
              )}
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`${isEditing ? 'bg-indigo-600' : 'bg-slate-900'} text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95`}
            >
              {isEditing ? 'Save Profile' : 'Edit Information'}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                  About Me
                </h3>
                {isEditing ? (
                  <textarea 
                    className="w-full p-6 rounded-3xl bg-slate-100 border border-slate-200 focus:ring-2 focus:ring-indigo-500 min-h-[160px] text-lg text-black font-medium"
                    value={profile.bio}
                    onChange={(e) => handleUpdate({ bio: e.target.value })}
                  />
                ) : (
                  <p className="text-slate-700 leading-relaxed text-xl font-medium">
                    {profile.bio}
                  </p>
                )}
              </section>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                  Verified Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded-2xl font-bold text-sm border border-indigo-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <section className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Certifications
                  </h3>
                  <button 
                    onClick={() => setIsAddingCert(true)}
                    className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold hover:bg-indigo-700 transition-all shadow-lg"
                  >
                    +
                  </button>
                </div>

                {isAddingCert && (
                  <div className="mb-8 p-6 bg-white rounded-3xl border border-indigo-100 shadow-xl space-y-4 animate-scale-up">
                    <input 
                      className="w-full p-3 bg-slate-100 border-none rounded-xl text-sm text-black font-bold" 
                      placeholder="Certificate Name"
                      value={newCert.name}
                      onChange={e => setNewCert({...newCert, name: e.target.value})}
                    />
                    <input 
                      className="w-full p-3 bg-slate-100 border-none rounded-xl text-sm text-black font-bold" 
                      placeholder="Providing Company"
                      value={newCert.issuer}
                      onChange={e => setNewCert({...newCert, issuer: e.target.value})}
                    />
                    <input 
                      className="w-full p-3 bg-slate-100 border-none rounded-xl text-sm text-black font-bold" 
                      placeholder="Year"
                      value={newCert.year}
                      onChange={e => setNewCert({...newCert, year: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <button onClick={handleAddCert} className="flex-grow bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm">
                        Save
                      </button>
                      <button onClick={() => setIsAddingCert(false)} className="px-4 bg-slate-200 text-slate-600 rounded-xl font-bold text-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {profile.certifications.length > 0 ? (
                    profile.certifications.map(cert => (
                      <div
                        key={cert.id}
                        className="relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group"
                      >
                        <button 
                          onClick={() => removeCert(cert.id)}
                          className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                        <div className="text-xl mb-3">🏅</div>
                        <p className="font-black text-slate-900 leading-tight mb-1">{cert.name}</p>
                        <p className="text-xs font-bold text-indigo-500 mb-2">{cert.issuer}</p>
                        <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase">
                          Class of {cert.year}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-400 text-sm font-medium italic">
                        No certificates added yet.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;