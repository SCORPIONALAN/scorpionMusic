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
import fileUpload from 'express-fileupload';
import path from 'path';

const __dirname = path.resolve();

dotenv.config(); //Uso de dotenv para usar variables de entorno

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //Para parsear peticiones tipo req.body

app.use(clerkMiddleware()); //Para la parte de autenticacion de clerk (agrega auth al req => req.auth)

// Forma para almacenar de forma temporales los datos al hacer la peticion a cloudinary guardarlos temporalmente en el server
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true, // Si no existe el folder crealo
    limits:{
        fileSize: 30 * 1024 * 1024, //30MB de almacenamiento

    }
}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

// MiddleWare para los errores
app.use((err, req, res, next) =>{
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Error interno del servidor": err.message})
})

app.listen(PORT, ()=>{
    console.log(`El server ejecutandose dentro del puerto  ${PORT}`);
    conexionDB();
})