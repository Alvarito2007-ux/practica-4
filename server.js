const {connection} = require("./database/connection");

const express = require("express");
const cors = require("cors");
const path = require('path');

//crear rutas
const articleRoutes = require("./routes/article");

console.log("App se ha iniciado");
connection();

const app = express();

const puerto = 3900;

//configurar cors (un body parser)

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true})); //recibe datos con content-type form-urlencoded



app.use("/api", articleRoutes);

// Configurar la carpeta public para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res) => {
    return res.status(200).send(`    
    <h1>Probando ruta nodejs</h1>
        `);
});



app.get("/prueba", (req,res) => {
    return res.status(200).send(`
     
        <div>

<h1>Probando ruta nodejs</h1>

<p>Creando api rest con node</p>

</div>

        `);
});


//Crear servidor y escuchar peticiones

app.listen(puerto, ()  => {
    console.log("Servidor corriendo en puerto "+puerto+ ".");
});