import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCalendar, FiMail, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './ThankYou.css';

const ThankYou = () => {
  useEffect(() => {
    // Fire GTM event on page load
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'thank_you_page_view',
        page_type: 'conversion',
        conversion_type: 'form_submission'
      });
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="thank-you-page">
      <div className="thank-you-container">
        <div className="thank-you-content">
          <div className="success-icon">
            <FiCheckCircle />
          </div>
          
          <h1 className="thank-you-title">Thank You for Reaching Out!</h1>
          
          <p className="thank-you-message">
            We've received your consultation request and one of our audit experts will contact you within 24 hours.
          </p>

          <div className="next-steps">
            <h2 className="next-steps-title">What Happens Next?</h2>
            
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">
                  <FiMail />
                </div>
                <h3>Confirmation Email</h3>
                <p>You'll receive a confirmation email with your request details shortly.</p>
              </div>

              <div className="step-card">
                <div className="step-icon">
                  <FiCalendar />
                </div>
                <h3>Expert Review</h3>
                <p>Our team will review your requirements and prepare a customized assessment.</p>
              </div>

              <div className="step-card">
                <div className="step-icon">
                  <FiPhone />
                </div>
                <h3>Personal Call</h3>
                <p>We'll reach out within 24 hours to schedule your free consultation.</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Need Immediate Assistance?</h3>
            <p>Don't wait for our call - reach out to us now!</p>
            
            <div className="contact-buttons">
              <a
                href="https://api.whatsapp.com/send/?phone=971521549572&text=Hi+I+just+submitted+a+consultation+request+for+Audit+Services.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="contact-button whatsapp-button"
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'whatsapp_click',
                      button_location: 'thank_you_page',
                      button_text: 'Chat on WhatsApp',
                      phone_number: '971521549572'
                    });
                  }
                }}
              >
                <FaWhatsapp />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+971521549572"
                className="contact-button phone-button"
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'phone_call_click',
                      button_location: 'thank_you_page',
                      button_text: 'Call Us',
                      phone_number: '+971521549572'
                    });
                  }
                }}
              >
                <FiPhone />
                <span>Call Us Now</span>
              </a>
            </div>
          </div>

          <div className="return-home">
            <Link to="/" className="btn-home">Return to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
