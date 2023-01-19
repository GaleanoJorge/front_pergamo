var map = L.map('map').setView([4.6097102, -74.081749], 6);


function load() {
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<¥/a> contributors'
    }).addTo(map);
    pintar();
}

var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       $_GET[aux[0]] = aux[1];
    }
}
//get the 'index' query parameter

function popUpInfo(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.DEPARTAMENTO) {
        layer.bindPopup("<b> Nombre Institucion:  " + feature.properties.NOMBRE_ESTABLECIMIENTO + "</b><br> Nombre Sede:  " + feature.properties.NOMBRE_SEDE  + "</b><br> Municipio:  " + feature.properties.MUNICIPIO + "<br>Total Estudiantes:  " + feature.properties["SUM ESTUDIANTES X  SEDE"] + "<br>Total computadores para educar:  " + feature.properties.Total_computadores );
        //layer.bindPopup("<b>"+feature.properties.nomb_mus);
    }
}

function popUpInfo2(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Regional) {
        layer.bindPopup("<b> Tecnoacademia:  " + feature.properties.Centro + "</b><br> Municipio:  " + feature.properties.Tecnoacademia);
        //layer.bindPopup("<b>"+feature.properties.nomb_mus);
    }
}

var polygon;
var municipio;
function pintar () {
    var municipio= $_GET['municipio'];
   var latitud=$_GET['lat'];
   var longitud=$_GET['long'];
   var nombre=$_GET['nombre'];
   var descripcion=$_GET['descripcion'];

    if (municipio != null && latitud==null && longitud==null ){
       polygon = L.geoJson(departamentos,{
        filter: function(feature, layer) {    
            return (feature.properties.name==municipio);                              
        }
       }).addTo(map);
       map.fitBounds(polygon.getBounds());
    }else{
        polygon = L.marker([longitud, latitud]).bindPopup("<b> Nombre:  " + nombre + "<br> Descripción: " + descripcion).addTo(map);
        map.setView([longitud, latitud], 10);

    }                     
}
 
var customIcon = new L.Icon({
    iconUrl: 'images/INSTITUCIONES.svg',
    iconSize: [35, 50],
    iconAnchor: [25, 50]
});


var customIcon5 = new L.Icon({
    iconUrl: 'images/TECNOACADEMIAS.svg',
    iconSize: [35, 50],
    iconAnchor: [25, 50]
});





