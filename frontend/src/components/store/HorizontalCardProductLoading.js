function HorizontalCardProductLoading() {
  const loadingList = new Array(13).fill(null);

  return loadingList.map((product, index) => {
    return (
      <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
        <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
        <div className="p-4 grid w-full gap-2">
          <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
          <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
          <div className="flex gap-3 w-full">
            <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
            <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
          </div>
          <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
        </div>
      </div>
    );
  });
}

export default HorizontalCardProductLoading;
