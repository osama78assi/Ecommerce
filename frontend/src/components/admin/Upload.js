function Upload({ buttonTitle, title, hanldeClick }) {
  return (
    <div className="bg-white py-2 px-4 flex justify-between items-center">
      <h2 className="font-bold text-lg">{title}</h2>
      <button
        className="border-2 bg-primary-700 text-white transition-all py-1 px-3 rounded-full "
        onClick={() => hanldeClick?.()}
      >
        {buttonTitle}
      </button>
    </div>
  );
}

export default Upload;
