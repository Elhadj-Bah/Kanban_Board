import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
var router = Router();
router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes);
export default router;
//# sourceMappingURL=index.js.map