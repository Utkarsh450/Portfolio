import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const firstChars = gsap.utils.toArray<HTMLElement>('.first-name-char');
    const lastChars = gsap.utils.toArray<HTMLElement>('.last-name-char');
    const dots = gsap.utils.toArray<HTMLElement>('.loader-dot');
    const strips = gsap.utils.toArray<HTMLElement>('.loader-strip');

    // 1. Reset all elements to initial state
    gsap.set(strips, { yPercent: 0 });
    gsap.set(firstNameRef.current, { x: 0, opacity: 1, filter: 'blur(0px)' });
    gsap.set(lastNameRef.current, { x: 0, opacity: 1, filter: 'blur(0px)' });
    gsap.set(dotsContainerRef.current, { opacity: 1, scale: 1 });

    gsap.set([...firstChars, ...lastChars], {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    });

    gsap.set(dots, {
      opacity: 0,
      scale: 0.4,
      y: 0,
    });

    // 2. Dots continuous wave bounce animation
    const dotsBounceTween = gsap.to(dots, {
      y: -6,
      scale: 1.25,
      opacity: 0.4,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true,
      },
    });

    // 3. Master Timeline
    const tl = gsap.timeline();

    // Step A: Letter-by-letter entrance
    tl.to(firstChars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.07,
      ease: 'power2.out',
    })
      .to(
        dots,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        },
        '-=0.3'
      )
      .to(
        lastChars,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.07,
          ease: 'power2.out',
        },
        '-=0.3'
      );

    // Step B: Hold for ~3s total duration feel while dots wave
    tl.to({}, { duration: 1.2 });

    // Step C: Center dots disappear
    tl.to(dotsContainerRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.35,
      ease: 'power2.in',
      onStart: () => {
        dotsBounceTween.kill();
      },
    });

    // Step D: Utkarsh goes left and disappears; Barnwal goes right and disappears
    tl.to(
      firstNameRef.current,
      {
        x: -90,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.55,
        ease: 'power2.in',
      },
      '-=0.1'
    ).to(
      lastNameRef.current,
      {
        x: 90,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.55,
        ease: 'power2.in',
      },
      '<'
    );

    // Step E: Instantly animate 5 Strips from bottom to top (No delay)
    tl.to(
      strips,
      {
        yPercent: -100,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.inOut',
        onComplete: () => {
          if (onComplete) {
            onComplete();
          } else {
            navigate('/');
          }
        },
      },
      '-=0.15'
    );
  }, { scope: containerRef });

  const renderSplitText = (text: string, className: string) => {
    return text.split('').map((char, index) => (
      <span
        key={`${className}-${index}`}
        className={`${className} inline-block`}
        style={{ whiteSpace: 'pre' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none font-satoshi"
    >
      {/* 5 Fullscreen Vertical Strips (Seamless pure white, no borders) */}
      <div className="fixed inset-0 z-10 flex w-full h-full overflow-hidden pointer-events-auto">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="loader-strip w-1/5 h-full bg-white relative"
          />
        ))}
      </div>

      {/* Foreground Content (UTKARSH ... BARNWAL) on top of the 5 strips */}
      <div className="relative z-20 flex items-center gap-3 sm:gap-4 md:gap-5 pointer-events-auto">
        {/* First Name: UTKARSH */}
        <div
          ref={firstNameRef}
          className="font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-zinc-900 flex"
        >
          {renderSplitText('UTKARSH', 'first-name-char')}
        </div>

        {/* Center Loading Dots */}
        <div
          ref={dotsContainerRef}
          className="flex items-center gap-1.5 sm:gap-2 px-0.5 sm:px-1"
        >
          <div className="loader-dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-800" />
          <div className="loader-dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-800" />
          <div className="loader-dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-800" />
        </div>

        {/* Last Name: BARNWAL */}
        <div
          ref={lastNameRef}
          className="font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-zinc-900 flex"
        >
          {renderSplitText('BARNWAL', 'last-name-char')}
        </div>
      </div>
    </div>
  );
};

export default Loader;