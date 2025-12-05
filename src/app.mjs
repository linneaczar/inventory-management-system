
import express from "express";
import productRoutes from "./routes/productRoutes.mjs";
import supplierRoutes from "./routes/supplierRoutes.mjs";

import { createSupplierTable } from "./repositories/supplierRepository.mjs" 
import { createProductTable } from "./repositories/productRepository.mjs" 

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

app.use(express.json());

app.use("/products", productRoutes);
app.use("/suppliers", supplierRoutes);

await createSupplierTable(); // await före så att dom ska skapas i rätt ordning och inte samtidigt
await createProductTable();

app.listen(PORT, () => {
console.log(`The server is running on http://${HOST}:${PORT}`)
});