const Experience = ({ experience = [], education = [], achievements = [], volunteering = [] }) => {
  return (
    <section id="experience" className="py-24 bg-[#151515]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
            Background<span className="text-[#84dbef]">.</span>
          </h2>
          <div className="h-[2px] bg-[#333] flex-grow max-w-md"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Column: Experience */}
          <div>
            <h3 className="text-xl font-bold text-white mb-10 tracking-widest uppercase flex items-center">
              <span className="text-[#84dbef] mr-4 text-xs">■</span> Experience
            </h3>
            <div className="relative border-l-2 border-[#333] ml-1.5 space-y-12">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute w-3 h-3 bg-[#151515] border-2 border-[#84dbef] -left-[7.5px] top-1.5"></div>
                  
                  <div className="flex flex-col mb-4 gap-1">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                      {exp.role} <span className="text-[#84dbef] text-sm md:text-base">@ {exp.company}</span>
                    </h4>
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <ul className="mt-4 space-y-3">
                    {exp.points && exp.points.map((point, i) => (
                      <li key={i} className="flex text-gray-400 text-sm leading-relaxed">
                        <span className="text-[#84dbef] mr-4 font-bold">-</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {exp.tech.map(t => (
                        <span key={t} className="text-[10px] bg-[#252525] border border-[#333] font-bold tracking-widest text-gray-400 uppercase px-2 py-1">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education, Achievements, Volunteering */}
          <div className="space-y-16">
            
            {/* Education */}
            <div>
              <h3 className="text-xl font-bold text-white mb-10 tracking-widest uppercase flex items-center">
                <span className="text-[#84dbef] mr-4 text-xs">■</span> Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-[#1c1c1c] border border-[#333] p-6 hover:border-[#84dbef] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h4 className="text-md font-bold text-white uppercase tracking-wide">{edu.degree}</h4>
                      <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{edu.duration}</span>
                    </div>
                    <p className="text-[#84dbef] text-sm font-bold tracking-widest uppercase mb-2">{edu.university}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Volunteering Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <div>
                  <h3 className="text-md font-bold text-white mb-6 tracking-widest uppercase flex items-center">
                    <span className="text-[#84dbef] mr-3 text-[10px]">■</span> Achievements
                  </h3>
                  <ul className="space-y-3 bg-[#1c1c1c] border border-[#333] p-6">
                    {achievements.map((ach, idx) => (
                      <li key={idx} className="flex text-gray-400 text-sm items-start leading-relaxed">
                        <span className="text-[#84dbef] mr-3 font-bold">+</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Volunteering */}
              {volunteering && volunteering.length > 0 && (
                <div>
                  <h3 className="text-md font-bold text-white mb-6 tracking-widest uppercase flex items-center">
                    <span className="text-[#84dbef] mr-3 text-[10px]">■</span> Volunteering
                  </h3>
                  <ul className="space-y-3 bg-[#1c1c1c] border border-[#333] p-6">
                    {volunteering.map((vol, idx) => (
                      <li key={idx} className="flex text-gray-400 text-sm items-start leading-relaxed">
                        <span className="text-[#84dbef] mr-3 font-bold">+</span>
                        <span>{vol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
