let grades = [0, 5, 10, 20, 50, 100, 150, 200];
let eOld;

// -----------------------------------------------------------------
// Configuracion del mapa
// -----------------------------------------------------------------
let map = L.map('map', { zoomControl: false }).setView([25.150, -100.749], 5);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);
//L.control.scale().addTo(map);
let geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
//L.marker([41.66, -4.71], { draggable: true }).addTo(map);

// -----------------------------------------------------------------
// Informacion del estado seleccionado
// -----------------------------------------------------------------
let info = L.control({ position: 'topleft' });
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {
    // this._div.innerHTML = '<h4>Confirmados con COVID-19 ' 
    //     + (props ? '<br>en ' + props.estado : '')
    //     + '</h4>Actualizado: ' +statesData.fecha
    //     + (props ? '' : '<br><br>Selecciona un estado para ver más información');
    this._div.innerHTML = '<h4>'
        + (props ? props.name : '')
        + '</h4>Actualizado: ' + ObjAllsOnes.fecha
        + (props ? '' : '<br><br>Selecciona un estado para ver más información');
};
info.addTo(map);

// -----------------------------------------------------------------
// Etuiqueta con los intervalos de cada color
// -----------------------------------------------------------------
let legend = L.control({ position: 'bottomleft' });
legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'), labels = [];

    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            (grades[i] + 1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);


// Estilo de cada estado
function style(feature) {
    let city = feature.properties.name;
    return {
        fillColor: getColor(ObjAllsOnes[keyAllsOnes + keyOne][city][keyConfirm]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Estilo de cada estado segun la llave de properties
function styleByKey(key, value) {
    geojson.clearLayers();
    geojson = L.geoJson(statesData, {
        /*style: function (feature) {
            let city = feature.properties.name;
            let keyAllsOnes = value || key;
            return {
                fillColor: getColor(ObjAllsOnes[keyAllsOnes + keyOne][city][keyConfirm]),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        }*/ style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    //resertTable();
}

// Color correspondiente al numero de datos
function getColor(d) {
    return d > grades[8] ? '#800026' :
        d > grades[7] ? '#BD0026' :
            d > grades[6] ? '#E31A1C' :
                d > grades[5] ? '#FC4E2A' :
                    d > grades[4] ? '#FD8D3C' :
                        d > grades[2] ? '#FEB24C' :
                            d > grades[1] ? '#FED976' :
                                d > grades[0] ? '#FFEDA0' :
                                    '';
}

// Eventos del mapa
function onEachFeature(feature, layer) {
    layer.on({
        //mouseover: highlightFeature,
        //mouseout: resetHighlight,
        click: highlightFeature
    });
}

// Evento mouseover
function highlightFeature(e) {
    onlyClick(e);
    let layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
    updateTable(layer.feature.properties);
    //displayEstado(true);
}

// Evento mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
    //resertTable();
}

function onlyClick(e) {
    if (eOld) {
        resetHighlight(eOld);
    }
    eOld = e;
}

/*function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}*/