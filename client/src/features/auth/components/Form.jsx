import React from "react";

const Form = ({ label, placeholder, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={label}
        id={label}
        name={label}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Form;
