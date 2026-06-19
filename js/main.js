// =========================================
// PROYECTO AAT1 - CARRITO DE COMPRAS
// Participante:  Girón
// =========================================

'use strict';

// CONSTANTES

const IVA = 0.12;
const DESCUENTO = 0.10;
const MONEDA = "Q";

// VARIABLES

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let subtotal = 0;
let total = 0;
let descuentoAplicado = 0;
let cantidadProductos = 0;

// ARRAY DE OBJETOS

const productos = [
{
id: 1,
nombre: "Laptop HP",
precio: 4500,
categoria: "Tecnología",
imagen: "img/laptop.jpg"
},
{
id: 2,
nombre: "Mouse Gamer",
precio: 150,
categoria: "Accesorios",
imagen: "img/mouse.jpg"
},
{
id: 3,
nombre: "Teclado Mecánico",
precio: 350,
categoria: "Accesorios",
imagen: "img/teclado.jpg"
},
{
id: 4,
nombre: "Monitor 24",
precio: 1200,
categoria: "Tecnología",
imagen: "img/monitor.jpg"
},
{
id: 5,
nombre: "Audífonos",
precio: 250,
categoria: "Audio",
imagen: "img/audifonos.jpg"
},
{
id: 6,
nombre: "Webcam HD",
precio: 300,
categoria: "Video",
imagen: "img/webcam.jpg"
}
];

// DOM

let tablaCarrito = document.getElementById('tablaCarrito');
let subtotalHTML = document.getElementById('subtotal');
let ivaHTML = document.getElementById('iva');
let descuentoHTML = document.getElementById('descuento');
let totalHTML = document.getElementById('total');


// FUNCION CON RETURN

function calcularIVA(monto){
return monto * IVA;
}


// ARROW FUNCTION

const obtenerTotal = () => {
return carrito.reduce((acumulador, producto) => {
return acumulador + producto.precio;
}, 0);
};


// GUARDAR LOCALSTORAGE

function guardarCarrito(){
localStorage.setItem(
'carrito',
JSON.stringify(carrito)
);
}


// AGREGAR PRODUCTO

function agregarProducto(id){

const producto = productos.find(
p => p.id === id
);

if(producto){

carrito.push(producto);

guardarCarrito();

Swal.fire({
title:'Producto agregado',
text: producto.nombre + ' agregado al carrito',
icon:'success',
timer:1500,
showConfirmButton:false
});

}

}


// ELIMINAR PRODUCTO

function eliminarProducto(index){

carrito = carrito.filter(
(item, i) => i !== index
);

guardarCarrito();

renderizarCarrito();

Swal.fire({
title:'Eliminado',
text:'Producto eliminado correctamente',
icon:'success'
});

}


// CALCULAR TOTAL

function calcularTotales(){

try{

subtotal = obtenerTotal();

const iva = calcularIVA(subtotal);

total = subtotal + iva - descuentoAplicado;

if(total < 0){
total = 0;
}

if(subtotalHTML){
subtotalHTML.textContent =
MONEDA + subtotal.toFixed(2);
}

if(ivaHTML){
ivaHTML.textContent =
MONEDA + iva.toFixed(2);
}

if(descuentoHTML){
descuentoHTML.textContent =
MONEDA + descuentoAplicado.toFixed(2);
}

if(totalHTML){
totalHTML.textContent =
MONEDA + total.toFixed(2);
}

}
catch(error){

console.error(error);

Swal.fire({
title:'Error',
text:'No fue posible calcular los totales',
icon:'error'
});

}

}


// RENDERIZAR CARRITO

function renderizarCarrito(){

if(!tablaCarrito){
return;
}

let html = '';

carrito.forEach((producto,index)=>{

html += `
<tr>
<td>${producto.nombre}</td>
<td>1</td>
<td>${MONEDA}${producto.precio.toFixed(2)}</td>
<td>${MONEDA}${producto.precio.toFixed(2)}</td>
<td>
<button
class="btn-eliminar"
onclick="eliminarProducto(${index})">
Eliminar
</button>
</td>
</tr>
`;

});

tablaCarrito.innerHTML = html;

calcularTotales();

}


// VALIDAR DESCUENTO

function validarCodigo(){

const codigoInput =
document.getElementById('codigoDescuento');

if(!codigoInput){
return;
}

const codigo =
codigoInput.value.trim();

if(codigo === ''){

Swal.fire({
title:'Código vacío',
text:'Ingrese un código de descuento',
icon:'warning'
});

return;

}

if(codigo === 'DESCUENTO10'){

descuentoAplicado =
subtotal * DESCUENTO;

}
else{

descuentoAplicado = 0;

}

calcularTotales();

switch(codigo){

case 'DESCUENTO10':

Swal.fire({
title:'Descuento aplicado',
text:'Se aplicó el 10% de descuento',
icon:'success'
});

break;

default:

Swal.fire({
title:'Código inválido',
text:'El código ingresado no existe',
icon:'error'
});

break;

}

}


// CONFIRMAR COMPRA

function confirmarCompra(){

if(carrito.length === 0){

Swal.fire({
title:'Carrito vacío',
text:'Agregue productos antes de comprar',
icon:'warning'
});

return;

}

Swal.fire({
title:'Compra realizada',
text:'Gracias por su compra',
icon:'success'
});

carrito = [];

guardarCarrito();

renderizarCarrito();

}


// MAP

const nombresProductos =
productos.map(producto => producto.nombre);

console.log(nombresProductos);


// FILTER

const productosTecnologia =
productos.filter(
producto => producto.categoria === 'Tecnología'
);

console.log(productosTecnologia);


// EVENTOS

document.addEventListener(
'DOMContentLoaded',
function(){

// BOTONES AGREGAR

const botones =
document.querySelectorAll('.btn-agregar');

botones.forEach(boton=>{

boton.addEventListener(
'click',
function(){

const id =
parseInt(
this.dataset.id
);

agregarProducto(id);

}
);

});

// BOTON DESCUENTO

const btnDescuento =
document.getElementById('btnDescuento');

if(btnDescuento){

btnDescuento.addEventListener(
'click',
validarCodigo
);

}

// INPUT CAMBIO

const inputCodigo =
document.getElementById('codigoDescuento');

if(inputCodigo){

inputCodigo.addEventListener(
'change',
function(){

this.classList.toggle('activo');

}
);

}

renderizarCarrito();

}
);


// JQUERY

$(document).ready(function(){

$('.tarjeta').hide().fadeIn(1000);

$('#btnMenu').on('click',function(){

$('#menuNav ul').slideToggle(500);

});

$('.tarjeta').hover(

function(){

$(this).animate({
marginTop:'-5px'
},200);

},

function(){

$(this).animate({
marginTop:'0px'
},200);

}

);

});