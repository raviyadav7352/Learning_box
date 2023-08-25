import React, { useEffect, useState } from "react";
import './CreateNewAssessment.css';
import DynamicSVG from "./DynamicSVG";
import Dropdown from "./DropdownComponent";
import SkillSet from "./SkillComponent";

const CreateNewAssessment = ({ isOpen, onClose, onAssessmentData }) => {
    // State variables to manage form inputs
    const [assessmentName, setAssessmentName] = useState("");
    const [selectedPurpose, setSelectedPurpose] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className === 'u-modal-wrapper')  onClose();
        };
        if (isOpen) window.addEventListener("click", handleClickOutside);
        
        return () =>  window.removeEventListener("click", handleClickOutside);
    
    }, [isOpen, onClose]);
    
    // List of purposes for dropdown
    const purposes = [
        "education",
        "job",
        "certification",
        "Skillup",
        "Job Change"
    ];

    // List of description options for dropdown
    const Description = [
        "Subtraction",
        "Mathematics",
        "English"
    ];
    const isFormValid = assessmentName && selectedPurpose && selectedDescription && selectedSkills.length > 0 && duration;

    // Clear the form inputs
    const clearForm = () => {
        setAssessmentName('');
        setDuration("");
        setSelectedDescription("");
        setSelectedSkills([]);
        setSelectedPurpose("");
    };

    // Handle changes in the duration input field
    const handleDurationChange = (event) => {
        const input = event.target.value;
        const regex = /^([0-9]{0,2}):?([0-9]{0,2}):?([0-9]{0,2})$/;

        if (regex.test(input)) {
            const matches = input.match(regex);
            const hours = matches[1] || "";
            const minutes = matches[2] || "";
            const seconds = matches[3] || "";

            const formattedInput = `${hours}${hours && minutes ? ":" : ""}${minutes}${(hours || minutes) && seconds ? ":" : ""}${seconds}`;
            setDuration(formattedInput);
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Update the parent component's state with assessment data
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;

        onAssessmentData({
            assessmentName,
            selectedPurpose,
            selectedDescription,
            duration,
            selectedSkills,
            date: formattedDate,
            userCount: '',
            users: [{ user: 'RK' }]
        });

        // Close the modal
        clearForm()
        onClose();
    };

    // Handle adding a new skill to the selected skills
    const handleSkillAdd = (newSkill) => {
        setSelectedSkills(prevSkills => [...prevSkills, newSkill]);
    };

    // Handle removing a skill from the selected skills
    const handleSkillRemove = (skillToRemove) => {
        setSelectedSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove));
    };
    return (
        <>
         {isOpen && <div  className="pos-fixed u-modal-backdrop w-100 h-100">
            <div className="u-modal-wrapper">
                <div className="create-new-modal-body border1 borderR12">
                    <div className="flexC justifySB p30 border-bottom create-modal-header">
                        <h2 className="fs20 color-theme fW-bold sm-dN">Create New Assessment</h2>
                        <h2 className="fs14 color-theme fW-bold dN sm-block">Sub Section Details</h2>
                        <button className="u-btn close-btn" onClick={onClose}>
                            <DynamicSVG svgName={'lgclose'} />
                        </button>
                    </div>
                    <div className="pX30 pY20 create-modal-content">
                        <form className="flex-col gap20">
                            <div className="pos-rel">
                                <div className="u-form-group pos-rel">
                                    <label className="u-form-label">Name of Assessment</label>
                                    <input
                                        type="text"
                                        className="u-form-control"
                                        name="assessment"
                                        value={assessmentName}
                                        onChange={(e) => setAssessmentName(e.target.value)}
                                        placeholder="Type here"
                                    />
                                </div>
                            </div>
                            <Dropdown
                                label="Purpose of the test is"
                                options={purposes}
                                value={selectedPurpose}
                                onChange={(e) => setSelectedPurpose(e.target.value)}
                                placeholder="Select"
                            />
                            <Dropdown
                                label="Description"
                                options={Description}
                                value={selectedDescription}
                                onChange={(e) => setSelectedDescription(e.target.value)}
                                placeholder="Select"
                            />
                            <SkillSet
                                initialSkills={[]}
                                onSkillAdd={handleSkillAdd}
                                onSkillRemove={handleSkillRemove}
                            />
                            <div className="pos-rel">
                                <div className="u-form-group pos-rel">
                                    <label className="u-form-label">Duration of assessment</label>
                                    <input
                                        type="text"
                                        className="u-form-control"
                                        name="duration"
                                        placeholder="HH:MM:SS"
                                        value={duration}
                                        onChange={handleDurationChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-100 create-modal-footer pX30 pY20 border-top">
                        <button
                            type="button"
                            disabled={!isFormValid}
                            className="u-btn u-btn-primary border w-100"
                            onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>}
        </>
       
    );
};

export default CreateNewAssessment;
