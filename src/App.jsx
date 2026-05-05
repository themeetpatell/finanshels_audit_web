import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import NewHomePage from './pages/NewHomePage';
import NewHomePageBing from './pages/NewHomePageBing';
import ThankYou from './pages/ThankYou';

function App() {
  const homePage = (
    <Layout>
      <NewHomePage />
    </Layout>
  );

  const bingHomePage = (
    <Layout>
      <NewHomePageBing />
    </Layout>
  );

  return (
    <Routes>
      <Route path="/" element={homePage} />
      <Route path="/-bing" element={bingHomePage} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
