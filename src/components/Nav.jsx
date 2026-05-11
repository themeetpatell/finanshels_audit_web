import { useEffect, useState } from 'react';
import finanshelsLogo from '../assets/finanshelslogo.svg';

const AUDIT_DEADLINE = new Date('2026-05-30T23:59:59+04:00');

const getTimeRemaining = () => {
  const remainingMs = Math.max(AUDIT_DEADLINE.getTime() - Date.now(), 0);
  const totalSeconds = Math.floor(remainingMs / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const formatUnit = (value) => String(value).padStart(2, '0');

  return (
    <header className={`nav-modern ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-deadline-bar" role="status" aria-live="polite">
        <span className="nav-deadline-message">May 30th* audit deadline approaching for DDA Audits.</span>
        <div className="nav-deadline-timer" aria-label="Time remaining until May 30th DDA audit deadline">
          <span>{formatUnit(timeRemaining.days)}d</span>
          <span>{formatUnit(timeRemaining.hours)}h</span>
          <span>{formatUnit(timeRemaining.minutes)}m</span>
          <span>{formatUnit(timeRemaining.seconds)}s</span>
        </div>
      </div>

      <div className="nav-container-modern">
        <a href="/" className="nav-logo-modern">
          <img
            src={finanshelsLogo}
            alt="Finanshels"
            className="nav-logo-img"
            height="32"
            decoding="async"
            fetchpriority="high"
          />
        </a>
        
        <a
          href="#consultation"
          className="btn-nav-primary"
          onClick={(e) => {
            if (window.dataLayer) {
              window.dataLayer.push({
                event: 'nav_consultation_click',
                button_location: 'navigation',
                button_text: 'Get Free Consultation'
              });
            }

            const consultationSection = document.getElementById('consultation');
            if (consultationSection) {
              e.preventDefault();
              consultationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          Get Free Consultation
        </a>
      </div>
    </header>
  );
};

export default Nav;
