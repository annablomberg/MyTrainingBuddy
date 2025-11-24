import './App.css'
import React, {useState} from "react";
import Navbar from './Components/NavBar';

type Page = "home" | "chat" | "friends" | "about";

const App: React.FC = () => {

const [currentPage, setCurrentPage] = useState<Page>("home");

return (
    <div className="min-h-screen">
      <Navbar current={currentPage} />
      <main id="home" className="landing-page pt-20">
        <section className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-black mb-6">
            Find workout sessions near you!
          </h1>
          <h2 className="text-xl font-semibold text-black-600 mb-6">
            Also find new friends to exercise with!
          </h2>

        </section>
      </main>
    </div>
  );
};

export default App
