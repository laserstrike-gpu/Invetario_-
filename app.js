const inputNombre = document.querySelector("#inputNombre");
const inputCategoria = document.querySelector("#inputCategoria");
const inputPrecio = document.querySelector("#inputPrecio");
const inputStock = document.querySelector("#inputStock");
const botonAgregar = document.querySelector("#botonAgregar");
const botonEliminar = document.querySelector("#botonEliminar")
const botonEditar = document.querySelector("#botonEditar")
const listaProductos = document.querySelector("#listaProductos");
const inputBuscar = document.querySelector("#inputBuscar");

const inventario = [];

let indiceSeleccionado = -1;
let indiceEditando = -1;

const inventarioGuardado = localStorage.getItem("inventario");

if (inventarioGuardado !== null) {

    const datos = JSON.parse(inventarioGuardado);

    inventario.push(...datos);

}

botonAgregar.addEventListener("click", agregarProducto);




function agregarProducto(){
    const nombre = inputNombre.value;
    const categoria = inputCategoria.value;
    const precio = inputPrecio.value;
    const stock = inputStock.value;

    if(
        nombre === "" || categoria === "" || precio === "" || stock === ""){
            alert ("Completa todos los campos.");
            return;
        }

        
    if (isNaN(precio)){
            alert("El precio debe ser un número");
            return;
        }
    if (isNaN(stock)){
            alert("El stock debe ser un número");
        }


    if(precio <= 0){
            alert("El precio debe ser mayor que 0.");
            return;
        }
    if(stock <= 0){
            alert("El stock debe ser mayor que 0");
            return;
        }


    let productoExiste = false;

        inventario.forEach(function(producto){

            if (producto.nombre === nombre) {
                productoExiste = true;
            }

        });

        if (productoExiste) {
            alert("Ese producto ya existe.");
            return;
        }


    const producto = {
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock,
    }

    if(indiceEditando === -1){
        inventario.push(producto);
    }else{
        inventario[indiceEditando] = producto;
        indiceEditando = -1;
        indiceSeleccionado = -1;
        botonAgregar.textContent = "Agregar producto";
    }

    localStorage.setItem("inventario", JSON.stringify(inventario));

    limpiarFormulario();
    mostrarProducto(inventario);

}




botonEliminar.addEventListener("click", eliminarProducto);
botonEditar.addEventListener("click", editarProducto)




function eliminarProducto(){

    if(indiceSeleccionado !== -1){
        inventario.splice(indiceSeleccionado, 1);
        localStorage.setItem("inventario", JSON.stringify(inventario));
        indiceSeleccionado = -1;
        indiceEditando = -1;
        botonAgregar.textContent = "Agregar Producto";
        limpiarFormulario();
        
        mostrarProducto(inventario);
    }
}




function editarProducto(){
    if(indiceSeleccionado !== -1){
        indiceEditando = indiceSeleccionado;
        const producto = inventario[indiceSeleccionado];
        inputNombre.value = producto.nombre;
        inputPrecio.value = producto.precio;
        inputCategoria.value = producto.categoria;
        inputStock.value = producto.stock;

        botonAgregar.textContent = "Guardar cambios";

    }
}



function limpiarFormulario(){
    inputNombre.value = "";
    inputPrecio.value = "";
    inputCategoria.value = "";
    inputStock.value = "";
    inputNombre.focus();
}





inputBuscar.addEventListener("input", buscarProducto)

function buscarProducto(){

    const busqueda = inputBuscar.value;
    const productosEncontrados = [];

    inventario.forEach(function(producto, indice){

        if(producto.nombre.toLowerCase().includes(busqueda.toLowerCase())){
            productosEncontrados.push(producto);
        }
    });
    mostrarProducto(productosEncontrados);
}






function mostrarProducto(x){
    listaProductos.innerHTML = "";
    x.forEach(function(producto, indice){

        const div =  document.createElement("div");

         if(indiceSeleccionado === indice){
                div.classList.add("seleccionado");
            }

        div.addEventListener("click", function(){
            indiceSeleccionado = indice;
            mostrarProducto(inventario);

        });

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Categoria: ${producto.categoria}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
        `;
        listaProductos.appendChild(div)
    })
}
mostrarProducto(inventario);
