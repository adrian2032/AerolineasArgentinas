//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarVuelo);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarVuelo);
   

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo
        localStorage.clear();

        limpiarHTML();
    })
}

//funciones
function agregarVuelo(e) {
    //e.prevenDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
    }
}

//elimina un curso del carrito

function eliminarVuelo(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const vueloID = e.target.getAttribute('data-id');

        //ELIMINA DEL ARREGLO de articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter( vuelo => vuelo.id !== vueloID);
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
        carritoHTML();
        
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del vuelo

function leerDatosCurso(vuelo){
    //COMENTADO
    //console.log(vuelo)

    //crear un objeto con el contenido del vuelo actual
    const infoVuelo = {
        imagen : vuelo.querySelector('img').src,
        titulo : vuelo.querySelector('h4').textContent,
        precio : vuelo.querySelector('.precio span').textContent,
        origen : vuelo.querySelector('h7').textContent,
        id : vuelo.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
        subtotal: Number(vuelo.querySelector('.precio span').textContent),

    }

    //revisa si un elemento ya exisste en el carrito

    const existe = articulosCarrito.some( vuelo => vuelo.id === infoVuelo.id)
    if(existe){
        const cursos = articulosCarrito.map( vuelo =>{
            if(vuelo.id === infoVuelo.id){
                vuelo.cantidad++
                //codigo MIO
                let valor = Number(vuelo.precio)
            
                vuelo.subtotal = vuelo.subtotal + valor
                
                return vuelo; //retorna objeto actualizado
            }else {
                return vuelo; //retorna objetos que no son los duplicados
                
            }
        })
        articulosCarrito = [...cursos];
    } else{
             // agrega articulos al carrito
        articulosCarrito = [...articulosCarrito, infoVuelo]
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su boleto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))


    //COMENTADO
    //console.log(articulosCarrito)

    console.log(infoVuelo)
    carritoHTML();
}


//muestra el carrito de compras en el html



function carritoHTML(){
    //limpiar html
    limpiarHTML();


    let carritoListo = JSON.parse(localStorage.getItem('carrito'));
    carritoListo.forEach( vuelo => {
        const { imagen, titulo, precio, cantidad, id, subtotal, origen } = vuelo;
        const row = document.createElement('tr');
        //<td><img src="${imagen}"></td> para agregar imagen si se desea
        //console.log(subtotal);
        row.innerHTML = `
        <td>${titulo}</td>
        <td>${origen}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${subtotal}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">  X </a>
        </td>      
        `;
        //agrega el html del carrito en el body
        contenedorCarrito.appendChild(row);
        
        

    });
}

//elimina los cursos del tbody
function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
}

carritoHTML()