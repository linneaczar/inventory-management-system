import express from "express";

//importerar alla databas-funktioner
import { getAllProducts, getProductById, createNewProduct, deleteProduct, updateProduct } from "../repositories/productRepository.mjs"  //importera även update och delete!!

const router = express.Router();


//TO DO: LÄGG TILL TRY CATCH RUNT ALLA MINA DATABAS-ANROP!! KOLLA UPP PUT - OM DEN FUNKAR NU?? GÖR KODEN MER KONSEKEVENT OSV.. 

//POST/producs - Skapa en ny produkt 
//=======================================

router.post("/", async (req, res) => {

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

//lägg till try catch?????
  const product = await createNewProduct(title, quantity, price, category);

  res.status(201).json(product);

});

//GET/products - Hämta alla produkter
//=======================================

router.get("/", async (req, res) => {
     const products = await getAllProducts();

  res.json(products);
});

//GET/products/:id - Hämta en specifik produkt
//=======================================

router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Id param must be a number" });
    return;
  }

const product = await getProductById(id);

  if (product === undefined) {
    res.status(404).json({ error: "Product with id not found" });
    return;
  }
 
  res.json(product);

});

//PUT/products/:id - Uppdatera en befintlig produkt
//=======================================

router.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Id param must be a number" });
    return;
  }


  const { title, quantity, price, category } = req.body;


  //Validering berorende på vad som ska ändras
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ error: "Property 'title' must be a non-empty string" });
      return;
    }
  }

  if (quantity !== undefined) {
    const parsedQuantity = Number.parseInt(quantity);
    if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      res.status(400).json({ error: "Property 'quantity' must be a number > 0" });
      return;
    }
  }

  if (price !== undefined) {
    const parsedPrice = Number.parseFloat(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      res.status(400).json({ error: "Property 'price' must be a number > 0" });
      return;
    }
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length === 0) {
      res.status(400).json({ error: "Property 'category' must be a non-empty string" });
      return;
    }
  }

  const updatedProduct = await updateProduct(title, quantity, price, category, id);
  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ message: "Product updated successfully", updatedProduct});

});

// DELETE /products/:id - Radera en produkt
// ============================================
router.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Id param must be a number" });
    return;
  }

const result = await deleteProduct(id);
  if (result.rowCount === 0) {
    res.status(404).send();
    return;
  }
  res.status(204).send();
});


export default router;



