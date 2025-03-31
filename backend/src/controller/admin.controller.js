import {Song} from '../models/song.model.js';
import {Album} from '../models/album.model.js';
import cloudinary from '../lib/clodinary.js';

//          Subida de archivos a cloudinary
const uploadToCloudinary = async(file) =>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto"  //Tipo de archivo que vamos a subir
        })
        return result.secure_url; // URL del documento donde se hospeda
    } catch (error) {
        console.log("Error dentro de Cloudinary", error);
        throw new Error('Error al subir a cloudinary');
    }
}
export const createSong = async (req, res, next) =>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: 'Favor de llenar todos los campos'});
        }
        const {title, artist, albumId, duration}= req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;
        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        });
        await song.save;
        // Si la cancion pertenece a un album, entonces agregar la cancion a ese album
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push:{songs: song._id}
            })
        }
        res.status(201).json(song);
    } catch (error) {
        console.log('Existe un error dentro del controlador admin', error);
        next(error);
    }
};
export const deleteSong = async(req, res, next) =>{
    try {
        const { id } = req.params; //pasamos los parametros de un URL con ID hsta al final
        const song = await Song.findById(id);
        // en caso de estar dentro de un album
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull: {songs: song._id},
            });
        };
        await Song.findByIdAndDelete(id);
        res.status(200).json({message: 'La cancion fue eliminada con exito!'})
    } catch (error) {
        console.log("Error en la parte de eliminar cancion ", error)
        next(error);
    }
}
export const createAlbum = async(req, res, next)=>{
    try {
        const {title, artist, releaseYear} = req.body;
        const {imageFile} = req.files;
        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await album.save(); // Mandar a la base de datos
        res.status(201).json(album);
    } catch (error) {
        console.log("Error en crearAlbum", error)
        next(error);
    }
}
export const deleteAlbum = async(req, res, next)=>{
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId: id}); // Eliminamos todas las canciones
        await Album.findByIdAndDelete(id); // Eliminamos todo el album
        res.status(200).json({message:"Album totalmente eliminado!"})
    } catch (error) {
        console.log("Error al borra el album", error);
        next(error)
    }
}

// Funcion a utilizar en la parte del cliente, para su verificacion
export const checkAdmin = async (req, res, next)=>{
    res.status(200).json({admin: true})
}