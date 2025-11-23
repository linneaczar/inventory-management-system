import pool from "../config/db.mjs";

//HÄR SKAPAR JAG FUNKTIONERNA FÖR DATABASEN OCH EXPORTERAR DEM

//Skapar en tabell i PostgresSQL
export async function createProductTable() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL, 
  category TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  supplier_id INTEGER REFERENCES suppliers(id)
  )`, []
  );
}

export async function getAllProducts() {
  const result = await pool.query("SELECT * FROM products");

  if (!result.rows) {
    throw new Error("Failed to get products");
  }
  return result.rows;
}

export async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if (!result.rows || result.rowCount !== 1) {
    return null;
  }

  return result.rows[0];
}

export async function createNewProduct(title, quantity, price, category) {
  const result = await pool.query(
    "INSERT INTO products (title, quantity, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, quantity, price, category]
  );
  if (result.rowCount !== 1) {
    throw new Error("Failed to create product");
  }
  return result.rows[0];
}

export async function updateProduct(title, quantity, price, category, id) {
  const result = await pool.query(
    "UPDATE products SET title = $1, quantity =$2, price = $3, category =$4 WHERE id = $5 RETURNING *",
    [title, quantity, price, category, id]
  );
  return result.rowCount > 0;
}

export async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    res.status(404).send();
    return;
  }
}

