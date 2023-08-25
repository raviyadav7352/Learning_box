import React from 'react';
import PdfUploadForm from './PdfUploadForm';
import PdfList from './PdfList';
import DynamicSVG from './DynamicSVG';

const PdfManager = () => {
  return (



    <div className="flex-col gap30 sm-gap15">
      <PdfUploadForm></PdfUploadForm>
      <PdfList></PdfList>
    </div>
  );
};

export default PdfManager;
