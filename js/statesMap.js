let grades = [0, 5, 10, 15, 20, 25, 50, 100];

// -----------------------------------------------------------------
// Configuracion del mapa
// -----------------------------------------------------------------
let map = L.map('map').setView([24.363, -100.749], 5);
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
let info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();    
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Confirmados con COVID-19</h4>Actualizado: 22/03/2020'
        + (props ? '' : '<br><br>Selecciona un estado para ver información');
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
    return {
        fillColor: getColor(feature.properties.confirmados),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
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
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
}

// Evento mouseover
function highlightFeature(e) {
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
}

// Evento mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
    resertTable();
}

/*function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}*/