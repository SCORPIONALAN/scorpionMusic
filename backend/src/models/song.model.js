import mongoose from "mongoose";
const songSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    artist:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    audioUrl:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    albumId:{
        //Asignamos una referencia por ID a las colecciones de los Albumes
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: false
    }
}, {timestamps:true}) //createdAt updatedAt

export const Song = mongoose.Model('Song', songSchema);