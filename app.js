
class Libro{
    constructor(titulo, autor, edad, comentarios){
        this.titulo = titulo;
        this.autor = autor;
        this.edad = edad;
        this.comentarios = comentarios;
            }
}

class UI{
    static mostrarLibros(){
    const libros = Datos.traerLibros();
    libros.forEach((libro) => UI.agregarLibroLista(libro));
   
   
    }
    
    static eliminarCruz(){
        const Cruces = document.querySelector('.delete');
        
        
    }

      

    
    
    static agregarLibroLista(libro){
       const lista = document.querySelector('#libro-list');
       
       const fila = document.createElement('tr');

       fila.innerHTML = `
       <td>${libro.titulo}</td>
       <td>${libro.autor}</td>
       <td>${libro.edad}</td>
       <td>${libro.comentarios}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete" id='delete'>x</td>`;

        lista.appendChild(fila);

        setTimeout(()=> document.querySelector('.delete').remove(), 60000);       

    }


    static eliminarLibro(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }

    }

    static mostrarAlerta(mensaje, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(mensaje));

    const container = document.querySelector('.container');
    const form = document.querySelector('#libro-form');
    container.insertBefore(div, form);

     setTimeout(()=> document.querySelector('.alert').remove(), 3000);
    }

    static limpiarCampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#edad').value = '';
        document.querySelector('#comentarios').value = '';
    }
}

class Datos{
static traerLibros(){
let libros;
if(localStorage.getItem('libros')=== null){
    libros = [];
}else{
    libros = JSON.parse(localStorage.getItem('libros'));
}

return libros;
}

static agregarLibro(libro){
    const libros = Datos.traerLibros();
    libros.push(libro);
    localStorage.setItem('libros', JSON.stringify(libros));

}

static removerLibro(comentarios){
const libros = Datos.traerLibros();

libros.forEach((libro, index)=>{
if(libro.comentarios === comentarios){
    libros.splice(index,1);
}
});
localStorage.setItem('libros', JSON.stringify(libros));

}

}
//Carga de los libros en la página

document.addEventListener('DOMcontentLoaded', UI.mostrarLibros());
document.addEventListener('DOMcontentLoaded', UI.eliminarCruz());

//Controlar el evento submit
document.querySelector('#libro-form').addEventListener('submit',(e) => {
    e.preventDefault();

    //obtener valores de los campos
    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const edad = document.querySelector('#edad').value;
    const comentarios = document.querySelector('#comentarios').value;

    if(titulo === '' || autor === '' || edad === '' || comentarios === ''){
        UI.mostrarAlerta('Por favor ingrese todos los datos', 'danger');
    }else{
        const libro = new Libro(titulo, autor, edad, comentarios);
        Datos.agregarLibro(libro);
        UI.agregarLibroLista(libro);
        UI.mostrarAlerta('Libro agregado a la colección', 'success');
        UI.limpiarCampos();
    }

});

document.querySelector('#libro-list').addEventListener('click', (e) =>{

    UI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta('El libro ha sido eliminado', 'success');
});