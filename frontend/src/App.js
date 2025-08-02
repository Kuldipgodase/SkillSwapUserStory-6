import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SkillsBrowser from './components/SkillsBrowser';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SkillsBrowser />} />
          <Route path="/skills" element={<SkillsBrowser />} />
        </Routes>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 2000,
              theme: {
                primary: '#10B981',
                secondary: '#ECFDF5',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#EF4444',
                secondary: '#FEF2F2',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;