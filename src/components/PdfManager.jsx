import React from 'react';
import PdfUploadForm from './PdfUploadForm';
import PdfList from './PdfList';
import DynamicSVG from './DynamicSVG';

const PdfManager = () => {
  return (
    <div>
            <PdfUploadForm></PdfUploadForm>

        <div className="flex gap30 sm-gap15">
            <PdfList></PdfList>
        </div>
    </div>
  );
};

export default PdfManager;
