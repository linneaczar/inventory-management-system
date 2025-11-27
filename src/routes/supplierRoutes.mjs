import express from "express";

import { getAllSuppliers, getSupplierById, getProductOfSupplierById, createNewSupplier, updateSupplier, deleteSupplier } from "../repositories/supplierRepository.mjs";

const router = express.Router();

//KOLLA UPP HUR JAG GÖR OM MAN SKA RADERA EN LEVERANTÖR. ON DELETE CASCADE PÅ FORREIN KEYN? FÖR ATT ALLA PRODUKTER SKA FÖRSVINNA SOM TILLHÖR


/*

GET /suppliers för att hämta alla leverantörer
GET /suppliers/:id för att hämta en specifik leverantör (denna skall också returnera antalet produkter för leverantören, men inte produkterna i sig)
POST /suppliers för att skapa en ny leverantör
PUT /suppliers/:id för att uppdatera en befintlig leverantör
DELETE /suppliers/:id för att ta bort en leverantör
GET /suppliers/:id/products för att hämta alla produkter från en specifik leverantör

*/

//POST/suppliers - Skapa en ny leverantör 
//=======================================

router.post("/", async (req, res) => {

  // Först kollar vi att requesten har en body (JSON-data)
  if (!req.body) {
    res.status(400).json({
      error: "A JSON body must be included",
    });
    return;
  }

  const { supplierName, contactPerson, email, phoneNumber, country } = req.body;

  // Validerar att supplierName är en sträng och inte undefined/null
  if (!validateString(supplierName)) {
    res.status(400).json({
      error: "Supplier name must be included and be a string",
    });
    return;
  }

  // Validerar att contactPerson är en sträng och inte undefined/null
  if (!validateString(contactPerson)) {
    res.status(400).json({
      error: "Contact person must be included and be a string",
    });
    return;
  }

    // Validerar att email är en sträng och inte undefined/null
  if (!validateString(email)) {
    res.status(400).json({
      error: "Email must be included and be a string",
    });
    return;
  }

  // Validerar att phoneNumber är ett nummer och finns med
  if (!validateNumber(phoneNumber)) {
    res.status(400).json({
      error: "Phone number must be included and be a number",
    });
    return;
  }

   // Validerar att country är en sträng och inte undefined/null
  if (!validateString(country)) {
    res.status(400).json({
      error: "Country must be included and be a string",
    });
    return;
  }

  try {
    const supplier = await createNewSupplier(supplierName, contactPerson, email, phoneNumber, country);
    res.status(201).json(supplier);
  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

//GET/suppliers - Hämta alla leverantörer
//=======================================

router.get("/", async (req, res) => {
  try {
    const suppliers = await getAllSuppliers();
   return res.json(suppliers);

  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
});

//GET/suppliers/:id - Hämta en specifik leverantör
//=======================================

router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }

  try {
    const supplier = await getSupplierById(id);

    if (!supplier) {
      res.status(404).json({ error: "Supplier with id not found" });
      return;
    }
    return res.json(supplier);

  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

//GET/suppliers/:id/products - Hämta en alla produkter från en specifik leverantör
//=======================================

router.get("/:id/products", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }

  try {
    const supplierProducts = await getProductOfSupplierById(id);

    if (supplierProducts.length === 0) {
      return res.status(404).json({ error: "No products found for this supplier" });
    }
    return res.json(supplierProducts);

  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

//PUT/suppliers/:id - Uppdatera en befintlig leverantör
//=======================================

router.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }


  const { supplierName, contactPerson, email, phoneNumber, country } = req.body;

  // Validerar att supplierName är en sträng och inte undefined/null
  if (!validateString(supplierName)) {
    res.status(400).json({
      error: "Supplier name must be included and be a string",
    });
    return;
  }

  // Validerar att contactPerson är en sträng och inte undefined/null
  if (!validateString(contactPerson)) {
    res.status(400).json({
      error: "Contact person must be included and be a string",
    });
    return;
  }

    // Validerar att email är en sträng och inte undefined/null
  if (!validateString(email)) {
    res.status(400).json({
      error: "Email must be included and be a string",
    });
    return;
  }

  // Validerar att phoneNumber är ett nummer och finns med
  if (!validateNumber(phoneNumber)) {
    res.status(400).json({
      error: "Phone number must be included and be a number",
    });
    return;
  }

   // Validerar att country är en sträng och inte undefined/null
  if (!validateString(country)) {
    res.status(400).json({
      error: "Country must be included and be a string",
    });
    return;
  }

  try {
    const updatedSupplier = await updateSupplier(supplierName, contactPerson, email, phoneNumber, country, id);
    if (!updatedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier updated successfully", updatedSupplier });
  } catch (error) {
    // Om något går fel, skriver vi ut felet och skickar tillbaka 500 (server error)
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

});

// DELETE /supplier/:id - Radera en leverantör
// ============================================
router.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);

  // Valdidering: Om användaren skriver in något som inte är ett nummer
  if (!validateNumber(id)) {
    res.status(400).json({ error: "Id must be a number" });
    return;
  }

  try {
    const deleted = await deleteSupplier(id);
    if (deleted === 0) {
     return res.status(404).json({ error: "Supplier not found" });
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