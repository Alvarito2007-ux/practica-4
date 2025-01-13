// CONTROLADOR: article.js
const validator = require("validator");
// usaremos el esquema definido para salvar los artículos en la BD
const Article = require("../models/Article");


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
const create = async (req, res) => {
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

   // creamos el objeto a guardar con los parámetros validados
   // el objeto sigue las propiedades del esquema Article definido
   const article = new Article(parametros);


   //guardamos el objeto en la base de datos
   try {
       // Usamos el método save del objeto article que hemos creado
       // con nuestro esquema con mongoose. Si todo va bien en
	 // articleSaved tendremos una copia del objeto json salvado
	 // y si se produce un error lo capturamos en el catch
       const articleSaved = await article.save();


       return res.status(200).json({
           mensaje: "Hemos guardado el artí­culo con /create",
           status: "success",
           article: articleSaved
       });
   } catch (err) {
       return res.status(400).json({
           mensaje: "No se ha guardado el artí­culo en /create",
           status: "error: " + err.message
       });
   }

 };
 
// Endpoint getArticles
const getArticles = async (req, res) => {
    try {
      // parámetros opcionales ‘page’, ‘limit’ e ‘id’
      // page: indica la página de la que quiero obtener los datos
      //       por defecto si no se indica decimos que la 1
      // limit: indica cuántos resultados quiero obtener, por defecto
      //        si no se indica hasta 10
       // id: indica el identificador único del artículo que quiero
       //     recuperar
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const id = req.query.id;
        
  let articles;
 
      // Si nos han pedido un artículo en concreto
        if (id) {
            try {
                articles = await Article.find({_id: id})
                // lean es por si solo queremos devolver los
                // resultados de la colección, y no traer más
                // información de mongoose de los datos leídos
                                        .lean()
                                        .exec();
            }
            // al filtrar por find, que es el equivalente a un WHERE en
            // una consulta relacional, si no se encuentra el valor, se
            // genera un error
            catch (err) { 
                return res.status(404).json({
                    mensaje: `No se ha encontrado el artículo con el id: ${id} en /lista`,
                    status: "error: " + err.message
                });
            }                                         
        }
        else {
            articles = await Article.find({})
            // Si indicamos una página, el valor del límite nos
            // sirve para indicar cuantos artículos queremos por
            // página y nos pagina el resultado obtenido
                                    .skip((page - 1) * limit)
                                    .limit(limit)
            //más recientes primero, ordenamos por fecha en orden
            // inverso (-1), si no indicamos nada o indicamos (1)
            // sería de menor a mayor
                                    .sort({date: -1})  
                                    .lean()
                                    .exec();
        }

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                mensaje: "No se han encontrado artículos en /lista",
                status: "error"
            });
        }
 
 
        return res.status(200).json({
            status: "success",
            articles
        });
 
 
    } catch (err) {
        return res.status(404).json({
            mensaje: "Error desconocido al listar artí­culos en /lista",
            status: "error: " + err
        });
    }
 };
 

 module.exports = {
    prueba,
    cursos,
    create,
    getArticles
 }
 