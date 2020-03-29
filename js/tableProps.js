// identificadores
let keyConfirm = 'confirmados';
let keyMujer = 'mujer';
let keyHombre = 'hombre';
let keyEdad = 'edad';
let keyProce = 'procedencia';

let idMenu = '-menu-vistas';
let idSubMenu = '-sub' + idMenu;

let idList = '-list';
let idItmeList = '-item' + idList;

// --------------------------------------------------------------------
// Elements menu vistas 
let titleDd = document.getElementById('title' + idMenu);
let edadSubMenu = document.getElementById(keyEdad + idSubMenu);
let proceSubMenu = document.getElementById(keyProce + idSubMenu);

// --------------------------------------------------------------------
// Elements lista general
//let generalList = document.getElementById('general' + idList);

let estadoItemList = document.getElementById('estado' + idItmeList);

let totalItemList = document.getElementById(keyConfirm + idItmeList);
let numTotal = document.getElementById(keyConfirm + 'T');
let barTotal = document.getElementById('bar' + keyConfirm + 'T');

// --------------------------------------------------------------------
// Elements lista sexo
let sexoList = document.getElementById('sexo' + idList);

let mujerItemList = document.getElementById(keyMujer + idItmeList);
let numMujeres = document.getElementById(keyMujer + 'T');
let barMujeres = document.getElementById('bar' + keyMujer + 'T');

let hombresItemList = document.getElementById(keyHombre + idItmeList);
let numHombres = document.getElementById(keyHombre + 'T');
let barHombres = document.getElementById('bar' + keyHombre + 'T');

// --------------------------------------------------------------------
// Elements lista edad
let edadList = document.getElementById(keyEdad + idList);

// --------------------------------------------------------------------
// Elements lista procedencia
let procelList = document.getElementById(keyProce + idList);

// --------------------------------------------------------------------
// Creacion de items de la lista edad
let rangosEdad = Object.keys(statesData.features[0].properties.edad);
//listTab.innerHTML += crearBrItemList();
for (let index = 0; index < rangosEdad.length; index++) {
    edadList.innerHTML += crearItemList(keyEdad, rangosEdad[index]);
    edadSubMenu.innerHTML += crearItmeSubMenu(keyEdad, rangosEdad[index]);
}

// --------------------------------------------------------------------
// Creacion de items de la lista procedencia
let arrayProce = Object.keys(statesData.features[0].properties.procedencia);
//listTab.innerHTML += crearBrItemList();
for (let index = 0; index < arrayProce.length; index++) {
    procelList.innerHTML += crearItemList(keyProce, arrayProce[index]);
    proceSubMenu.innerHTML += crearItmeSubMenu(keyProce, arrayProce[index]);
}

// --------------------------------------------------------------------
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


// Actualizacion de la tabla segun el estado seleccionado
function updateTable(props) {
    console.log(props);
    setHElement(estadoItemList, props.estado, 5);
    setValorItemList(numTotal, 5, barTotal, props.confirmados);
    setValorItemList(numMujeres, 6, barMujeres, props.mujer);
    setValorItemList(numHombres, 6, barHombres, props.hombre);
    setValorEN(keyEdad, rangosEdad, props.edad);
    setValorEN(keyProce, arrayProce, props.procedencia);
}

// Restablece la tabla a su configuracion inicial
function resertTable() {
    setHElement(estadoItemList, 'Estado', 5);
    setValorItemList(numTotal, 5, barTotal, 0);
    setValorItemList(numMujeres, 6, barMujeres, 0);
    setValorItemList(numHombres, 6, barHombres, 0);
    setValorEN(keyEdad, rangosEdad);
    setValorEN(keyProce, arrayProce);
}

// Asigna informacion a un item de la tabla
function setValorItemList(elementNumero, h, elementBar, valor) {
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

        setValorItemList(numElement, 6, barElement, valor);
    }
}

// Click en boton de vistas
function clickView(key, value) {
    let titulo = key == keyConfirm ? 'todos' : key;
    let subTitulo = value ? '> ' + value + ' ' : '';
    titleDd.innerHTML = '' + titulo + ' ' + subTitulo;
    styleByKey(key, value);
    displayListsBy(key);
}

// Oculta o muestra items de la tabla
function displayListsBy(key) {
    resetDisplayList();

    switch (key) {
        case keyConfirm:
            break;

        case keyMujer:
        case keyHombre:
            sexoList.style.display = 'none';
            break;

        case keyEdad:
            edadList.style.display = 'none';
            break;

        case keyProce:
            procelList.style.display = 'none';
            break;
    }
}

function resetDisplayList() {
    sexoList.style.display = '';
    edadList.style.display = '';
    procelList.style.display = '';
}

// Crea un item vacio
function crearBrItemList() {
    return '<li class="list-group-item"></li>';
}

// Crea un item de la tabla
function crearItemList(key, value) {
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

// Crea un item del menu de vistas
function crearItmeSubMenu(key, value) {
    let metodo = "clickView('" + key + "','" + value + "')";
    return '<a class="dropdown-item" href="#" onclick="' + metodo + '">' + value + '</a>';
}