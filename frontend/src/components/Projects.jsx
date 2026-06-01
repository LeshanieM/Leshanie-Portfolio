import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = ({ data = [] }) => {
  return (
    <section id="projects" className="py-24 bg-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
            Featured Projects<span className="text-[#84dbef]">.</span>
          </h2>
          <div className="h-[2px] bg-[#333] flex-grow max-w-md"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((project, idx) => (
            <div 
              key={idx} 
              className="bg-[#151515] border-2 border-[#333] hover:border-[#84dbef] transition-colors duration-300 group flex flex-col relative"
            >
              {/* Decorative corner square */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#84dbef] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 bg-[#252525] border border-[#333] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#84dbef]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-4">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                        <FaGithub size={22} />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} className="text-gray-400 hover:text-[#84dbef] transition-colors">
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-[#84dbef] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-8 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech && project.tech.map(tech => (
                    <span key={tech} className="text-[10px] font-bold tracking-widest text-gray-500 uppercase border border-[#333] px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
