// Define the API URL based on the environment
const API_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "http://20.61.86.182";

// DOM Elements
const itemsList = document.getElementById("itemsList");
const cartList = document.getElementById("cartList");
const addItemForm = document.getElementById("addItemForm");
const addToCartForm = document.getElementById("addToCartForm");
const cartItemIdSelect = document.getElementById("cartItemId");

// Fetch and display items
async function fetchItems() {
  const response = await fetch(`${API_URL}/items`);
  const items = await response.json();
  itemsList.innerHTML = items.map(item => `
    <li>
      ${item.name} - $${item.price}
      <button onclick="deleteItem(${item.id})">Delete</button>
    </li>
  `).join("");

  // Populate the cart item dropdown
  cartItemIdSelect.innerHTML = items.map(item => `
    <option value="${item.id}">${item.name}</option>
  `).join("");
}

// Fetch and display cart items
async function fetchCart() {
  const response = await fetch(`${API_URL}/cart`);
  const cart = await response.json();
  cartList.innerHTML = cart.map(cartItem => `
    <li>
      ${cartItem.name} - $${cartItem.price} (Qty: ${cartItem.quantity})
      <button onclick="removeFromCart(${cartItem.id})">Remove</button>
    </li>
  `).join("");
}

// Add item
addItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;

  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price }),
  });

  if (response.ok) {
    fetchItems();
    addItemForm.reset();
  }
});

// Add to cart
addToCartForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const itemId = document.getElementById("cartItemId").value;
  const quantity = document.getElementById("cartItemQuantity").value;

  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId: parseInt(itemId), quantity: parseInt(quantity) }),
  });

  if (response.ok) {
    fetchCart();
    addToCartForm.reset();
  }
});

// Delete item
async function deleteItem(id) {
  const response = await fetch(`${API_URL}/items/${id}`, { method: "DELETE" });
  if (response.ok) {
    fetchItems();
  }
}

// Remove from cart
async function removeFromCart(id) {
  const response = await fetch(`${API_URL}/cart/${id}`, { method: "DELETE" });
  if (response.ok) {
    fetchCart();
  }
}

// Initial fetch
fetchItems();
fetchCart();
