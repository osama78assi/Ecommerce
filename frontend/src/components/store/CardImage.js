function CardImage({ name, imgUrl }) {
  return imgUrl ? (
    <img
      src={imgUrl}
      alt={`${name} product`}
      className="w-full h-56 object-cover"
    />
  ) : (
    <div className="w-full h-56 bg-gray-500 animate-pulse" />
  );
}

export default CardImage;
