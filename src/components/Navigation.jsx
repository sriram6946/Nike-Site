import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../utilities/cart";
import { useState, useEffect } from "react";

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/");
  };

  return (
    <div>
      <nav>
        <img src="/brand_logo.png" alt="logo" />

        <ul>
          <li>
            <select
              className="nav-select"
              defaultValue=""
              onChange={(e) => {
                const category = e.target.value;
                if (category) {
                  navigate(`/shop/men/${category}`);
                  e.target.value = "";
                }
              }}
            >
              <option value="" disabled>
                Men
              </option>
              <option value="lifestyle">Lifestyle</option>
              <option value="training">Training</option>
              <option value="sports">Sports</option>
            </select>
          </li>

          <li>
            <select
              className="nav-select"
              defaultValue=""
              onChange={(e) => {
                const category = e.target.value;
                if (category) {
                  navigate(`/shop/women/${category}`);
                  e.target.value = "";
                }
              }}
            >
              <option value="" disabled>
                Women
              </option>
              <option value="lifestyle">Lifestyle</option>
              <option value="training">Training</option>
              <option value="sports">Sports</option>
            </select>
          </li>

          <li>
            <select
              className="nav-select"
              defaultValue=""
              onChange={(e) => {
                const category = e.target.value;
                if (category) {
                  navigate(`/shop/kids/${category}`);
                  e.target.value = "";
                }
              }}
            >
              <option value="" disabled>
                Kids
              </option>
              <option value="lifestyle">Lifestyle</option>
              <option value="training">Training</option>
              <option value="sports">Sports</option>
            </select>
          </li>

          <li>
            <button className="nav-btn">Location</button>
          </li>

          <li>
            <Link to="/About">
              <button className="nav-btn">About</button>
            </Link>
          </li>

          <li>
            <Link to="/ContactUs">
              <button className="nav-btn">Contact Us</button>
            </Link>
          </li>
        </ul>

        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/Login")}>Login</button>
        )}

        {user && (
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            Cart ({cartCount})
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
