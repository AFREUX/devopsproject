// Import required modules
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let items = [
  { id: 1, name: "Item1", price: 10 },
  { id: 2, name: "Item2", price: 20 },
];

let cart = [];

// Routes
app.get("/", (req, res) => {
  console.log("GET / called");
  res.json({ message: "Welcome to the Shopping Cart API!" });
});

app.get("/items", (req, res) => {
  console.log("GET /items called");
  res.json(items);
});

app.post("/items", (req, res) => {
  console.log("POST /items called with body:", req.body);
  if (!req.body.name || !req.body.price) {
    console.log("Error: Name and price are required");
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    name: req.body.name,
    price: req.body.price,
  };
  items.push(newItem);
  console.log("New item added:", newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  console.log(`PUT /items/${req.params.id} called with body:`, req.body);
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    console.log("Error: Item not found");
    return res.status(404).json({ error: "Item not found" });
  }

  if (!req.body.name || !req.body.price) {
    console.log("Error: Name and price are required");
    return res.status(400).json({ error: "Name and price are required" });
  }

  items[itemIndex].name = req.body.name;
  items[itemIndex].price = req.body.price;
  console.log("Item updated:", items[itemIndex]);
  res.json(items[itemIndex]);
});

app.delete("/items/:id", (req, res) => {
  console.log(`DELETE /items/${req.params.id} called`);
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    console.log("Error: Item not found");
    return res.status(404).json({ error: "Item not found" });
  }

  items.splice(itemIndex, 1);
  console.log(`Item with ID ${req.params.id} deleted`);
  res.json({ message: "Item deleted" });
});

// Shopping Cart Routes
app.get("/cart", (req, res) => {
  console.log("GET /cart called");
  res.json(cart);
});

app.post("/cart", (req, res) => {
  console.log("POST /cart called with body:", req.body);
  const item = items.find((i) => i.id === req.body.itemId);
  if (!item) {
    console.log("Error: Item not found");
    return res.status(404).json({ error: "Item not found" });
  }

  const cartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: req.body.quantity || 1,
  };
  cart.push(cartItem);
  console.log("Item added to cart:", cartItem);
  res.status(201).json(cartItem);
});

app.delete("/cart/:id", (req, res) => {
  console.log(`DELETE /cart/${req.params.id} called`);
  const cartIndex = cart.findIndex((i) => i.id === parseInt(req.params.id));
  if (cartIndex === -1) {
    console.log("Error: Item not in cart");
    return res.status(404).json({ error: "Item not in cart" });
  }

  cart.splice(cartIndex, 1);
  console.log(`Item with ID ${req.params.id} removed from cart`);
  res.json({ message: "Item removed from cart" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for testing
module.exports = app;
