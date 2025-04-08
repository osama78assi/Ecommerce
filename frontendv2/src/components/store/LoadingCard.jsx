function LoadingCard() {
  return (
    <div
      className={`w-[20rem] basis-[20rem] sm:w-auto sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333333333% - 1rem)] lg:basis-[calc(25%-1rem)] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="relative h-56 bg-gray-500 animate-pulse"></div>

      <div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold bg-gray-500 animate-pulse h-10"></h2>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold bg-gray-500 animate-pulse h-5 w-[48%]"></span>
            <span className="bg-gray-500 animate-pulse h-5 w-[48%]"></span>
          </div>

          <div className="flex gap-[1.5rem]">
            <button className="mt-4 h-10 w-full bg-gray-500 animate-pulse py-2 px-4 basis-[calc(50%-0.75rem)] rounded-lg transition-colors cursor-default">
            
            </button>
            <button className="mt-4 h-10 w-full bg-gray-500 animate-pulse py-2 px-4 basis-[calc(50%-0.75rem)] rounded-lg transition-colors cursor-default">
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;
