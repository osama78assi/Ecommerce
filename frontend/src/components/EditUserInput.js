function EditUserInput({ label, type, id, name, placeholder, val, setVal }) {
  return (
    <div className={`flex flex-col items-center gap-2 w-full sm:flex-row`}>
      <label
        htmlFor={id}
        className="text-[1rem] font-medium basis-[100%] sm:basis-[25%]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={val}
        onChange={(e) => setVal?.(e.target.value)}
        placeholder={placeholder}
        className="block p-2 border-[1px] border-blue-100 rounded-lg outline-none transition-all focus-within:focus:border-blue-300 basis-[100%] sm:basis-[75%]"
      />
    </div>
  );
}

export default EditUserInput;
