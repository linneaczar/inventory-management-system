
import express from "express";
import productRoutes from "./routes/productRoutes.mjs";
//importera supplier sen när den är skapad
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { createSupplierTable } from "..supplierRepository.mjs" 
import { createProductTable } from "..productRepository.mjs" 

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

app.use(express.json());

app.use("/products", productRoutes);
//lägg till för suppliers

createSupplierTable();
createProductTable();

//lägg till Global error handler

app.listen(PORT, () => {
console.log(`The server is running on http://${HOST}:${PORT}`)
});