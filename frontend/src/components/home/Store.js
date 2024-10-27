import VerticalCardProduct from "../store/VerticalCardProduct";
import HeaderTag from "../ui/HeaderTag";

function Store() {
  return (
    <>
    <HeaderTag title="Store" />
    <div className="container mx-auto p-8 gap-5">

      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
    </>
  );
}

export default Store;
