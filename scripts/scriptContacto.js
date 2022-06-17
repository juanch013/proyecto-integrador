let campos = document.querySelectorAll(".campo")
campos.forEach(element => {
    element.addEventListener('focus',()=>{
        element.className = "input destacado"
    })
    element.addEventListener('blur',()=>{
        element.className ="input "
    })
}); 