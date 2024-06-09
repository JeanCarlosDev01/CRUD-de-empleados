// Configuración del servidor Node.js utilizando Express para una aplicación que se conecta a una base de datos MySQL:

const express = require("express");  // Importa el módulo Express.
const app = express();  // Crea una instancia de la aplicación Express.
const mysql = require("mysql");  // Importa el módulo MySQL.
const cors = require("cors");  // Importa el módulo CORS.

app.use(cors());  // Utiliza el middleware CORS para permitir solicitudes de diferentes dominios.
app.use(express.json());  // Utiliza el middleware para analizar solicitudes en formato JSON.

// Configuración de la conexión a la base de datos MySQL.
const db = mysql.createConnection({
  host: "localhost",  // Host de la base de datos.
  user: "root",  // Usuario de la base de datos.
  password: "",  // Contraseña de la base de datos.
  database: "dbempleados"  // Nombre de la base de datos.
});



//Endpoint POST "/create": Maneja las solicitudes de creación de nuevos registros de empleados.
 app.post("/create", (req,res)=> {
    //  Extrae los datos del cuerpo de la solicitud (identificacion, nombre, cargo, telefono).
    const identificacion = req.body.identificacion;
    const nombre = req.body.nombre;
    const cargo = req.body.cargo;
    const telefono = req.body.telefono;

    //  Ejecuta una consulta SQL para insertar los datos en la tabla 'empleados' de la base de datos.
    db.query("INSERT INTO empleados (identificacion, nombre, cargo, telefono) VALUES (?,?,?,?)", [identificacion,nombre,cargo,telefono],
    (err, result)=> {
        if (err) {
            // En caso de error durante la inserción, imprime un mensaje de error en la consola.
            console.log("Error al registrar: " + err);
        }else {
            // Si la inserción es exitosa, envía una respuesta indicando "Registro exitoso".
            res.send("Registro exitoso");
        }
    }
    );
});


// Endpoint GET "/empleados": Maneja las solicitudes para obtener todos los empleados registrados en la base de datos.
app.get("/empleados", (req,res)=> {
    // Ejecuta una consulta SQL para seleccionar todos los registros de la tabla 'empleados'.
    db.query("SELECT * FROM empleados",
    (err, result)=> {
        if (err) {
        // En caso de error durante la consulta, imprime un mensaje de error en la consola.
            console.log("Error al registrar: " + err);
        }else {
            // Si la consulta es exitosa, envía como respuesta el resultado, que contiene la información de todos los empleados.
            res.send(result);
        }
    }
    );
});


// Endpoint PUT "/update": Maneja las solicitudes de actualización de registros de empleados en la base de datos.

app.put("/update",(req,res)=>{
    // Extrae los datos del cuerpo de la solicitud (id, identificacion, nombre, cargo, telefono).
    const id = req.body.id;
    const identificacion = req.body.identificacion;
    const nombre = req.body.nombre;
    const cargo = req.body.cargo;
    const telefono = req.body.telefono;

    // Ejecuta una consulta SQL para actualizar los datos en la tabla 'empleados' de la base de datos.
    db.query("UPDATE empleados SET identificacion=?,nombre=?,cargo=?,telefono=? WHERE id=?", [identificacion,nombre,cargo,telefono,id],
    (err, result)=> {
        if (err) {
            // En caso de error durante la actualización, imprime un mensaje de error en la consola.
            console.log("Error al actualiazar: " + err);
        }else {
            // Si la actualización es exitosa, envía una respuesta indicando "Actualización exitosa"
            res.send("actualizacion exitosa");
        }
    }
    );
});


// Endpoint DELETE "/delete/:id": Maneja las solicitudes de eliminación de registros de empleados en la base de datos.

app.delete("/delete/:id",(req,res)=>{
    // Extrae el parámetro 'id' de la URL.
    const id = req.params.id;

    // Ejecuta una consulta SQL para eliminar el registro correspondiente en la tabla 'empleados' de la base de datos.
    db.query("DELETE FROM empleados WHERE id=?",[id],
    (err, result)=> {
        if (err) {
            // En caso de error durante la eliminación, imprime un mensaje de error en la consola.
            console.log("Error al eliminar: " + err);
        }else {
            // Si la eliminación es exitosa, envía una respuesta indicando "Eliminación exitosa".
            res.send("Eliminación exitosa");
        }
    }
    );
});

/*
  Inicia el servidor Express para escuchar en el puerto 3001:
  Utiliza el método 'listen' para iniciar el servidor en el puerto 3001.
  Imprime un mensaje en la consola indicando que el servidor está corriendo en el puerto 3001.
*/
app.listen(3001, ()=> {
    console.log("Puerto 3001: corriendo")
});


