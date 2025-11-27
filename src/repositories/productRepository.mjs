import pool from "../config/db.mjs"

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
  supplier_id INTEGER REFERENCES suppliers(id) ON DELETE CASCADE
  )`, []
  );
}

export async function getAllProducts() {
  const result = await pool.query(`SELECT products.*,
  suppliers.supplier_name,
  suppliers.country,
  suppliers.contact_person
  FROM products
  LEFT JOIN suppliers 
  ON suppliers.id = products.supplier_id`);

  if (!result.rows) {
    throw new Error("Failed to get products");
  }
  return result.rows;
}

export async function getProductById(id) {
  const result = await pool.query(`SELECT products.*,
  suppliers.supplier_name,
  suppliers.country,
  suppliers.contact_person
  FROM products
  LEFT JOIN suppliers 
  ON suppliers.id = products.supplier_id 
  WHERE products.id = $1`, [id]);

  if (!result.rows || result.rowCount !== 1) {
    return null;
  }

  return result.rows[0];
}

// Söker efter produkt vars kateogori innehåller en viss text
export async function getProductsByCategory(category) {
  // LOWER() konverterar till gemener för case-insensitive sökning
  // LIKE med % före och efter söker efter texten var som helst i titeln
  const result = await pool.query(
    "SELECT * FROM products WHERE LOWER(category) LIKE $1",
    ["%" + category.toLowerCase() + "%"]
  );

  // Om inga resultat hittas, returnera tom array
  if (result.rows.length === 0) {
    return [];
  }

  return result.rows;
}

export async function createNewProduct(title, quantity, price, category, supplierId) {
  const result = await pool.query(
    "INSERT INTO products (title, quantity, price, category, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, quantity, price, category, supplierId]
  );
  if (result.rowCount !== 1) {
    throw new Error("Failed to create product");
  }
  return result.rows[0];
}

export async function updateProduct(title, quantity, price, category, supplierId, id) {
  const result = await pool.query(
    "UPDATE products SET title = $1, quantity =$2, price = $3, category =$4, supplier_id =$5 WHERE id = $6 RETURNING *",
    [title, quantity, price, category, supplierId, id]
  );
   // Om ingen rad uppdaterades (id hittades inte)
  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

export async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);

   return result.rowCount;
}

