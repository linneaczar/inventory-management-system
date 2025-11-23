import express from "express";

//importerar alla databas-funktioner
import { getAllProducts, getProductById, createNewProduct, deleteProduct, updateProduct } from "../repositories/productRepository.mjs"  //importera även update och delete!!
import { validateNumber, validateString } from "../utilities/validation.mjs";

const router = express.Router();


//TO DO try/catch runt alla DB-anrop! ändra product === undefined → !product eller product === null

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

  const { title, quantity, price, category } = req.body;

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

try {const product = await createNewProduct(title, quantity, price, category);

  res.status(201).json(product);
} catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return; }
  
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
   if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
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
   if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }


  const { title, quantity, price, category } = req.body;


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
   if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
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



