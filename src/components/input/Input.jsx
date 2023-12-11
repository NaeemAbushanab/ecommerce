import React from "react";

function Input({
  name,
  type = "text",
  id,
  title,
  value,
  onChange,
  onSubmit,
  errors,
  touched,
  onBlur,
  customStyleInput,
  customStyleLabel,
  errorsDisplay = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className={`lable-control ${customStyleLabel}`}>
        {title}
      </label>
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        onSubmit={onSubmit}
        className={`form-control  ${customStyleInput}`}
        onBlur={onBlur}
      />
      {errorsDisplay
        ? touched[name] && errors[name] && <p className="text-danger">{errors[name]}</p>
        : ""}
    </div>
  );
}

export default Input;
