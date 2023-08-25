import React, { useState, useEffect } from "react";
import './NewAssessment.css';
import DynamicSVG from "./DynamicSVG";
import CreateNewAssessment from "./CreateNewAssessment";
import MyAssessment from "./MyAssessment";
import { usePdfContext } from "../context/PdfContext";
import PdfUploadForm from "./PdfUploadForm";

const NewAssessment = ({ assessmentTotal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {pdfUrlData} =usePdfContext()
    const [assessmentDataArray, setAssessmentDataArray] = useState([
      
    ]);
    
    const handleToggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleAssessmentData = (data) => {
        setAssessmentDataArray(prevDataArray => [...prevDataArray, data]);
    };

    const handleDeleteAssessment = (index) => {
        const newDataArray = [...assessmentDataArray];
        newDataArray.splice(index, 1);
        setAssessmentDataArray(newDataArray);
    };

    useEffect(() => {
        assessmentTotal(assessmentDataArray.length);
    }, [assessmentTotal, assessmentDataArray.length]);

    return (
        <>
            <div className="new-assessment p30 border-dashed borderR12 flex-col alignC gap10 bg-main">
                <button type="button" className="plus-icon border0 flexM p10 bg-white borderR-full cur" onClick={handleToggleModal}>
                    <DynamicSVG svgName={'plus'} />
                </button>
                <PdfUploadForm></PdfUploadForm>

                <h4 className="color-theme fs18 fw-500">New PDF</h4>
                <p className="fs12 fw-500 color-theme textC">From here you can add PDF.</p>
            </div>
            <CreateNewAssessment isOpen={isModalOpen} onClose={handleToggleModal} onAssessmentData={handleAssessmentData} />
            {pdfUrlData.map((pdfdata, index) => (
                <MyAssessment
                    key={index}
                    pdfdata={pdfdata}
                    onDelete={() => handleDeleteAssessment(index)}
                />
            ))}
        </>
    );
}

export default NewAssessment;
