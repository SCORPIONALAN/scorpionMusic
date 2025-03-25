import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    releaseYear:{
        type:Number,
        required: true
    },
    songs: [{
        //Asignamos una referencia por ID a las colecciones de canciones
        // Es un arreglo porque un album puede contener mas de una cancion
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Song'
    }]
}, {timestamps:true})
export const Album = mongoose.Model('Album', albumSchema);