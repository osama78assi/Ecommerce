import VerticalCardProduct from "../store/VerticalCardProduct";
import HeaderTag from "../ui/HeaderTag";
import Card from "../store/Card"

function Store() {
  const product = {
    images: [
      "https://via.placeholder.com/300x300?text=Image+1",
      "https://via.placeholder.com/300x300?text=Image+2",
      "https://via.placeholder.com/300x300?text=Image+3",
    ],
    brand: "Cool Sneakers",
    price: 89.99,
    originalPrice: 129.99,
  };

  const handleAddToCart = () => {
    alert("Product added to cart!");
  };

  return (
    <>
      <HeaderTag title="Store" />
      <div className="container mx-auto p-8 gap-5">
        <Card
          images={product.images}
          brand={product.brand}
          price={product.price}
          originalPrice={product.originalPrice}
          onAddToCart={handleAddToCart}
        />
        <VerticalCardProduct
          category={"refrigerator"}
          heading={"Refrigerator"}
        />
        <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      </div>
    </>
  );
}

export default Store;
