import express from "express";

//importerar alla databas-funktioner
import { getAllProducts, getProductById, createNewProduct, deleteProduct, updateProduct, getProductsByCategory } from "../repositories/productRepository.mjs"  //importera även update och delete!!
import { validateNumber, validateString } from "../utilities/validation.mjs";

const router = express.Router();

//POST/producs - Skapa en ny produkt 
//=======================================

router.post("/", async (req, res) => {

  // Först kollar vi att requesten har en body (JSON-data)
  if (!req.body) {
    res.status(400).json({
      error: "A JSON body must be included",
    });
    return;
  }

  const { title, quantity, price, category, supplierId } = req.body;

  // Validerar att title är en sträng och inte undefined/null
  if (!validateString(title)) {
    res.status(400).json({
      error: "Title must be included and be a string",
    });
    return;
  }

  // Validerar att category är en sträng och inte undefined/null
  if (!validateString(category)) {
    res.status(400).json({
      error: "Category must be included and be a string",
    });
    return;
  }

  // Validerar att price är ett nummer och finns med
  if (!validateNumber(price)) {
    res.status(400).json({
      error: "Price must be included and be a number",
    });
    return;
  }

  // Validerar att quantity är ett nummer och finns med
  if (!validateNumber(quantity)) {
    res.status(400).json({
      error: "Quantity must be included and be a number",
    });
    return;
  }

  // Validerar att supplier id är ett nummer och finns med
  if (!validateNumber(supplierId)) {
    res.status(400).json({
      error: "Supplier id must be included and be a number",
    });
    return;
  }

  try {
    const product = await createNewProduct(title, quantity, price, category, supplierId);
    res.status(201).json(product);
  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

//GET/products - Hämta alla produkter
//=======================================

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
   return res.json(products);

  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
});

//GET/products/search?category=sökord - Söker efter produkter baserat på kategori
//=======================================

router.get("/search", async (req, res) => {
  const categorySearch = req.query.category; // Hämtar "category" från query parameters

  if (!validateString(categorySearch)) {
    res.status(400).json({ error: "Category must be a string" });
    return;
  }

  // Söker i databasen efter produkter som matchar kategorin
  const products = await getProductsByCategory(categorySearch);
  res.json(products);
});

//GET/products/:id - Hämta en specifik produkt
//=======================================

router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }

  try {
    const product = await getProductById(id);

    if (!product) {
      res.status(404).json({ error: "Product with id not found" });
      return;
    }
    return res.json(product);

  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

//PUT/products/:id - Uppdatera en befintlig produkt
//=======================================

router.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }


  const { title, quantity, price, category, supplierId } = req.body;


  // Validerar att title är en sträng och inte undefined/null
  if (!validateString(title)) {
    res.status(400).json({
      error: "Title must be included and be a string",
    });
    return;
  }

  // Validerar att category är en sträng och inte undefined/null
  if (!validateString(category)) {
    res.status(400).json({
      error: "Category must be included and be a string",
    });
    return;
  }

  // Validerar att price är ett nummer och finns med
  if (!validateNumber(price)) {
    res.status(400).json({
      error: "Price must be included and be a number",
    });
    return;
  }

  // Validerar att quantity är ett nummer och finns med
  if (!validateNumber(quantity)) {
    res.status(400).json({
      error: "Quantity must be included and be a number",
    });
    return;
  }

    // Validerar att supplier id är ett nummer och finns med
  if (!validateNumber(supplierId)) {
    res.status(400).json({
      error: "Supplier id must be included and be a number",
    });
    return;
  }


  try {
    const updatedProduct = await updateProduct(title, quantity, price, category, supplierId, id);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

// DELETE /products/:id - Radera en produkt
// ============================================
router.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }

  try {
    const deleted = await deleteProduct(id);
    if (deleted === 0) {
     return res.status(404).json({ error: "Product not found" });
    }
    return res.status(204).send();

  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});


export default router;



