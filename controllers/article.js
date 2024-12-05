// CONTROLADOR: article.js
const validator = require("validator");


// Controlador de prueba "prueba"
const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artí­culos"
    });
 };
 
 
 // Controlador de prueba "cursos" contiene el Endpoint de “prueba” que 
 // tení­amos antes en server.js app.get(“/prueba”, (req, res) => { … })
 const cursos = (req, res) => {
    console.log("Se ha ejecutado el Endpoint 'cursos'");
   
    //Devolvemos una colección de objetos JSON
    return res.status(200).json([
        {
            curso: "Aprende API REST",
            autor: "AVG",
            url: "antoniovarela.es"
        },
        {
            curso: "Aprende P5js",
            autor: "AVG",
            url: "antoniovarela.es"
        }
    ]);
   
 };
 
//Controlador "create" que lee los valores recibidos en el cuerpo del request
const create = (req, res) => {
    //leemos los datos recibidos por post {title, contain}
    let parametros = req.body;
  
    //validamos los datos
    try {
        let validaTitle_isEmpty = validator.isEmpty(parametros.title);
        let validaTitleLength = validator.isLength(parametros.title, {min:5, max:30});


        let validaContain_isEmpty = validator.isEmpty(parametros.contain);


        if (validaTitle_isEmpty || !validaTitleLength || validaContain_isEmpty){
            throw new Error("Información recibida no validada!");
        }
    }
    catch(err){
        return  res.status(400).json({
            mensaje: "Se ha producido un error al validar datos en \/create",
            status: "error: "+err.message
        });
    }

    return res.status(200).json({
        mensaje: "Guardamos datos con \/create",
        parametros
    });
 };
 

 module.exports = {
    prueba,
    cursos,
    create
 }
 