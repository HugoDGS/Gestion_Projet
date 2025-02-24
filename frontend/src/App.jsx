import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute"; // Importer la route protégée

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
