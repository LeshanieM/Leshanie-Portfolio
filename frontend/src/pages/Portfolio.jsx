import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Portfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`)
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching portfolio data', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center text-[#84dbef] font-bold tracking-widest uppercase">Loading Portfolio...</div>;
  }

  return (
    <div className="bg-[#1c1c1c] min-h-screen text-white font-sans selection:bg-[#84dbef] selection:text-white">
      <Navbar />
      <main>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Projects data={data.projects} />
        <Experience experience={data.experience} education={data.education} achievements={data.achievements} volunteering={data.volunteering} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
