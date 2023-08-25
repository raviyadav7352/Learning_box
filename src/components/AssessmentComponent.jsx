import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './AssessmentComponent.css';
import DynamicSVG from "./DynamicSVG";
import NewAssessment from "./NewAssessment";
import PdfUploadForm from "./PdfUploadForm";
import PdfList from "./PdfList";
import { useAppContext } from "../context/AppContext";
import PdfManager from "./PdfManager";

const AssessmentComponent = () => {
    const { showSidebar, setShowSidebar} = useAppContext(); 
    const [totalAssessment, setTotalAssessment] = useState(0);
    const [showAssessmentOverview, setShowAssessmentOverview] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="u-assessment-wrapper">
            <header>
                <div className="u-assessment-menu w-100 flexC gap20">
                    <div className="u-assessment-menu-item flexC gap14 pL20">
                        <div className="sidebar-menu-mobile dN sm-flex flexM borderR-full">
                            <button className="close-btn" onClick={toggleSidebar}>
                                <DynamicSVG svgName={'menu'} />
                            </button>
                        </div>
                        <a href="sdklcxv" className="color-theme fs20 fW-bold">
                            Assessment
                        </a>
                    </div>
                    <div className="sm-dN">
                        <DynamicSVG svgName={'vertLineBig'} />
                    </div>
                    <div className="u-assessment-menu-itm h-100 sm-w-100 sm-textC flexM">
                        <NavLink to="/assessment" className="u-assessment-item-link flexM h-100 fs14 fW-bold sm-flex1">
                            My Assessments
                        </NavLink>
                        <NavLink to="/" className="u-assessment-item-link flexM h-100 dN sm-flex fs14 fW-bold sm-flex1">
                            Unstop Assessments
                        </NavLink>
                    </div>
                </div>
            </header>

            <div className="p20 assessment-contain-box">
                <div className={`mB40 sm-mB20 ${showAssessmentOverview ? 'sm-dN' : ''}`}>
                    <h4 className="fs18 color-theme fw-500 mB16">Assessment Overview</h4>
                    <div className="assessment-overview border1 borderR12">

                        <div className="overview pY16 pX20">
                            <h4 className="fs14 color-theme fW-bold mB16">Total Assessment</h4>
                            <div className="flexC gap10">
                                <div className="overview-icon">
                                    <DynamicSVG svgName={'equal'} />
                                </div>

                                <h3 className="color-theme fs20 fW-bold">{totalAssessment}</h3>
                            </div>
                        </div>
                        <div className="overview pY16 pX20">
                            <h4 className="fs14 color-theme fW-bold mB16">Candidates</h4>
                            <div className="flexC gap20">
                                <div className="">
                                    <DynamicSVG svgName={'users'} />
                                </div>
                                <div className="">
                                    <h3 className="color-theme fs20 fW-bold flexC">11,145
                                        <span className="color-success fs12 fw-500">&nbsp;+89</span></h3>
                                    <p className="fs12 color-theme fw-500">Total Candidate</p>
                                </div>
                                <DynamicSVG svgName={'vertLineBig'} />
                                <div className="">
                                    <h3 className="color-theme fs20 fW-bold flexC">114
                                        <span className="color-success fs12 fw-500">&nbsp;+89</span></h3>
                                    <p className="fs12 color-theme fw-500">Who Attamped</p>
                                </div>
                            </div>
                        </div>
                        <div className="overview pY16 pX20">
                            <h4 className="fs14 color-theme fW-bold mB16">Candidates Source</h4>
                            <div className="flexC gap20">
                                <DynamicSVG svgName={'globe'} />
                                <div className="">
                                    <h3 className="color-theme fs20 fW-bold flexC">11,000
                                        <span className="color-success fs12 fw-500">&nbsp;+89</span></h3>
                                    <p className="fs12 color-theme fw-500">E-mail</p>
                                </div>
                                <DynamicSVG svgName={'vertLineBig'} />

                                <div className="">
                                    <h3 className="color-theme fs20 fW-bold flexC">145
                                        <span className="color-success fs12 fw-500">&nbsp;+89</span></h3>
                                    <p className="fs12 color-theme fw-500">Social Share</p>
                                </div>
                                <DynamicSVG svgName={'vertLineBig'} />

                                <div className="">
                                    <h3 className="color-theme fs20 fW-bold flexC">145
                                        <span className="color-success fs12 fw-500">&nbsp;+89</span></h3>
                                    <p className="fs12 color-theme fw-500">Unique Link</p>
                                </div>
                            </div>
                        </div>
                        <div className="overview pY16 pX20">
                            <h4 className="fs14 color-theme fW-bold mB16">Total Purpose</h4>
                            <div className="flexC gap10">
                                <DynamicSVG svgName={'purpose'} />
                                <h3 className="color-theme fs20 fW-bold">11</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flexC justifySB mB16">
                        <h4 className="fs18 color-theme fw-500 ">My Assessment</h4>
                        <div className="filter-icon-box dN sm-flex flexC">
                            <button type="button" className="close-btn  "><DynamicSVG svgName={'search'} /></button>
                            <button type="button" className="close-btn  "><DynamicSVG svgName={'filter'} /></button>
                            <button type="button" className="close-btn  cur" onClick={() => setShowAssessmentOverview(!showAssessmentOverview)}><DynamicSVG svgName={'bars'} /></button>
                        </div>
                    </div>
                    <PdfManager></PdfManager>
                    
                </div>
            </div>
        </div>
    );
};
export default AssessmentComponent;