import {Song} from '../models/song.model.js'
export const getAllSongs = async (req, res, next) =>{
    try {
        const songs = Song.find().sort({createdAt:-1}) // Mostrar el mas nuevo al inicio, el mas viejo al final
        res.json(songs);
    } catch (error) {
        next(error);
    }
}
// Funcion para mostrar de forma aleatoria los albumes al entrar
export const getFeaturedSongs = async (req, res, next) =>{
    try {
        // trae items de forma aleatoria usando el pipeline de aggregation
        const songs = await Song.aggregate([
            {
                $sample:{size:6} // Muestreo aleatoreo
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

export const getMadeForYouSongs = async (req, res, next)=>{
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.json(songs);
    } catch (error) {
        next(error)
    }
}

export const getTrendingSongs = async(req, res, next) =>{
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:6}
            },
            {
                $proyect:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        next(error);
    }
}