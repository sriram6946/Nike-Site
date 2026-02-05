import { getCart } from "../utilities/cart";
import { useState, useEffect } from "react";
import { removeFromCart, addToCart, decreaseQty } from "../utilities/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const data = getCart();
    return Array.isArray(data) ? data : [];
  });

  const [_, forceUpdate] = useState(0);

  useEffect(() => {
    const update = () => {
      setCart(getCart());
    };

    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const total = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    : 0;

  const deliveryFee = total > 0 ? 199 : 0;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + deliveryFee + tax;

  const increaseQty = (item) => {
    addToCart(item);
    setCart(getCart());
  };

  const decreaseQtyHandler = (id) => {
    decreaseQty(id);
    setCart(getCart());
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div style={{ display: "flex", gap: "40px" }}>
          <div style={{ flex: 2 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "20px 0",
                }}
              >
                <div className="cart-item">
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQtyHandler(item.id)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              position: "sticky",
              top: "100px",
            }}
          >
            <h3>Order Summary</h3>

            <p>Subtotal: ₹{total}</p>
            <p>Delivery: ₹{deliveryFee}</p>
            <p>Tax (5%): ₹{tax}</p>
            <hr />
            <h3>Total: ₹{grandTotal}</h3>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                padding: "14px",
                background: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
