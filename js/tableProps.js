let estadoTxt = document.getElementById('estadoT');

let listTab = document.getElementById('list-tab');

let rangosEdad = Object.keys(statesData.features[0].properties.edad);
for (let index = 0; index < rangosEdad.length; index++) {
    listTab.innerHTML += getGroupItemHTML('edad', rangosEdad[index]);
}

let KeyProcedencia = Object.keys(statesData.features[0].properties.procedencia);
for (let index = 0; index < KeyProcedencia.length; index++) {
    listTab.innerHTML += getGroupItemHTML('procedencia', KeyProcedencia[index]);
}

let numTotal = document.getElementById('totalT');
let barTotal = document.getElementById('barTotalT');
let numMujeres = document.getElementById('mujeresT');
let barMujeres = document.getElementById('barMujeresT');
let numHombres = document.getElementById('hombresT');
let barHombres = document.getElementById('barHombresT');


function updateTable(props) {
    console.log(props);
    setHElement(estadoTxt, props.estado, 5);
    setValorGroupItem(numTotal, 5, barTotal, props.confirmados);
    setValorGroupItem(numMujeres, 6, barMujeres, props.mujer);
    setValorGroupItem(numHombres, 6, barHombres, props.hombre);
    setValorEN('edad', rangosEdad, props.edad);
    setValorEN('procedencia', KeyProcedencia, props.procedencia);
}

function resertTable() {
    setHElement(estadoTxt, 'Estado', 5);
    setValorGroupItem(numTotal, 5, barTotal, 0);
    setValorGroupItem(numMujeres, 6, barMujeres, 0);
    setValorGroupItem(numHombres, 6, barHombres, 0);
    setValorEN('edad', rangosEdad);
    setValorEN('procedencia', KeyProcedencia);
}

function setValorGroupItem(elementNumero, h, elementBar, valor) {
    setHElement(elementNumero, valor, h);
    elementBar.style.width = valor + '%';
    elementBar.setAttribute("aria-valuenow", valor)
}

function setHElement(element, valor, h) {
    element.innerHTML = '<h' + h + '>' + valor + '</h' + h + '>';
}

function setValorEN(keyElement, ObjKeys, obj) {
    let numElement, barElement, key, valor;

    for (let index = 0; index < ObjKeys.length; index++) {
        key = ObjKeys[index];
        valor = obj ? obj[key] : 0;
        numElement = document.getElementById(keyElement + key + 'T');
        barElement = document.getElementById('bar' + keyElement + key + 'T');

        setValorGroupItem(numElement, 6, barElement, valor);
    }
}

function click(params) {
    $('#myList a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
}

function getGroupItemHTML(key, id) {
    return '<a class="list-group-item list-group-item-light list-group-item-action" id="list-' + key + id + '-list"'
        + 'data-toggle="list" role="tab" aria-controls="' + key + id + '">'
        + '<div class="row no-gutters">'
        + '<div class="col-md-8"><h6>' + key + ' ' + id + '</h6></div>'
        + '<div id="' + key + id + 'T" class="col-md-4 text-right"><h6>0</h6>'
        + '</div>'
        + '</div>'
        + '<div class="progress">'
        + '<div id="bar' + key + id + 'T" class="progress-bar bg-warning" role="progressbar" style="width: 0%;" '
        + 'aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'
        + '</div>'
        + '</a>';
}