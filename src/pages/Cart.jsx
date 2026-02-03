import { getCart, removeFromCart } from "../utilities/cart";
import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState(getCart());

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <img src={item.image} width="80" />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <p>Qty: {item.qty}</p>
                <button onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
