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

// CORS global (recomendado)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Endpoint: Inventarios_Molino_MBEW
// Devuelve: MATNR (material) y LBKUM (inventario en kg)
app.get("/Inventarios_Molino_MBEW", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
      SELECT MATNR, LBKUM
      FROM Inventarios_Molino_MBEW
    `);

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

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Endpoint: Descripcion_Productos
// Devuelve: MATNR (material) y MAKTX (descripcion)
app.get("/Descripcion_Productos", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
      SELECT MATNR, MAKTX
      FROM Descripcion_Productos
    `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Puerto compatible con Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Inventarios/Descripcion_Productos corriendo en puerto ${PORT}`);
});

