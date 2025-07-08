import Database from "better-sqlite3";

// Initialize database
const db = new Database(":memory:");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin'
  );
  
  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    price_per_day REAL NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    images TEXT, -- JSON array of image URLs
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id INTEGER NOT NULL,
    admin_id INTEGER NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    FOREIGN KEY (admin_id) REFERENCES users(id)
  );
`);

// Seed initial admin user
const adminPassword = bcrypt.hashSync("admin123", 10);
db.prepare(
  `
  INSERT OR IGNORE INTO users (username, password, role) 
  VALUES (?, ?, ?)
`
).run("admin", adminPassword, "admin");

// Seed some sample listings
db.prepare(
  `
  INSERT OR IGNORE INTO listings 
  (make, model, year, mileage, price_per_day, location, description, status, created_by)
  VALUES 
  ('Toyota', 'Camry', 2020, 25000, 45.99, 'New York', 'Reliable sedan in excellent condition', 'pending', 1),
  ('Honda', 'Civic', 2019, 32000, 39.99, 'Los Angeles', 'Fuel efficient with great features', 'approved', 1),
  ('Ford', 'Mustang', 2021, 15000, 89.99, 'Chicago', 'Powerful sports car', 'rejected', 1)
`
).run();

export default db;
