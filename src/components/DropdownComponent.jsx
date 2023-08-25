import React from "react";
import DynamicSVG from "./DynamicSVG";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder
}) => {
  return (
    <div className="u-dropdown">
      <div className="nf-dropdown-body pos-rel">
        <label className="u-form-label">{label}</label>
        <select
          className="u-form-control"
          value={value}
          onChange={onChange}
          title={`${label} List`}
        >
          <option value="" className="">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="select-arrow">
          <DynamicSVG svgName={'arrowDown'} />
        </div>
      </div>
      {error && <p className="u-error-text-sp">{error}</p>}
    </div>
  );
};

export default Dropdown;
