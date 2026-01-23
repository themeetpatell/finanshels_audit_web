import { FaWhatsapp } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { brand } from '../content/countries';

const FloatingContacts = () => {
  const phoneHref = brand.phone.replace(/\s+/g, '');

  const pushWhatsAppGtmClick = (href) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'gtm.linkClick',
        'Click URL': href,
        'gtm.elementUrl': href,
        _triggers: '193123837_46' // matches GTM trigger regex
      });
    }
  };

  return (
    <div className="floating-contacts" aria-label="Contact options">
      <a
        className="contact-btn whatsapp data-wa-track"
        href="https://api.whatsapp.com/send/?phone=971521549572&text=Hi+I+saw+your+ad+for+Audit+Services+on+google.+I%E2%80%99d+like+to+get+started.&type=phone_number&app_absent=0"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => {
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'whatsapp_click',
              button_location: 'floating_button',
              button_text: 'WhatsApp',
              phone_number: '971521549572'
            });
          }
          pushWhatsAppGtmClick('https://api.whatsapp.com/send/?phone=971521549572');
        }}
      >
        <FaWhatsapp className="contact-icon" />
        <span className="contact-label">WhatsApp</span>
      </a>
      <a
        className="contact-btn phone"
        href={`tel:${phoneHref}`}
        aria-label="Call us"
        onClick={() => {
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'phone_call_click',
              button_location: 'floating_button',
              button_text: 'Call us',
              phone_number: phoneHref
            });
          }
        }}
      >
        <FiPhoneCall className="contact-icon" />
        <span className="contact-label">Call us</span>
      </a>
    </div>
  );
};

export default FloatingContacts;
