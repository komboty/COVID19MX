let titleDd = document.getElementById('titleDd');
let estadoTxt = document.getElementById('estadoT');
let listTab = document.getElementById('list-tab');

// identificadores
let keyConfirm = 'confirmados';
let keyMujer = 'mujer';
let keyHombre = 'hombre';
let keyEdad = 'edad';
let keyProce = 'procedencia';

// Creacion de rangos de edad
let rangosEdad = Object.keys(statesData.features[0].properties.edad);
listTab.innerHTML += getBrGroupItemHTML();
for (let index = 0; index < rangosEdad.length; index++) {
    listTab.innerHTML += getGroupItemHTML(keyEdad, rangosEdad[index]);
}

// Creacion de procedencias
let arrayProce = Object.keys(statesData.features[0].properties.procedencia);
listTab.innerHTML += getBrGroupItemHTML();
for (let index = 0; index < arrayProce.length; index++) {
    listTab.innerHTML += getGroupItemHTML(keyProce, arrayProce[index]);
}

// Elementos HTML 
let itemTotal = document.getElementById(keyConfirm + '-lgItem');
let numTotal = document.getElementById(keyConfirm + 'T');
let barTotal = document.getElementById('bar' + keyConfirm + 'T');

let itemMujeres = document.getElementById(keyMujer + '-lgItem');
let numMujeres = document.getElementById(keyMujer + 'T');
let barMujeres = document.getElementById('bar' + keyMujer + 'T');

let itemHombres = document.getElementById(keyHombre + '-lgItem');
let numHombres = document.getElementById(keyHombre + 'T');
let barHombres = document.getElementById('bar' + keyHombre + 'T');

// Actualizacion de la tabla segun el estado seleccionado
function updateTable(props) {
    console.log(props);
    setHElement(estadoTxt, props.estado, 5);
    setValorGroupItem(numTotal, 5, barTotal, props.confirmados);
    setValorGroupItem(numMujeres, 6, barMujeres, props.mujer);
    setValorGroupItem(numHombres, 6, barHombres, props.hombre);
    setValorEN(keyEdad, rangosEdad, props.edad);
    setValorEN(keyProce, arrayProce, props.procedencia);
}

// Restablece la tabla a su configuracion inicial
function resertTable() {
    setHElement(estadoTxt, 'Estado', 5);
    setValorGroupItem(numTotal, 5, barTotal, 0);
    setValorGroupItem(numMujeres, 6, barMujeres, 0);
    setValorGroupItem(numHombres, 6, barHombres, 0);
    setValorEN(keyEdad, rangosEdad);
    setValorEN(keyProce, arrayProce);
}

// Asigna informacion a un item de la tabla
function setValorGroupItem(elementNumero, h, elementBar, valor) {
    setHElement(elementNumero, valor, h);
    elementBar.style.width = valor + '%';
    elementBar.setAttribute("aria-valuenow", valor)
}

// Crea un <h></h>
function setHElement(element, valor, h) {
    element.innerHTML = '<h' + h + '>' + valor + '</h' + h + '>';
}

// Asigna informacion a un grupo de items de la tabla
function setValorEN(keyElement, ObjKeys, obj) {
    let numElement, barElement, key, valor;

    for (let index = 0; index < ObjKeys.length; index++) {
        key = ObjKeys[index];
        valor = obj ? obj[key] : 0;
        numElement = document.getElementById(keyElement + ' ' + key + 'T');
        barElement = document.getElementById('bar' + keyElement + ' ' + key + 'T');

        setValorGroupItem(numElement, 6, barElement, valor);
    }
}

// Click en boton de vistas
function clickView(key, value) {
    let titulo = key == keyConfirm ? 'todos' : key;
    titleDd.innerHTML = 'Vista > ' + titulo + ' ' + (value || '');
    styleByKey(key, value);
    itemViewBy(key);
}

// Oculta o muestra items de la tabla
function itemViewBy(key) {
    switch (key) {
        case keyConfirm:
            itemHombres.style.display = '';
            itemMujeres.style.display = '';
            break;

        case keyMujer:
        case keyHombre:
            itemHombres.style.display = 'none';
            itemMujeres.style.display = 'none';
            break;
    }
}

// Crea un item vacio
function getBrGroupItemHTML() {
    return '<a class="list-group-item list-group-item-light"></a>';
}

// Crea un item de la tabla
function getGroupItemHTML(key, value) {
    let id = key + ' ' + value;
    return '<li class="list-group-item">'
        + '<div class="row no-gutters">'
        + '<div class="col-md-8"><h6>' + id + '</h6></div>'
        + '<div id="' + id + 'T" class="col-md-4 text-right"><h6>0</h6></div></div>'
        + '<div class="progress">'
        + '<div id="bar' + id + 'T" class="progress-bar bg-warning" role="progressbar" style="width: 0%;" '
        + 'aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'
        + '</div>'
        + '</li>';
}

// Control de Dropdwon de vistas
$('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');


    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass("show");
    });


    return false;
});