let botones = document.querySelectorAll(".btn, .btn-primary")
botones.forEach(boton => {
    boton.addEventListener('click',()=>{
        let elem = boton.parentNode.parentNode
        let Nombre = elem.querySelector("h5").innerText
        let Precio = elem.querySelector("h6").innerText
        let img = elem.querySelector("img").src
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
            carrito.push({cant:1,item:new item(Nombre,"bicicleta",Precio,img,id)})
            localStorage.setItem("carrito",JSON.stringify(carrito))
        }
        debugger
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${Nombre} se agrego al carrito!`,
            showConfirmButton: false,
            timer: 1200
          })
    })
});