mostrarCarro()

function mostrarCarro(){
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
                                    <a id="${it.id}" href="#" class="btn btn-primary">Eliminar</a>
                                </div>
                            </div>
                        </div>`
            contenedor.innerHTML += itHTML
        });

        let botones = document.querySelectorAll(".btn, .btn-primary")
        if(botones.length != 0){
            botones.forEach(element => {
                console.log("e")
                element.addEventListener('click',()=>{
                    let id  = element.id
                    eliminarItem(id)
                    element.className = "btn .btn-primary"
                })
            }); 
        }
        
    }      
}




function eliminarItem(id){
    console.log("aaa")
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito = carrito.filter(p => p.id != id)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarro()
}