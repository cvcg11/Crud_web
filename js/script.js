//Dirección del endpoint
const API_URL = "https://retoolapi.dev/LUNaas/Integrantes"

//Función que llama la API y realiza una solicitud GET. Obtiene un JSON
async function ObtenerRegistros(){
    //HAcemos GET al servidor y obtener la respuesta 
    const respuesta = await fetch(API_URL); 

    //Obtenemos los datos tipo JSON 
    const data = await respuesta.json(); // ya es un JSON 

    //Llamamos a MostrarRegistros y envíamos el JSON 
    MostrarRegistro(data); 
}

//Función para generar las vistas de la tabla
//"datos" representa al JSON 
function MostrarRegistro(datos){
//Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

//Para inyectar código HTML usamos innerHTML
    tabla.innerHTML = ""; //vaciamos los datos de la tabla
    
    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `; 
    }); //por cada persona en el JSON  
}
 
ObtenerRegistros(); 



//Proceso para agregar registros
const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
})


//Agregar un nuevo integrante desde el formulario
const frmAgregar = document.getElementById("frmAgregar")

frmAgregar.addEventListener("submit", async e => {
    e.preventDefault();

    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtemail").value.trim();

    if(!nombre || !apellido || !correo){
        alert("Complete todo los campos requeridos")
        return;
    }

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            nombre,
            apellido,
            correo
        })
    });
    
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");
        document.getElementById("frmAgregar").reset();
        modal.close();
    }
    
    ObtenerRegistros();

});