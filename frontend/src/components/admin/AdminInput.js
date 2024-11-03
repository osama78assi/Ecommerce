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
}) {
  const [value, setValue] = useState("");

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
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={hanldeChangeInput}
          className={classes}
          required={required}
          {...(defaultValue ? { defaultValue } : {})}
        />
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={hanldeChangeInput}
          className={classes}
          required={required}
          {...(defaultValue ? { defaultValue } : {})}
        />
      )}
    </>
  );
}

export default AdminInput;
