import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { config } from './config/env.js';
import { testConnection, initializeDatabase } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import gamesRoutes from './routes/games.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';
import aiRoutes from './routes/ai.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/games', gamesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    const dbConnected = await testConnection();
    
    if (dbConnected) {
      await initializeDatabase();
    } else {
      console.log('⚠️ Running without database - using mock data');
    }
    
    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      console.log(`📚 API Documentation:`);
      console.log(`   GET    /api/games          - List games with filters`);
      console.log(`   GET    /api/games/:id      - Get game by ID`);
      console.log(`   POST   /api/games          - Create game`);
      console.log(`   PATCH  /api/games/:id      - Update game`);
      console.log(`   DELETE /api/games/:id      - Delete game`);
      console.log(`   GET    /api/favorites      - Get user favorites`);
      console.log(`   POST   /api/favorites      - Add to favorites`);
      console.log(`   DELETE /api/favorites      - Remove from favorites`);
      console.log(`   GET    /api/ai/moods       - Get available moods`);
      console.log(`   POST   /api/ai/recommend   - Get AI recommendations`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
