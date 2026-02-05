const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

const getAllCarts = () => JSON.parse(localStorage.getItem("carts")) || [];

const saveAllCarts = (carts) => {
  localStorage.setItem("carts", JSON.stringify(carts));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("currentUserCart")) || [];
};

export const getCartItems = () => {
  return getCart();
};

const saveCart = (cart) => {
  localStorage.setItem("currentUserCart", JSON.stringify(cart));
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

export const getCartTotal = () => {
  return getCart().reduce((total, item) => total + item.price * item.qty, 0);
};

export const clearCart = () => {
  const user = getCurrentUser();
  if (!user) {
    saveCart([]);
    return;
  }

  const carts = getAllCarts();
  const currentCart = getCart();

  const existingCartIndex = carts.findIndex((c) => c.userId === user.id);

  if (existingCartIndex >= 0) {
    carts[existingCartIndex].items = currentCart;
  } else {
    carts.push({
      userId: user.id,
      items: currentCart,
    });
  }

  saveAllCarts(carts);
  saveCart([]);
};
