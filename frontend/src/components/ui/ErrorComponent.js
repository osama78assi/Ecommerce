import { FaTriangleExclamation } from "react-icons/fa6";

function ErrorComponent({ refetchFunction }) {
  return (
    <div className="bg-red-200 rounded-lg p-3">
      <div className="bg-gradient-to-bl mb-3 flex items-center flex-wrap gap-4">
        <p className="text-2xl text-red-500 ">
          Something went wrong while getting the data.
        </p>
        <FaTriangleExclamation className="text-4xl text-red-500" />
      </div>

      {refetchFunction ? (
        <p
          className="text-red-500 underline transition-colors cursor-pointer hover:text-red-800"
          onClick={() => refetchFunction?.()}
        >
          Click here to reload
        </p>
      ) : null}
    </div>
  );
}

export default ErrorComponent;
