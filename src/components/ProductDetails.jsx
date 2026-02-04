import { useParams } from "react-router-dom";
import { products } from "./data/products";
import { addToCart, decreaseQty, getProductQty } from "../utilities/cart";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = Number(id);
  const isLoggedIn = !!localStorage.getItem("currentUser");

  const [_, forceUpdate] = useState(0);

  useEffect(() => {
    const update = () => forceUpdate((n) => n + 1);
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

 
  const allProducts = Object.values(products)
    .flatMap((gender) => Object.values(gender))
    .flat();

  const product = allProducts.find((p) => p.id === productId);

  if (!product) return <p>Product not found</p>;

  const qty = getProductQty(product.id);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div style={{ display: "flex", gap: "40px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "350px", border: "1px solid #eee" }}
        />

        <div>
          <h2>{product.name}</h2>
          <h3>₹{product.price}</h3>

          <p style={{ marginTop: "16px", color: "#555" }}>
            Premium Nike footwear designed for comfort, durability, and style.
            Perfect for everyday wear and sports activities.
          </p>

       
          <p><strong>Available Sizes:</strong> UK 6, 7, 8, 9, 10</p>
          <p><strong>Delivery:</strong> Free delivery in 3–5 days</p>

 
          {!isLoggedIn ? (
            <button disabled style={{ marginTop: "20px", padding: "10px" }}>
              Login to add to cart
            </button>
          ) : qty === 0 ? (
            <button
              onClick={() => addToCart(product)}
              style={{ marginTop: "20px", padding: "10px" }}
            >
              Add to Cart
            </button>
          ) : (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <button onClick={() => decreaseQty(product.id)}>-</button>
              <span>{qty}</span>
              <button onClick={() => addToCart(product)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
