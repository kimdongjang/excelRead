const proj4 = require("proj4");

// from   중부원점(Bessel) - EPSG:2097
var firstProjection = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs ";
// to 위도 경도
var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"; //to
//I'm not going to redefine those two in latter examples.    
console.log(proj4(firstProjection, secondProjection, [205210.3588, 445154.4223]));


// console.log('GRS80_UTM-K.html');
// res.sendFile(path.join(__dirname + '/pages-test/GRS80_UTM-K.html'));



