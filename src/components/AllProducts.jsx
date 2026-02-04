import { products } from "./data/products";
import { addToCart, decreaseQty, getProductQty } from "../utilities/cart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const allProducts = Object.values(products)
    .flatMap((gender) => Object.values(gender))
    .flat();

  const isLoggedIn = !!localStorage.getItem("currentUser");
  const [, forceUpdate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => forceUpdate((n) => n + 1);
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>All Products</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {allProducts.map((product) => {
          const qty = getProductQty(product.id);

          return (
            <div
              key={product.id}
              style={{
                width: "220px",
                border: "1px solid #eee",
                padding: "16px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%" }}
              />

              <h4>{product.name}</h4>
              <p>₹{product.price}</p>

              {!isLoggedIn ? (
                <button disabled style={{ width: "100%", padding: "8px" }}>
                  Login to add
                </button>
              ) : qty === 0 ? (
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
              ) : (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decreaseQty(product.id);
                    }}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
