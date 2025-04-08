import { RotatingLines } from "react-loader-spinner";

function LoadingCart() {
  return (
    <div
      className="absolute bg-slate-200 left-[50%] translate-x-[-50%] top-[5rem] flex items-center justify-center rounded-lg gap-2 p-2"
      style={{ boxShadow: "0px 0px 10px #333" }}
    >
      <span className="font-light text-xl">Loading... </span>
      <RotatingLines strokeColor="#c89329" width="60px" />
    </div>
  );
}

export default LoadingCart;
