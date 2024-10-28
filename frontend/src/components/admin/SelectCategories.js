import { useEffect, useState } from "react";

function SelectCategories() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("Select a category");

  useEffect(() => {
    // Fetch data
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <>
      <label htmlFor="category" className="mt-3">
        Category :
      </label>
      <div className="mt-3 h-8 bg-gray-400 animate-pulse rounded p-2" />
    </>
  ) : (
    <>
      <label htmlFor="category" className="mt-3">
        Category :
      </label>
      <select
        required
        value={active}
        name="category"
        onChange={(e) => setActive(e.target.value)}
        className="p-2 bg-slate-100 border rounded"
      >
        <option value={""}>Select Category</option>
        {data?.map((el, index) => {
          return (
            <option value={el.value} key={el.value + index}>
              {el.label}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectCategories;
