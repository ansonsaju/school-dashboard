const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// MySQL Connection Pool
let pool;

function createPool() {
  // Priority 1: Use DATABASE_URL (Railway's private network connection)
  if (process.env.DATABASE_URL) {
    console.log('📡 Connecting using DATABASE_URL (private network)...');
    return mysql.createPool(process.env.DATABASE_URL);
  }
  
  // Priority 2: Use MYSQL_URL (alternative private network)
  if (process.env.MYSQL_URL) {
    console.log('📡 Connecting using MYSQL_URL (private network)...');
    return mysql.createPool(process.env.MYSQL_URL);
  }
  
  // Priority 3: Use individual variables (fallback)
  console.log('📡 Connecting using individual variables...');
  return mysql.createPool({
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'railway',
    port: parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
}

// Auto-healing: Initialize database with retry logic
async function initDatabase() {
  let retries = 0;
  const maxRetries = 10;

  while (retries < maxRetries) {
    try {
      if (!pool) {
        pool = createPool();
      }

      console.log(`🔄 Attempting database connection (${retries + 1}/${maxRetries})...`);
      const connection = await pool.getConnection();
      console.log('✅ Connected to MySQL database successfully!');
      
      // Create users table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          school_name VARCHAR(100) NOT NULL,
          role ENUM('school', 'admin') DEFAULT 'school',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_username (username)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✅ Users table ready');

      // Create school_data table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS school_data (
          id INT AUTO_INCREMENT PRIMARY KEY,
          school_id VARCHAR(50) NOT NULL,
          data_type VARCHAR(50) NOT NULL,
          data_value TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_school_id (school_id),
          INDEX idx_data_type (data_type)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✅ School data table ready');

      // Create students table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS students (
          id INT AUTO_INCREMENT PRIMARY KEY,
          school_id VARCHAR(50) NOT NULL,
          student_name VARCHAR(100) NOT NULL,
          course VARCHAR(100),
          enrollment_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_school_student (school_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✅ Students table ready');

      // Check if demo accounts exist
      const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
      
      if (users[0].count === 0) {
        console.log('📝 Creating demo accounts...');
        
        const hashedPassword1 = await bcrypt.hash('abc123', 10);
        const hashedPassword2 = await bcrypt.hash('qwe123', 10);
        const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);

        await connection.query(`
          INSERT INTO users (username, password, school_name, role) VALUES
          ('abc', ?, 'ABC School', 'school'),
          ('qwe', ?, 'QWE School', 'school'),
          ('admin', ?, 'Super Admin', 'admin')
        `, [hashedPassword1, hashedPassword2, hashedPasswordAdmin]);

        // Insert demo students
        await connection.query(`
          INSERT INTO students (school_id, student_name, course, enrollment_date) VALUES
          ('abc', 'John Doe', 'Fashion Design', '2024-01-15'),
          ('abc', 'Jane Smith', 'Pattern Making', '2024-01-20'),
          ('abc', 'Mike Johnson', 'Textile Design', '2024-02-01'),
          ('abc', 'Emily Brown', 'Garment Construction', '2024-02-10'),
          ('abc', 'Sarah Wilson', 'Fashion Illustration', '2024-02-15'),
          ('qwe', 'David Lee', 'Fashion Design', '2024-01-10'),
          ('qwe', 'Lisa Chen', 'Pattern Making', '2024-01-18'),
          ('qwe', 'Tom Martinez', 'Garment Construction', '2024-01-25'),
          ('qwe', 'Anna Taylor', 'Textile Design', '2024-02-05')
        `);

        console.log('✅ Demo accounts and student data created');
      }

      connection.release();
      console.log('✅ Database initialized successfully');
      console.log('🎉 All systems ready!');
      return true;

    } catch (error) {
      retries++;
      console.error(`❌ Database initialization error (attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries < maxRetries) {
        console.log(`⏳ Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('❌ Max retries reached. Database initialization failed.');
        console.error('💡 Check your DATABASE_URL or MySQL connection variables');
        return false;
      }
    }
  }
}

// API: Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username.toLowerCase().trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      username: user.username,
      schoolName: user.school_name,
      role: user.role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Get school data
app.get('/api/school-data/:schoolId', async (req, res) => {
  try {
    const { schoolId } = req.params;
    
    const [students] = await pool.query(
      'SELECT * FROM students WHERE school_id = ? ORDER BY created_at DESC',
      [schoolId]
    );

    const [data] = await pool.query(
      'SELECT * FROM school_data WHERE school_id = ?',
      [schoolId]
    );

    res.json({ students, data });
  } catch (error) {
    console.error('Get data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Upload student data
app.post('/api/school-data', async (req, res) => {
  try {
    const { schoolId, studentName, course } = req.body;
    
    await pool.query(
      'INSERT INTO students (school_id, student_name, course, enrollment_date) VALUES (?, ?, ?, CURDATE())',
      [schoolId, studentName, course]
    );

    res.json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Admin - Get all schools
app.get('/api/admin/schools', async (req, res) => {
  try {
    const [schools] = await pool.query(`
      SELECT 
        u.username, 
        u.school_name, 
        u.created_at,
        COUNT(s.id) as student_count
      FROM users u
      LEFT JOIN students s ON u.username = s.school_id
      WHERE u.role = 'school'
      GROUP BY u.username, u.school_name, u.created_at
    `);

    res.json(schools);
  } catch (error) {
    console.error('Admin get schools error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
const server = app.listen(PORT, async () => {
  console.log('='.repeat(50));
  console.log('🚀 School Dashboard Server Starting...');
  console.log('='.repeat(50));
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔌 Database URL: ${process.env.DATABASE_URL ? '✅ Set' : process.env.MYSQL_URL ? '✅ Set (MYSQL_URL)' : '❌ Not Set'}`);
  console.log('='.repeat(50));
  
  await initDatabase();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️ SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    if (pool) {
      pool.end();
      console.log('✅ Database connections closed');
    }
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️ SIGINT received, closing server gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    if (pool) {
      pool.end();
      console.log('✅ Database connections closed');
    }
    process.exit(0);
  });
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
