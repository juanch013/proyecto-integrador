function mostrarCarro(){
    let contador = 0
    let carrito = localStorage.getItem("carrito")
    let contenedor = document.getElementById("mainContainer")
    if(carrito != null){
        contenedor.innerHTML = `<div class="centradoLinea"><h1 class="subtitulo ">Productos agregados al carrito</h1></div>`
        carrito = JSON.parse(carrito)
        carrito.forEach(it => {
            let itHTML=`<div class="itemCarrito">
                            <div class="innerContainer">
                                <div class="rightContainer">
                                    <img src="${it.img}" alt="">
                                    <div>
                                        <h5>${it.nombre}</h5>
                                        <h6>${it.precio}</h6>
                                    </div>
                                </div>
                                <div class="leftContainer">
                                    <a id="${contador}" href="#" class="btn btn-primary">Eliminar</a>
                                </div>
                            </div>
                        </div>`
            contenedor.innerHTML += itHTML
            contador++
        });
    }      
}
mostrarCarro()


function agregarListeners(){
    let botones = document.querySelectorAll(".btn, .btn-primary")
    if(botones.length != 0){
        botones.forEach(element => {
            element.addEventListener('click',()=>{
                eliminarItem(element.id)
                element.className = "btn .btn-primary"
            })
        }); 
    }
}

agregarListeners()

function eliminarItem(id){
    debugger
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito = carrito.filter(producto => producto.id != id)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarro()
}