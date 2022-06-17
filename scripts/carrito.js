carrito = []

function mostrarCarro(){
    let contenedor = document.getElementById("mainContainer")
    contenedor.innerHTML = `<div class="centradoLinea"><h1 class="subtitulo ">Productos agregados al carrito</h1></div>`

    if(carrito.lengh != 0){
        carrito.forEach(it => {
            let itHTML=`<div class="itemCarrito">
                            <h5>${it.nombre}</h5>
                            <span>-</span>
                            <h6>${it.precio}</h6>
                        </div>`
            contenedor.innerHTML += itHTML
        });
    }
    
}
