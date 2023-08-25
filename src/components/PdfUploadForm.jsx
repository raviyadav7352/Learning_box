import React, { useEffect, useState } from 'react';
import './PdfUploadForm.css'
import { usePdfContext } from '../context/PdfContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { db, storage } from '../firebase.js';
import DynamicSVG from './DynamicSVG';

const PdfUploadForm = () => {
  const { pdfUrls, setPdfUrls } = usePdfContext();
  const [isProgress, setProgress] = useState(false)
  const [isUpload, setUpload] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUpload(true)
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const pdfsStorageRef = ref(storage, 'educare/' + selectedFile.name);
      const uploadTask = uploadBytesResumable(pdfsStorageRef, selectedFile);
      uploadTask.on('state_changed', (snapshot) => {
        setProgress(true)
        setUpload(false)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setPdfUrls('true');
        console.log("updated");
      });

      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(pdfsStorageRef);

        const pdfMetadata = {
          name: selectedFile.name,
          url: downloadURL,
        };

        await addPdfMetadata(pdfMetadata);

        // Update PDF URLs in context


        setSelectedFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error uploading PDF:', error);
      }
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setUpload(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const addPdfMetadata = async (pdfMetadata) => {
    const pdfsCollection = collection(db, 'pdfs');
    await addDoc(pdfsCollection, pdfMetadata);
  };
  useEffect(() => {
    setTimeout(() => {
      setProgress(false)
    }, 6000);
  }, [isProgress])
  return (
    <div
      className="new-assessment p16 border-dashed borderR12 flex-col w-300 gap10 bg-main pos-rel mB20 gap10 overf-H"
      onDrop={handleDrop} // Handle dropped files
      onDragOver={handleDragOver} // Handle drag over
    >
      {selectedFile && isUpload && (
        <div className='border1 p5 borderR6  ellipsis flexC justifySB color-theme fs12 fw-500'>{selectedFile.name}
          <button className='u-btn close-btn' onClick={() =>setSelectedFile(null)}>
            <DynamicSVG svgName={'smclose'} />
          </button>
        </div>
      )}

      {selectedFile && isProgress && (
        <div className="progress-bar">
          <div className="flexM progress-fill" style={{ width: `${uploadProgress}%` }}>
            <span className='pX10'>{uploadProgress.toFixed(2)}%</span>
          </div>
        </div>
      )}
      <div className={`flexC justifySB ${(selectedFile && isProgress) ? 'mT10' : ''}`}>
          <label htmlFor="pdfUploader" className='pdf-box-label cur whiteS flexC gap10 pX10 bg-white border1 color-theme'>
            <input className='pdf-file-input dN' id='pdfUploader' type="file" accept=".pdf" onChange={handleFileChange} />
            Choose File
            <span className="material-symbols-outlined color-theme">
              upload
            </span>
          </label>
        <button type="button" className="u-btn u-btn-primary " disabled={!selectedFile || !isUpload} onClick={handleUpload}>
          upload
        </button>
      </div>

    </div>
  );
};

export default PdfUploadForm;
