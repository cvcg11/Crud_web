//Dirección del endpoint
const API_URL = "https://retoolapi.dev/LUNaas/Integrantes"

//Función que llama la API y realiza una solicitud GET. Obtiene un JSON
async function ObtenerRegistros() {
    //HAcemos GET al servidor y obtener la respuesta 
    const respuesta = await fetch(API_URL);

    //Obtenemos los datos tipo JSON 
    const data = await respuesta.json(); // ya es un JSON 

    //Llamamos a MostrarRegistros y envíamos el JSON 
    MostrarRegistro(data);
}

//Función para generar las vistas de la tabla
//"datos" representa al JSON 
function MostrarRegistro(datos) {
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
                    <button onclick="Actualizar('${persona.id}','${persona.nombre}','${persona.apellido}','${persona.correo}')">Editar</button>
                    <button onclick="Eliminar(${persona.id})">Eliminar</button>
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

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
})


//Agregar un nuevo integrante desde el formulario
const frmAgregar = document.getElementById("frmAgregar")

frmAgregar.addEventListener("submit", async e => {
    e.preventDefault();

    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtemail").value.trim();

    if (!nombre || !apellido || !correo) {
        alert("Complete todo los campos requeridos")
        return;
    }

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            apellido,
            correo
        })
    });

    if (respuesta.ok) {
        alert("El registro fue agregado correctamente");
        document.getElementById("frmAgregar").reset();
        modal.close();
    }

    ObtenerRegistros();

});

//Funcion para borra para borrar registro

async function Eliminar(id) {
    const confirmacion = confirm("¿Seguro que desea eliminar el regsitro")

    //Validar si el usuario acepto
    if (confirmacion) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        ObtenerRegistros();
    }

}



const modalEditar = document.getElementById("mdEditar")
const btnCerrarEditar = document.getElementById("btnCerrarModalEditar");
const frmEditar = document.getElementById("frmEditar")

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close();
})


async function Actualizar(id, nombre, apellido, correo) {

    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombrePut").value = nombre;
    document.getElementById("txtApellidoPut").value = apellido;
    document.getElementById("txtemailPut").value = correo;

    const confirmacion = confirm("¿Seguro que desea actualizar el regsitro");
    if (confirmacion) {
        modalEditar.showModal();

        frmEditar.addEventListener("submit", async e => {
            e.preventDefault();

            const nombre = document.getElementById("txtNombrePut").value.trim();
            const apellido = document.getElementById("txtApellidoPut").value.trim();
            const correo = document.getElementById("txtemailPut").value.trim();

            if (!nombre || !apellido || !correo) {
                alert("Complete todo los campos requeridos")
                return;
            }

            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    correo
                })
            });

            if (respuesta.ok) {
                alert("El registro fue Actualizado correctamente");
                document.getElementById("frmEditar").reset();
                modalEditar.close();
            }

            ObtenerRegistros();

        })

    }


}