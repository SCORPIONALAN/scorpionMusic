import { User } from "../models/user.model.js";
export const authCallBack = async (req, res) =>{
    try {
        //                              Para crear cuenta o iniciar sesion
        // Almacenamiento de clerk
        const {id, firstName, lastName, imageUrl} = req.body;
        const user = await User.findOne({clerkId: id}); //Verifica si existe un usuario comparando clerk con mongo
        // Crear cuenta
        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }
        //Peticion http para crear
        res.status(200).json({success:true});
    } catch (error) {
        console.log('Error en auth callback', error);
        res.status(500).json({message: "Error interno del servidor", error});
    }
}