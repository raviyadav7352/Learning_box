import React, { createContext, useContext, useState } from 'react';

const PdfContext = createContext();

export const usePdfContext = () => useContext(PdfContext);

export const PdfProvider = ({ children }) => {
    const [pdfUrls, setPdfUrls] = useState([]);
    const [pdfUrlData, setPdfUrlData] = useState([]);
  
    const updatePdfUrls = (newUrls) => {
      setPdfUrls(newUrls);
      console.log("context updated");
    };
  
    const contextValue = {
      pdfUrls,
      setPdfUrls,
      updatePdfUrls,
      setPdfUrlData,
      pdfUrlData
    };
    return (
      <PdfContext.Provider value={contextValue}>
        {children}
      </PdfContext.Provider>
    );
  };
  