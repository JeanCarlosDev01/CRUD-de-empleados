import './App.css';
import { useState } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

//Importar libreria para crear las notificaciones para el usuario
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swal = withReactContent(Swal)


function App() {

  // Definición de estados utilizando el hook useState para gestionar el estado local del componente.

  // Estado para almacenar el 'id' del empleado.
  const [id, setId] = useState();

  // Estado para almacenar la 'identificacion' del empleado.
  const [identificacion, setIdentificacion] = useState();

  // Estado para almacenar el 'nombre' del empleado, inicializado con una cadena vacía.
  const [nombre, setNombre] = useState("");

  // Estado para almacenar el 'cargo' del empleado, inicializado con una cadena vacía.
  const [cargo, setCargo] = useState("");

  // Estado para almacenar el 'telefono' del empleado.
  const [telefono, setTelefono] = useState();

  // Estado booleano para indicar si se está realizando una operación de actualización.
  const [actualizar, setActualizar] = useState(false);

  // Estado para almacenar la lista de empleados, inicializado con un arreglo vacío.
  const [listaEmpleados, setEmpleados] = useState([]);

  // Método 'registrar' que utiliza Axios para realizar una solicitud POST a la API en http://localhost:3001/create,
  // enviando datos como identificación, nombre, cargo y teléfono del empleado. Posteriormente, realiza acciones
  // como actualizar la lista de empleados, mostrar un mensaje de éxito con SweetAlert2 y limpiar los campos del formulario.
  const registrar = () => {
    Axios.post("http://localhost:3001/create", {
      identificacion: identificacion,
      nombre: nombre,
      cargo: cargo,
      telefono: telefono
    }).then(() => {
      // Llama a la función 'getEmpelados' para actualizar la lista de empleados.
      getEmpelados();

      // Muestra un mensaje de éxito con SweetAlert2 indicando que el registro fue exitoso.
      swal.fire({
        title: "<strong>Registro exitoso</strong>",
        text: "El empleado " + nombre + " ha sido registrado.",
        icon: "success"
      });

      // Llama a la función 'limpiarCampos' para restablecer los valores de los campos del formulario.
      limpiarCampos();
    });
  }

  // Método getEmpelados(): Recibe datos de la URL "http://localhost:3001/empleados"
  // y actualiza la lista de empleados  con los datos obtenidos en la respuesta.
    const getEmpelados = () => {
      Axios.get("http://localhost:3001/empleados").then((response)=>{
        setEmpleados(response.data);
      });
    } 
    getEmpelados();

  // Método 'editarDatos' que recibe un objeto 'val' representando datos de un empleado
  // y actualiza los estados correspondientes para habilitar el modo de actualización
  // y cargar los datos del empleado en los estados respectivos para su edición.

    const editarDatos = (val)=> {
      setActualizar(true);

      setId(val.id)
      setIdentificacion(val.identificacion);
      setNombre(val.nombre);
      setCargo(val.cargo);
      setTelefono(val.telefono);
    };


  // Método para enviar una solicitud de actualización al servidor mediante una petición HTTP PUT.
  // Utiliza Axios para enviar los datos del empleado
  const actualizarDatos = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      identificacion: identificacion,
      nombre: nombre,
      cargo: cargo,
      telefono: telefono
    }).then(() => {
      getEmpelados(); // Función para obtener la lista actualizada de empleados.
      swal.fire({
        title: "<strong>Actualización exitosa</strong>",
        text: "Los datos del empleado " + nombre + " se ha actualizado.",
        icon: "success"
      });
      limpiarCampos(); // Función para limpiar los campos del formulario.
      setActualizar(false); // Desactiva el modo de actualización.
    });
  }

  // Función 'eliminar', realiza una solicitud de eliminación
  // al servidor mediante Axios. Después de la eliminación exitosa, actualiza la
  // lista de empleados, limpia los campos y muestra una notificación de éxito.

  const eliminar = (val) => {
    swal.fire({
      title: "<strong>Eliminar</strong>",
      text: "¿Desea eliminar a " + val.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza una solicitud de eliminación al servidor utilizando Axios.
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            // Actualiza la lista de empleados y limpia los campos después de la eliminación exitosa.
            getEmpelados();
            limpiarCampos();
            // Muestra una notificación de éxito utilizando SweetAlert.
            swal.fire({
              title: "Eliminado exitosamente",
              text: val.nombre + " fue eliminado.",
              icon: "success"
            });
          });
      }
    });
  }

  // Función 'limpiarCampos': Restablece los valores de los estados relacionados con la información del empleado
  // a sus valores iniciales o vacíos, y desactiva la bandera 'actualizar' para indicar que no se está realizando
  // una operación de actualización.

  const limpiarCampos = ()=> {
    setId("");
    setIdentificacion("");
    setNombre("");
    setCargo("");
    setTelefono("");
    setActualizar(false)
  }

  return (
    <div className='container'>
    <div className="App"> 
    </div>
      <div className='card text-center'>
        <div className='card-header'>
          FORMULARIO DE REGISTRO
        </div>

        {/*Formulario para ingresar los datos del empleado a registrar*/}
        <div className='card-body'>

          {/*Input para ingresar la identificacion del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Identificación</span>
            {/* 
            Entrada de datos para la 'identificación' del empleado:
            - Maneja el cambio en el valor con la función proporcionada en el evento 'onChange', actualizando el estado 'identificacion'.
            */}
            <input 
            onChange={(event) =>{
            setIdentificacion(event.target.value)
            }}
            type="number" value={identificacion} className="form-control" placeholder="Identificación" aria-label="Identificación" aria-describedby="basic-addon1"/>
          </div>

          {/*Input para ingresar el nombre del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre completo</span>
            {/* 
            Entrada de datos para el 'nombre' del empleado:
            - Maneja el cambio en el valor con la función proporcionada en el evento 'onChange', actualizando el estado 'nombre'.
            */}
            <input 
            onChange={(event) =>{
            setNombre(event.target.value)
            }}
            type="text" value={nombre} className="form-control" placeholder="Nombre Completo" aria-label="nombre" aria-describedby="basic-addon1"/>
          </div>

            {/*Input para ingresar el cargo del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Rol/Cargo</span>
            {/* 
            Entrada de datos para el 'rol o cargo' del empleado:
            - Maneja el cambio en el valor con la función proporcionada en el evento 'onChange', actualizando el estado 'cargo'.
            */}
            <input 
            onChange={(event) =>{
            setCargo(event.target.value)
            }}
            type="text" value={cargo} className="form-control" placeholder="Rol o Cargo" aria-label="cargo" aria-describedby="basic-addon1"/>
          </div>

            {/*Input para ingresar el telefono del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Telefóno</span>
            {/* 
            Entrada de datos para el 'telefono' del empleado:
            - Maneja el cambio en el valor con la función proporcionada en el evento 'onChange', actualizando el estado 'telefono'.
            */}
            <input 
            onChange={(event) =>{
            setTelefono(event.target.value)
            }}
            type="number" value={telefono} className="form-control" placeholder="Telefóno" aria-label="telefono" aria-describedby="basic-addon1"/>
          </div>
        </div>

        {/* 
          Pie de la tarjeta con información adicional dependiendo del estado 'actualizar':
          - Si el estado 'actualizar' es verdadero, muestra dos botones para actualizar y cancelar.
            - Botón 'Actualizar' con la función 'actualizarDatos' vinculada al evento 'onClick'.
            - Botón 'Cancelar' con la función 'limpiarCampos' vinculada al evento 'onClick'.
          - Si el estado 'actualizar' es falso, muestra un botón para registrar con la función 'registrar' vinculada al evento 'onClick'.
        */}
        <div className='card-footer text-muted'>
          {
            actualizar?
            <div>
              <button className="btn btn-primary px-5 me-2" onClick={actualizarDatos}>Actualizar</button>
              <button className="btn btn-secondary px-5" onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className="btn btn-success px-5" onClick={registrar}>Registrar</button>
          }
        </div>
      </div>

      {/* 
        Tabla que muestra la lista de empleados registrados:
        - Cabecera de la tabla con las columnas: #, Identificación, Nombre, Cargo, Telefóno, Acciones.
        - Cuerpo de la tabla que utiliza la función 'map' para iterar sobre 'listaEmpleados' y renderizar cada fila con información de empleado.
        - Botones en la columna de Acciones para actualizar y eliminar empleados, con funciones 'editarDatos' y 'eliminar' vinculadas al evento 'onClick'.
      */}
      <div className='card text-center my-4'>
        <div className='card-header'>
          LISTA DE EMPLEADOS REGISTRADOS
        </div>
        <div className='card-body'>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Identificación</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cargo</th>
                <th scope="col">Telefóno</th>
                <th scope='col'>Acciones</th>
              </tr>
          </thead>
          <tbody>
            {
              listaEmpleados.map((val, key)=> {
                return <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.identificacion}</td>
                        <td>{val.nombre}</td>
                        <td>{val.cargo}</td>
                        <td>{val.telefono}</td>
                        <td>
                        <button 
                        onClick={()=>{
                          editarDatos(val);
                        }}
                        type="button" className="btn btn-primary me-2">Actualizar</button>
                        <button 
                        onClick={()=>{
                          eliminar(val);
                        }}
                        type="button" className="btn btn-danger">Eliminar</button>
                        </td>
                      </tr>
              })
            }
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
