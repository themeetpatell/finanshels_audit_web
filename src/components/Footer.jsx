import { FiMail } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { buildBookingHref, getChannelForPath } from '../utils/channelLinks';
import finanshelsLogo from '../assets/finanshelslogo.svg';

const Footer = () => {
  const { pathname } = useLocation();
  const bookingHref = buildBookingHref(getChannelForPath(pathname));

  return (
    <footer className="footer-modern">
      <div className="footer-container-modern">
        <div className="footer-grid">
          <div className="footer-brand-modern">
            <div className="footer-logo-row">
              <img
                src={finanshelsLogo}
                alt="Finanshels"
                className="footer-logo"
                height="45"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="footer-tagline">Purpose-built bookkeeping and tax support for founders.</p>
            <div className="footer-contact-modern">
              <a href="mailto:contact@finanshels.com" className="footer-contact-item">
                <FiMail />
                <span>contact@finanshels.com</span>
              </a>
            </div>
          </div>

          <div className="footer-links-modern">
            <div className="footer-column">
              <h4 className="footer-heading">Services</h4>
              <a href="#pricing" className="footer-link">Pricing</a>
              <a href="#reviews" className="footer-link">Reviews</a>
              <a
                href={bookingHref}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'footer_consultation_click',
                      button_location: 'footer_links',
                      button_text: 'Book a Call'
                    });
                  }
                }}
              >
                Book a Call
              </a>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <a href="mailto:hello@finanshels.com" className="footer-link">Contact Us</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom-modern">
          <p>© {new Date().getFullYear()} Finanshels. Built for modern finance teams.</p>
          <p className="footer-tagline-small">Financial operations without the busywork.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
