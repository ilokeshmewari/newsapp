import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import BlogPage from "./pages/BlogPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
