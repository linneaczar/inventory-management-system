import pool from "../config/db.mjs";

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

*/

export async function getAllSuppliers() {
    const result = await pool.query("SELECT * FROM suppliers");

    if (!result.rows) {
        throw new Error("Failed to get suppliers");
    }
    return result.rows;
}

//(denna skall också returnera antalet produkter för leverantören, men inte produkterna i sig)
export async function getSupplierById(id) {
    const result = await pool.query(`SELECT suppliers.*, 
        COUNT(products.id) AS product_count FROM suppliers 
        LEFT JOIN products ON products.supplier_id = suppliers.id WHERE suppliers.id = $1 
        GROUP BY suppliers.id;`, [id]);

    if (!result.rows || result.rowCount !== 1) {
        return null;
    }

    return result.rows[0];
}

//GET /suppliers/:id/products för att hämta alla produkter från en specifik leverantör

export async function getProductOfSupplierById(id) {
    const result = await pool.query(`SELECT products.*, 
    suppliers.name AS supplier_name FROM products
    JOIN suppliers ON suppliers.id = products.supplier_id WHERE suppliers.id = $1`, [id]);

     if (!result.rows) {
        throw new Error("Failed to get product by supplier");
    }
    return result.rows;
}

export async function createNewSupplier(supplierName, contactPerson, email, phoneNumber, country) {
    const result = await pool.query(
        "INSERT INTO suppliers (supplier_name, contact_person, email, phone_number, country) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [supplierName, contactPerson, email, phoneNumber, country]
    );
    if (result.rowCount !== 1) {
        throw new Error("Failed to create supplier");
    }
    return result.rows[0];
}

export async function updateSupplier(supplierName, contactPerson, email, phoneNumber, country, id) {
    const result = await pool.query(
        "UPDATE suppliers SET supplier_name = $1, contact_person =$2, email = $3, phone_number =$4, country = $5 WHERE id = $5 RETURNING *",
        [supplierName, contactPerson, email, phoneNumber, country, id]
    );
      // Om ingen rad uppdaterades (id hittades inte)
  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

export async function deleteSupplier(id) {
    const result = await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
  
    return result.rowCount;
}
