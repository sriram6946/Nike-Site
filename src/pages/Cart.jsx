import { getCart } from "../utilities/cart";
import { useState } from "react";
import { removeFromCart, addToCart, decreaseQty } from "../utilities/cart";

const Cart = () => {
  const [cart, setCart] = useState(getCart());

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 2 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "20px 0",
                }}
              >
                <div className="cart-item" key={item.id}>
  <img src={item.image} />

  <div>
    <h4>{item.name}</h4>
    <p>₹{item.price}</p>
  </div>

  <div className="qty-controls">
    <button onClick={() => decreaseQtyHandler(item.id)}>-</button>
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
              height: "fit-content",
            }}
          >
            <div className="cart-right">
  <h3>Order Summary</h3>

  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{total}</span>
  </div>

  <div className="summary-row">
    <span>Delivery</span>
    <span>₹{deliveryFee}</span>
  </div>

  <div className="summary-row">
    <span>Tax (5%)</span>
    <span>₹{tax}</span>
  </div>

  <hr />

  <div className="summary-row summary-total">
    <span>Total</span>
    <span>₹{grandTotal}</span>
  </div>

  <button className="checkout-btn">
    Proceed to Checkout
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
