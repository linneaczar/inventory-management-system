import express from "express";

import { getAllSuppliers, getSupplierById, getProductOfSupplierById, createNewSupplier, updateSupplier, deleteSupplier } from "../repositories/supplierRepository.mjs";

const router = express.Router();


/*

GET /suppliers för att hämta alla leverantörer
GET /suppliers/:id för att hämta en specifik leverantör (denna skall också returnera antalet produkter för leverantören, men inte produkterna i sig)
POST /suppliers för att skapa en ny leverantör
PUT /suppliers/:id för att uppdatera en befintlig leverantör
DELETE /suppliers/:id för att ta bort en leverantör
GET /suppliers/:id/products för att hämta alla produkter från en specifik leverantör

*/



export default router;