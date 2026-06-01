const About = ({ data }) => {
  const skills = data?.skills || {};
  const bio = data?.bio || '';

  return (
    <section id="about" className="py-24 bg-[#151515]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
            About Me<span className="text-[#84dbef]">.</span>
          </h2>
          <div className="h-[2px] bg-[#333] flex-grow max-w-md"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="text-gray-300 space-y-6 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {bio}
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Technical Skills</h3>
            <div className="space-y-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold text-[#84dbef] mb-4 uppercase tracking-[0.2em]">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items && items.map(skill => (
                      <span 
                        key={skill} 
                        className="bg-[#252525] border border-[#333] px-4 py-2 text-xs font-bold text-gray-200 uppercase tracking-wider hover:bg-[#84dbef] hover:border-[#84dbef] hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
