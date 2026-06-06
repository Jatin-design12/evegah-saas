require('dotenv').config();
const db = require('../db');

const migrate = async () => {
  console.log('Running migrations...');

  await db.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      role VARCHAR(50) DEFAULT 'Employee',
      avatar_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS riders (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS requests (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      request_id VARCHAR(30) UNIQUE NOT NULL,
      type VARCHAR(50) NOT NULL,
      rider_id UUID REFERENCES riders(id),
      employee_id UUID REFERENCES users(id),
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  console.log('Migrations complete!');
  process.exit(0);
};

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
