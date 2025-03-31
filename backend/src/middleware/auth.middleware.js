import { clerkClient } from "@clerk/express";

export const protectRoute = async(req, res, next) =>{
    if(!req.auth.userId) {
        return res.status(401).json({message: 'No autorizado - debes estar logeado'});
    }
    next();
}
export const requireAdmin = async(req, res, next) =>{
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId); //Codigo de documentacion clerk
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress; //Comparamos el correo que metemos en las variables de entorno con el correo de clerk
        if(!isAdmin){
            return res.status(401).json({message: 'No autorizado - debes ser el usuario admin'});
        }
    } catch (error) {
        next(error);
    }
}