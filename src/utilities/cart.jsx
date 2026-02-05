const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

const getCartKey = () => {
  const user = getCurrentUser();
  return user ? `cart_${user.email}` : "cart_guest";
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
};

const saveCart = (cart) => {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
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

  saveCart(cart);
};

export const decreaseQty = (id) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  if (!item) return;

  item.qty -= 1;

  if (item.qty <= 0) {
    saveCart(cart.filter((i) => i.id !== id));
  } else {
    saveCart(cart);
  }
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
};

export const getProductQty = (id) => {
  const item = getCart().find((i) => i.id === id);
  return item ? item.qty : 0;
};

export const getCartItems = () => {
  return getCart();
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
};

export const clearCart = () => {
  saveCart([]);
};
