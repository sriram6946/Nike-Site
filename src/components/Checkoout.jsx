import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  addToCart,
  decreaseQty,
  removeFromCart,
  getCartTotal,
  clearCart,
} from "../utilities/cart";
import { useState, useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCartItems());
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  const delivery = 199;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const placeOrder = () => {
    if (!fullName.trim() || !address.trim() || !city.trim()) {
      alert("Please fill all delivery details");
      return;
    }

    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  const [pincode, setPincode] = useState("");

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setPincode(value);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <h2 style={{ padding: "40px" }}>Your cart is empty</h2>
      ) : (
        <>
          <div style={{ marginBottom: "30px" }}>
            <h3>Delivery Address</h3>
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Pincode"
              value={pincode}
              onChange={handlePincodeChange}
              inputMode="numeric"
              maxLength={6}
              style={inputStyle}
            />
          </div>

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
        </>
      )}
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
