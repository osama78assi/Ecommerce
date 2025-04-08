function SubmitBtn({ type = "primary", title, dis, classes, handleClick }) {
  let colorClasses = "";
  switch (type) {
    case "danger":
      colorClasses = "bg-red-500 hover:bg-red-600";
      break;
    default:
      colorClasses = "bg-[var(--primary-color-900)] hover:bg-[var(--primary-color-1100)]";
  }

  return (
    <button
      className={`text-slate-50 border-none outline-none rounded-lg p-2 transition-colors disabled:cursor-not-allowed ${colorClasses} ${classes}`}
      onClick={(e) => handleClick?.(e)}
      disabled={dis}
    >
      {title}
    </button>
  );
}

export default SubmitBtn;
