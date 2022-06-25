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
        if(carrito == null){
            carrito2 = []
            carrito2.push(new item(Nombre,"bicicleta",Precio,img,id))
            localStorage.setItem("carrito",JSON.stringify(carrito2))
        }else{
            carrito = JSON.parse(carrito)
            carrito.push(new item(Nombre,"bicicleta",Precio,img,id))
            localStorage.setItem("carrito",JSON.stringify(carrito))
        }
        
    })
});