import {Router} from 'express';
const router = Router();
router.get('/', (req, res)=>{
    res.send('Entraste a la parte de las canciones');
});
export default router;