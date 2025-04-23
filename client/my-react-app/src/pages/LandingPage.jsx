import { useEffect } from 'react';
import Leaderboard from '../components/leaderboard';
import TrendingSection from '../components/trending';
import ShopByCategory from '../components/shopByCategory';
import ByGender from '../components/shopbygender';

const LandingPage = () => {
//   useEffect(() => {
//     fetch('http://localhost:5000/')
//       .then(res => res.text())
//       .then(data => console.log("🎯 Server says:", data))
//       .catch(err => console.error("❌ Errorrrrrrr connecting to server:", err));
//   }, []);
  

  return (
    <>
    <div style={{ marginTop: '-120px' }}>
      <Leaderboard />
      <TrendingSection />
      <ShopByCategory />
      <ByGender />
    </div>
      
    </>
  );
};

export default LandingPage;
