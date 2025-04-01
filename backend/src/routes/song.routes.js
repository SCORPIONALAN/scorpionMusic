import {Router} from 'express';
import {protectedRoute, requireAdmin} from '../middleware/auth.middleware.js'
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from '../controller/songs.controller.js';
const router = Router();
router.get('/', protectedRoute, requireAdmin, getAllSongs);

router.get('/featured', getFeaturedSongs);
router.get('/para-ti', getMadeForYouSongs);
router.get('/tendencias', getTrendingSongs)
export default router;