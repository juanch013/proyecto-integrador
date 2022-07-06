const url = `https://raw.githubusercontent.com/juanch013/github-api-bicis/main/bicis.txt`

window.addEventListener('DOMContentLoaded', (event) => {
    obtenerInventario(url)
});

const obtenerInventario = (url)=>{
    fetch(url)
    .then(res => res.json())
    .then(res =>{cargarProductos(res)
                cargarListeners(res)
            })
    .catch(err => console.log(err.message))
}


//funcion que retorna un array con las tarjetas a cargar en la pagina
function armarTarjetasProductos(cat,inventario){
    let res = []
    inventario.forEach(itemInventario => {
        if(itemInventario.categoria == cat){
            let tarjeta = 
            `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card">
                  <img src="${itemInventario.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 id ="${itemInventario.id}" class="card-title">${itemInventario.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${itemInventario.precio}</h6>
                    <a href="#" class="btn btn-primary">Añadir al carrito</a>
                  </div>
                </div>
            </div>`
            res.push(tarjeta)
        }
    });
    return res
}

function cargarProductos(inventario){
    let main = document.querySelector("main")
    let container = main.querySelector("div.row, .g-0, .main-container-bicicletas")
    let prods = armarTarjetasProductos(main.className,inventario)
    container.innerHTML = ""
    prods.forEach(i => {
        container.innerHTML += i;
    });

    //aca voy a sobreesribirles las clases porque nose pq no se le aplica el css sino

    let elementos = container.querySelectorAll("div.col-xs-12, .col-sm-6, .col-md-4, .col-lg-3")
    container.className = "row g-0 main-container-bicicletas"
}



//obtengo botones para agregarle eventListener

function cargarListeners(inventario){
    let botones = document.querySelectorAll(".btn, .btn-primary")
    botones.forEach(boton => {
        boton.addEventListener('click',()=>{
            let elem = boton.parentNode.parentNode
            let Nombre = elem.querySelector("h5").innerText
            // let Precio = elem.querySelector("h6").innerText
            // let img = elem.querySelector("img").src
            let id = elem.querySelector("h5").id
            boton.className = "btn .btn-primary"
    
            let carrito = localStorage.getItem("carrito")
            carrito = (carrito == null)? [] : JSON.parse(carrito)
    
            if(carrito.some(elem => elem.item.id == id)){
                carrito.forEach(it => {
                    if(it.item.id == id){ 
                        it.cant = parseInt(it.cant) + 1
                    }
                });
                localStorage.setItem("carrito",JSON.stringify(carrito))
            }else{
                
                let objetoInventario = inventario.find(it => it.id == id)
                carrito.push({cant:1,item:objetoInventario})
                localStorage.setItem("carrito",JSON.stringify(carrito))
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${Nombre} se agrego al carrito!`,
                showConfirmButton: false,
                timer: 1200
              })
        })
    });
}


