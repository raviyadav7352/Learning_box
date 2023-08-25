import React from 'react';
import './App.css';
import './styles/styles.css';
import './styles/variables.css';
import './styles/common.css';
import './styles/components.css';
import './styles/commonMediaQ.css';
import SidebarComponent from './components/SidebarComponent';
import AssessmentComponent from './components/AssessmentComponent';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Import the context provider
import { PdfProvider } from './context/PdfContext'; // Import the PDF context provider

function App() {
  return (
    <AppProvider> {/* Wrap your app with the app context provider */}
      <PdfProvider> {/* Wrap your app with the PDF context provider */}
        <BrowserRouter>
          <div className="flex u-main-body ">
            <SidebarComponent />
            <div className="u-section-body w-100 h-fit pR20">
              <Routes>
                {/* Redirect to the initial path */}
                <Route path="/" element={<Navigate to="/assessment" />} />
                {/* Define your routes here */}
                <Route path="/assessment" element={<AssessmentComponent />} />
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </PdfProvider>
    </AppProvider>
  );
}

export default App;
