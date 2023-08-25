import React, { useState, useEffect } from 'react';
import './MyAssessment.css'
import { listAll, ref, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';
import { storage } from '../firebase.js';
import { usePdfContext } from '../context/PdfContext';
import MyAssessment from './MyAssessment';
import Loader from './Loader';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';


const PdfList = () => {
  const { pdfUrls, setPdfUrls, setPdfUrlData } = usePdfContext();
  const [pdfs, setPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfToDelete, setPdfToDelete] = useState(null);
  const [viewType, setViewType] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const handleOpenPdf = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
  };
  useEffect(() => {
    const pdfsStorageRef = ref(storage, 'educare');
    listAll(pdfsStorageRef)
      .then(async (result) => {
        const pdfUrlPromises = result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const name = extractPdfNameFromPath(item.fullPath);
          return { url, name, ref: item };
        });

        Promise.all(pdfUrlPromises)
          .then(async (pdfs) => {
            const pdfsWithMetadata = await Promise.all(
              pdfs.map(async (pdf) => {
                const metadata = await getMetadata(pdf.ref);
                const sizeInMB = (metadata.size / (1024 * 1024)).toFixed(2);
                let sizeFormatted;
                if (sizeInMB < 1) {
                  const sizeInKB = (metadata.size / 1024).toFixed(2);
                  sizeFormatted = `${sizeInKB} KB`;
                } else {
                  sizeFormatted = `${sizeInMB} MB`;
                }
                const currentDate = new Date(metadata.timeCreated);
                const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
                return { ...pdf, sizeFormatted, creationDate: formattedDate };
              })
            );

            setPdfs(pdfsWithMetadata);
            setPdfUrlData(pdfsWithMetadata);
            setPdfUrls(false);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error getting PDF URLs:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error listing PDFs:', error);
        setIsLoading(false);
      });
  }, [pdfUrls]);

  // const handleDeletePdf = async (pdfRef) => {
  //   try {
  //     await deleteObject(pdfRef);
  //     setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.ref !== pdfRef));
  //   } catch (error) {
  //     console.error('Error deleting PDF:', error);
  //   }
  // };

  const extractPdfNameFromPath = (path) => {
    const pathParts = path.split('/');
    return pathParts[pathParts.length - 1];
  };
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const handlePdfViewerOpen = () => {
    setIsPdfViewerOpen(true);
  };

  const handlePdfViewerClose = () => {
    setIsPdfViewerOpen(false);
  };
  const handleSharePdf = () => {
    setIsPdfViewerOpen(false);
  };
  const handleDeletePdf = async (pdfRef) => {
    try {
      await deleteObject(pdfRef);
      setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.ref !== pdfRef));
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };
  
  return (
    <>
    <div className="view-dropdown">
      <label htmlFor="viewType">Select View:</label>
      <select id="viewType" value={viewType} onChange={handleViewTypeChange}>
        <option value="list">List View</option>
        <option value="table">Table View</option>
        <option value="detail">Detail View</option>
        <option value="tile">Tile View</option>
        <option value="icon">Icon View</option>
        <option value="card">Card View</option>
      </select>
    </div>

    {isLoading && <Loader />}
      {!isLoading && (
        <div className="pdf-list flex flexW">
          
            {viewType == 'table' && <TableContainer component={Paper}>
              <Table aria-label="PDF table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pdfs.map((pdfdata, index) => (
                    <TableRow key={index}>
                      <TableCell>{pdfdata.name}</TableCell>
                      <TableCell>{pdfdata.sizeFormatted}</TableCell>
                      <TableCell>{pdfdata.creationDate}</TableCell>
                      <TableCell className='flex'>
                      <div className="flex">
                        <IconButton
                          onClick={() => handleOpenPdf(pdfdata)}
                          aria-label="View PDF"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleSharePdf(pdfdata.url)}
                          aria-label="Share PDF"
                        >
                          <ShareIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeletePdf(pdfdata.ref)}
                          aria-label="Delete PDF"
                        >
                          <DeleteIcon />
                        </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableBody>
                  {pdfs.map((pdfdata, index) => (
                    <p>{pdfdata.name}</p>
                    // <MyAssessment
                    //   pdfdata={pdfdata}
                    //   key={index}
                    //   setPdfToDelete={setPdfToDelete}
                    //   pdfToDelete={pdfToDelete}
                    //   handleDeletePdf={handleDeletePdf}
                    // />
                  ))}
                </TableBody> */}
              </Table>
            </TableContainer>}
           
           {viewType !=='table' && pdfs.map((pdfdata, index) => (
            <MyAssessment
              pdfdata={pdfdata}
              key={index}
              setPdfToDelete={setPdfToDelete}
              pdfToDelete={pdfToDelete}
              handleDeletePdf={handleDeletePdf}
              viewType={viewType}
            />
          ))}
        </div>
      )}
      </>
  );
};

export default PdfList;
