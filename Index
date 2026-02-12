const express = require("express");
const sql = require("mssql");
const app = express();

// Configuración desde variables de ambiente
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// Endpoint: Inventarios_Molino_MBEW
// Devuelve: MATNR (material) y LBKUM (inventario en kg)
app.get("/Inventarios_Molino_MBEW", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
      SELECT MATNR, LBKUM
      FROM Inventarios_Molino_MBEW
    `);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Endpoint: Inventarios_Transito
// Devuelve: MATNR (material) y TRAME (inventario en kg)
app.get("/Inventarios_Transito", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
      SELECT MATNR, TRAME
      FROM Inventarios_Transito
    `);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => {
  console.log("API Inventarios Molino/Transito corriendo en puerto 3000");
});

