import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import PdfViewer from './PdfViewer';

const PdfTable = ({
    pdfs,
    setIsPdfViewerOpen,
    handleSharePdf,
    handleDeletePdf,
}) => {
    const [pdfToDelete, setPdfToDelete] = useState(null);
    const [openPdfIndex, setOpenPdfIndex] = useState(-1); // Initialize as -1 to keep all PDFs closed

    const handleOpenConfirmation = (pdf) => {
        setPdfToDelete(pdf);
    };
    const handleClosePdfViewer = () => {
        setOpenPdfIndex(-1);
    };

    const handlePdfViewerOpen = (index) => {
        setOpenPdfIndex(index);
        setIsPdfViewerOpen(true);
    };

    const handleCloseConfirmation = () => {
        setPdfToDelete(null);
    };
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="PDF table">
                <TableHead className='bg-main '>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Size</TableCell>
                        <TableCell align='right'>Date Created</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pdfs.map((pdfdata, index) => (
                        <TableRow key={index}>
                            <TableCell>{pdfdata.name}</TableCell>
                            <TableCell align='right'>{pdfdata.sizeFormatted}</TableCell>
                            <TableCell align='right'>{pdfdata.creationDate}</TableCell>
                            <TableCell align='right' >
                                <div className="flex pos-rel justifyE action-box">
                                    <PdfViewer pdfUrl={pdfdata.url} isPdfViewerOpen={openPdfIndex === index} setIsPdfViewerOpen={setIsPdfViewerOpen} onClose={handleClosePdfViewer}  />
                                    <IconButton
                                        onClick={() => handlePdfViewerOpen(index)} 
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
                                        onClick={() => handleOpenConfirmation(pdfdata)}
                                        aria-label="Delete PDF"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    {pdfToDelete === pdfdata && (
                                        <div className="confirmation-box pos-abs border1 borderR12 p10 right0 bg-white">
                                            <p className='fs14 color-theme'>Are you sure you want to delete this PDF?</p>
                                            <div className="confirmation-buttons ">
                                                <button className='u-btn u-btn-plain  xsm mR10' onClick={() => handleDeletePdf(pdfdata.ref)} >
                                                    Yes
                                                </button>
                                                <button className='u-btn u-btn-primary xsm' onClick={handleCloseConfirmation} >
                                                    No
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* ... (Confirmation box logic here) */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PdfTable;
