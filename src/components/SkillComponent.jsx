import React, { useState } from "react";
import DynamicSVG from "./DynamicSVG";

const SkillSet = ({ initialSkills, onSkillAdd, onSkillRemove }) => {
    const [skills, setSkills] = useState([...initialSkills]);
    const [skillInput, setSkillInput] = useState("");
    const suggestedSkills = [
        "HTML5",
        "CSS3",
        "JavaScript",
        "JavaScript ES6+",
        "React",
        "Node.js",
        "Angular"
    ];
    const handleAddSkill = () => {
        if (skills.includes(skillInput) || skillInput.trim() === "") {
            return;
        }
        setSkills([...skills, skillInput]);
        onSkillAdd(skillInput); // Pass the new skill to the onSkillAdd function
        setSkillInput("");
    };
    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
        onSkillRemove(skillToRemove); // Call the onSkillRemove function with the removed skill
    };
    return (
        <div className="pos-rel">
            <label className="u-form-label">Skills</label>
            <div className="u-form-group pos-rel skill-wrap">
                <div className="skill-box p16 flex flexW gap10">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-set-item flexC gap5 color-theme fs12">
                            {skill}
                            <button
                                type="button"
                                className="u-btn close-btn"
                                onClick={() => handleRemoveSkill(skill)}
                            >
                                <DynamicSVG svgName={'smclose'} />
                            </button>
                        </div>
                    ))}
                    {!skills.length > 0 && <p> No Skill added</p>}
                </div>
                <div className="flexC justifySB pos-rel">
                                <input
                                    type="text"
                                    className="u-form-control border0 special no-arrow-icon"
                                    name="skills"
                                    placeholder="Type here"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    list="suggestedSkillsList"
                                />
                                <datalist id="suggestedSkillsList">
                                    {suggestedSkills.map((suggestedSkill, index) => (
                                        <option key={index} value={suggestedSkill} />
                                    ))}
                                </datalist>
                                <button
                                    type="button"
                                    className="u-btn u-btn-primary sm skill-add-btn pos-abs"
                                    disabled={!skillInput}
                                    onClick={handleAddSkill}
                                >
                                    Add
                                </button>
                            </div>
            </div>
        </div>
    );
}

export default SkillSet;
