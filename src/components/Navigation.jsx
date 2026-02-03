import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../utilities/cart";

const Navigation = () => {
  const navigate = useNavigate();
  const cartCount = getCart().reduce((sum, item) => sum + item.qty, 0);

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

        <button onClick={() => navigate("/Login")}>Login</button>
        <button onClick={() => navigate("/cart")}>Cart ({cartCount})</button>
      </nav>
    </div>
  );
};

export default Navigation;
