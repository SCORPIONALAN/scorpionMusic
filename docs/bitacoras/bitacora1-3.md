### primer avance
En este día me encargue totalmente de crear la estructura de mi aplicacion, dividirla tanto de fronend y backend. Avance solo un poco con la implementacion de una API de verificacion (clerk). Descargar las dependencias del frontend y las dependencias del backend (mongoose dotenv cloudinary cors @clerk/express socket.io)

### Segundo avance
En este dia me encargue de primero que nada desarrollar mas la parte del backend, como necesito instalar dependencias de desarrollo como nodemon, tuve que crear el script para ejecutar el servidor.
Creacion del servidor como tal con sus respectivas rutas a usar, uso de una vez las varibles de entorno para momento dejar unicamente el puerto y las credenciales de MongoDB, conexion a la base de datos.
Creacion de 4 modelos importantes dentro de nuestro aplicativo Album, Messages, Song, User.

### Tercer avance
Este dia el primer avance que hice fue hacer uso de un endpoint para verificar si un usuario esta logeado o si no crearle su cuenta.
Posteriormente hice implementacion del middleware que ofrece clerk, todo esto mediante su propia documentacion. Una vez bien configurado podremos hacer uso de auth en las request. Lo cual va a ser muy importante ya que esta autenticacion cae dentro de nuestro propio middleware, el cual contiene 2 funciones importantes. La primera protectRoute varifica si un usuario esta autenticado o no, si lo esta da permiso a usar la siguiente funcion para el endpoint, caso contrario retorna una accion no autorizada. Y la segunda requireAdmin la cual hace uso del correo del admin y se verifica si el correo que esta dentro de las variables de entorno y el correo que actualmente esta usando el middleware de clerk es el mismo