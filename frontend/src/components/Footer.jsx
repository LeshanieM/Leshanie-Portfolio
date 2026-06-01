import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 bg-[#151515] border-t-2 border-[#333] text-center relative">
      <div className="flex justify-center space-x-8 mb-6">
        <a
          href="https://github.com/LeshanieM"
          className="text-gray-400 hover:text-[#84dbef] transition-colors"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/leshanie-bogoda-arachchi-19a8b8216/"
          className="text-gray-400 hover:text-[#84dbef] transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-[#84dbef] transition-colors"
        >
          <FaTwitter size={24} />
        </a>
      </div>
      <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
        Designed & Built by Leshanie.m
      </p>

      {/* Discreet Admin Login Link */}
      <div className="mt-8">
        <Link
          to="/login"
          className="text-[10px] text-[#333] font-bold tracking-widest uppercase hover:text-[#84dbef] transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
