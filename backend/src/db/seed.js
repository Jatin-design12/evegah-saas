require('dotenv').config();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const seed = async () => {
  console.log('Seeding database...');

  // Seed user
  const userId = uuidv4();
  await db.query(`
    INSERT INTO users (id, name, email, role) VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO NOTHING
  `, [userId, 'Priya Sharma', 'priya@evegah.com', 'Employee']);

  // Seed riders
  const riders = [
    { id: uuidv4(), name: 'Amit Kumar', mobile: '+91 98765 43210' },
    { id: uuidv4(), name: 'Neha Gupta', mobile: '+91 91254 56789' },
    { id: uuidv4(), name: 'Rohit Singh', mobile: '+91 99876 54321' },
    { id: uuidv4(), name: 'Sneha Reddy', mobile: '+91 87654 32109' },
    { id: uuidv4(), name: 'Vikram Patel', mobile: '+91 78945 61230' },
  ];

  for (const rider of riders) {
    await db.query(`
      INSERT INTO riders (id, name, mobile) VALUES ($1, $2, $3)
      ON CONFLICT DO NOTHING
    `, [rider.id, rider.name, rider.mobile]);
  }

  // Seed requests
  const requests = [
    { request_id: 'REQ-2024-0518-0012', type: 'new_rider', riderId: riders[0].id, status: 'completed', created_at: '2024-05-18 10:30:00' },
    { request_id: 'REQ-2024-0518-0011', type: 'retain_rider', riderId: riders[1].id, status: 'pending', created_at: '2024-05-18 09:45:00' },
    { request_id: 'REQ-2024-0518-0010', type: 'return_ride', riderId: riders[2].id, status: 'in_progress', created_at: '2024-05-18 09:15:00' },
    { request_id: 'REQ-2024-0518-0009', type: 'extend_ride', riderId: riders[3].id, status: 'completed', created_at: '2024-05-18 08:30:00' },
    { request_id: 'REQ-2024-0518-0008', type: 'battery_swap', riderId: riders[4].id, status: 'pending', created_at: '2024-05-18 08:05:00' },
  ];

  const userResult = await db.query('SELECT id FROM users WHERE email = $1', ['priya@evegah.com']);
  const empId = userResult.rows[0]?.id;

  for (const req of requests) {
    await db.query(`
      INSERT INTO requests (id, request_id, type, rider_id, employee_id, status, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (request_id) DO NOTHING
    `, [uuidv4(), req.request_id, req.type, req.riderId, empId, req.status, req.created_at]);
  }

  // Seed more requests for stats
  const statuses = ['completed', 'completed', 'pending', 'in_progress', 'cancelled', 'rejected'];
  const types = ['new_rider', 'retain_rider', 'return_ride', 'extend_ride', 'battery_swap'];
  
  for (let i = 0; i < 120; i++) {
    const reqId = `REQ-2024-AUTO-${String(i).padStart(4, '0')}`;
    await db.query(`
      INSERT INTO requests (id, request_id, type, rider_id, employee_id, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '${Math.floor(Math.random() * 30)} days')
      ON CONFLICT (request_id) DO NOTHING
    `, [
      uuidv4(), reqId,
      types[i % types.length],
      riders[i % riders.length].id,
      empId,
      statuses[i % statuses.length]
    ]);
  }

  console.log('Seed complete!');
  process.exit(0);
};

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
