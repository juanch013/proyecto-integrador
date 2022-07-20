mostrarCarro()
function mostrarCarro(){
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
                                        <a id="btnMas" href="#" class="btn btn-primary btnCant">+</a>
                                        <a id="btnMenos" href="#" class="btn btn-primary btnCant">-</a>
                                    </div>
                                    <h6>${cant}</h6>
                                    <a id="${id}" href="#" class="btn btn-primary btnEliminar">Eliminar</a>
                                </div>
                            </div>
                        </div>`
            contenedor.innerHTML += itHTML
        });
        let botones = document.querySelectorAll(".btn, .btn-primary")
        if(botones.length != 0){
            botones.forEach(element => {
                if(element.className == "btn btn-primary btnEliminar"){
                    element.addEventListener('click',()=>{
                        let id  = element.id
                        eliminarItem(id)
                        element.className = "btn .btn-primary"
                    })
                }else if(element.className == "btn btn-primary btnCant"){
                    if(element.id == "btnMas"){
                        element.addEventListener('click',()=>{
                            let btnElim = element.parentNode.parentNode.parentNode.getElementsByClassName("btn btn-primary btnEliminar")
                            let id = btnElim[0].id
                            sumarCant(id)
                            element.className = "btn .btn-primary btnCant"
                        })
                    }else if(element.id == "btnMenos"){
                        element.addEventListener('click',()=>{
                            let btnElim = element.parentNode.parentNode.parentNode.getElementsByClassName("btn btn-primary btnEliminar")
                            let id = btnElim[0].id
                            restarCant(id)
                            element.className = "btn .btn-primary btnCant"
                        })
                    }
                }
            }); 
        }     
    }else{
        console.log("b")
        contenedor.innerHTML = `<div class="centradoLinea"><h1 class="subtitulo encabezado">No tiene productos agregados a su carrito!</h1></div>`
    }  
}

function eliminarItem(id){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito = carrito.filter(p => p.item.id != id)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarro()
}

function restarCant(id){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito.forEach(item => {
        if(item.item.id == id){
            if(item.cant == 1){
                Swal.fire({
                    title: 'Desea eliminar el producto del carrito?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Eliminar',
                    denyButtonText: `Cancelar`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarItem(id)
                    } else if (result.isDenied) {
                    }
                  })
            }else{
                item.cant = parseInt(item.cant) -1
                localStorage.setItem("carrito",JSON.stringify(carrito))
                mostrarCarro()
            }
        }
    })
}

function sumarCant(id){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    carrito.forEach(item => {
        if(item.item.id == id){
            item.cant = parseInt(item.cant) + 1
            localStorage.setItem("carrito",JSON.stringify(carrito))
            mostrarCarro()
        }
    })
}