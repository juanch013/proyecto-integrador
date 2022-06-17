let botones = document.querySelectorAll(".btn, .btn-primary")
botones.forEach(boton => {
    boton.addEventListener('click',()=>{
        let elem = boton.parentNode.parentNode
        let Nombre = elem.querySelector("h5").innerText
        let Precio = elem.querySelector("h6").innerText
        let img = elem.querySelector("img").src
        carrito.push(new item(Nombre,"bicicleta",Precio,img))
        console.table(carrito)
        mostrarCarro()
    })
});