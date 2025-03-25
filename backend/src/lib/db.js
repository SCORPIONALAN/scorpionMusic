import mongoose from 'mongoose';

export const conexionDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error(`Error en la base de datos ${error}`);
        process.exit(1); // 1 es falla y 0 es logrado
    }
}