const express = require("express");
const app = express();

app.use(express.json());


//Börjar med att skapa alla endpoints
//Gör en tillfällig array med products innan jag lärt min databaser

const products = [
  {
    id: 1,
    title: "Apple",
    quantity: 20,
    price: 3.5,
    category: "Fruit"
  },
  {
    id: 2,
    title: "Milk",
    quantity: 10,
    price: 12.0,
    category: "Dairy"
  },
  {
    id: 3,
    title: "Bread",
    quantity: 15,
    price: 25.0,
    category: "Bakery"
  },
  {
    id: 4,
    title: "Tomato",
    quantity: 30,
    price: 4.0,
    category: "Vegetable"
  },
  {
    id: 5,
    title: "Eggs (12-pack)",
    quantity: 8,
    price: 35.0,
    category: "Dairy"
  },
  {
    id: 6,
    title: "Pasta",
    quantity: 25,
    price: 18.5,
    category: "Grains"
  }
];

//räknare
let idCounter = 7;

//POST/producs - Skapa en ny produkt 
//=======================================
/*Produkter ska minst bestå av:
    -Namn
    -Antal (i lager) 
    -Pris
    -Kategori (sträng eller enum)
*/
//============================================

app.post("/products", (req, res) => {

  let { title, quantity, price, category } = req.body;

  //Validering 1: Kolla att alla properties finns med i requesten
  if (title === undefined) {
    res.status(400).json({
      error: "Property 'title' must be included"
    });
    return;
  }

  if (quantity === undefined) {
    res.status(400).json({
      error: "Property 'quantity' must be included"
    });
    return;
  }

  if (price === undefined) {
    res.status(400).json({
      error: "Property 'price' must be included"
    });
    return;
  }

  if (category === undefined) {
    res.status(400).json({
      error: "Property 'category' must be included"
    });
    return;
  }

  //Validering 2: Kolla att title och category är strängar
  if (typeof title !== "string") {
    res.status(400).json({
      error: "Property 'title' must be a string"
    });
    return;
  }

  if (typeof category !== "string") {
    res.status(400).json({
      error: "Property 'category' must be a string"
    });
    return;
  }

  //Validering 3: Kolla att title och category inte är tomma (bara mellanslag)
  if (title.trim().length === 0) {
    res.status(400).json({
      error: "Property 'title' can not be blank"
    });
    return;
  }

  if (category.trim().length === 0) {
    res.status(400).json({
      error: "Property 'category' can not be blank"
    });
    return;
  }

  //Validering 4: Kolla att quantity och price är nummer och positiva tal

  const parsedQuantity = Number.parseInt(quantity);
  const parsedPrice = Number.parseFloat(price);

  if (Number.isNaN(parsedQuantity)) {
    res.status(400).json({ error: "Property 'quantity' must be a number" });
    return;
  }

  if (Number.isNaN(parsedPrice)) {
    res.status(400).json({ error: "Property 'price' must be a number" });
    return;
  }

  if (parsedQuantity <= 0) {
    res.status(400).json({ error: "Property 'quantity' must be a greater than 0" });
    return;
  }

  if (parsedPrice <= 0) {
    res.status(400).json({ error: "Property 'price' must be a greater than 0" });
    return;
  }

  //Allt stämmer:
  const product = {
    id: idCounter++,
    title,
    quantity,
    price,
    category
  };

  //Lägg till i min array
  products.push(product);

  res.status(201).json(product);

});

//GET/products - Hämta alla produkter
//=======================================

app.get("/products", (req, res) => {
  res.json(products);
});

//GET/products/:id - Hämta en specifik produkt
//=======================================

app.get("/products/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Id param must be a number" });
    return;
  }

  //Söker i arrayen efter en produkt med matchande id
  const product = products.find(all => all.id === id);
  if (product === undefined) {
    res.status(404).json({ error: "Product with id not found" });
    return;
  }

  res.json(product);

});

//PUT/products/:id - Uppdatera en befintlig produkt
//=======================================

app.put("/products/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Id param must be a number" });
    return;
  }

  //Letar upp produkten 
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const { title, quantity, price, category } = req.body;
  const product = products[productIndex];

  //Validering berorende på vad som ska ändras
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ error: "Property 'title' must be a non-empty string" });
      return;
    }
    product.title = title;
  }

  if (quantity !== undefined) {
    const parsedQuantity = Number.parseInt(quantity);
    if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      res.status(400).json({ error: "Property 'quantity' must be a number > 0" });
      return;
    }
    product.quantity = parsedQuantity;
  }

  if (price !== undefined) {
    const parsedPrice = Number.parseFloat(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      res.status(400).json({ error: "Property 'price' must be a number > 0" });
      return;
    }
    product.price = parsedPrice;
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length === 0) {
      res.status(400).json({ error: "Property 'category' must be a non-empty string" });
      return;
    }
    product.category = category;
  }

  res.status(200).json({ message: "Product updated successfully", product });

});

// DELETE /products/:id - Radera en produkt
// ============================================
app.delete("/products/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Id param must be a number" });
    return;
  }

  //Loopa igenom arrayen för att hitta produkten med matchade id
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.id === id) {
      products.splice(i, 1);
      // splice(index, antal) tar bort element från arrayen
      // splice(i, 1) betyder "ta bort 1 element på position i"
      res.status(204).json({ message: "Product was removed successfully" });
      return;
    }
  }
  res.status(404).json({ error: "No product has been deleted" });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

