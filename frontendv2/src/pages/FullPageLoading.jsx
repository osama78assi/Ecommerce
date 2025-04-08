import {RotatingLines} from "react-loader-spinner"

function FullPageLoading() {
  return (
    <div className="h-[100dvh] bg-slate-200 flex items-center justify-center">
      <RotatingLines strokeColor="#c89329"/>
    </div>
  );
}

export default FullPageLoading;
