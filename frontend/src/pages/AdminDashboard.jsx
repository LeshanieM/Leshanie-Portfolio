import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Plus, Trash2, LayoutTemplate } from 'lucide-react';

const StringArrayEditor = ({ title, items = [], onChange }) => (
  <div className="mb-4 bg-slate-900/30 p-4 rounded-lg border border-slate-800">
    <h4 className="text-sm font-medium text-slate-300 mb-3 flex justify-between items-center">
      {title}
      <button type="button" onClick={() => onChange([...items, ''])} className="text-cyan-400 hover:text-cyan-300 flex items-center text-xs">
        <Plus size={14} className="mr-1" /> Add
      </button>
    </h4>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => {
              const newItems = [...items];
              newItems[idx] = e.target.value;
              onChange(newItems);
            }}
            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-white focus:border-cyan-500 outline-none"
            placeholder="Value..."
          />
          <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    hero: {}, about: { skills: {} }, achievements: [], volunteering: [],
    education: [], experience: [], projects: []
  });
  const [popup, setPopup] = useState({ isOpen: false, type: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const contentRes = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (contentRes.ok) {
        let data = await contentRes.json();
        setFormData({
          hero: data.hero || { name: '', title: '', intro: '' },
          about: data.about || { bio: '', skills: { Frontend: [], Backend: [], Database: [], Tools: [] } },
          achievements: data.achievements || [],
          volunteering: data.volunteering || [],
          education: data.education || [],
          experience: data.experience || [],
          projects: data.projects || []
        });
      } else {
        setError(`Failed to fetch portfolio data: ${contentRes.status}`);
      }
    } catch (err) {
      setError('Error connecting to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const showPopup = (type, message) => {
    setPopup({ isOpen: true, type, message });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    let hasError = false;
    let errorMessage = '';

    try {
      const token = localStorage.getItem('adminToken');
      
      // 1. Save Profile
      const profileRes = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: formData.hero,
          about: formData.about,
          achievements: formData.achievements,
          volunteering: formData.volunteering
        })
      });
      if (!profileRes.ok) {
        if (profileRes.status === 401) handleLogout();
        const errData = await profileRes.json().catch(() => ({}));
        throw new Error(`Profile Error: ${errData.details || errData.error || 'Unknown error'}`);
      }

      // 2. Helper to save arrays
      const saveEntities = async (type, listKey) => {
        const entities = formData[listKey];
        const newSavedList = [];
        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i];
          const isNew = !entity._id;
          const url = `${import.meta.env.VITE_API_URL}/api/admin/${type}${isNew ? '' : `/${entity._id}`}`;
          const method = isNew ? 'POST' : 'PUT';
          
          const res = await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
          });
          
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(`Failed to save ${type} (Item ${i + 1}): ${errData.details || errData.error || 'Unknown error'}`);
          }
          const savedData = await res.json();
          newSavedList.push(savedData);
        }
        return newSavedList;
      };

      const updatedEducation = await saveEntities('education', 'education');
      const updatedExperience = await saveEntities('experience', 'experience');
      const updatedProjects = await saveEntities('project', 'projects');

      setFormData(prev => ({
        ...prev,
        education: updatedEducation,
        experience: updatedExperience,
        projects: updatedProjects
      }));

    } catch (err) {
      hasError = true;
      errorMessage = err.message;
    } finally {
      setIsSaving(false);
      if (hasError) {
        showPopup('error', errorMessage);
      } else {
        showPopup('success', 'All sections saved successfully!');
      }
    }
  };

  const handleDeleteEntity = async (type, idx) => {
    const listKey = type === 'project' ? 'projects' : type;
    const entityList = formData[listKey];
    const entity = entityList[idx];
    if (!entity._id) {
      // Just remove from UI if not saved to DB yet
      const newList = entityList.filter((_, i) => i !== idx);
      setFormData({ ...formData, [listKey]: newList });
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${type}/${entity._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const newList = entityList.filter((_, i) => i !== idx);
        setFormData({ ...formData, [listKey]: newList });
        showPopup('success', `${type} deleted successfully!`);
      } else {
        showPopup('error', `Failed to delete ${type}.`);
      }
    } catch (err) {
      showPopup('error', `Network error deleting ${type}.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-xl text-center max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-slate-300 mb-6">{error}</p>
          <button 
            onClick={fetchData} 
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 gap-4 sticky top-4 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3 text-cyan-400">
            <LayoutTemplate size={24} />
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSaveAll}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div> : <Save size={18} />}
              <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save All Changes'}</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {popup.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${popup.type === 'success' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-red-500/20 text-red-400'}`}>
                {popup.type === 'success' ? <Save size={24} /> : <Trash2 size={24} />}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {popup.type === 'success' ? 'Success!' : 'Error'}
              </h3>
              <p className="text-slate-300 text-center text-sm mb-6">
                {popup.message}
              </p>
              <button 
                onClick={() => setPopup({ ...popup, isOpen: false })}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${popup.type === 'success' ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          
          {/* PROFILE SECTION */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">Profile Data (Hero & About)</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Name</label>
                    <input type="text" value={formData.hero?.name || ''} onChange={e => setFormData({...formData, hero: {...formData.hero, name: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Title</label>
                    <input type="text" value={formData.hero?.title || ''} onChange={e => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white outline-none focus:border-cyan-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Introduction</label>
                  <textarea value={formData.hero?.intro || ''} onChange={e => setFormData({...formData, hero: {...formData.hero, intro: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white outline-none focus:border-cyan-500" rows="2" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300 mt-6 pt-6 border-t border-slate-800/50">About Section</h3>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Bio</label>
                  <textarea value={formData.about?.bio || ''} onChange={e => setFormData({...formData, about: {...formData.about, bio: e.target.value}})} className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2 text-white outline-none focus:border-cyan-500" rows="3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StringArrayEditor title="Frontend Skills" items={formData.about?.skills?.Frontend || []} onChange={newItems => setFormData({...formData, about: {...formData.about, skills: {...formData.about.skills, Frontend: newItems}}})} />
                  <StringArrayEditor title="Backend Skills" items={formData.about?.skills?.Backend || []} onChange={newItems => setFormData({...formData, about: {...formData.about, skills: {...formData.about.skills, Backend: newItems}}})} />
                  <StringArrayEditor title="Database Skills" items={formData.about?.skills?.Database || []} onChange={newItems => setFormData({...formData, about: {...formData.about, skills: {...formData.about.skills, Database: newItems}}})} />
                  <StringArrayEditor title="Tools & DevOps" items={formData.about?.skills?.Tools || []} onChange={newItems => setFormData({...formData, about: {...formData.about, skills: {...formData.about.skills, Tools: newItems}}})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-800/50">
                <StringArrayEditor title="Achievements" items={formData.achievements || []} onChange={newItems => setFormData({...formData, achievements: newItems})} />
                <StringArrayEditor title="Volunteering" items={formData.volunteering || []} onChange={newItems => setFormData({...formData, volunteering: newItems})} />
              </div>
            </div>
          </div>

          {/* EDUCATION SECTION */}
          <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white">Education</h2>
              <button onClick={() => setFormData({...formData, education: [...formData.education, { degree:'', university:'', duration:'', details:'' }]})} className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center"><Plus size={16}/> Add Education</button>
            </div>
            <div className="space-y-4">
              {formData.education.map((edu, idx) => (
                <div key={edu._id || idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 relative group">
                  <div className="flex justify-end gap-3 mb-4 border-b border-slate-800/50 pb-3">
                    <button onClick={() => handleDeleteEntity('education', idx)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"><Trash2 size={14}/> Delete</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-16">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Degree/Certificate</label>
                      <input value={edu.degree} onChange={e => { const n = [...formData.education]; n[idx].degree = e.target.value; setFormData({...formData, education: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">University/School</label>
                      <input value={edu.university} onChange={e => { const n = [...formData.education]; n[idx].university = e.target.value; setFormData({...formData, education: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Duration</label>
                      <input value={edu.duration} onChange={e => { const n = [...formData.education]; n[idx].duration = e.target.value; setFormData({...formData, education: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Details</label>
                      <input value={edu.details} onChange={e => { const n = [...formData.education]; n[idx].details = e.target.value; setFormData({...formData, education: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white">Experience</h2>
              <button onClick={() => setFormData({...formData, experience: [...formData.experience, { role:'', company:'', duration:'', tech:[], points:[] }]})} className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center"><Plus size={16}/> Add Experience</button>
            </div>
            <div className="space-y-6">
              {formData.experience.map((exp, idx) => (
                <div key={exp._id || idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 relative">
                  <div className="flex justify-end gap-3 mb-4 border-b border-slate-800/50 pb-3">
                    <button onClick={() => handleDeleteEntity('experience', idx)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"><Trash2 size={14}/> Delete</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-16 mb-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Role</label>
                      <input value={exp.role} onChange={e => { const n = [...formData.experience]; n[idx].role = e.target.value; setFormData({...formData, experience: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Company</label>
                      <input value={exp.company} onChange={e => { const n = [...formData.experience]; n[idx].company = e.target.value; setFormData({...formData, experience: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Duration</label>
                      <input value={exp.duration} onChange={e => { const n = [...formData.experience]; n[idx].duration = e.target.value; setFormData({...formData, experience: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StringArrayEditor title="Technologies" items={exp.tech || []} onChange={items => { const n = [...formData.experience]; n[idx].tech = items; setFormData({...formData, experience: n}); }} />
                    <StringArrayEditor title="Responsibilities" items={exp.points || []} onChange={items => { const n = [...formData.experience]; n[idx].points = items; setFormData({...formData, experience: n}); }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white">Projects</h2>
              <button onClick={() => setFormData({...formData, projects: [...formData.projects, { title:'', description:'', github:'#', live:'#', tech:[] }]})} className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center"><Plus size={16}/> Add Project</button>
            </div>
            <div className="space-y-6">
              {formData.projects.map((proj, idx) => (
                <div key={proj._id || idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 relative">
                  <div className="flex justify-end gap-3 mb-4 border-b border-slate-800/50 pb-3">
                    <button onClick={() => handleDeleteEntity('project', idx)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"><Trash2 size={14}/> Delete</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-16 mb-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Project Title</label>
                      <input value={proj.title} onChange={e => { const n = [...formData.projects]; n[idx].title = e.target.value; setFormData({...formData, projects: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Description</label>
                      <input value={proj.description} onChange={e => { const n = [...formData.projects]; n[idx].description = e.target.value; setFormData({...formData, projects: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">GitHub Link</label>
                      <input value={proj.github} onChange={e => { const n = [...formData.projects]; n[idx].github = e.target.value; setFormData({...formData, projects: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Live Demo Link</label>
                      <input value={proj.live} onChange={e => { const n = [...formData.projects]; n[idx].live = e.target.value; setFormData({...formData, projects: n}); }} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white outline-none focus:border-cyan-500 text-sm" />
                    </div>
                  </div>
                  <StringArrayEditor title="Tech Stack" items={proj.tech || []} onChange={items => { const n = [...formData.projects]; n[idx].tech = items; setFormData({...formData, projects: n}); }} />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
