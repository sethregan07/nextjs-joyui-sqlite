import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
  )`);

  // Articles table
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT,
      image_url TEXT,
      category TEXT,
      published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Banking tables
  db.run(`
    CREATE TABLE IF NOT EXISTS credit_cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      annual_fee REAL,
      apr REAL,
      rewards TEXT,
      pros TEXT,
      cons TEXT,
      link TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'credit_cards'
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS savings_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      apy REAL,
      minimum_deposit REAL,
      monthly_fee REAL,
      pros TEXT,
      cons TEXT,
      link TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'savings_accounts'
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS checking_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      monthly_fee REAL,
      atm_fees REAL,
      overdraft_protection TEXT,
      pros TEXT,
      cons TEXT,
      link TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'checking_accounts'
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      apy REAL,
      term_months INTEGER,
      minimum_deposit REAL,
      early_withdrawal_penalty TEXT,
      pros TEXT,
      cons TEXT,
      link TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'cds'
    );
  `);

  // AI Tools table
  db.run(`
    CREATE TABLE IF NOT EXISTS ai_tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      pros TEXT,
      cons TEXT,
      link TEXT,
      image_url TEXT,
      rating REAL,
      pricing TEXT,
      best_for TEXT
    );
  `);

});

export default db;