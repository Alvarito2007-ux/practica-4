// CONTROLADOR: article.js


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
 
 
 module.exports = {
    prueba,
    cursos
 }
 