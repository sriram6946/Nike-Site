
const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));

const getAllCarts = () =>
  JSON.parse(localStorage.getItem("carts")) || [];


export const getCart = () => {
  const user = getCurrentUser();
  if (!user) return [];

  const carts = getAllCarts();
  const userCart = carts.find(c => c.userId === user.id);

  return userCart ? userCart.items : [];
};

const saveCart = (items) => {
  const user = getCurrentUser();
  if (!user) return;

  const carts = getAllCarts();
  const index = carts.findIndex(c => c.userId === user.id);

  if (index >= 0) {
    carts[index].items = items;
  } else {
    carts.push({
      userId: user.id,
      items
    });
  }

  localStorage.setItem("carts", JSON.stringify(carts));
  window.dispatchEvent(new Event("cartUpdated"));
};


export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
};

export const decreaseQty = (id) => {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty -= 1;

  if (item.qty <= 0) {
    saveCart(cart.filter(i => i.id !== id));
  } else {
    saveCart(cart);
  }
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
};

export const clearCart = () => {
  saveCart([]);
};


export const getCartItems = () => {
  return getCart();
};

export const getCartTotal = () => {
  return getCart().reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
};

export const getProductQty = (id) => {
  const item = getCart().find(i => i.id === id);
  return item ? item.qty : 0;
};
