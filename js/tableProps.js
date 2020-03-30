// identificadores
let keyConfirm = 'confirmados';
let keyMujer = 'mujer';
let keyHombre = 'hombre';
let keyEdad = 'edad';
let keyProce = 'procedencia';

let keyAll = 'All';
let keyOne = 'One';
let keyAllsOnes = keyConfirm;

let idMenu = '-menu-vistas';
let idSubMenu = '-sub' + idMenu;

let idList = '-list';
let idItmeList = '-item' + idList;


// let allList = document.getElementById('info' + idList);
// let estadoItemList = document.getElementById('estado' + idItmeList);

// --------------------------------------------------------------------
// Elements menu vistas 
let titleDd = document.getElementById('title' + idMenu);
let edadSubMenu = document.getElementById(keyEdad + idSubMenu);
let proceSubMenu = document.getElementById(keyProce + idSubMenu);

// --------------------------------------------------------------------
// Elements lista general
//let generalList = document.getElementById('general' + idList);

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
let rangosEdad = Object.keys(ObjAllsOnes[keyConfirm + keyAll][keyEdad]);
//edadList.innerHTML += crearBrItemList();
for (let index = 0; index < rangosEdad.length; index++) {
    edadList.innerHTML += crearItemList(keyEdad, rangosEdad[index]);
    edadSubMenu.innerHTML += crearItmeSubMenu(keyEdad, rangosEdad[index]);
}

// --------------------------------------------------------------------
// Creacion de items de la lista procedencia
let arrayProce = Object.keys(ObjAllsOnes[keyConfirm + keyAll][keyProce]);
//procelList.innerHTML += crearBrItemList();
for (let index = 0; index < arrayProce.length; index++) {
    procelList.innerHTML += crearItemList(keyProce, arrayProce[index]);
    proceSubMenu.innerHTML += crearItmeSubMenu(keyProce, arrayProce[index]);
}

// --------------------------------------------------------------------
// Valores iniciales de la tabla
initDataAllTable(keyAllsOnes);

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


// Actualiza los datos de la tabla segun la llave
function initDataAllTable(key) {
    let dataCity = ObjAllsOnes[key + keyAll];
    /* setValorItemList(numTotal, 5, barTotal, dataCity.confirmados);
    setValorItemList(numMujeres, 6, barMujeres, dataCity.mujer);
    setValorItemList(numHombres, 6, barHombres, dataCity.hombre);
    setValorEN(keyEdad, rangosEdad, dataCity.edad);
    setValorEN(keyProce, arrayProce, dataCity.procedencia); */
    setValorLists(dataCity[keyConfirm], dataCity[keyHombre], dataCity[keyMujer], dataCity[keyEdad], dataCity[keyProce]);
}

// Actualizacion de la tabla segun el estado seleccionado
function updateTable(props) {
    let dataCity = ObjAllsOnes[keyAllsOnes + keyOne][props.name];
    //setHElement(estadoItemList, props.estado, 5);
    /* setValorItemList(numTotal, 5, barTotal, dataCity.confirmados);
    setValorItemList(numMujeres, 6, barMujeres, dataCity.mujer);
    setValorItemList(numHombres, 6, barHombres, dataCity.hombre);
    setValorEN(keyEdad, rangosEdad, dataCity.edad);
    setValorEN(keyProce, arrayProce, dataCity.procedencia); */
    setValorLists(dataCity[keyConfirm], dataCity[keyHombre], dataCity[keyMujer], dataCity[keyEdad], dataCity[keyProce]);
}

// Restablece la tabla a su configuracion inicial
function resertTable() {
    //setHElement(estadoItemList, 'Estado', 5);
    /* setValorItemList(numTotal, 5, barTotal, 0);
    setValorItemList(numMujeres, 6, barMujeres, 0);
    setValorItemList(numHombres, 6, barHombres, 0);
    setValorEN(keyEdad, rangosEdad);
    setValorEN(keyProce, arrayProce); */
    setValorLists(0, 0, 0);
}

// Inserta valores a la tabla
function setValorLists(intConfirm, intHombres, intMujeres, intsEdad, intsProce) {
    setValorItemList(numTotal, 5, barTotal, intConfirm);
    setValorItemList(numMujeres, 6, barMujeres, intMujeres);
    setValorItemList(numHombres, 6, barHombres, intHombres);
    setValorEN(keyEdad, rangosEdad, intsEdad);
    setValorEN(keyProce, arrayProce, intsProce);
}

// Asigna informacion a un item de la tabla
function setValorItemList(elementNumero, h, elementBar, valor) {
    setHElement(elementNumero, valor, h);
    let porcentaje = valor / 2;
    elementBar.style.width = porcentaje + '%';
    elementBar.setAttribute("aria-valuenow", porcentaje)
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
    let icono = '<i class="fa fa-bars"></i>';
    let txtBtn = ' Confirmados > ' + titulo + ' ' + subTitulo;
    titleDd.innerHTML = icono + txtBtn.toUpperCase();
    keyAllsOnes = value || key;

    styleByKey(key, value);
    info.update();    
    initDataAllTable(keyAllsOnes);
    displayListsBy(key);
    //displayEstado();
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
        + 'aria-valuenow="0" aria-valuemin="0" aria-valuemax="200"></div>'
        + '</div>'
        + '</li>';
}

// Crea un item del menu de vistas
function crearItmeSubMenu(key, value) {
    let metodo = "clickView('" + key + "','" + value + "')";
    return '<a class="dropdown-item" href="#" onclick="' + metodo + '">' + value + '</a>';
}

function createBrSubMenu() {
    return '<div class="dropdown-divider"></div>';
}

/*function displayEstado(boolean) {
    let ver = 'none';
    let alto = '580px';

    if (boolean) {
        ver = '';
        alto = '530px';
    }

    estadoItemList.style.display = ver;
    allList.style.height = alto;
}*/