import pool from "../config/db.js";

//Skapar en tabell i PostgresSQL 
export async function createSupplierTable() {
  await pool.query(
  `CREATE TABLE IF NOT EXISTS suppliers(
  id SERIAL PRIMARY KEY,
  supplier_name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone_number INT NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, []
  );
}


/*

GET /suppliers för att hämta alla leverantörer
GET /suppliers/:id för att hämta en specifik leverantör (denna skall också returnera antalet produkter för leverantören, men inte produkterna i sig)
POST /suppliers för att skapa en ny leverantör
PUT /suppliers/:id för att uppdatera en befintlig leverantör
DELETE /suppliers/:id för att ta bort en leverantör
GET /suppliers/:id/products för att hämta alla produkter från en specifik leverantör

//Lägg till if-satser för error likt vad han gör i blog 

export async function getAllProducts() {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
}

export async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createNewProduct(title, quantity, price, category) {
  const result = await pool.query(
    "INSERT INTO products (title, quantity, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, quantity, price, category]
  );
  return result.rows[0];
}

export async function updateProduct(title, quantity, price, category, id) {
  const result = await pool.query(
    "UPDATE products SET title = $1, quantity =$2, price = $3, category =$4 WHERE id = $5 RETURNING *",
    [title, quantity, price, category, id]
  );
  return result.rows[0];
}

export async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
 if (result.rowCount === 0) {
    res.status(404).send();
    return;
 }}

*/