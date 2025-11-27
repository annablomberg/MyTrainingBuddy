import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Components/LandingPage';
import { ChatPage } from './Components/ChatPage';
import { FriendsPage } from './Components/FriendsPage';
import { AboutPage } from './Components/AboutPage';
import { LoginPage } from './Components/LoginPage';
import Navbar from './Components/NavBar';

const App: React.FC = () => {
 return (
  <Router>

    <Navbar />

    <div>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/chatpage/:id" element={<ChatPage />} />
      <Route path="/friendspage/:id" element={<FriendsPage />} />
      <Route path="/loginpage/:id" element={<LoginPage />} />
      </Routes>
    

    </div>
  </Router>
 );
};

export default App
