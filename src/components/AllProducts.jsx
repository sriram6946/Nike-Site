import { products } from "./data/products";
import { addToCart } from "../utilities/cart";

const AllProducts = () => {
  const allProducts = Object.values(products)
    .flatMap((gender) => Object.values(gender))
    .flat();

  return (
    <div style={{ padding: "40px" }}>
      <h2>All Products</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {allProducts.map((product) => (
          <div
            key={product.id}
            style={{
              width: "220px",
              border: "1px solid #eee",
              padding: "16px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%" }}
            />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              style={{
                marginTop: "10px",
                padding: "8px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
