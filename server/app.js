require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');

// Routes (V03 existing style)
const authRoutes = require('./routes/auth');
const ideasRoutes = require('./routes/ideas');
const juryRoutes = require('./routes/jury');
const downloadsRoutes = require('./routes/downloads');
const newsRoutes = require('./routes/news');
const settingsRoutes = require('./routes/settings');
const adminRoutes = require('./routes/admin');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const origins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map(s => s.trim());
app.use(cors({ origin: origins, credentials: true }));

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// DB
connectDB().then(() => console.log('✅ Mongo connected')).catch(err => {
  console.error('❌ Mongo error:', err.message);
  process.exit(1);
});

// --- Legacy mounts (keep backward compat if you had clients hitting /api/*)
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/jury', juryRoutes);
app.use('/api/downloads', downloadsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin', adminRoutes);

// --- V04 mounts (new)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ideas', ideasRoutes);
app.use('/api/v1/judges', juryRoutes);
app.use('/api/v1/downloads', downloadsRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 API ready on http://localhost:${port}`));
