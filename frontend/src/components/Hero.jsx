import { motion } from 'framer-motion';
import mePic from '../assets/me.jpg';

const Hero = ({ data }) => {
  const firstName = data?.name ? data.name.split(' ')[0] : 'LESHANIE';
  const lastName = data?.name?.split(' ').slice(1).join(' ') || 'bogoda arachchi';
  const initials = data?.name
    ? data.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'LB';

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

      {/* ── Background texture lines ── */}
      {[25, 50, 75].map(pct => (
        <div
          key={pct}
          className="absolute inset-x-0 border-t border-white/[0.03] pointer-events-none"
          style={{ top: `${pct}%` }}
        />
      ))}

      {/* Ambient glow blobs  */}
      <div className="absolute -top-20 -left-20 w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, #84dbef 50%, transparent 70%)', opacity: 0.06 }}
      />
      <div className="absolute right-16 top-1/2 -translate-y-[55%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, #84dbef 50%, transparent 70%)', opacity: 0.09 }}
      />

      {/* Plus-mark accents  */}
      <div className="absolute top-[76px] left-[43%] hidden md:flex gap-3 opacity-20 pointer-events-none">
        {[0, 1, 2].map(i => (
          <div key={i} className="relative w-3.5 h-3.5">
            <div className="absolute left-1/2 top-0 w-px h-full bg-[#84dbef]" />
            <div className="absolute top-1/2 left-0 h-px w-full bg-[#84dbef]" />
          </div>
        ))}
      </div>

      {/* Corner labels  */}
      <span className="absolute top-[82px] left-5 text-[9px] tracking-[0.2em] uppercase text-[#84dbef]/25 font-medium hidden md:block">
        01 / HERO
      </span>
      <span className="absolute bottom-5 right-5 text-[9px] tracking-[0.2em] uppercase text-[#84dbef]/25 font-medium hidden md:block">
        © {new Date().getFullYear()}
      </span>

      {/* ════════════════════════════════════
          LAYOUT: Left | Right (stacked on mobile)
      ════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row pt-6 sm:pt-8 md:pt-16 items-center md:items-stretch">

        {/* ── LEFT PANEL ── */}
   
        <div className="flex flex-col justify-center px-5 sm:px-6 md:pl-0 md:pr-8 py-8 md:py-0 w-full md:w-[46%] md:border-r md:border-white/[0.07] md:-ml-8 lg:-ml-12">

          {/* Available badge */}
          <motion.div {...fadeLeft(0.05)} className="inline-flex items-center gap-2 border border-[#84dbef]/30 bg-[#84dbef]/5 px-3 py-1.5 md:px-3.5 md:py-2 mb-5 sm:mb-6 md:mb-8 w-fit">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#84dbef] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] md:text-[10px] font-bold tracking-[0.18em] md:tracking-[0.22em] uppercase text-[#84dbef]">
              Available for work
            </span>
          </motion.div>

          {/* ── Name block ── */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <motion.h1
              {...fadeLeft(0.1)}
              className="font-black tracking-[-0.03em] uppercase leading-[0.9] md:leading-[0.88]"
              style={{
                fontSize: 'clamp(52px, 14vw, 108px)',
                background: 'linear-gradient(135deg, #ffffff 30%, #84dbef 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {firstName}<span>.</span>
            </motion.h1>
            <motion.p
              {...fadeLeft(0.18)}
              className="text-[14px] sm:text-[15px] md:text-base font-light tracking-[0.2em] md:tracking-[0.3em] text-white/30 lowercase mt-2 md:mt-3"
            >
              {lastName}
            </motion.p>
          </div>

          {/* Role */}
          <motion.div {...fadeLeft(0.25)} className="flex items-center gap-2 md:gap-3 mb-5 sm:mb-6 md:mb-8">
            <div className="w-5 md:w-7 h-px bg-gradient-to-r from-[#3b82f6] to-[#84dbef]" />
            <span
              className="text-[9px] sm:text-[10px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.24em] uppercase whitespace-normal break-words"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #84dbef)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {data?.title || 'Business Analyst / Software Engineer'}
            </span>
          </motion.div>

          {/* Thin divider */}
          <motion.div {...fadeLeft(0.3)} className="w-10 md:w-12 h-px bg-white/10 mb-5 sm:mb-6 md:mb-8" />

          {/* Avatar row */}
          <motion.div {...fadeLeft(0.35)} className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
            <div className="relative shrink-0">
              <div
                className="absolute -inset-1 rounded-full md:-inset-1.5 opacity-20 blur-lg pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #84dbef)' }}
              />
              <img
                src={mePic}
                alt="Portrait"
                className="relative w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-[#84dbef]/40 bg-[#1c1c1c]"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling?.style.setProperty('display', 'flex');
                }}
              />
              <div
                className="hidden absolute inset-0 items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#84dbef]/40"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(132,219,239,0.2))' }}
              >
                <span
                  className="text-sm md:text-lg font-black"
                  style={{
                    background: 'linear-gradient(90deg, #3b82f6, #84dbef)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {initials}
                </span>
              </div>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-[10px] font-semibold tracking-[0.12em] md:tracking-[0.18em] uppercase text-white/35">
                @{data?.handle || 'leshanie.m'}
              </p>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            {...fadeUp(0.42)}
            className="flex border border-white/[0.08] w-full"
          >
            {[
              { num: data?.years || '5+', label: 'Years exp.' },
              { num: data?.projects || '32+', label: 'Projects' },
              { num: data?.clients || '12+', label: 'Clients' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex-1 px-2 py-3 md:px-5 md:py-4 border-r border-white/[0.08] last:border-r-0 text-center"
              >
                <p className="text-xl sm:text-2xl md:text-[26px] font-bold text-white tracking-tight leading-none">
                  {s.num}
                </p>
                <p className="text-[8px] sm:text-[9px] md:text-[9px] font-semibold tracking-[0.12em] md:tracking-[0.18em] uppercase text-white/30 mt-1 md:mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT PANEL ── */}
      
        <div className="flex flex-col justify-center px-5 sm:px-6 md:px-8 py-8 md:py-0 w-full md:flex-1">

          {/* Edition box */}
          <motion.div
            {...fadeRight(0.1)}
            className="border border-[#84dbef]/40 px-3 py-2 md:px-5 md:py-3 inline-block mb-5 sm:mb-6 md:mb-10 w-fit"
          >
            <p className="text-[8px] sm:text-[9px] md:text-[8px] font-bold tracking-[0.18em] md:tracking-[0.22em] uppercase text-white/30 mb-0.5 md:mb-1">
              Welcome to my
            </p>
            <p className="text-[15px] sm:text-[16px] md:text-[17px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase text-white">
              Portfolio
            </p>
          </motion.div>

          {/* Section label */}
          <motion.p
            {...fadeRight(0.17)}
            className="text-[9px] sm:text-[10px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.28em] uppercase text-white/25 mb-2 md:mb-3"
          >
            About me
          </motion.p>

          {/* Heading */}
          <motion.h2
            {...fadeRight(0.22)}
            className="text-2xl sm:text-3xl md:text-3xl font-bold uppercase tracking-[0.03em] md:tracking-[0.05em] leading-snug text-white mb-3 md:mb-5 whitespace-pre-line"
          >
            {data?.heading || 'Building products people\nactually want to use.'}
          </motion.h2>

          {/* Body copy */}
          <motion.p
            {...fadeRight(0.28)}
            className="text-[14px] sm:text-[15px] md:text-[14px] text-white/50 leading-[1.7] md:leading-[1.9] mb-6 md:mb-10 max-w-full md:max-w-sm"
          >
            {data?.intro ||
              'Tech and Coding | IT Undergraduate | Software & IT Enthusiast. Passionate about building scalable systems and crafting pixel-perfect interfaces — every layer of the stack matters.'}
          </motion.p>

          {/* CTA row */}
          <motion.div
            {...fadeRight(0.35)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 md:gap-7 mb-6 md:mb-10"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 md:px-7 md:py-3.5 text-[10px] sm:text-[11px] md:text-[10px] font-bold tracking-[0.18em] md:tracking-[0.22em] uppercase text-[#1c1c1c] transition-opacity duration-200 hover:opacity-85 text-center w-full sm:w-auto"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #84dbef)' }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="text-[10px] sm:text-[11px] md:text-[10px] font-bold tracking-[0.18em] md:tracking-[0.22em] uppercase transition-opacity duration-200 hover:opacity-70"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #84dbef)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Contact Me →
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...fadeRight(0.42)}
            className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-7 pt-6 md:pt-8 border-t border-white/[0.07]"
          >
            {[
              { label: 'GitHub', href: data?.github || 'https://github.com/LeshanieM' },
              { label: 'LinkedIn', href: data?.linkedin || 'https://www.linkedin.com/in/leshanie-bogoda-arachchi-19a8b8216/' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] sm:text-[11px] md:text-[10px] font-bold tracking-[0.18em] md:tracking-[0.22em] uppercase text-white/30 hover:text-[#84dbef] transition-colors duration-200"
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