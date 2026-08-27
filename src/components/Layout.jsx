import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import FloatingContacts from './FloatingContacts';
import { getChannelForPath, rememberChannel } from '../utils/channelLinks';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Persist the landing channel so the thank-you page can send the matching
  // WhatsApp message after the off-site form redirect.
  useEffect(() => {
    rememberChannel(getChannelForPath(pathname));
  }, [pathname]);

  return (
    <div className="app-shell">
      <Nav />
      <main>{children}</main>
      <FloatingContacts />
      <Footer />
    </div>
  );
};

export default Layout;
