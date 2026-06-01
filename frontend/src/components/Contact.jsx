const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-[#1c1c1c]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase">
          Get In Touch<span className="text-[#84dbef]">.</span>
        </h2>
        
        <p className="text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed">
          I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
        </p>
        
        <a 
          href="mailto:leshanieb@gmail.com"
          className="inline-block bg-gradient-to-r from-[#3b82f6] to-[#84dbef] text-[#1c1c1c] px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-colors duration-200"
        >
          Let's Start
        </a>
      </div>
    </section>
  );
};

export default Contact;
