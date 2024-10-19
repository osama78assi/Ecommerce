function VerticalCartProductLoading() {
  const loadingList = new Array(13).fill(null);

  return loadingList.map((product, index) => {
    return (
      <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
        <div className="p-4 grid gap-3">
          <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
          <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
          <div className="flex gap-3">
            <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
            <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
          </div>
          <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
        </div>
      </div>
    );
  });
}

export default VerticalCartProductLoading;
