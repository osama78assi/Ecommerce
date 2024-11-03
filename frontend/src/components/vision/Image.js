function Image({ imageSrc }) {
  return (
    <div className="flex-1">
      <img
        src={imageSrc}
        alt="Vision"
        className="rounded-lg shadow-lg w-full h-auto object-cover"
      />
    </div>
  );
}

export default Image;
