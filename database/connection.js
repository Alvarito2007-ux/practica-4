// Gestión de la conexión con la base de datos local

// cargamos la funcionalidad de mongoose para
// conectar con la BD

const mongoose = require("mongoose");

const connection = async () => {
    
    try { 
        await mongoose.connect("mongodb+srv://username_blog_uer:Z4lpjaUYbMrIg0uq@cluster0.jjk3i.mongodb.net/mi_blog");
        console.log("Conectado correctamente a la base de datos mi_blog!!");

    }
    catch(err){
        console.log(err);
        throw new Error("No nos hemos podido conectar con la base de datos");
    }
}

module.exports= {

    connection
    
}