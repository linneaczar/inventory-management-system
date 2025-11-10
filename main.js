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
    -Antal (i lager) (Så när man uppdaterar ska man addera? eller bara ändra? nytt id eller ej?)
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
  const parsedPrice= Number.parseFloat(price);

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



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

