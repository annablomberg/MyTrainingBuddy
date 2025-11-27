import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Components/LandingPage';
import { ChatPage } from './Components/ChatPage';
import { FriendsPage } from './Components/FriendsPage';
import { AboutPage } from './Components/AboutPage';
import { LoginPage } from './Components/LoginPage';
import Navbar from './Components/NavBar';
import { SignUpPage } from './Components/SignUpPage';
import { AuthProvider } from './Components/AuthContext';
import { ProfilePage } from './Components/ProfilePage';

const App: React.FC = () => {
 return (
  <AuthProvider>
  <Router>
    <Navbar />
    <div>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/chatpage/:id" element={<ChatPage />} />
      <Route path="/friendspage/:id" element={<FriendsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    
    </div>
  </Router>
  </AuthProvider>
 );
};

export default App
