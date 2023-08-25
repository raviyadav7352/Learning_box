import React, { useEffect, useState } from 'react';
import './PdfUploadForm.css'
import { usePdfContext } from '../context/PdfContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import {db, storage } from '../firebase.js';
import DynamicSVG from './DynamicSVG';

const PdfUploadForm = () => {
  const { pdfUrls, setPdfUrls } = usePdfContext();
  const [isProgress, setProgress] =useState(false)
  const [isUpload, setUpload] =useState(false)
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

  const addPdfMetadata = async (pdfMetadata) => {
    const pdfsCollection = collection(db, 'pdfs');
    await addDoc(pdfsCollection, pdfMetadata);
  };
useEffect(()=>{
 setTimeout(() => {
  setProgress(false)
 }, 6000);
},[isProgress])
  return (
    <div className="new-assessment p30 border-dashed borderR12 flex-col alignC gap10 bg-main pos-rel">
      {selectedFile && isUpload && <p className='pos-abs top0 left w-100 ellipsis textC color-theme fs12 fw-500'>{selectedFile.name}</p>}

      { (selectedFile && isProgress) && <div className="progress-bar">

        <div className="flexM progress-fill"  style={{width:`${uploadProgress}%`}}> <span className='pX10'>{uploadProgress.toFixed(2)}%</span></div>
      </div>}
      <div className="flex gap20">
        <button type="button" className="plus-icon border0 flexM  bg-white borderR-full cur">
          <label htmlFor="pdfUploader" className='pdf-box-label cur flexM'>
            <input className='pdf-file-input dN' id='pdfUploader' type="file" accept=".pdf" onChange={handleFileChange} />
            <DynamicSVG svgName={'plus'} />
          </label>
        </button>
        { isUpload && <button type="button" className="plus-icon border0 flexM  bg-white borderR-full cur"  onClick={handleUpload}>
          <span className="material-symbols-outlined">
            upload
          </span></button>}
      </div>

      <h4 className="color-theme fs18 fw-500">Uplaod New Pdf</h4>
      <p className="fs12 fw-500 color-theme textC">From here you can add PDF.</p>
    </div>
  );
};

export default PdfUploadForm;
