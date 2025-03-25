import express from 'express';
import dotenv from 'dotenv'; //Libreria para leer variables de entorno
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import songRoutes from './routes/song.routes.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.routes.js';
import { conexionDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express';


dotenv.config(); //Uso de dotenv para usar variables de entorno

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //Para parsear peticiones tipo req.body

app.use(clerkMiddleware()); //Para la parte de autenticacion de clerk


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

app.listen(PORT, ()=>{
    console.log(`El server ejecutandose dentro del puerto  ${PORT}`);
    conexionDB();
})