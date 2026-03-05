/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import CenterLine from './components/CenterLine';
import SectionIndicator from './components/SectionIndicator';
import ScrollArrow from './components/ScrollArrow';
import EntryGate from './components/sections/EntryGate';
import Home from './pages/Home';
import Aleph from './pages/Aleph';
import Admin from './pages/Admin';
import PortfolioPage from './pages/PortfolioPage';

gsap.registerPlugin(ScrollTrigger);

function Layout() {
  const [entered, setEntered] = useState(false);
  useLenis();
  const location = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger when route changes to ensure animations are correct
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Cursor />
      
      {!entered && <EntryGate onEnter={() => setEntered(true)} />}

      <div className={`transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <ScrollArrow />
        <SectionIndicator />
        
        <div className="relative w-full">
          <CenterLine />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aleph" element={<Aleph />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
