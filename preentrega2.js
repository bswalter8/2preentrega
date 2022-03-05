
class Libro {
  constructor(id, nombre, autor, valor){
    this.id = id;
    this.nombre = nombre;
    this.valor = valor;
    this.autor = autor;
  }
}

const libro1 = new Libro(20,"La Iliada", "Homero", 250);
const libro2 = new Libro(11,"Crimen y Castigo", "Dostoievski" ,200);
const libro3 = new Libro(37,"El Proceso", "Kafka",150);
const libro4 = new Libro(9,"Divina Comedia", "Dante Alighieri", 220);



let libros_Libreria = [libro1, libro2, libro3, libro4];


let b_comprar = document.getElementById("b_comprar");
let lista_carrito = document.getElementById("lista_carrito");
let carrito_modal = document.getElementById("carrito_Modal");
let mensaje = document.getElementById("mensaje_finalcompra");





const listar = (catalogo) => {
    
    let elemento = document.getElementById("libros");
    

    catalogo.forEach( libro => {
    elemento.innerHTML += `
                        <div class=${libro.nombre} id=${libro.id} >
                          <ul>  
                             <li><p> Nombre: ${libro.nombre}</p></li>
                             <li><p>  Autor: ${libro.autor}</p></li>
                             <li><b> $ ${libro.valor}</b></li>              
                          </ul>
                          <br>
                          
                          <label for="quantity">Cantidad:</label>
                          <input type="number" id="cantidad${libro.id}" name="quantity" value="1" min="1" max="5">
                          <br>
                          <br>
                          <button type="button" class="b_comprar">Agregar al carrito</button>
                         
                        </div>
      `
  });
 
}


const listar_carrito = () => {
    
  let elemento = document.getElementById("lista_carrito");
  let catalogo = JSON.parse(localStorage.getItem("carrito"));
  
  if (catalogo == null || catalogo.length == 0){
    
    elemento.innerHTML = `<br><p>...esta vacio</p> `;
    b_comprar.style.display ="none";
  } else {
     
        b_comprar.style.display ="block";
        catalogo.forEach( libro => {
        elemento.innerHTML += `
                            <div class=${libro.nombre} id=${libro.id} >
                          
                                <li><p> Nombre: ${libro.nombre} - Autor: ${libro.autor} - <b> $ ${libro.valor}</b></p></li>
                                                                                
                                <button type="button" class="b_Vaciar">Borrar elemento</button>
                                <br>
                                <br>
                                
                              </div>
          `
      });
     
      elemento.innerHTML += `<br><h3>Total: ${gasto_Total(catalogo)}</h3> `;
      botones_vaciar();
                             
  }
}




const ordenar = (array, opc) => { 
    
      
      if (opc === "nombre"){
            return array.sort((a,b) => { //sigue devolviendo un objeto
                            if (a.nombre > b.nombre){
                              return 1;
                            } 
                            if (a.nombre < b.nombre ){
                              return -1;  
                            }
                            return 0;
                          });
          
        
        } 
       
      if (opc === "autor"){
          return  array.sort((a,b) => {
                          if (a.autor > b.autor){
                            return 1;
                          } 
                          if (a.autor < b.autor ){
                            return -1;  
                          }
                          return 0;
                        });
           
      } 

      if (opc === "menor"){
        return  array.sort((a,b) => {
                        if (a.valor > b.valor){
                          return 1;
                        } 
                        if (a.valor < b.valor ){
                          return -1;  
                        }
                        return 0;
                      });
        
    } 

    if (opc === "mayor"){
      return  array.sort((a,b) => {
                      if (a.valor < b.valor){
                        return 1;
                      } 
                      if (a.valor > b.valor ){
                        return -1;  
                      }
                      return 0;
                    });
      
  } 


}








const pagar = (pago, gasto_Total) => {
  
  let vuelto =0;

  if (pago < gasto_Total){
      mensaje.innerHTML = `<br> <p>Debe introducir un valor mayor o igual a ${gasto_Total}</p>`
      return 
  } else if (isNaN(pago)){
       mensaje.innerHTML = ` <br> <p>Debe introducir un numero</p>`
    return ;
  } else {

        vuelto = pago - gasto_Total;
        mensaje.innerHTML = `<br> <p>Felicitaciones ha realizado su compra con exito, <h4>el vuelto es $${vuelto.toFixed(2)}</h4></p>`
    return 
  }


}

const gasto_Total = carrito => {
  let gasto_Total = 0;
  for (let item of carrito){
    
      gasto_Total += parseInt(item.valor);
     }
  return gasto_Total;    

}



const Iva = (total) => (total * 21) / 100;

const botones_agregar = () => {

  let agregado = document.getElementById("agregado_Modal");
  let close = document.getElementById("agregado_Close");
  let item = document.getElementById("agregado_item");  

  const botones = document.querySelectorAll(".b_comprar");

      botones.forEach(boton => {	
                boton.addEventListener("click", e =>{
                             
                let carrito = JSON.parse(localStorage.getItem('carrito'));  

                if (carrito == null) {   // previene error 
                  carrito = [];
                }
             
                let libro;
                let l_Click = e.target.parentElement.id;
                let cantidad = document.getElementById("cantidad" + l_Click);  
              
                agregado.style.display ="block";
                item.innerHTML = ` <p>Usted ha agregado ${cantidad.value} ${(cantidad.value == 1 ? "libro" : "libros")} a su carrito de compras</p>`; 
                libro = libros_Libreria.find( i => i.id == l_Click);
                
                for (let i= 0; i < cantidad.value; i++){
                    carrito.push(libro);  
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                }
                
             
              carrito = [];

              close.addEventListener("click", ()=>{
                agregado.style.display = "none";
                    lista_carrito.innerHTML = ` `;
              } );  
        });
      });

       
};


const botones_vaciar = () => {
 
  const botones = document.querySelectorAll(".b_Vaciar");
  
      botones.forEach(boton => {	
        boton.addEventListener("click", e =>{
    
          let carrito = JSON.parse(localStorage.getItem('carrito')); 
         
          let libro;
          let l_Click = e.target.parentElement.id;
     
          libro = carrito.indexOf(l_Click);
        
          carrito.splice(libro,1);
         
          localStorage.setItem('carrito', JSON.stringify(carrito));
          let listado = document.getElementById("lista_carrito");
           
          listado.innerHTML = ` `;
          listar_carrito();
     //     botones_vaciar();
        });
      });
};

const orden_Intems = () => {
                let selec_Orden = document.getElementById('Ordenar');
                selec_Orden.addEventListener('change', (e) => {
                let listado = document.getElementById("libros");
                let o = ordenar(libros_Libreria, e.target.value);
                listado.innerHTML = ` `;
                listar(o);
                botones_agregar();
              });
  
}


const ver_Carrito = () =>{
                let b_carrito = document.getElementById("b_carrito");
                let carrito_modal = document.getElementById("carrito_Modal");
                let close = document.getElementById("carrito_Close");
                
              //  let carrito = localStorage.getItem

                b_carrito.addEventListener("click", () =>{
                  
                    carrito_modal.style.display = "block";     
                    listar_carrito();
                //    botones_vaciar();
                });

                b_comprar.addEventListener("click", () =>{
                  comprar();
                  carrito_modal.style.display = "none";
                  lista_carrito.innerHTML = ` `;
                });

                close.addEventListener("click", ()=>{
                  carrito_modal.style.display = "none";
                      lista_carrito.innerHTML = ` `;
                } );
      
}

const comprar = () =>{
                let gastos;
                let iva ;
                let total_Iva;
                
                let carrito = JSON.parse(localStorage.getItem("carrito"));


                let mostrar_Compra = document.getElementById("valor_compra");
                let valor_pago = document.getElementById("valor_pago");
                let b_pagar = document.getElementById("b_pagar");
                let close = document.getElementById("compra_Close");
                let comprar_modal = document.getElementById("comprar_Modal");


                //carrito_modal.style.display = "none";
                
                comprar_modal.style.display = "block";
              
                if(carrito.length == 0 ){
                    mostrar_Compra.innerHTML = ` <p>Su carrito esta vacio</p>`; 
                  } else {
                  
                  gastos = gasto_Total(carrito);
                  iva = Iva(gastos);
                  total_Iva = gastos + iva;

                  mostrar_Compra.innerHTML = ` <p>El valor a pagar es $${gastos} + $${iva} (IVA) = <h2>$${total_Iva}</h2></p>`; 
                }
                

                b_pagar.addEventListener("click", ()=>{///**************************************************************** */

                        pagar(valor_pago.value,total_Iva);
                        lista_carrito.innerHTML = ` `;
                 
                        localStorage.clear();   
                       
                })

                
                close.addEventListener("click", ()=>{    
                      comprar_modal.style.display = "none";
                      valor_pago.value ="";
                      lista_carrito.innerHTML = ` `;  
                      mensaje.innerHTML = ` `;
                                      
                } );

}





let libros_orden = ordenar(libros_Libreria, "nombre");

listar(libros_orden);
botones_agregar();
orden_Intems(); 
ver_Carrito();





