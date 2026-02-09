import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import NewHomePage from './pages/NewHomePage';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <NewHomePage />
        </Layout>
      } />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
