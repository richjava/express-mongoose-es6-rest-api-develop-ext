import express from 'express';
import userRoutes from './user.route';
import schoolRoutes from './school.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount school routes at /schools
router.use('/schools', schoolRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
