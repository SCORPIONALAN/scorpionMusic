import {Album} from '../models/album.model.js'
export const getAllAlbums = async (req, res, next) =>{
    try {
        const albums = await Album.find();
        res.status(200).json(albums)
    } catch (error) {
        next(error);
    }
};
export const getAlbumById = async (req, res, next) =>{
    try {
        const {albumId} = req.params;
        const album = await Album.findById(albumId).populate("songs"); //Checar la tabla de canciones y mandarlas a llamar (JOINS de mongo)
        if(!album){
            return res.status(404).json({message: "Album no encontrado"})
        }
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }
}