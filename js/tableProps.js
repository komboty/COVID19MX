let estatoTxt = document.getElementById('estadoT');
let numTotal = document.getElementById('totalT');
let barTotal = document.getElementById('barTotalT');
let numMujeres = document.getElementById('mujeresT');
let barMujeres = document.getElementById('barMujeresT');
let numHombres = document.getElementById('hombresT');
let barHombres = document.getElementById('barHombresT');


function updateTable(props) {
    estatoTxt.innerHTML = '<h5>' + props.estado + '</h5>';
    
    numTotal.innerHTML = '<h5>' + props.confirmados + '</h5>';
    barTotal.style.width = props.confirmados + '%';
    barTotal.setAttribute("aria-valuenow", props.confirmados)
    
    numMujeres.innerHTML = '<h6>' + props.mujer + '</h6>';
    barMujeres.style.width = props.mujer + '%';
    barMujeres.setAttribute("aria-valuenow", props.mujer)
    
    numHombres.innerHTML = '<h6>' + props.hombre + '</h6>';
    barHombres.style.width = props.hombre + '%';
    barHombres.setAttribute("aria-valuenow", props.hombre)
}

function resertTable() {
    estatoTxt.innerHTML = '<h5>Estado</h5>';

    numTotal.innerHTML = '<h5>0</h5>';
    barTotal.style.width = '0%';
    barTotal.setAttribute("aria-valuenow", 0)

    numMujeres.innerHTML = '<h6>0</h6>';
    barMujeres.style.width = '0%';
    barMujeres.setAttribute("aria-valuenow", 0)

    numHombres.innerHTML = '<h6>0</h6>';
    barHombres.style.width = '0%';
    barHombres.setAttribute("aria-valuenow", 0)
}