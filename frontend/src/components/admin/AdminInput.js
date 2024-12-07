import { useState } from "react";

function AdminInput({
  type,
  name,
  id,
  label,
  defaultValue,
  classes = "",
  placeholder,
  required = false,
  sterilizer,
  disabled,
}) {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");

  function hanldeChangeInput(e) {
    if (sterilizer) {
      const condition = sterilizer?.(e.target.value);
      if (condition) {
        setValue(e.target.value);
      }
    } else {
      setValue(e.target.value);
    }
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {type !== "textarea" ? (
        <input
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={hanldeChangeInput}
          className={classes}
          required={required}
        />
      ) : (
        <textarea
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={hanldeChangeInput}
          className={classes}
          required={required}
        />
      )}
    </>
  );
}

export default AdminInput;
