import { useTranslation } from "react-i18next";
import Card from "../store/Card";
import HeaderTag from "../ui/HeaderTag";

function Store() {
  const { t } = useTranslation();
  const products = [
    {
      id: 1,
      images: ["/slider-1.jpg", "/slider-2.jpg", "/slider-3.jpg"],
      name: "hello",
      price: 89.99,
      originalPrice: 129.99,
    },
    {
      id: 2,
      images: ["/slider-1.jpg", "/slider-2.jpg", "/slider-3.jpg"],
      name: "hello",
      price: 89.99,
      originalPrice: 129.99,
    },
    {
      id: 3,
      images: ["/slider-1.jpg", "/slider-2.jpg", "/slider-3.jpg"],
      name: "hello",
      price: 89.99,
      originalPrice: 129.99,
    },
    {
      id: 4,
      images: ["/slider-1.jpg", "/slider-2.jpg", "/slider-3.jpg"],
      name: "hello",
      price: 89.99,
      originalPrice: 129.99,
    },
  ];

  const handleAddToCart = () => {
    alert("Product added to cart!");
  };

  return (
    <>
      <HeaderTag title={t("headers.store")} />
      <div className="store-container container mx-auto p-8 gap-5 flex flex-wrap sm:justify-between">
        {products.map((product) => (
          <Card
            key={product.id}
            images={product.images}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
}

export default Store;
