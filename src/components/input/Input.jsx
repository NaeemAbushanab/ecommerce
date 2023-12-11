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
  customStyle,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="lable-control">
        {title}
      </label>
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        onSubmit={onSubmit}
        className={`form-control ${customStyle}`}
        onBlur={onBlur}
      />
      {touched[name] && errors[name] && <p className="text-danger">{errors[name]}</p>}
    </div>
  );
}

export default Input;
