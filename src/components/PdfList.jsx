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
import PdfViewer from './PdfViewer';
import Dropdown from './DropdownComponent';
import PdfTable from './PdfTable';


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

  const handleOpenConfirmation = (pdf) => {
    setPdfToDelete(pdf);
  };

  const handleCloseConfirmation = () => {
    setPdfToDelete(null);
  };
  const viewTypeList = ['table','card'];
  return (
    <div>
      <Dropdown
        label="Select View"
        options={viewTypeList}
        value={viewType}
        onChange={handleViewTypeChange}
        placeholder="select view "
        stylesValue={'w-fit mB20'}
      />
<div className="">
{isLoading && <Loader />}
      {!isLoading && (
        <div className={`pdf-list flex gap20 flexW ${viewType == '' || viewType == 'card'? 'grid grid-col3 grid-sm-col1 grid-md-col2': 'w-80'} `}>
          {viewType === 'table' && (
            <PdfTable
              pdfs={pdfs}
              isPdfViewerOpen={isPdfViewerOpen}
              setIsPdfViewerOpen={setIsPdfViewerOpen}
              handleSharePdf={handleSharePdf}
              handleOpenConfirmation={handleOpenConfirmation}
              handleDeletePdf={handleDeletePdf}
              handlePdfViewerOpen={handlePdfViewerOpen}
            />
          )}

          {viewType !== 'table' && pdfs.map((pdfdata, index) => (
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
</div>

    </div>
  );
};

export default PdfList;
