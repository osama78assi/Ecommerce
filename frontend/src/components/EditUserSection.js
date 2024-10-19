function EditUserSection({ children, title = "", classes = "" }) {
  return (
    <div
      className={`flex justify-center items-center flex-col rounded-lg bg-slate-100 p-3 space-y-4`}
    >
      {title !== "" ? <h1 className="text-xl font-semibold sm:text-3xl">{title}</h1> : null}
      <div className={`flex ${classes}`}>{children}</div>
    </div>
  );
}

export default EditUserSection;
