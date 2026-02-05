import { useNavigate } from "react-router-dom";
import { getCartItems, clearCart, getCartTotal } from "../utilities/cart";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = getCartItems();
  const subtotal = getCartTotal();
  const delivery = 199;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const placeOrder = () => {
    clearCart();
    alert("🎉 Order placed successfully!");
    navigate("/");
  };

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "40px" }}>Your cart is empty</h2>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2>Checkout</h2>

      {/* Address (Dummy) */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Delivery Address</h3>
        <input placeholder="Full Name" style={inputStyle} />
        <input placeholder="Address" style={inputStyle} />
        <input placeholder="City" style={inputStyle} />
        <input placeholder="Pincode" style={inputStyle} />
      </div>

      {/* Order Summary */}
      <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <p key={item.id}>
            {item.name} × {item.qty}
          </p>
        ))}

        <p>Subtotal: ₹{subtotal}</p>
        <p>Delivery: ₹{delivery}</p>
        <p>Tax (5%): ₹{tax}</p>

        <h3>Total: ₹{total}</h3>

        <button
          onClick={placeOrder}
          style={{
            marginTop: "20px",
            padding: "14px",
            width: "100%",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

export default Checkout;
