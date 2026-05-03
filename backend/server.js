const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize PostgreSQL Pool
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'woodland_db',
  password: process.env.PGPASSWORD || 'password',
  port: process.env.PGPORT || 5432,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Successfully connected to PostgreSQL Database');
    release();
  }
});

// Basic API Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Backend is running correctly.' });
});

app.get('/api/projects', async (req, res) => {
  try {
    // A query example once tables are created
    // const result = await pool.query('SELECT * FROM projects');
    // res.json(result.rows);
    res.json([
      { id: 1, title: 'Coastal Villa', status: 'Completed' },
      { id: 2, title: 'The Willow Loft', status: 'In Progress' },
      { id: 3, title: 'Sunshine Retreat', status: 'Planning' }
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
