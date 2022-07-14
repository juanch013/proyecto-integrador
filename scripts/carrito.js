mostrarCarro()

function mostrarCarro(){
    debugger
    let carrito = localStorage.getItem("carrito")
    let contenedor = document.getElementById("mainContainer")
    carrito = (carrito == null) ? [] : carrito
    if(carrito != "[]"){
        console.log("a")
        contenedor.innerHTML = `<div class="centradoLinea"><h1 class="subtitulo ">Productos agregados al carrito</h1></div>`
        carrito = JSON.parse(carrito)
        carrito.forEach(it => {
            let{
                nombre:nombre,
                precio:precio,
                img: img,
                id : id
            } = it.item
            let cant = it.cant
            img = img.slice(3)//esto lo hago para obtener la ruta relativa correcta para mostrar la imagen en el carrito
            let itHTML=`<div class="itemCarrito">
                            <div class="innerContainer">
                                <div class="rightContainer">
                                    <img src="${img}" alt="">
                                    <div>
                                        <h5>${nombre}</h5>
                                        <h6>${precio}</h6>
                                    </div>
                                </div>
                                <div class="leftContainer">
                                    <div>
                                        <a id="btnMas" href="#" class="btn btn-primary">+</a>
                                        <a id="btnMenos" href="#" class="btn btn-primary">-</a>
                                    </div>
                                    <h6>${cant}</h6>
                                    <a id="${id}" href="#" class="btn btn-primary">Eliminar</a>
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
        
    }else{
        console.log("b")
        contenedor.innerHTML = `<div class="centradoLinea"><h1 class="subtitulo encabezado">No tiene productos agregados a su carrito!</h1></div>`
    }  
}


function eliminarItem(id){
    console.log("aaa")
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito = carrito.filter(p => p.item.id != id)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarro()
}