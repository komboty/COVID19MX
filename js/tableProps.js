let estadoTxt = document.getElementById('estadoT');

let listTab = document.getElementById('list-tab');

let keyEdad = 'edad';
let rangosEdad = Object.keys(statesData.features[0].properties.edad);
listTab.innerHTML += getBrGroupItemHTML();
for (let index = 0; index < rangosEdad.length; index++) {
    listTab.innerHTML += getGroupItemHTML(keyEdad, rangosEdad[index]);
}

let keyProce = 'procedencia';
let arrayProce = Object.keys(statesData.features[0].properties.procedencia);
listTab.innerHTML += getBrGroupItemHTML();
for (let index = 0; index < arrayProce.length; index++) {
    listTab.innerHTML += getGroupItemHTML(keyProce, arrayProce[index]);
}

let numTotal = document.getElementById('confirmadosT');
let barTotal = document.getElementById('barconfirmadosT');
let numMujeres = document.getElementById('mujerT');
let barMujeres = document.getElementById('barmujerT');
let numHombres = document.getElementById('hombreT');
let barHombres = document.getElementById('barhombreT');
clickItem();


function updateTable(props) {
    console.log(props);
    setHElement(estadoTxt, props.estado, 5);
    setValorGroupItem(numTotal, 5, barTotal, props.confirmados);
    setValorGroupItem(numMujeres, 6, barMujeres, props.mujer);
    setValorGroupItem(numHombres, 6, barHombres, props.hombre);
    setValorEN(keyEdad, rangosEdad, props.edad);
    setValorEN(keyProce, arrayProce, props.procedencia);
}

function resertTable() {
    setHElement(estadoTxt, 'Estado', 5);
    setValorGroupItem(numTotal, 5, barTotal, 0);
    setValorGroupItem(numMujeres, 6, barMujeres, 0);
    setValorGroupItem(numHombres, 6, barHombres, 0);
    setValorEN(keyEdad, rangosEdad);
    setValorEN(keyProce, arrayProce);
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
        numElement = document.getElementById(keyElement + ' ' + key + 'T');
        barElement = document.getElementById('bar' + keyElement + ' ' + key + 'T');

        setValorGroupItem(numElement, 6, barElement, valor);
    }
}

function clickItem() {
    $('#list-tab a').on('click', function (e) {
        // e.preventDefault()
        // $(this).tab('show')

        let row = e.currentTarget.firstElementChild;
        if (row) {
            console.log(row.lastElementChild.id);
            let idSinT = row.lastElementChild.id.slice(0, -1);
            let idSplit = idSinT.split(' ');

            if (idSplit.length > 2) {
                idSplit[1] = idSplit[1] + ' ' + idSplit[2];
            }
            styleByKey(idSplit[0], idSplit[1]);
        }
    })
}

function styleByKey(key, value) {
    geojson.clearLayers();
    geojson = L.geoJson(statesData, {
        style: function (feature) {
            let color = feature.properties[key];
            if (value) {
                color = color[value];
            }
            
            return {
                fillColor: getColor(color),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        },
        onEachFeature: onEachFeature
    }).addTo(map);
    resertTable();
}

function getBrGroupItemHTML() {
    return '<a class="list-group-item list-group-item-light"></a>';
}

function getGroupItemHTML(key, value) {
    let id = key + ' ' + value;
    return '<a class="list-group-item list-group-item-light list-group-item-action" id="list-' + id + '-list"'
        + 'data-toggle="list" role="tab" aria-controls="' + id + '">'
        + '<div class="row no-gutters">'
        + '<div class="col-md-8"><h6>' + id + '</h6></div>'
        //+ '<div class="col-md-8"><h6>' + id + '</h6></div>'
        + '<div id="' + id + 'T" class="col-md-4 text-right"><h6>0</h6>'
        + '</div>'
        + '</div>'
        + '<div class="progress">'
        + '<div id="bar' + id + 'T" class="progress-bar bg-warning" role="progressbar" style="width: 0%;" '
        + 'aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'
        + '</div>'
        + '</a>';
}