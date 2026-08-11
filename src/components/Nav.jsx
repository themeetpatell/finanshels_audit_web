import { useEffect, useState } from 'react';
import finanshelsLogo from '../assets/finanshelslogo.svg';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-modern ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-offer-bar" role="region" aria-label="Limited time offer">
        <p className="nav-offer-text">
          <span className="nav-offer-tag">Limited offer</span>
          Get <strong>3 months FREE</strong> Accounting with Annual Plans &mdash; Switch Easily in <strong>48&nbsp;Hrs</strong>.
        </p>
        <a
          className="nav-offer-cta"
          href="https://api.whatsapp.com/send/?phone=971521549572&text=Hi%2C+I%27d+like+to+claim+the+3+months+FREE+Accounting+offer+on+Annual+Plans.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (window.dataLayer) {
              window.dataLayer.push({
                event: 'whatsapp_click',
                button_location: 'offer_bar',
                button_text: 'WhatsApp Now',
                phone_number: '971521549572',
              });
            }
          }}
        >
          <svg className="nav-offer-cta-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.41 9.41 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.52A11.36 11.36 0 0 0 12.04 0C5.74 0 .62 5.12.62 11.42c0 2.01.53 3.98 1.53 5.71L.5 24l6.04-1.58a11.4 11.4 0 0 0 5.5 1.4h.01c6.3 0 11.42-5.12 11.42-11.42 0-3.05-1.19-5.92-3.35-8.07z" />
          </svg>
          WhatsApp Now
        </a>
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
