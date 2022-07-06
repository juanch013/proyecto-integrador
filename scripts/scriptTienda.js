const url = `https://raw.githubusercontent.com/juanch013/github-api-bicis/main/bicis.txt`
let inventario = []
const obtenerInventario = (url)=>{
    fetch(url)
    .then(res => res.json())
    .then(res => inventario = res)
    .catch(err => console.log(err.message))
}
//obtengo botones y el inventario
let botones = document.querySelectorAll(".btn, .btn-primary")
obtenerInventario(url)

botones.forEach(boton => {
    boton.addEventListener('click',()=>{
        debugger
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

