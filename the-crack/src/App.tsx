import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import ScrollToTop from './components/ui/ScrollToTop';
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';
import PropertyCompareDrawer from './components/property/PropertyCompareDrawer';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Agents from './pages/Agents';
import AgentProfile from './pages/AgentProfile';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import ListProperty from './pages/ListProperty';
import About from './pages/About';
import Journal from './pages/Journal';
import ArticlePage from './pages/Article';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <FavoritesProvider>
            <CompareProvider>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-[#F5F2EC] dark:bg-[#0C0C0A] dark:text-[#F5F2EA] transition-colors duration-300 selection:bg-[#A88A58]/20 selection:text-[#1B1B19]">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:slug" element={<PropertyDetail />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/locations/:slug" element={<LocationDetail />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/agents/:slug" element={<AgentProfile />} />
                  <Route path="/list-property" element={<ListProperty />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:slug" element={<ArticlePage />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <PropertyCompareDrawer />
            </div>
          </CompareProvider>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
  );
}
