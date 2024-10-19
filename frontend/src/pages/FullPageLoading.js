import {RotatingLines} from "react-loader-spinner"

function FullPageLoading() {
  return (
    <div className="h-[100dvh] bg-slate-200 flex items-center justify-center">
      <RotatingLines strokeColor="#1d4ed8 "/>
    </div>
  );
}

export default FullPageLoading;
