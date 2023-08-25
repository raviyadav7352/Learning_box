// PdfViewer.jsx
import React from 'react';
import './PdfViewer.css';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import DynamicSVG from './DynamicSVG';

const PdfViewer = ({ pdfUrl, onClose,isPdfViewerOpen, setIsPdfViewerOpen }) => {
  const newPlugin = defaultLayoutPlugin();

  const handleClosePdf = () => {
    setIsPdfViewerOpen(false) // Close the PDF viewer

  };

  return (
    <>
    {isPdfViewerOpen && (
      <div className='pdf-viewer'>
        <button className="u-btn pdf-close-btn" onClick={handleClosePdf}>
          <DynamicSVG svgName={'lgclose'}/>
        </button>
        <div className="pdf-viewer-container">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
            <div className="pdf-scroll-container">
              <Viewer
                fileUrl={pdfUrl}
                plugins={[newPlugin]}
                defaultScale={SpecialZoomLevel.PageWidth}
              />
            </div>
          </Worker>
        </div>
      </div>
    )}
  </>
  );
};

export default PdfViewer;
