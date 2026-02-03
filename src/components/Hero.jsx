import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <div>
          <h1>
            YOUR FEET DESERVE <br />
            THE BEST
          </h1>
          <p>
            Your feet deserve the best and we’re here to help you with our
            Shoes.
          </p>
          <div className="hero-btn">
            <button
              className="shop-btn"
              onClick={() => {
                navigate("/shop");
              }}
            >
              Shop Now
            </button>
            {/* <button className="category-btn">Category</button> */}
            <div>
              <p className="available">Also available on</p>
              <div className="site-logos">
                <img src="./amazon.png" alt="Amazon-logo" />
                <img src="./flipkart.png" alt="Flipkart-logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-img">
          <img src="./shoe_image.png" alt="Nike-Shoe" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
