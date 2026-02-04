export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};
export const getProductQty = (id) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  return item ? item.qty : 0;
};


export const decreaseQty = (id) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  if (!item) return;

  if (item.qty === 1) {
    const updated = cart.filter((i) => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
  } else {
    item.qty -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.dispatchEvent(new Event("cartUpdated"));
};


const notifyCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartUpdate();
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartUpdate();
};
