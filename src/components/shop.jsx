import { useParams } from "react-router-dom";
import { products } from "./data/products";

const Shop = () => {
  const { gender, category } = useParams();

  const items = products[gender]?.[category] ?? [];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textTransform: "capitalize" }}>
        {gender} / {category}
      </h2>

      {items.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {items.map((product) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
