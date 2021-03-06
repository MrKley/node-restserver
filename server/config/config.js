//Puertos

process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento de token

process.env.CADUCIDAD_TOKEN = '48h';

//Semilla

process.env.SEED = process.env.SEED || 'seed';

//Google client
process.env.CLIENT_ID = process.env.CLIENT_ID || '862487833697-bffrmqco4pmqqrmc11eu5pmg4lpir2c2.apps.googleusercontent.com';

//base de datos

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}

process.env.URLDB = urlBD;