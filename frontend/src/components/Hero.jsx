import { motion } from 'framer-motion';
import mePic from '../assets/me.jpg';

const Hero = ({ data }) => {
  const firstName = data?.name ? data.name.split(' ')[0] : 'YOUR';
  const lastName = data?.name?.split(' ').slice(1).join(' ') || 'NAME';
  const initials = data?.name
    ? data.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'YN';

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const fadeLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const fadeRight = (delay = 0) => ({
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative min-h-screen bg-[#1c1c1c] text-white overflow-hidden flex items-stretch">

      {/* ── Background texture ── */}
      {[25, 50, 75].map(pct => (
        <div
          key={pct}
          className="absolute inset-x-0 border-t border-white/[0.04] pointer-events-none"
          style={{ top: `${pct}%` }}
        />
      ))}

      {/* Ambient glow blobs */}
      <div className="absolute w-[480px] h-[480px] gradient-accent rounded-full opacity-[0.06] pointer-events-none" />
      <div className="absolute right-16 top-1/2 -translate-y-[55%] w-[300px] h-[300px] gradient-accent rounded-full opacity-[0.10] pointer-events-none" />

      {/* Plus-mark accents */}
      <div className="absolute top-7 left-[43%] hidden md:flex gap-3 opacity-20 pointer-events-none">
        {[0, 1, 2].map(i => (
          <div key={i} className="relative w-3.5 h-3.5">
            <div className="absolute left-1/2 top-0 w-px h-full bg-[#84dbef]" />
            <div className="absolute top-1/2 left-0 h-px w-full bg-[#84dbef]" />
          </div>
        ))}
      </div>

      {/* Corner labels */}
      <span className="absolute top-5 left-5 text-[9px] tracking-[0.2em] uppercase text-[#84dbef]/30 font-medium hidden md:block">
        01 / HERO
      </span>
      <span className="absolute bottom-5 right-5 text-[9px] tracking-[0.2em] uppercase text-[#84dbef]/30 font-medium hidden md:block">
        © {new Date().getFullYear()}
      </span>

      {/* ════════════════════════════════════
          LAYOUT: Left | Right
      ════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row pt-20 md:pt-0">

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-0 w-full md:w-[46%] md:border-r md:border-white/[0.07]">

          {/* Available badge */}
          <motion.div {...fadeLeft(0.05)} className="inline-flex items-center gap-2 border border-[#84dbef]/30 bg-[#84dbef]/5 px-3 py-1.5 mb-8 w-fit">
            <span className="w-1.5 h-1.5 rounded-full gradient-accent animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#84dbef]">
              Available for work
            </span>
          </motion.div>

          {/* Name block */}
          <div className="mb-6">
            <motion.h1
              {...fadeLeft(0.1)}
              className="text-7xl sm:text-8xl md:text-[88px] font-bold tracking-[-0.03em] uppercase leading-[0.88] gradient-text"
            >
              {firstName}<span className="gradient-text">.</span>
            </motion.h1>
            <motion.p
              {...fadeLeft(0.18)}
              className="text-lg sm:text-xl font-normal tracking-[0.22em] text-white/30 lowercase mt-2"
            >
              {lastName}
            </motion.p>
          </div>

          {/* Role */}
          <motion.div {...fadeLeft(0.25)} className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px gradient-accent" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase gradient-text">
              {data?.title || 'Full Stack Engineer'}
            </span>
          </motion.div>

          {/* Thin divider */}
          <motion.div
            {...fadeLeft(0.3)}
            className="w-10 h-px bg-white/10 mb-8"
          />

          {/* Avatar row */}
          <motion.div {...fadeLeft(0.35)} className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 gradient-accent blur-md opacity-15 rounded-full scale-110" />
              <img
                src={mePic}
                alt="Portrait"
                className="relative w-24 h-24 rounded-full object-cover border border-[#84dbef]/30 p-[2px] bg-[#1c1c1c]"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              {/* Fallback initials */}
              <div className="hidden absolute inset-0 items-center justify-center w-24 h-24 rounded-full border border-[#84dbef]/30 bg-[#84dbef]/10"
              >
                <span className="text-[13px] font-bold gradient-text">{initials}</span>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-white">{data?.name || 'Your Name'}</p>
              

            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            {...fadeUp(0.42)}
            className="flex border border-white/[0.08]"
          >
            {[
              { num: data?.years || '5+', label: 'Years exp.' },
              { num: data?.projects || '32+', label: 'Projects' },
              { num: data?.clients || '12+', label: 'Clients' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex-1 px-4 py-3 border-r border-white/[0.08] last:border-r-0"
              >
                <p className="text-xl font-bold text-white tracking-tight">
                  {s.num}
                </p>
                <p className="text-[9px] font-medium tracking-[0.15em] uppercase text-white/30 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-0 w-full md:flex-1">

          {/* Edition box */}
          <motion.div
            {...fadeRight(0.1)}
            className="border border-[#84dbef]/45 px-4 py-2.5 inline-block mb-10 w-fit"
          >
            <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/35 mb-0.5">
              Welcome to my
            </p>
            <p className="text-base font-bold tracking-[0.1em] uppercase text-white">
              Portfolio
            </p>
          </motion.div>

          {/* Section label */}
          <motion.p
            {...fadeRight(0.17)}
            className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 mb-3"
          >
            About me
          </motion.p>

          {/* Heading */}
          <motion.h2
            {...fadeRight(0.22)}
            className="text-lg sm:text-xl font-bold uppercase tracking-[0.06em] leading-snug text-white mb-4"
          >
            {data?.heading || 'Building products people\nactually want to use.'}
          </motion.h2>

          {/* Body copy */}
          <motion.p
            {...fadeRight(0.28)}
            className="text-[13px] text-white/50 leading-[1.8] mb-10 max-w-sm"
          >
            {data?.intro ||
              'I build scalable, secure backend architectures and craft pixel-perfect, responsive frontend experiences. From API design to animation — every layer of the stack matters.'}
          </motion.p>

          {/* CTA row */}
          <motion.div
            {...fadeRight(0.35)}
            className="flex items-center gap-6 sm:gap-8"
          >
            <a href="#projects" className="bg-gradient-to-r from-[#3b82f6] to-[#84dbef] text-[#1c1c1c] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-colors duration-200">
              View Projects
            </a>
            <a href="#contact" className="text-[10px] font-bold tracking-[0.2em] uppercase gradient-text hover:opacity-80 transition-colors duration-200">
              Contact Me →
            </a>
          </motion.div>

          {/* Social links — optional, add hrefs */}
          <motion.div
            {...fadeRight(0.42)}
            className="flex items-center gap-5 mt-10 pt-10 border-t border-white/[0.07]"
          >
            {[
              { label: 'GitHub', href: data?.github || '#' },
              { label: 'LinkedIn', href: data?.linkedin || '#' },
              { label: 'Resume', href: data?.resume || '#' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-[#84dbef] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;